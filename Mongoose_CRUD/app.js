const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./model/user');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.render("read", { users: users });
});

app.get('/delete/:id', async (req, res) => {
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
});


app.post('/edit/:userid', async (req, res) => {
    let {image_url, name ,email} = req.body;
    let user = await userModel.findOneAndUpdate({ _id: req.params.userid },{image_url,name,email}, {new:true});
     res.redirect("/read");
 });

app.post('/create', async (req, res) => {
    let { name, email, image_url } = req.body;
    await userModel.create({
        name,
        email,
        image_url
    });
    res.redirect("/read");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
