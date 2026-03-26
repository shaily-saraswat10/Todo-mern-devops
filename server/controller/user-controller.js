import User from '../model/user-model.js'
import bcrypt from 'bcryptjs'
import { generateToke } from '../jwt/token.js'
import { z } from 'zod'

const userSchema = z.object({
    username: z.string().min(3,{message: "username must contain atleast 4 character"}),
    email: z.string().email({message: "invalid email address"}),
    password: z.string().min(4,{message: "password must contain atleast 4 character"})
})

export const register = async (req,res)=>{
   try {
      const {username, email, password} = req.body;
      if(!username || !email || !password) {
        return res.status(400).json({message: "all fields are required"})
      }

      const validation = userSchema.safeParse({username, email, password})
      if(!validation.success) {
        const errMsg = validation.error.issues.map(err => err.message)
        return res.status(400).json({message: errMsg});
      }

      const user = await User.findOne({email})
      if(user) {
        return res.status(400).json({errors: "user already registered"})
      }

      const hashedPass = await bcrypt.hash(password,10)
      const newUser = new User({username,email,password: hashedPass})
      await newUser.save()
      let token
      if(newUser) {
         token = await generateToke(newUser._id,res)
      }
      res.status(201).json({message: "succesfully registered",newUser ,token})

   } catch (error) {
      console.log(error)
      res.status(400).json({message: "failed to register"})
   }
}

export const login = async (req,res)=>{
   try {
      const {email,password} = req.body
      if(!email || !password) {
        return res.status(400).json({errors: "all fields are required"})
      }

      const user = await User.findOne({email}).select("+password")
      if(!user) {
        return res.status(400).json({message: "user not registered"})
      }

      const compPass = await bcrypt.compare(password,user.password)
      if(!compPass) {
        return res.status(400).json({errors: "password is incorrect"})
      }
      
      const token = await generateToke(user._id,res)
      res.status(200).json({message: "login succesfull" ,token }) 

   } catch (error) {
      console.log(error)
      res.status(400).json({message: "failed to login"})
   }
}

export const logout = async (req,res)=>{
   try {
      res.clearCookie("jwt",{
         path: "/",
         sameSite: "lax"
      })
      res.status(200).json({message: "logout succesfull"})
   } catch (error) {
      console.log(error)
      res.status(400).json({message: "failed to logout"})
   }
}