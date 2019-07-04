const app=require("express")();
const bodyParser=require('body-parser');
const router=require('./routes/api');
const PORT= process.env.PORT||5000;
const mongoose=require('mongoose');

//DB Connection
mongoose.connect('mongodb://localhost/omingle', {useNewUrlParser: true})
.then(()=>console.log('Connection To DB Successful'))
.catch(err=>console.log(err));


app.listen(PORT ,()=>{
    console.log(`Server is running on port: ${PORT}`)
});

app.use(bodyParser.urlencoded({extended:true}));

app.use('/app',router);

