import Admin from "../models/admin.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from 'bcrypt';

export const login = async (req,res)=>{
  try {
    const {email,password}  = req.body;
    const admin = await Admin.findOne({email});
    
    if(!admin){
      return res.status(400).json({error:"Inavlid username or password"});
   }

   const checkPassword = await bcrypt.compare(password,admin.password);
   
   if(!checkPassword){
    return res.status(400).json({error:"Inavlid username or password"});
   }

    generateTokenAndSetCookie(admin._id,res);

    res.status(200).json({
      _id:admin._id,
      username:admin.email,
      profilePic:admin.profilePic
    })
  } catch (error) {
    console.log("Error in login controller",error.message);
    res.status(500).json({error:"internal server error"});
  }
}


