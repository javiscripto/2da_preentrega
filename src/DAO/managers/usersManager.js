import userModel from "../models/users.model.js";

export default class UserManager{
    constructor(){};

    register= async(userData)=>{
        try {
            const user= new userModel(userData);
            const savedUser= await user.save();
            console.log(savedUser)
        } catch (error) {
            console.error("error en DB: ", error)
        }
    }

    login=async(req, res, credentials)=>{
        try {
            const { email, password } = credentials;
            const user = await userModel.findOne({ email, password });

            if (user) {
                console.log(user)
            } else {
                // Usuario no encontrado
               console.log("not found")
            }
        } catch (error) {
            console.error("error en db:", error)
        }
    }



}