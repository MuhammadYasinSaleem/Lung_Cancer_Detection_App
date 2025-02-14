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
