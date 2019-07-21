const app=require("express")();
const bodyParser=require('body-parser');
const router=require('./routes/api');
const PORT= process.env.PORT||5000;
const mongoose=require('mongoose');
const http=require('http').createServer(app);

//DB Connection
mongoose.connect('mongodb://localhost/omingle', {useNewUrlParser: true})
.then(()=>console.log('Connection To DB Successful'))
.catch(err=>console.log(err));

//Launching Matchmaker
const matchmaker=require('./Matchmaker/matchmaker');
matchmaker.launch(5000);

//Launching ChatControl
const ChatControl=require('./ChatControl/chatControl')(http);

http.listen(PORT,function(){
    console.log(`Server is running on port: ${PORT}`);
});

app.use(bodyParser.urlencoded({extended:true}));

app.use('/app',router);

