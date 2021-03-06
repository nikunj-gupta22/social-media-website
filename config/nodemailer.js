const nodemailer=require("nodemailer");
const ejs=require("ejs");
const path=require("path");

let transporter=nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:"nikunjniv2228@gmail.com",
        pass:"nikunj@12345"
    }
})



let renderTemplate=(data,relativePath)=>{
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,"../views/mailer",relativePath),
        data,
        function(err,template){
            if(err){console.log("error in rendering template");
        return;}

        mailHtml=template;
        }
    
);


return mailHtml;
}

module.exports={
    renderTemplate:renderTemplate,
    transporter: transporter
}