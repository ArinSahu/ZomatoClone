const express = require('express');
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try {
        // console.log(global.foodCategory,global.foodCategory);
        res.send([global.food_items,global.foodCategory])
    } catch (error) {
        console.log(error);
        res.send("Server Error");
    }
})

module.exports = router;