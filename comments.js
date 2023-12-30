//create webserver
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 3000;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
})
app.post('/comments',(req,res)=>{
    console.log(req.body);
    fs.appendFile('comments.txt',req.body.comment+'\n',(err)=>{
        if(err){
            console.log(err);
            res.send('error');
        }else{
            console.log('success');
            res.send('success');
        }
    })
})
app.listen(port,()=>{
    console.log('server is running at port '+port);
})
