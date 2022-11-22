const express = require('express');
const app = express()
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());

const jwt = require('jsonwebtoken')
const JWT_SECRET = "hhedwfherhehejhergyewytw4uwuncvvsvsvs7eyewysvsvsvceu"


const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());



const DB = 'mongodb+srv://vedant:vedant@cluster0.xbnqse2.mongodb.net/hospital?retryWrites=true&w=majority'
mongoose.connect(DB)
.then(()=>{
    console.log("Connection Successful");
})
.catch((err)=>console.log("Failed"));

const User = require('./userSchema');

app.post("/register", async (req,res)=>{
    const {fname,lname,email,password} = req.body;

    const encrypt = await bcrypt.hash(password,10);
    try{

        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.send({status:"User Exists"})
        }

        await User.create({
            fname,lname,email,password:encrypt,
        });
        res.send({status:"ok"});

    } catch(error){
        res.send({status:"Error"})
    }
})

app.post("/login-user", async (req,res) => {
    const {email,password} =req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.json({status:"error", error : "User Not Found"})
    }
    if(await bcrypt.compare(password,user.password)){
        const token = jwt.sign({email:user.email},JWT_SECRET);
        if(res.status(201)){
            return res.json({status:"ok",data:token})
        }else{
            return res.json({error: "error"})
        }
    }
    res.json({status:"error",error:"Invalid Password"})
})



app.post("/profile",async(req,res)=>{
    const {token} = req.body;
    try{
        const user = jwt.verify(token,JWT_SECRET);
        const userEmail = user.email
        User.findOne({email:userEmail})
        .then((data)=>{
            res.send({status:"ok",data:data});
        })
        .catch((error)=>{
            res.send({status:"error",data:error});
        })
    }catch(error){
        
    }
})

const Doctor = require('./doctorSchema');
app.post("/add-doctor", async (req,res)=>{
    const {fname, lname, email,phone,stateCountry,specialization}=req.body;
    try {
        await Doctor.create({
            fname, lname, email,phone,stateCountry,specialization
        });
        res.send({status:"ok"})
    } catch (error) {
        res.send({status:"error",error1:error})
    }
})

app.get("/doctor-records", async (req,res)=>{
    try {
        let data = await Doctor.find()
        console.log(data);
        if(data.length > 0){
            res.json({status:"ok",data:data})
        }
        else{
            res.send({status:"error",data:"No result found"})
        }
    } catch (error) {
        
    }
})

app.post("/update-doctor" , async (req,res)=>{
    const {fname, lname, email,phone,stateCountry,specialization}=req.body;
    const doctor = await Doctor.findOne({email});
    try {
        if(lname!==doctor.lname || email!==doctor.email || phone!==doctor.phone ||stateCountry!==doctor.stateCountry){
            await Doctor.updateOne(
                {email:doctor.email},
                {
                    $set:{lname:lname , email:email , phone:phone, stateCountry:stateCountry}
                }
            )
            .then((data)=>{
                res.send({status:"ok"})
            })
            .catch((error)=>{
                res.send({status:"error"})
            })
        }
        
    } catch (error) {
        res.send({status:"error"})
    }
})


app.post("/remove-doctor" , async (req,res)=>{
    const {email} = req.body;
    try {
        if(email !== null){
            await Doctor.remove(
                {email:email}
            )
            .then(()=>res.send({status:"ok"}))
            .catch((error)=>{
                res.send({status:"error"})
            })
        }
    } catch (error) {
        res.send({status:"error"})
    }
})

app.get("/search/:key", async (req,res)=>{
    let result = await Patient.find({
        fname : {$regex:req.params.key}
    })
    if(result.length > 0){
        res.json({status:"ok",data:result})
    }
    else{
        res.send({status:"error",data:"No result found"})
    }
})




const Patient = require('./patientSchema');
app.get("/patient-records", async (req,res)=>{
    try {
        let data = await Patient.find()
        // console.log(data);
        if(data.length > 0){
            res.json({status:"ok",data:data})
        }
        else{
            res.send({status:"error",data:"No result found"})
        }
    } catch (error) {
        
    }
})

app.post("/add-patient", async (req,res)=>{
    const {fname, lname, email,age,gender,phone,stateCountry,symptoms,bloodGroup,AdmitDate,OnlyDate}=req.body;
    console.log(gender);
    try {
        if(!fname || !lname || !email || !age || !gender || !phone || !stateCountry || !symptoms || !bloodGroup){
            res.send({status:"error"})

        }else{
            await Patient.create({
                fname, lname, email,age,gender,phone,stateCountry,symptoms,bloodGroup,AdmitDate,OnlyDate
            });
            res.send({status:"ok"})
        }
        
    } catch (error) {
        res.send({status:"error",error1:error})
    }
})
app.post("/remove-patient" , async (req,res)=>{
    const {email} = req.body;
    try {
        if(email !== null){
            await Patient.remove(
                {email:email}
            )
            .then(()=>res.send({status:"ok"}))
            .catch((error)=>{
                res.send({status:"error"})
            })
        }
    } catch (error) {
        res.send({status:"error"})
    }
})
app.listen(5000)