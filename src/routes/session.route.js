import { Router } from "express";
import UserManager from "../DAO/managers/usersManager.js";

const route= Router()
const manager = new UserManager()

//instancia del manager de usuarios


// register/create new user
route.get("/register", ( req, res)=>{
    res.render("register")
})

route.post("/register", async( req, res)=>{
    const user=req.body
    await manager.register(user)

    req.session.user=user//

    if(user)res.redirect("/products")
    
})

/// login 

route.get("/login", (req, res)=>{
    res.render("login")
})


route.post("/login", async (req, res) => {
    const credentials = req.body;

     manager.login(req, res, credentials);
});






route.get("/logout", (req, res)=>{
    req.session.destroy(err=>{
        if(!err)res.send("deslogueado")
        else res.send({status:`logout error`, body: err})
    })
})



export default route;
