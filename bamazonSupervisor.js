var inquirer = require('inquirer');
var mysql = require('mysql');
var firstChoice = ['View Products for Sale', "View Low Inventory", "Add to Inventory", "Add New Product"]

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

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    console.log("\n~~~~~`~` Welcome Supervisor to Bamazon Supervisor Mode `~`~~~~~")


})