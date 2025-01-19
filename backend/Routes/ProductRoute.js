const ensureAuth = require('../Middlewares/Auth');

const router = require('express').Router();
router.get('/' , ensureAuth,(req,res)=>{
    res.status(200).json([
        {
            name:"mobile" , 
            price :20000
        },
        {
            name:" Laptop" , 
            price :40000
        }
    ])
})

module.exports = router;