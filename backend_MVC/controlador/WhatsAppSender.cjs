const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

class WhatsAppSender {
  constructor() {
    this.client = new Client();
    this.client.on('ready', () => {
      console.log('Cuenta de Ezequiel logueada');
      this.enviarMensaje('5491133419818@c.us', 'Cuenta de Ezequiel logueada');
    });

    this.iniciarSesion();
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

  convertirEnNumeroWhatsApp( numero) {
   let numeroAdaptado = "549" + numero + "@c.us";
    return numeroAdaptado;
}

}

module.exports = WhatsAppSender;