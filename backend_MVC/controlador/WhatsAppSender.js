import qrcode from 'qrcode-terminal';
import { Client } from 'whatsapp-web.js';
import ServicioGasto from '../servicio/gastos.js'
import ServicioCategoria from '../servicio/categorias.js'

class WhatsAppSender {
  constructor() {

    this.client = new Client();
    this.gasto = new ServicioGasto()
    this.categorias = new ServicioCategoria()
    this.client.on('ready', () => {
      console.log('Cuenta de Ezequiel logueada');
      this.enviarMensaje('5491133419818@c.us', 'Cuenta de Ezequiel logueada');
    });

    this.iniciarSesion();
    this.escuchandoBoot();
  }

  iniciarSesion() {
    this.client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });

    this.client.initialize();

  }


  enviarMensaje(numero, mensaje) {
    this.client.sendMessage(numero, mensaje);
    console.log("Mensaje enviado con exito al numero " + numero);
  }

  convertirEnNumeroWhatsApp(numero) {
    let numeroAdaptado = "549" + numero + "@c.us";
    return numeroAdaptado;
  }


  enviarBootPresentacion(numero) {
    let whatsapp = this.convertirEnNumeroWhatsApp(numero)
    const robotEmoji = '\u{1F916}';

    const mensajeBienvenida = 'Bienvenido al Boot de Control de gastos' + robotEmoji;
    const mensajeMenu = 'Puedo ayudarte con estas acciones si deseas'
    const mensajeInfo = `1-Contarte sobre la aplicacion`;
    const mensajeIngresarGasto = `2-Ingresar un Gasto`

    this.enviarMensaje(whatsapp, mensajeBienvenida)
    this.enviarMensaje(whatsapp, mensajeMenu)
    this.enviarMensaje(whatsapp, mensajeInfo)
    this.enviarMensaje(whatsapp, mensajeIngresarGasto)
  }


  escuchandoBoot() {
    this.client.on('message', message => {

      if (message.body === '1') {
        const mensajeInfoAplicacion = `ControldeGastos\n
        La finalidad del uso de una aplicación web de control de gastos es ayudarte a administrar y supervisar tus finanzas personales de manera más efectiva.\n
        Las funcionalidades principales son:\n
        1-Seguimiento de gastos: Puedes ingresar manualmente tus gastos.\n   
        2-Presupuesto: Puedes establecer metas de gastos mensuales o semanales y la aplicación te ayudará a realizar un seguimiento de tus gastos en relación con tu presupuesto establecido.\n       
        3-Análisis y visualización: mostrar gráficos y tablas que te permiten visualizar tus datos financieros.\n     
        4-Recordatorios y alertas: Puedes establecer metas de ahorro.\n       
        5-Acceso desde cualquier lugar: Al ser una aplicación web, puedes acceder a ella desde cualquier dispositivo con conexión a Internet.`;
        this.client.sendMessage(message.from, mensajeInfoAplicacion);
      }

      if (message.body === '2') {
        this.client.sendMessage(message.from, `ingrese  la plantilla con los datos correspondientes para su ingreso:\n 
        Ingreso:
        email: \n 
        titulo: \n 
        monto: \n 
        idCategoria: \n
        descripcion:  \n
        `);

      }

      const email = ['Ingreso:'];

      if (message.body.includes(email)) {
        const palabrasClaves = ['email:', 'titulo:', 'monto:', 'idCategoria:', 'descripcion:'];
        const encontradas = [];
        const gasto = { email: '', titulo: '', monto: '', fecha: '', idCategoria: '', descripcion: '' };

        palabrasClaves.forEach((palabra) => {
          if (message.body.includes(palabra)) {
            encontradas.push(palabra);
            const regex = new RegExp(palabra + '([^\\n]+)');
            const match = message.body.match(regex);
            if (match && match[1]) {
              const value = match[1].trim();
              gasto[palabra.replace(':', '')] = value;
            }
          }
        });

        this.guardarGasto(message.from,gasto)
      }






    })
  }



  async guardarGasto(numero,gasto) {
    try {
      let idCategoria = await this.categorias.devolverId(gasto.idCategoria, gasto.email);

      const fechaActual = new Date('2023-06-03T22:59:18.142Z');
      const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opciones);

      gasto.idCategoria = idCategoria
      gasto.fecha = fechaFormateada;
      console.log(gasto);
      this.client.sendMessage(numero, 'Ingreso correcto del gasto ');

      await this.gasto.agregar(gasto);
      console.log("Gasto agregado correctamente por whatsApp");
    } catch (error) {
      console.error('Ocurrió un error en al guardar el gasto');
      this.client.sendMessage(numero, 'Error vuelva a ingresar la plantilla completa');

    }
  }





}


export default WhatsAppSender;