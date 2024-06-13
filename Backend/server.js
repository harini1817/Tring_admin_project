import express from 'express';
import cors from 'cors';  
import mysql from 'mysql';  
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "#Dharshan237",
    database: 'my_db'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({ Message: "Email and password are required" });
    }

    const saltRounds = 10;

    bcrypt.hash(password.toString(), saltRounds, (err, hash) => { 

        if (err) {
            console.log(err);
            return res.status(500).json({ Message: "Error in hashing password" });
        }

        const sql = "INSERT INTO user_details (`email`, `password`) VALUES (?, ?)";
        db.query(sql, [email, hash], (err, result) => {   
            if (err) {
                console.log(err);
                return res.status(500).json({ Message: "Error in db" });
            }
            return res.json({ Message: "User registered successfully" });
        });
    });
});

app.post('/login', (req, res) => {
    const sql ="SELECT * FROM user_details WHERE 'email' =? "

});


app.options('*', cors());

app.listen(8081, () => {
    console.log("Connected to the server");
});
