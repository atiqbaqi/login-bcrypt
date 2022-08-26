const db = require('../database/db_connection')
const UserModel = require('../model/UserModel')
const bcrypt=require('bcrypt')

module.exports={
    async login(req,res){
        try{
            res.render('login.ejs'); 
        }catch(err){
            res.send(err.message);
        }
    },

    async loginReq(req,res){
        try{
            let userModel= new UserModel();
            const user = await db(userModel.table).where({mobile:req.body.mobile}).first();
            if(user==null) res.status(400).send('No user found');
            if(await bcrypt.compare(req.body.password,user.password)){
                res.render('index.ejs',{user:user})
            }else{
                res.send('wrong password')
            }

        }catch(err){
            res.send(err.message);
        }
    },

    async register(req,res){
        try{
            res.render('register.ejs');
        }catch(err){
            res.send(err.message);
        }
    },

    async completeRegistration(req,res){
        try{
            let user_name=req.body.username;
            let mobile=req.body.mobile;
            let password=req.body.password;
            const hashedPassword = await bcrypt.hash(password,10);
            console.log(hashedPassword);
            password=hashedPassword;
            let userModel=new UserModel();
            let insert = await db(userModel.table).insert({user_name:user_name,mobile:mobile,password:hashedPassword});
            console.log('id:'+insert[0])
            let responseData={result:insert[0]}
            res.redirect('/login')
        } catch(err){
            res.send(err.message)
        }
    }
}