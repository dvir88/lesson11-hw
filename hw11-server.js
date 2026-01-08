const express = require("express")
const app = express()
const path = require("path")
const PORT = 4000

const logger = (req , res, next) =>{
    const now = new Date()
    const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    console.log(`Date: ${date} ${time}\nRequest: ${req.method}\nEndpoint: ${req.path}`)
    next()
}

app.use(logger)
app.use(express.static("client"))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// Get requests
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "client", "index.html"))
})

app.get("/sport",(req,res)=>{
    res.sendFile(path.join(__dirname, "client", "sport.html"))
})

app.get("/food",(req,res)=>{
    res.sendFile(path.join(__dirname, "client", "food.html"))
})

app.get("/signin",(req,res)=>{
    res.sendFile(path.join(__dirname, "client", "signin.html"))
})


//Post request

app.post("/signin",(req,res)=>{
    const {age , user} = req.body
    // let user = req.body.user
    // let age = req.body.age

    if(Number(age) < 18){
        return res.send("<script>alert('You are too young') </script>")
    }

    return res.send("<script>alert('Welcome') </script>")

})

app.post("/signin/fetch",(req,res)=>{
    const {age , user} = req.body
    if(Number(age) < 18){
        return res.send("Minor")
    }

    return res.send("Adult")

})


app.listen(PORT , () =>{
    console.log(`Server is live on http://localhost:${PORT}`)
})