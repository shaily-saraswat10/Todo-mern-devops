import jwt from 'jsonwebtoken'
import User from '../model/user-model.js'

export const generateToke = async (userId,res) =>{
   const token = jwt.sign({userId},process.env.JWT_SECRET,{
      expiresIn: "10d"
   })
   res.cookie("jwt",token,{
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "lax"
   })
   await User.findByIdAndUpdate(userId,{token})
   return token;
}