const mongoose= require('mongoose');

var register = {
    type: String,
    required: true,
    unique: true
}

const userSchema = new mongoose.Schema({
        name : register,
        email: register,
        password: register,
        phoneNumber: register,
        photo: register,
        isdeleted:{
            type: Boolean,
            default: false
        }
},{timestamps: true});   

module.exports= mongoose.model('User',userSchema);   