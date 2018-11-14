var inquirer = require('inquirer');
var mysql = require('mysql');
var myTable = require('console.table')
//array of options for the first screen function
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

})
//prompts the user on options of what to do
firstScreen = () => {
    inquirer.prompt({
        name: 'choices',
        type: 'rawlist',
        choices: firstChoice,
        message: 'What Would you Like to Do?'

    }).then(function (data) {
        //switch for what the user picks
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
    //shows all the products with their stock inventory
    //loops array to table just like in bamazon.js
    connection.query(query, function (err, res) {
        var values = []
            for (i = 0; i < res.length; i++) {
                array = []
                //like bamazon.js but also shows stock quantity
                array.push(res[i].id, res[i].product_name, res[i].price, res[i].stock_quantity)
                values.push(array)
                
            }
            console.log('\n =============================================\n');
            console.table(['id', 'name', 'price','quantity'], values);
            console.log('\n=============================================\n')
            //anyMore prompts the user if they want to do anything else
            anyMore()
        }

    )

}
//shows the user what products in stock are less than 5
lowInvent = () => {
    query = 'SELECT * FROM products WHERE stock_quantity < 5'
    connection.query(query, function (err, res) {
        for (i = 0; i < res.length; i++) {
            console.log('Product ID: ' + res[i].id);
            console.log("Product Name: " + res[i].product_name);
            console.log("Quantity: " + res[i].stock_quantity);
            console.log('\n =============================================\n')
        }
        //anything else?
        anyMore();
    })
}
//asks the user what product they want to add inventory on
addInvent = () => {
    query = 'SELECT * FROM products'
    connection.query(query, function (err, res) {
        values = []
        //shows the user the id and stock quantity for reference
        for (i = 0; i < res.length; i++) {  
                array = []
                array.push(res[i].id, res[i].product_name, res[i].price, res[i].stock_quantity)
                values.push(array)
        }
        console.log('\n=============================================\n')
        console.table(['id', 'name', 'price','quantity'], values);
        console.log('\n=============================================\n')
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
                    .then(function (data) {
                        connection.query("SELECT * FROM products where id=" + ID, function (err, res) {
                            //makes a variable for the qunatity of the product in the database
                            var quant = parseInt(res[0].stock_quantity)
                            //variable for the ammount the user wants to restock
                            var newData = parseInt(data.restock1)
                            //updates the inventory in the database
                            var newQuant = (quant + newData)
                            query = "UPDATE products SET stock_quantity=" + newQuant + " WHERE id=" + ID
                            connection.query(query, function (err, res) {
                                console.log("The inventory has been updated");
                                anyMore();
                            })
                        })
                    })

            })
    })
}

//prompts the user to input item name department price and ammount to order
addNew = () => {
    inquirer.prompt([{
                name: 'item',
                type: 'input',
                message: 'What is the name of the item you want to add Manager?'
            },
            {
                name: 'department',
                type: 'input',
                message: 'Manager, what department is the product?'
            },
            {
                name: 'price',
                type: 'input',
                message: 'Manager, how much do you want to charge for the product?'
            },
            {
                name: 'quantity',
                type: 'input',
                message: 'Manager, how many do you want to order?'
            }
        ])
        .then(function (data) {
            //creates new object in the database
            connection.query("INSERT INTO products SET ?", {
                product_name: data.item,
                department_name: data.department,
                price: data.price,
                stock_quantity: data.quantity
            }, function (err, res) {
                if (err) throw err
                console.log('Your Item Has been added to the database ')
                anyMore()
            })

        })

}
//the function thats the user if the want to do anything else
//if not it turns off the console
anyMore = () => {
    inquirer.prompt({
            name: 'more',
            type: 'confirm',
            message: "Do you wish to do anything else Manager?"
        })
        .then(function (data) {
            if (data.more) {
                firstScreen()
            } else {
                console.log("-_-_-_-_- Goodbye Manager -_-_-_-_-");
                process.exit()
            }
        })
}