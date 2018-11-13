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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

})
connection.query('SELECT * FROM products', function (err, res) {
    console.log('Welcome to Max Mart, here are some of our wares: \n')
    for (i = 0; i < res.length; i++) {
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
        .then(function (data) {
            query = 'SELECT * FROM products where id=' + data.productId
            connection.query(query, function (err, res) {
                inquirer.prompt({
                    name: 'skies',
                    type: 'input',
                    message: 'How many ' + res[0].product_name + ' would you like to purchase?'
                }).then(function (data) {
                    var newQuant = res[0].stock_quantity - data.skies;
                    var totalCost = res[0].price * data.skies;
                    var totalCost1 = res[0].product_sales + totalCost
                    if (data.skies > res[0].stock_quantity) {
                        console.log("That's too much, I don't have enough of that product")
                    } else {
                        connection.query("UPDATE products SET ? WHERE ?", [{
                                stock_quantity: newQuant,
                                product_sales: totalCost1
                            },
                            {
                                id: res[0].id
                            }
                        ])

                        console.log('Your order of ' + data.skies + " " + res[0].product_name + ' has been processed it will cost ' + '$' + totalCost + '\n');
                        console.log("Thank you for shopping at Max Mart!")
                        process.exit()
                    }
                })
            })

        });
}

initialize()