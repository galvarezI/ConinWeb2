const express = require('express')
const morgan = require('morgan')
const {engine} = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const MySQLStore =require('express-mysql-session') (session)
const { database } = require('./keys')
const passport = require('passport') 

//initializations
const app = express()
require('./lib/passport')



//settings
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'))
app.set('view engine','.hbs')
app.engine('.hbs',engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')

}))




//Middlewares
app.use(session({
    secret: 'coninservicesnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))


app.use(require('body-parser').urlencoded({ extended: true }));
app.use(flash())
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}))
app.use(express.json())  
app.use(passport.initialize())
app.use(passport.session())



//Global Variables
app.use((req,res,next)=>{
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    app.locals.user = req.user
    
    next();
})

//Routes
app.use(require('./routes'))
app.use(require('./routes/authentication'))
app.use('/courses', require('./routes/courses'))

//Public
app.use(express.static(path.join(__dirname, 'public')))

//Server Start..

app.listen(app.get('port'),()=>{
console.log('Server on port', app.get('port'))


}) 