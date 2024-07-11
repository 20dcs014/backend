
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const userModel = require("./models/user");
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'shhhhh';

app.set("view engine", 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index');
});

// Render the login form
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send("Invalid email or password");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid email or password");
        }
        const token = jwt.sign({ email }, JWT_SECRET);
        res.cookie("token", token, { httpOnly: true });
        res.send("Login successful");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/create', async (req, res) => {
    try {
        let { username, email, password, age } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const createdUser = await userModel.create({
            username,
            email,
            password: hash,
            age
        });
        const token = jwt.sign({ email }, JWT_SECRET);
        res.cookie("token", token, { httpOnly: true });
        res.send(createdUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/logout", (req, res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.redirect("/");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
