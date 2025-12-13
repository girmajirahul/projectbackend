const express=require('express')
const router = express.Router();
const db=require('./db')
router.get('/', (req, res) => {
    const sql = "SELECT * FROM jobs;";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

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

router.post('/addjobs',upload.single('image'),(req,res)=>{
    const {name,location,post,website}=req.body;
    const image=req.file?.filename
    
    const values=[name,location,post,website,image]
    console.log(values);
    console.log(image);
    
    const sql = "INSERT INTO jobs ( company_name, location, post,logo,website) VALUES (?);";
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }
    return res.status(200).json({ message: "Job added successfully !", jobId: data.insertId });
  });

});

module.exports = router;