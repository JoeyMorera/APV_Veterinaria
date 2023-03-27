import nodemailer from 'nodemailer'

const emailRegistrro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre,  token} = datos

    //Enviar Email
    const info = await transport.sendMail({
        from: "Administrador de Pacientes de Veterinaria",
        to: email,
        subject:"Comprueba tu cuenta",
        text:"Comprueba tu cuenta en el Administrador de Pacientes de Veterinaria ",
        html: `<p>Hola: ${nombre}, comprueba tu cuenta en el Administrador de Pacientes de Veterinaria  </p>
                <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace: 
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta </a> </p>
                <p>Si tu no creaste esta cuenta puedes ignorar este mensaje </p>`
    })
    console.log("Mensaje Enviado: %s", info.messageId)
}

export default emailRegistrro;