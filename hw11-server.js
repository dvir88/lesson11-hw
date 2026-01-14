const express = require("express")
const app = express()
const path = require("path")
const PORT = 4000
const fs = require("fs")

const logger = (req , res, next) =>{
    const now = new Date()
    const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    console.log(`Date: ${date} ${time}\nRequest: ${req.method}\nEndpoint: ${req.path}`)
    next()
}

app.use(logger)
app.use(express.static("hw11-client"))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// Get requests

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "hw11-client", "hw11-signin.html"))
})

app.get("/singup",(req,res)=>{
    res.sendFile(path.join(__dirname, "hw11-client", "hw11-signin.html"))
})

app.get("/signin",(req,res)=>{
    res.sendFile(path.join(__dirname, "hw11-client", "hw11-index.html"))
})

app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname, "hw11-client", "hw11-home.html"))
})

//Post request

app.post("/hw11-signin/fetch",(req,res)=>{
    const {user} = req.body
    if(!user || user.length < 2){
        return res.send("Name must be more then 2 characters")
    }
    return res.send(`Welcome ${user}`)
})

app.post("/hw11-index/fetch",(req,res)=>{
    const {username, email, password, confirmPassword} = req.body
    if(!username || !(username.length > 4 && username.length < 8)){
        return res.send("Name must be more then 4 and less then 8 characters")
    }
    if(!email || !email.includes("@")){
        return res.send("Please enter a valide email")
    }
    if(!password || !(password.includes("$") && password.length >= 5 && password.length <= 10)){
        return res.send("Please enter a valide password")
    }
    if(!confirmPassword || confirmPassword != password){
        return res.send("Please confirm your password again")
    }

        const dataToSave = `Name: ${username}\nEmail: ${email}\nPassword: ${password}\nConfirm Password: ${confirmPassword}\n------\n`
        fs.appendFile("singup.json", JSON.stringify(req.body) + "\n", (err) =>{
            if(err){
                return res.send("Error saving data")
            }
            return res.send("Signup successful")
        })
})


app.listen(PORT , () =>{
    console.log(`Server is live on http://localhost:${PORT}`)
})