const router=require('express').Router()
const userController=require('../controller/users')
const authController=require('../controller/auth')
const flash = require('express-flash')
const session = require('express-session')

const passport = require('passport')
const initializePassport = require('../passport-config')
initializePassport(passport)

// This is the basic express session({..}) initialization.
router.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
// init passport on every route call.
router.use(passport.initialize())
// allow passport to use "express-session".
router.use(passport.session())
router.use(flash())

//user
router.get('/users',checkNotAuthenticated,userController.getUsers)
router.post('/users',checkNotAuthenticated,userController.saveUser)

//login
router.get('/login',checkNotAuthenticated,checkNotAuthenticated,authController.login)
router.post('/login',passport.authenticate('local',{
   successRedirect:'/index',
   failureRedirect:'/login',
   failureFlash:true 
}))

//landing page
router.get('/index',checkAuthenticated,async(req,res)=>{res.render('index.ejs',{name:req.user.id})})

//register user
router.get('/register',checkNotAuthenticated,authController.register)
router.post('/register',checkNotAuthenticated,authController.completeRegistration)


//authenticated check
function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
         next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        res.redirect('/index')
    }

    next()
}

module.exports=router;