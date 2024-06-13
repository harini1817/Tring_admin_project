import express from 'express';
import cors from 'cors';  
import mysql from 'mysql';  

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:"#Dharshan237",
    database:'my_db'

})

 app.post ('/register',(req,res)=>{
     const sql = "INSERT INTO user_details (`email`,`password`) VALUES (?)";
     const { email, password } = req.body;

       
     db.query(sql, [[email, password]], (err, result) => {   
             if(err) return res.json({Message:"Error in db"});
        return res.json(result);
     })
 })


// Handle preflight requests for all routes
app.options('*', cors());


 app.listen(8081,()=>{
    console.log("Connected to the server");
})