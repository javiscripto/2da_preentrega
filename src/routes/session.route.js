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

    

    if(user)res.redirect("/login")
    
})

/// login 

route.get("/login", (req, res)=>{
    res.render("login")
})


route.post("/login", async (req, res) => {
    const credentials = req.body;

    try {
        const [existingUser, user] = await manager.login(credentials);
        
        if (existingUser) {
            req.session.user = user;
            res.redirect("/products");
        } else {
            res.send(`usuario no registrado <br> <a href="/register">registrarse</a>`);
        }
    } catch (error) {
        
        res.status(500).send("Error de base de datos");
    }
});






route.get("/logout", (req, res)=>{
    req.session.destroy(err=>{
        if(!err)res.send("deslogueado")
        else res.send({status:`logout error`, body: err})
    })
})



export default route;
