const express=require('express')
const router = express.Router();
const jwt=require('jsonwebtoken');
const db=require('../config/db');
const verifyToken = require('../middleware/auth');

router.get('/getjobs',verifyToken ,  (req, res) => {
    const sql = "SELECT * FROM jobs;";
     db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

router.post('/adminlogin',(req,res) => {
    const {email,password}=req.body ;
    const sql="SELECT * FROM admin WHERE email=? AND password =? ";
    db.query(sql,[email,password],(err,result)=>{
        if(err){
            return res.status(500).json({success:false,message:'Database connection error'});
        }
        if(result.length === 0){
            return res.json({success:false,message:'Invalid Email or password!'});
        }
        const user=result[0];
        const token=jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET,{expiresIn:'1h'});
       
        
        return res.json({success:true,message:"Login sucessful !",token:token});
    });
});

module.exports = router;