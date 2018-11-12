var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    
  })
      connection.query('SELECT * FROM products', function(err,res){
          console.log('Welcome to Max Mart, here are some of our wares: \n')
          for(i = 0; i < res.length; i++){
              console.log("product id: " + res[i].id)
              console.log('Name: ' + res[i].product_name + '\n')
          }
      })
      

initialize = () => {
   inquirer.prompt({
        name: 'productId',
        type: 'input',
        message: 'what is the id of the product you want to buy'
   })
   .then(function(data){
       inquirer.prompt({
           name: 'skies',
           type: 'input',
           message: 'How many ' + data.productId + 'would you like to buy?'
       })
   })
};

initialize()