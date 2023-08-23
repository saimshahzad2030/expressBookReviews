const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
let users = [
  {username:"saim",password:123},{username:"saima",password:1234},{  username:"sai",password:13}
];

const isValid = (username)=>{ //returns boolean
  //write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
  //write code to check if username and password match the one we have in records.
  
  for(let user of users){
    if(user.username !== username || user.password !== password){
      console.log("Username or pass doesn't match")
      
    }
    else{
      console.log("Hello " + username)
      
      
      
    }
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const {username,password} = req.body;
  
  if(!username || !password){
    res.json({"msg":"Enter res.body"})
  }
  let flag ;
  for(let user of users){
    if(user.username !== username || user.password !== password){
      
      flag = false
      console.log("Pass and username matched: " + flag);
    }
    
    else{
      
      flag = true;
      req.session.username = username;
      break;
      // console.log("Pass and username matched: " + flag);
      
    }
  }
  console.log(flag);
  if(flag === false){
    console.log("Doesn't match")
    
    res.status(401).send("Username or pass doesnt match")
  }
  else{
    res.status(200).send("Hello " + username)
    console.log("hey " + req.session.username);
    console.log("Hello " + username)
    
    
  }
  
  // return res.status(300).json({message: "Yet to be implemented"});
});













let reviews = [{user:"shahjee",isbn:3,review:"Not a good book"},{user:"nabeel",isbn:5,review:"Best fiction book"}];



regd_users.put("/auth/review/:isbn", (req, res) => {

const {isbn,review} = req.body;
if(!isbn || !review){
   res.status(300).json({message: "Enter book no. and your review in body"});

}
else{
  const reviewFind = reviews.find((review)=>review.isbn === isbn);
if(reviewFind){
  reviews[reviews.indexOf(reviewFind)] = {user: req.session.username,isbn:isbn,review:review}
  res.status(200).json({Reviews:reviews})
}
else{
  reviews.push({user: req.session.username,isbn:isbn,review:review})
  res.status(200).json({Reviews:reviews})
  

}

}
console.log(reviews);
});







//deleting reviews
regd_users.delete("/auth/review/:isbn", (req, res) => {

  const {isbn} = req.body;
  if(!isbn){
     res.status(300).json({message: "Enter book no. that you want to delete"});
  
  }
  else{
    const reviewFind = reviews.find((review)=>review.isbn === isbn);
    let userCheck
    if(reviewFind){
      userCheck = req.session.username === reviewFind.user;
      if(userCheck){
       res.status(200).send("succesfuly deleted");
       
      }
      else{
       ;
        
      }
      
    }
    else{
      
      res.status(400).send("Invalid ISBN");

    }
    

 
}

});





regd_users.use(express.json());


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
