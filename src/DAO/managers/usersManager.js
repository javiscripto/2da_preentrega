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

    login=async( credentials)=>{
        try {
            const { email, password } = credentials;
            const user = await userModel.findOne({ email, password }).lean();

            if (user) {
                return [true, user]
            } else {
                return [false, null]
            }
        } catch (error) {
            console.error("error en db:", error);
            throw error;
        }
    }



}