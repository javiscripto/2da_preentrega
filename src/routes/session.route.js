import { Router } from "express";

const route= Router()

route.get("/login", ( req, res)=>{
    res.render("login")
})

route.post("/login", ( req, res)=>{
    const user=req.body
    console.log(user)
    req.session.user=user

    if(user)res.redirect("/products")
    
})



route.get("/logout", (req, res)=>{
    req.session.destroy(err=>{
        if(!err)res.send("deslogueado")
        else res.send({status:`logout error`, body: err})
    })
})



export default route;
