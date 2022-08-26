require('dotenv').config();
const sql=require('mysql');

const sql_con=sql.createConnection({
    host:process.env.DB_HOST?process.env.DB_HOST:'127.0.0.1',
    user:process.env.DB_USER?process.env.DB_USER:'dev',
    password:process.env.DB_PASSWORD?process.env.DB_PASSWORD:'dev2022',
    database:process.env.DB_NAME?process.env.DB_NAME:'awaz_dev2',
    port:process.env.DB_PORT?process.env.DB_PORT:'3306'
});

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host:process.env.DB_HOST?process.env.DB_HOST:'127.0.0.1',
        user:process.env.DB_USER?process.env.DB_USER:'dev',
        password:process.env.DB_PASSWORD?process.env.DB_PASSWORD:'dev2022',
        database:process.env.DB_NAME?process.env.DB_NAME:'awaz_dev2',
        port:process.env.DB_PORT?process.env.DB_PORT:'3306'
    }
  });


    sql_con.connect(function(err) {
        if (err) throw err;
        console.log("Connected using mysql!");
    });

  knex.raw('select * from users').then(function(){
      console.log('connected using knex');
  });

module.exports=sql_con;
module.exports=knex;