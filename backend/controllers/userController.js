//api to register user
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/usermodel.js'; // Add this import

const registerUser=async(req,res)=>{
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Invalid email"})
        }
      
        if (password.length < 8) {
          return res.status(400).json({ message: "enter a strong password password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData={
            name,
            email,
            password: hashedPassword,
        };
        const newUser = new userModel(userData);
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({success:true,token});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}
const loginUser=async(req,res)=>{
    try {
        const { email, password } = req.body;
        const user=await userModel.findOne({email});
        if (!user) {
           return  res.json({ success: false, message: "user not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, message: "invalid credentials" });
        }

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}

const getProfile = async (req,res)=>{
    try {
        const {userId} = req.body;
        const userData = await userModel.findById(userId).select('-password');
        res.json({success:true,userData})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

const updateProfile = async (req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



export {registerUser,loginUser,getProfile};