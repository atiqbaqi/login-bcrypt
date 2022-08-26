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
router.get('/users',userController.getUsers)
router.post('/users',userController.saveUser)

//login
router.get('/login',authController.login)
router.post('/login',passport.authenticate('local',{
   successRedirect:'/index',
   failureRedirect:'/login',
   failureFlash:true 
}))
router.get('/index',async(req,res)=>{res.render('index.ejs')})

//register user
router.get('/register',authController.register)
router.post('/register',authController.completeRegistration)

module.exports=router;