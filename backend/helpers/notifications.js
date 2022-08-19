const { createTransport } = require("nodemailer");
const dotenv = require("dotenv");
const twilio = require("twilio");

dotenv.config();
const MAIL_ADMIN = process.env.MAIL_ADMIN;
const WHATSAPP_ADMIN = process.env.WHATSAPP_ADMIN;

const transport = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.USER_ETHEREAL,
    pass: process.env.PASS_ETHEREAL,
  },
});

const twilioAccount = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const notificarNuevoUsuario = async (user) => {
  let html = `
    <h1>Se registró un nuevo usuario</h1>
    <br>
    <ul>
        <li>Nombre: ${user.nombre}</li>
        <li>Domicilio: ${user.domicilio}</li>
        <li>Email: ${user.email}</li>
        <li>Télefono: ${user.telefono}</li>
    </ul>
    `;

  await transport.sendMail({
    from: MAIL_ADMIN,
    to: user.email,
    subject: "Nuevo usuario registrado",
    html,
  });
};

const mailNuevaVenta = async ({ user, orden, productos }) => {
  let html = `
    <h1>Se registró una nueva venta</h1>
    <br>
    <h5>Datos del Cliente</h5>
    <ul>
      <li>Orden: ${orden}</li>
      <li>Nombre: ${user.nombre}</li>
    </ul>
    <br>
    <h5>Productos</h5>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        ${productos.map((producto) => {
          return `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
            </tr>
            `;
        })}
      </tbody>
    </table>
    `;

  await transport.sendMail({
    from: MAIL_ADMIN,
    to: user.email,
    subject: `Nuevo pedido de ${user.nombre}`,
    html,
  });
};

const whatsappNuevaVenta = ({ telefono, orden }) => {
  return twilioAccount.messages.create({
    body: `Tu orden fue confirmada! Numero de orden: ${orden}`,
    to: `whatsapp+${telefono}`,
    from: `whatsapp+${WHATSAPP_ADMIN}`,
  });
};

module.exports = {
  mailNuevaVenta,
  notificarNuevoUsuario,
  whatsappNuevaVenta,
};
