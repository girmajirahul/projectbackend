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

module.exports = router;