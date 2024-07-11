const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Set the view engine to EJS
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Ensure the files directory exists
const filesDir = path.join(__dirname, 'files');
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
}

// Route to render the index page
app.get("/", function (req, res) {
    fs.readdir(filesDir, function (err, files) {
        if (err) {
            return res.status(500).send("Error reading files directory");
        }
        res.render("index", { files: files });
    });
});

// Route to render the specific file content
app.get('/file/:filename', function (req, res) {
    const filePath = path.join(filesDir, req.params.filename);
    fs.readFile(filePath, "utf-8", function (err, filedata) {
        if (err) {
            return res.status(404).send("File not found");
        }
        res.render('show', { filename: req.params.filename, filedata: filedata });
    });
});

// Route to create a new file
app.post('/create', function (req, res) {
    const title = req.body.title;
    const details = req.body.details;
    
    // Ensure title and details are not undefined
    if (!title || !details) {
        return res.status(400).send("Title and details are required");
    }

    const filePath = path.join(filesDir, `${title}.txt`);

    fs.writeFile(filePath, details, function (err) {
        if (err) {
            return res.status(500).send("Error creating file");
        }
        res.redirect("/");
    });
});

// Start the server
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
