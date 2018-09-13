var nodemailer = require('nodemailer')

class XL_GUI_THU_DIEN_TU {
    Gui_Thu_Lien_he(from, to, subject, body) {
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                type: "login", // default
                user: "smartshop.mobilestore@gmail.com",
                pass: "vtc19001530"
            }
            /* service: 'gmail',
            auth: {
                user: 'toanvh1194@gmail.com',
                password: 'vtc19001530'
            } */
        })

        var mailOptions = {
            from: `Cửa hàng Điện thoại Smartshop <${from}>`,
            to: to,
            subject: subject,
            html: body
        }

        // var Kq = ""
        // try{
        //     transporter.sendMail(mailOptions)
        // } catch(Loi) {
        //     Kq = Loi
        // }
        // return Kq
        return transporter.sendMail(mailOptions)
    }
}

var Gui_thu = new XL_GUI_THU_DIEN_TU()
module.exports = Gui_thu