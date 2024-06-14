import express from 'express';
import cors from 'cors';  
import mysql from 'mysql';  
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "#Dharshan237",
    database: 'my_db',
    
});
const generateSessionId = (email) => {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(7);
    return `${email}_${timestamp}_${random}`;
};



db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.post('/register', (req, res) => {
    const { name, email, password,city,contact } = req.body;


    if (!name ||!email || !password || !city || !contact){

        return res.status(400).json({ Message: "Email and password are required" });
    }

    const saltRounds = 10;

    bcrypt.hash(password.toString(), saltRounds, (err, hash) => { 

        if (err) {
            console.log(err);
            return res.status(500).json({ Message: "Error in hashing password" });
        }

        const sql = "INSERT INTO user_details (`email`, `password`) VALUES (?, ?)";
        db.query(sql, [name, email, hash, city, contact], (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({ Message: "Error in db" });
            }
            return res.json({ Message: "User registered successfully" });
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ Message: "Email and password are required" });
    }

    const sql = "SELECT * FROM user_details WHERE email = ?";
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ Message: "Error in db" });
        }

        if (result.length === 0) {
            return res.status(401).json({ Message: "Invalid email or password" });
        }

        const user = result[0];
        bcrypt.compare(password.toString(), user.password, (err, isMatch) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ Message: "Error in password comparison" });
            }

            if (isMatch) {
                const sessionId = generateSessionId(email);
                const expirationTime = new Date().getTime() + (1 * 60 * 1000); // 1 minute expiration
                const token = jwt.sign({ sessionId, exp: expirationTime }, 'your_secret_key_here');
                return res.json({ token, login: true, expirationTime });
            } else {
                return res.status(401).json({ Message: "Invalid email or password" });
            }
        });
    });
});
const checkAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ Message: "Unauthorized" });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'your_secret_key_here', (err, decoded) => {
        if (err) {
            return res.status(401).json({ Message: "Unauthorized" });
        }
        req.userData = decoded;
        next();
    });
};
app.get('/users', (req, res) => {
    const sql = "SELECT name, email,city, contact FROM user_details";
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ Message: "Error in db" });
        }
        return res.json(results);
    });
});
app.get('/protected-route', checkAuth, (req, res) => {
    res.json({ Message: "Authorized" });
});

app.options('*', cors());

app.listen(8081, () => {
    console.log("Connected to the server");
});