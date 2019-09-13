const app=require("express")();
const bodyParser=require('body-parser');
const router=require('./routes/http');
const PORT= process.env.PORT||5000;
const mongoose=require('mongoose');
const http=require('http').createServer(app);

//DB Connection
mongoose.connect('mongodb://localhost/omingle', {useNewUrlParser: true})
.then(()=>console.log('Connection To DB Successful'))
.catch(err=>console.log(err));

http.listen(PORT,function(){
    console.log(`Server is running on port: ${PORT}`);
});

app.use(bodyParser.urlencoded({extended:true}));

//Transport Layer 
app.use('/',router);
const websockets=require('./routes/websocket')(http);
