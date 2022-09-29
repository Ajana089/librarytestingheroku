const mongoose=require('mongoose');
const url = "mongodb+srv://ajana:WXEfL58SV4RttU1P@cluster0.skibkhl.mongodb.net/librarybookapplication?retryWrites=true&w=majority"
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }); 
//mongoose.connect('mongodb://localhost:27017/librarybookapplication')
const Schema=mongoose.Schema;
const bookSchema=new Schema({
    name : {type:String},
    author: {type:String},
    description: {type:String},
    remark:{type:String}
})


const bookdata = mongoose.model('bookdata',bookSchema);



module.exports=bookdata;