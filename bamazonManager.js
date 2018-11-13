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


})

firstScreen = () => {
    inquirer.prompt({
        name: 'choices',
        type: 'rawlist',
        choices: firstChoice,
        message: 'What Would you Like to Do?'

    }).then(function (data) {
        switch (data.choices) {
            case firstChoice[0]:
                viewProd()
                break;

            case firstChoice[1]:
                lowInvent();
                break;

            case firstChoice[2]:
                addInvent()
                break;

            case firstChoice[3]:
                addNew()
                break;
        }
    })
}
firstScreen()

viewProd = () => {
    query = "SELECT * FROM products"
    connection.query(query, function (err, res) {
            for (i = 0; i < res.length; i++) {
                console.log("Product ID: " + res[i].id);
                console.log("Product Name: " + res[i].product_name);
                console.log("Price: " + res[i].price);
                console.log("Quantity: " + res[i].stock_quantity)
                console.log('\n =============================================\n')
            }
        }

    )
    process.exit()
}

lowInvent = () => {
    query = 'SELECT * FROM products WHERE stock_quantity < 5'
    connection.query(query, function (err, res) {
        for (i = 0; i < res.length; i++) {
            console.log('Product ID: ' + res[i].id);
            console.log("Product Name: " + res[i].product_name);
            console.log("Quantity: " + res[i].stock_quantity);
            console.log('\n =============================================\n')
        }
        process.exit();
    })
}

addInvent = () => {
        query = 'SELECT * FROM products'
        connection.query(query, function (err, res) {
            for (i = 0; i < res.length; i++) {
                console.log('Product ID: ' + res[i].id);
                console.log("Product Name: " + res[i].product_name);
                console.log("Quantity: " + res[i].stock_quantity);
                console.log('\n=============================================\n')
            }


        })
        inquirer.prompt({
                name: 'restock',
                type: 'input',
                message: 'Enter the ID of the product you want to restock'
            })
            .then(function (data) {
                    var ID = data.restock
                   
                   
                    inquirer.prompt({
                        name: 'restock1',
                        type: 'input',
                        message: "Enter quantity of units you want to restock"

                    })
                    .then(function(data){
                        connection.query("SELECT * FROM products where id="+ID, function(err, res){
                            var quant = parseInt(res[0].stock_quantity)
                            var newData = parseInt(data.restock1)
                            
                        var newQuant = (quant + newData)
                        console.log(newQuant)
                        query = "UPDATE products SET stock_quantity=" + newQuant + " WHERE id=" + ID
                        connection.query(query, function(err, res){
                            console.log("The inventory has been updated");
                            process.exit();
                        })
                    })
                    })

                })
            }

        addNew = () => {
             inquirer.prompt([
                 {
                   name: 'item',
                   type: 'input',
                   message: 'What is the name of the item you want to add?'
             },
                {
                 name: 'department',
                 type: 'input',
                 message: 'What department is the product?'
                },
                {
                name: 'price',
                type: 'input',
                message: 'How much do you want to charge for the product'
                },
                {
                 name: 'quantity',
                 type: 'input',
                 message: 'How many do you want to order'
                }])
                .then(function(data){
                    connection.query("INSERT INTO products SET ?",{
                        product_name: data.item,
                        department_name: data.department,
                        price: data.price,
                        stock_quantity: data.quantity
                    }, function(err, res){
                        if (err) throw err
                        console.log('Your Item Has been added to the database ')
                    })
                })
                process.exit()
        }