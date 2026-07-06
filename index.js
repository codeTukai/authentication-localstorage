import express from 'express'

const app = express()
app.use(express.json())

const users = [];

function generateToken (){
    let token = '';

    const options = ['A', 'B', 'C', 'D', 'E', 'F','G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q','R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','0', '1','2','3','4','5','6','7','8','9']

    for (let i = 0; i < 36; i++) {
        token += options[Math.floor(Math.random() * options.length)]
    }
     console.log(token);

    return token
}




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

    const token = generateToken()

    user.token = token

      res.json({
        success: true,
        message: "Login Successful",
        token: token
    });


    console.log(users);

})



app.listen(3000, ()=>

{
    console.log("port running on 3000");
    
})