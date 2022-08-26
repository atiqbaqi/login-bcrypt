const express = require('express');
const app = express();
require('dotenv').config();
const api = require('./routes/api')

  

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view-engine','ejs')





app.listen(process.env.APP_PORT, ()=>{
    console.log('app listening to '+process.env.APP_PORT)
});

app.use(api);