const node_mailer=require("../config/nodemailer.js");

exports.newComment=(comment)=>{
let HtmlString=node_mailer.renderTemplate({comment:comment},'/comments/newcomment.ejs')

    node_mailer.transporter.sendMail({
        from:"nikunjniv2228@gmail.com",
        to:"Nikunj1813011@akgec.ac.in",
        subject:"comment published",
        html:HtmlString
    },(err,info)=>{
        if(err){
            console.log("error in sending mail",err);
      return;  }
      console.log("message sent",info);
      return;


    })
}