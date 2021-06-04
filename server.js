
const { urlencoded } = require("body-parser");
const express=require("express");
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const app=express();
const port=5005;
const db=require("./db/conn");
//used for session-cookie
const session=require("express-session");
const passport=require('passport');
const passportLocal=require("./config/passport-local-strategy");
const passportGoogle=require("./config/passport-google-oauth2-strategy");




const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const customMiddleware=require("./config/middleware");









app.use(cookieParser());
 app.use(express.urlencoded({extended:true}));



 //mongo store is use to store the session cookie in the db
app.use(session({
    name:"codeial",
    secret:"bhalsomething",
    saveUninitialized:false,
     resave:false,
     cookie:{
         maxage:(1000*60*100)
     },
     store: MongoStore.create({
        mongoUrl:"mongodb://localhost/codeial",
         autoRemove:"disabled"
     },
     function(err){
         console.log(err||"conect mongo dbsetup");
     }
     
     )
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);

//make the upload path availaible to the browser
app.use("/uploads",express.static(__dirname+ "/uploads" ));



app.use(express.static('./assets'));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up the view engine
app.set('view engine','ejs');
app.set("views",'./views');

app.use("/",require("./routes"));



app.listen(port,(err)=>{
    if(err){
        console.log("error",err);
    return;
    }
    console.log("server is up on port",port);
})


//clineid-243124469336-8gubla8dck61euroek9nqndbbln49fup.apps.googleusercontent.com
//clinetsecret-e9iHSKFArQmpxOLIjYYNZdJd