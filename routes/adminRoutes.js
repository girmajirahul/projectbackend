const express=require('express')
const router = express.Router();
const db=require('./db')

router.get('/user',(req,res)=>{
    const sql="select * from users1";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

module.exports = router;