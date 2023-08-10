import nodemailer from 'nodemailer'

export const sendMail = async(options:any)=>{
    const transport = nodemailer.createTransport(
        {
            service: 'gmail' ,
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORDD
            }

        }
    )

    const mailOpt = {
        from : 'Hi Iam Kerlos and hope you enjoy with our ecommerce',
        to   : options?.email,
        subject : options?.subject,
        text : options.message
    }

    await transport.sendMail(mailOpt)
}