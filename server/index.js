const express=require("express");
const app=express();
const bodyParser=require('body-parser');
const router=require('./routes/api');
const PORT= process.env.PORT||5000;

app.listen(PORT);

app.use(bodyParser.urlencoded({extended:true}));

app.use('/app',router);

