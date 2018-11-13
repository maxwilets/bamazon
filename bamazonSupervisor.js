var inquirer = require('inquirer');
var mysql = require('mysql');
var myTable = require('console.table')
var menuChoice = ["View Sales By Department", "Add a New Department"]

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
    console.log("\n~~~~~`~` Welcome Supervisor to Bamazon Supervisor Mode `~`~~~~~\n")

    menuScreen()
})
menuScreen = () => {
    inquirer.prompt({
        name: 'choice',
        type: 'rawlist',
        message:'What would you like to do Supervisor?',
        choices: menuChoice
    })
    .then(function(data){
        switch(data.choice){
            case menuChoice[0]:
            viewSales();
            break;

            case menuChoice[1]:
            addDept();
            break;
        }
    })
}

viewSales= () => {
    query = "SELECT departments.department_id AS 'ID', departments.department_name AS 'Department', ";
    query += "departments.overhead AS 'Overhead', SUM(products.product_sales) AS 'Sales', SUM(products.product_sales)-(departments.overhead) ";
    query += "AS 'Profit' FROM departments LEFT JOIN products ON departments.department_name = products.department_name "
    query += "GROUP BY departments.department_name"
    connection.query(query, function(err,res){
        var values = []
        for (i = 0; i < res.length; i ++){
            array = [];
            array.push(res[i].ID, res[i].Department, res[i].Overhead, res[i].Sales, res[i].Profit)
            values.push(array)
        }
        console.table(['ID', 'Department', 'Overhead', 'Sales', 'Profit'], values)

    })

}
