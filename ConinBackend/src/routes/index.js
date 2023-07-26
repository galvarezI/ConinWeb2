const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{

res.render('index',{
    isNavbar: true
})

} )

module.exports = router