const mongoose=require('mongoose');
const url = "mongodb+srv://ajana:WXEfL58SV4RttU1P@cluster0.skibkhl.mongodb.net/librarybookapplication?retryWrites=true&w=majority"
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }); 
//mongoose.connect('mongodb://localhost:27017/librarybookapplication')
const Schema=mongoose.Schema;
const userSchema=new Schema({
    name : {type:String},
    email: {type:String,unique:true},
    password: {type:String,required:true},
    number:{type:Number}
})

//email validation
userSchema.path('email').validate(async(email)=>{
    const emailcount=await mongoose.models.signupdata.countDocuments({email})
    return !emailcount
},'Email already exists')

const signupdata = mongoose.model('signupdata',userSchema);
//db.signupdata.createIndex( { "email": 1 }, { unique: true } )


module.exports=signupdata;