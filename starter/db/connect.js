require('dotenv').config();
const mongoose =require('mongoose');
const connectionString=`mongodb+srv://codeblooded:${process.env.MONGO_PWD}@nodeexpressprojects.6y8qr.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority`

const connectDB=(url)=>{
   return  mongoose.connect(url,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:true,
        useUnifiedTopology:true,
    })
}


module.exports=connectDB