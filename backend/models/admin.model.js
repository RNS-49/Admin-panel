import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({

  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  profilePic:{
    type:String,
    default:""
  }
})

const Admin = mongoose.model("Admin",adminSchema);

export default Admin;