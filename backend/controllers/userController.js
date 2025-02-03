//api to register user
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
export {registerUser}