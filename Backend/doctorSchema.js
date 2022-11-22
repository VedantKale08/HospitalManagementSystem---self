const { default: mongoose } = require("mongoose");

const doctorSchema = new mongoose.Schema({
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    phone:{
        type:String
    },
    stateCountry:{
        type:String
    },
    specialization:{
        type:String
    },
})


module.exports=mongoose.model('doctor',doctorSchema);