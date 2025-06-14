const express = require('express');
const router = express.Router();
const db=require('./db')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
  
const upload = multer({ storage })

// GET all users
router.get('/', (req, res) => {
    const sql = "SELECT * FROM users1;";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

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

router.post('/upload/',upload.single('file'),(req,res)=>{
    console.log(` uploaded Succesfully !`);
    const filename=req.file.filename
    const userId=req.body.userId
    const query="UPDATE users1 SET images = ? WHERE id = ?";
    db.query(query, [filename, userId], (err, result) => {
        if (err) {
            console.error('Error updating user with image:', err);
            return res.status(500).json({ error: "Database update failed" });
        }
        console.log('Image saved in DB for user:', userId);
        res.json({ message: 'Image uploaded and saved', file: req.file });
    });
    console.log(filename,userId);
    
});

module.exports = router;
