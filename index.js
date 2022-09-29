const express=require('express');
const app=express();
const bodyParser=require('body-parser');//added bodyparser 
const cors = require('cors');
const bcrypt=require('bcrypt');
const path=require("path")
app.use(cors());


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

const signuprouter=require('./src/routes/singuprouter')
const bookrouter=require('./src/routes/bookrouter')

app.use('/user',signuprouter);
app.use('/books',bookrouter);


app.use(express.static('./dist/frontend'));
app.get('/*', function(req, res) {
 res.sendFile(path.join(__dirname + '/dist//frontend>/index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});