const express = require('express');
const router = express.Router();
const db = require('../config/db')
const multer = require('multer')
const jwt = require('jsonwebtoken');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage })

//login
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "Select user_id,full_name,email,password,role from users where email=? and password=?"
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database connection error' });
        }
        if (result.length === 0) {
            return res.json({ success: false, message: 'Invalid Email or password!' });
        }
        const user = result[0];
        const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });


        return res.json({
            success: true, message: "Login successfully !", token: token, user: {
                id: user.user_id,
                name: user.full_name,
                role: user.role
            }
        });
    });

})

// POST signup
router.post('/signup', (req, res) => {
    const sql = "INSERT INTO users1 (name, email, password) VALUES (?);";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    console.log(values);
    db.query(sql, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

router.post('/upload/', upload.single('file'), (req, res) => {
    console.log(` uploaded Succesfully !`);
    const filename = req.file?.filename
    const userId = req.body.userId
    const query = "UPDATE users1 SET images = ? WHERE id = ?";
    db.query(query, [filename, userId], (err, result) => {
        if (err) {
            console.error('Error updating user with image:', err);
            return res.status(500).json({ error: "Database update failed" });
        }
        console.log('Image saved in DB for user:', userId);
        res.json({ message: 'Image uploaded and saved', file: req.file });
    });
    console.log(filename, userId);

});

module.exports = router;
