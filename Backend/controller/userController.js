import { catchAsyncErrors } from "../Middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";


export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    password,
    gender,
    role,
    docAvatar,
    doctorDepartment,
  } = req.body;
  if(
    !firstName||
    !lastName||
    !email||
    !phone||
    !nic||
    !dob||
    !password||
    !gender||
    !role
  ){
    return next(new ErrorHandler("Please Fill Full Form",400))
  }
  let user=await User.findOne({email})
  if(user){
    return next(new ErrorHandler("User Already Registered",400))
  }
  user= await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    password,
    gender,
    role,
    docAvatar,
    doctorDepartment,
  });
  res.status(200).json({
    success:true,
    message:"User Registered!"
  })
});

export const login=catchAsyncErrors(async(req,res,next)=>
{
  const {email,password,confirmPassword,role}=req.body;
  if(!email||!password||!confirmPassword||!role){
    return next(new ErrorHandler("Please provide all details",400))
  }
  if(password!==confirmPassword)
  {
    return next(new ErrorHandler("Password and confirm Passowrd do not match",400))
  }
  const user=await User.findOne({email}).select("+passowrd");
  if(!user)
  {
    return next(new ErrorHandler("Invalid email or Password",400))
  }
  const isPasswordMatched=await user.comparePassword(password);
  if(!isPasswordMatched)
    {
      return next(new ErrorHandler("Invalid email or Password",400))
    }
    if(role!==user.role)
    {
      return next(new ErrorHandler("User with this role not found",400))

    }
    res.status(200).json({
      success:true,
      message:"Logged in successfully"
    })
})
