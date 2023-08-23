const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
// const usersData=[
//   {username:"saim",password:123},{username:"saima",password:1234}
// ]
public_users.use(express.json())
public_users.post("/register", (req,res) => {
  //Write your code here
  
  const {username,password} = req.body;
  if(!username || !password){
    res.status(500).send("Enter The Data");
  }

 
  else{
    
  for(user of users){
    if(user.username === username){
       res.status(400).send("User Already Exist");
      
    }
    else{
      users.push(req.body)
      res.status(400).send("Data added Succesfully")
      
    }
}

  }
});

// Get the book list available in the shop
public_users.get('/',async (req, res)=> {
  let allBooks = await books;
  res.status(300).json(allBooks);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async (req, res) =>{
  //Write your code here
   res.status(300).json(await books[req.params.isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',async (req, res) =>{
  
  for(var key of Object.values( books)){
    if (await key.author ==  req.params.author)
    return res.status(300).json( key);
    
  }
  

});

// Get all books based on title
public_users.get('/title/:title',async (req, res) =>{
  //Write your code here
  for(var key of Object.values(books)){
    if (await key.title == req.params.title)
    return res.status(300).json(key);
    
  }
});

//  Get book review
public_users.get('/review/:isbn',async (req, res)=> {
  //Write your code here
   for(var key of await Object.keys(books)){
    if ( key == req.params.isbn){
      return res.status(300).json(books[key].reviews)
    }
  }
});

module.exports.general = public_users;
