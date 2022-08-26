const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const userController=require('./controller/users')

function initialize(passport){
    const authenticateUser=async (mobile,password,done)=>{
        let user =await userController.getUserByMobile(mobile);
        if(user==null) return done(null,false,{message:'no user found'})

        try{
            if(await bcrypt.compare(password,user.password)){
                return done(null,user)
            }else{
                return done(null,false,{message:'wrong password'})
            }
        }catch(err){
            return done(err)
        }
    }
    passport.use(new LocalStrategy({usernameField:'mobile'},authenticateUser))
    passport.serializeUser((user,done) => done(null,user.id))
    passport.deserializeUser((id,done)=>{
        return done(null, userController.getUserById(id))
    })
}

module.exports = initialize
