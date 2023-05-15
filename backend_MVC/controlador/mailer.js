import nodemailer from 'nodemailer';

// Configurar el transporte de nodemailer con tus credenciales de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'ventaDeTicketsPN1@gmail.com',
    pass: 'sjklkmqbxdnrclqy',
  },
});

// Enviar el correo electrónico de confirmación
function enviarCorreoConfirmacion(token,email) {
  const mensaje = {
    from: 'ventaDeTicketsPN1@gmail.com',
    to: 'ventaDeTicketsPN1@gmail.com',
    subject: 'Confirmación de registro',
    html: `


       <p>"Token generado de confirmacion " ${token}  'email ' ${email} </p>
      <p>¡Gracias por registrarte!</p>
      <p>Para confirmar tu correo electrónico, haz clic en el siguiente enlace:</p>
      <a href="http://localhost:3001/confirmar?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}">Confirmar registro</a>
    `,
  };

  transporter.sendMail(mensaje, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo electrónico:', error);
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });
}

function enviarCorreoCambioPass(email) {
  const mensaje = {
    from: 'ventaDeTicketsPN1@gmail.com',
    to: 'ventaDeTicketsPN1@gmail.com',
    subject: 'Cambio de Pass',
    html: `
      <p>Para cambiar tu contraseña, haz clic en el siguiente enlace:</p>
      <a href="http://localhost:5173/cambioDePass?email=${encodeURIComponent(email)}">Cambiar contraseña</a>
    `,
  };

  transporter.sendMail(mensaje, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo electrónico:', error);
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });
}


export default{
    enviarCorreoConfirmacion,
    enviarCorreoCambioPass
}