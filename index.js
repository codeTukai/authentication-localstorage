import express from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(cors())

const JSON_SECRET = "randomtukaighosh"
app.use(express.json())

const users = [];

// function generateToken (){
//     let token = '';

//     const options = ['A', 'B', 'C', 'D', 'E', 'F','G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q','R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','0', '1','2','3','4','5','6','7','8','9']

//     for (let i = 0; i < 36; i++) {
//         token += options[Math.floor(Math.random() * options.length)]
//     }
//      console.log(token);

//     return token
// }


app.get("/", function (req, res){
    res.sendFile(path.join(__dirname + "/public/index.html"))
})


app.post("/sign-up", function(req, res){
  const {username, password} = req.body

  users.push({
    username: username,
    password: password
  })
    res.json({
        success: true,
        message: "ok sign up"
    })
    console.log(users);
})



app.post("/sign-in", function(req, res){

    const {username, password} = req.body
    

    const user = users.find((user)=>
        user.username == username && user.password == password
    )

    
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid username or password"
        });
    }

    const token = jwt.sign({
        username: username
    },
    JSON_SECRET
)

    user.token = token

      res.json({
        success: true,
        message: "Login Successful",
        token: token
    });


    console.log(users);

})

// app.get("/me", function(req, res){
//     const token = req.headers.token;

//     console.log(token);
    

//     // let user = users.find(user=> user.token === token)

//     // console.log(user);
    

//     let userFound = null;

//     for (let i = 0; i < users.length; i++) {
//         if(users[i].token == token){
//             userFound = users[i]
//         }
        
//     }
//     console.log(userFound);
    

//     if (userFound) {
//         res.json({
//             username : userFound.username
//         })
//     } else {
//         res.status(404).json({
//             message: "unauthorize access"
            
//         })
//     }
// })

app.get("/me", function (req, res) {

    const token = req.headers.token;
    const decodeToken = jwt.verify(token, JSON_SECRET)

    const username = decodeToken.username




    // let userFound = null;

    // for (let i = 0; i < users.length; i++) {

    //     if (users[i].token === token) {
    //         userFound = users[i];
    //         break;
    //     }

    // }

    const user = users.find(user => user.username === username)

    // console.log(userFound);
    console.log(user);

    if (user) {
        return res.status(200).json({
            username: user.username
        });
    }

    return res.status(401).json({
        message: "Unauthorized access"
    });

});

app.listen(3000, ()=>

{
    console.log("port running on 3000");
    
})