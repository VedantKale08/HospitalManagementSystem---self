const { default: mongoose } = require("mongoose");

const patientSchema = new mongoose.Schema({
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
    age:{
        type:String
    },
    gender:{
        type:String
    },
    phone:{
        type:String
    },
    stateCountry:{
        type:String
    },
    symptoms:{
        type:String
    },
    bloodGroup:{
        type:String
    },
    AdmitDate:{
        type:String
    },
    OnlyDate:{
        type:String
    },
})


module.exports=mongoose.model('patient',patientSchema);