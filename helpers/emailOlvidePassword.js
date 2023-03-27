import nodemailer from 'nodemailer'

const emailOlvidePassword = async (datos) => {
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
        subject:"Reestablece tu password",
        text:"Reestablece tu password en el Administrador de Pacientes de Veterinaria ",
        html: `<p>Hola: ${nombre}, has solicitado reestablecer tu password  </p>
                <p>Sigue el siguiente enlance para generar un nuevo password:  
                <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password </a> </p>
                <p>Si tu no creaste esta cuenta puedes ignorar este mensaje </p>`
    })
    console.log("Mensaje Enviado: %s", info.messageId)
}

export default emailOlvidePassword;