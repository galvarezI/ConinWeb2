const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const pool = require('../database')
const helpers = require('../lib/helpers')


/**

 */


passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passportField: 'password',
    passReqToCallback: true


}, async (req,username,password, done ) =>{
    console.log(req.body)
    console.log(username)
    console.log(password)
   const rows = await pool.query('SELECT * FROM  users WHERE username = ?',[username])
   if(rows.length > 0){
        const user = rows[0]
       const validPassword = await helpers.matchPassword(password,user.password)
       if(validPassword){
            done(null,user,req.flash('success','Welcome' + user.username))
       }
        else{
            done(null,false,req.flash('message','incorrect user or password'))
        }
       }
       else {
        return done(null, false, req.flash('message','User does not exist'))
       }


}))

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField:'password',
    passReqToCallback: true

},
async (req, username, password, done) =>{
    const {fullname} = req.body
    const {Email} = req.body

    const newUser = {
        username: username,
        password: password,
        fullname: fullname,
        Email: Email




     }
     newUser.password = await helpers.encryptPassword(password)
     const result =await pool.query('INSERT INTO users SET ?', [newUser])
    console.log(result)
    newUser.id = result.insertId
     return done(null,newUser)



}))


passport.serializeUser(function (user,done)  {
    
    done(null,user.id)
    

}) 


/*IF WILL USE IT IN THE FUTURE

const rows = await pool.query('SELECT * FROM  users WHERE id = ?',[id])
User.FindOne(id,function(id,done){
    done(err,user)
   })

*/
passport.deserializeUser(async (id,done) => {
   
    const rows = await pool.query('SELECT * FROM  users WHERE id = ?',[id])
    done(null,rows[0])


})

