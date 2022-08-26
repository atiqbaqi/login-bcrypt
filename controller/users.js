const bcrypt=require('bcrypt')
const db = require('../database/db_connection')
const UserModel = require('../model/UserModel')

module.exports = 
{
    async getUsers(req,res){
        try{
            let userModel=new UserModel();
            let users = await db(userModel.table).select()
            res.send(users);
        }catch(err){
            res.send(err.message)
        }
    },

    async getUserByMobile(mobile){
        try{
            let userModel=new UserModel();
            let user = await db(userModel.table).where({mobile:mobile}).first()
            return user;
        }catch(err){
            res.send(err.message);
        }
    },

    async getUserById(id){
        try{
            let user_id = id;
            let userModel=new UserModel();
            let user = await db(userModel.table).where({id:user_id}).first()
            return user;
        }catch(err){
            return err.message;
        }
    },

    async saveUser(req,res){
        try{
            let receiveData=req.body;
            const hashedPassword = await bcrypt.hash(receiveData.password,10);
            console.log(hashedPassword);
            receiveData.password=hashedPassword;
            let userModel=new UserModel();
            let insert = await db(userModel.table).insert(req.body);
            console.log('id:'+insert[0])
            let responseData={result:insert[0]}
            res.status(200).send(responseData)
        } catch(err){
            res.send(err.message)
        }
    }
}