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

//first screen prompt asking what to do
menuScreen = () => {
    inquirer.prompt({
            name: 'choice',
            type: 'rawlist',
            message: 'What would you like to do Supervisor?',
            choices: menuChoice
        })
        .then(function (data) {
            switch (data.choice) {
                case menuChoice[0]:
                    viewSales();
                    break;

                case menuChoice[1]:
                    addDept();
                    break;
            }
        })
}

viewSales = () => {
    //to see the department table and product info we use a left join this is the query
    query = "SELECT departments.department_id, departments.department_name, departments.overhead,"
    query +=  "SUM(products.product_sales) AS 'Sales', SUM(products.product_sales)-(departments.overhead) ";
    query += "AS 'Profit' FROM departments LEFT JOIN products ON departments.department_name = products.department_name "
    query += "GROUP BY departments.department_name"
    connection.query(query, function (err, res) {
        var values = []
        //loop to make the table
        for (i = 0; i < res.length; i++) {
            array = [];
            array.push(res[i].department_id, res[i].department_name, res[i].overhead, res[i].Sales, res[i].Profit)
            values.push(array)
        }
        console.log('\n =============================================\n');
        console.table(['ID', 'Department', 'Overhead', 'Sales', 'Profit'], values)
        console.log('\n =============================================\n\n');
        
        anyMore()
    })

}
//if the user wants to add a new department
//asks the name and overhead of the department
addDept = () => {
      inquirer.prompt([
          {
            name: 'department',
            type: 'input',
            message: 'What is the new departments name Supervisor?'
          },
         {
           name: 'overhead',
           type: 'input',
           message: 'What shall the overhead of the new department be Supervisor?'
         }])
         //callback to updata the database
         .then(function(data){
             
             connection.query("INSERT INTO departments SET ?",{
                 department_name: data.department,
                 overhead: data.overhead
             }, function(err,res){
                 console.log('\n-_-_-_-_- The department has been added Supervisor -_-_-_-_-\n\n')
                 anyMore()
             })
         })

}
//asks the user if there is anything else to do
//if not closes the console
anyMore = () => {
     inquirer.prompt({
         name: 'more',
         type: 'confirm',
         message: 'Is there anything else you want to do Supervisor?'
     })
     .then(function(data){
         if (data.more){
             menuScreen()
         }
         else {
             console.log("\n-_-_-_-_- Ok, farewell Supervisor -_-_-_-_-\n\n");
             process.exit()
         }
     })
}