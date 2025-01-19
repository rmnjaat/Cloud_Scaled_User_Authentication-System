const UserModel = require("../Models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')



const signup = async(req , res)=>{
    
    try{
        const{name , email , password} = req.body;
        const user = await UserModel.findOne({email});

        if(user){
            return res.status(409).json({message:'User is already exist , you can login ' , success:false});

        }

        const userModel = new UserModel({name,email,password});
        userModel.password = await bcrypt.hash(password , 10);

        await userModel.save();

        res.status(201).json({message : "Signup Sucess" , success :true})

    }catch(err){
        res.status(500).json({message : " Interner succes error , Signup Failed" , success :false})
    }
}


const login = async(req , res)=>{
    
    try{
        const{ email , password} = req.body;
        const user = await UserModel.findOne({email});
        const errorMessage = " either email or pass wrong"

        if(!user){
            return res.status(403).json({message: errorMessage , success:false});

        }


        const isPassEq = await bcrypt.compare(password , user.password)

        if(!isPassEq){
            return res.status(403).json({message: errorMessage , success:false});
        }
       


        const jwtToken = jwt.sign({email:user.email , _id : user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )

        res.status(200).json({message : "login Sucess" , success :true , jwtToken  ,email , name : user.name})

    }catch(err){
        res.status(500).json({message : " Interner succes error , Signup Failed" , success :false})
    }
}

module.exports =  {
    signup,
    login
}