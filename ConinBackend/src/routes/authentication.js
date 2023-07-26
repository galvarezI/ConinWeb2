const express = require('express')
const router = express.Router()

const passport = require('passport')
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth')
//metodo que protege las rutas 




//posible solucion --> const passport = require('../lib/passport')
router.get('/signup',isNotLoggedIn, (req,res)=>{

    res.render('auth/signup')
})


//Way Depreciated...
/*

router.post('/signup',(req,res)=>{
    passport.authenticate('local.signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash:true
    })
    res.send('received')

}) */
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}))
//another way....
/* router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}))
*/


router.get('/signin',isNotLoggedIn,(req,res) =>{

        res.render('auth/signin')

})

router.post('/signin', (req,res,next) => {

    passport.authenticate('local.signin', {
        successRedirect:'/profile',
        failureRedirect:'/signin',
        failureFlash: true

    })(req,res,next)

})

router.get('/profile' ,isLoggedIn, (req,res) => {
    res.render('profile')

})

router.get("/logout", (req, res, next) => {
    req.logOut(req.user, err => {
        if(err) return next(err);
        res.redirect("/signin");  
    });
})

module.exports = router