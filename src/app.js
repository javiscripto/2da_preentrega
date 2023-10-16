import express,{json}from"express";
import mongoose from "mongoose";

//seteo trabajo con rutas
import {fileURLToPath} from "url";
import path from "path";

const __filename=fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)





const app= express();
const PORT = 8080;



//middlewares
app.use(json());
app.use(express.urlencoded({extended:true}));


//set public folder
app.use(express.static(path.join(__dirname,`public`)));

//import routes
import productRoute from "./routes/products.route.js"
import cartRoute from "./routes/cart.route.js"
import messagesRoute from "./routes/messages.route.js"

app.use("/",productRoute)
app.use("/", cartRoute)
app.use("/", messagesRoute)

//handlebars
import { engine } from "express-handlebars";
app.engine("handlebars", engine());
app.set("view engine","handlebars")
app.set("views",__dirname+`/views`);




// route add new product

    //get
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname,`public`,`index.html`))
})
    //post
app.post("/", (req, res)=>{
    let producto = req.body;
    console.log(producto)
})

///////////////////////////////////  set mongoose conection

mongoose.connect("mongodb+srv://javiermecker94:8GQVknO1JuiAQ920@ecomerce.9sqyqwu.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("conectado a la base de datos")
})
.catch(error=>{console.log("error al conectar ")})



app.listen(PORT,()=>{
    console.log(`server on port ${PORT}`)
})



