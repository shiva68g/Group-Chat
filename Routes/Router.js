const express = require('express');
const path = require('path');

const router = express.Router();

router.use(express.static(path.join(__dirname, '../Templates')));
router.use(express.static(path.join(__dirname, '../client_js')));
router.get('/', (req , res)=>{
       res.sendFile(path.join(__dirname , '../Templates/index.html'))
})


module.exports = router;