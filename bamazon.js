//cdns for inquirer, mysql, mytable 
var inquirer = require('inquirer');
var mysql = require('mysql');
var myTable = require('console.table')

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
connection.query('SELECT * FROM products', function (err, res) {
    //empty array for the attributes of each product
    values = []
    console.log('Welcome to Max Mart, here are some of our wares: \n')
     //loops through all the products on the database
    for (i = 0; i < res.length; i++) {
        //for each i it pushes the product into into an array and
        //then pushes that array into the empty values array
        array = []
        array.push(res[i].id, res[i].product_name, res[i].price)
        values.push(array)
    }
    console.log('\n=============================================');
    //this is using the console.table cdn the values are set in the bracket and the values array goes in
    console.table(['ID', 'Name', 'Price'], values);
    console.log('=============================================\n');
    //starts the app
    initialize()
})


initialize = () => {
    //asks the user what they want to buy
    inquirer.prompt({
            name: 'productId',
            type: 'input',
            message: 'what is the id of the product you want to buy'
        })
        //callback to ask them how many they want to buy
        .then(function (data) {
            query = 'SELECT * FROM products where id=' + data.productId
            connection.query(query, function (err, res) {
                inquirer.prompt({
                    name: 'skies',
                    type: 'input',
                    message: 'How many ' + res[0].product_name + ' would you like to purchase?'
                }).then(function (data) {
                    //variable to show the new quantity in the database
                    var newQuant = res[0].stock_quantity - data.skies;
                    //varaible to show how much the units * price costs
                    var totalCost = res[0].price * data.skies;
                    //variable to show the total sales of that product in the database
                    var totalCost1 = res[0].product_sales + totalCost
                    if (data.skies > res[0].stock_quantity) {
                        console.log("That's too much, I don't have enough of that product")
                    } else {
                        //changes the quantity and item sales in the database
                        connection.query("UPDATE products SET ? WHERE ?", [{
                                stock_quantity: newQuant,
                                product_sales: totalCost1
                            },
                            {
                                id: res[0].id
                            }
                        ])

                        console.log('Your order of ' + data.skies + " " + res[0].product_name + ' has been processed it will cost ' + '$' + totalCost + '\n');
                        anyMore()
                    }
                })
            })

        });
}
//after it prompts the user if they want to still shop
anyMore = () => {
    inquirer.prompt({
        name: 'more',
        type: 'confirm',
        message: 'Do you want to buy anthing else?'
    })
    .then(function(data){
        if (data.more){
            initialize()
        }
        else{
            console.log('\nGoodbye Customer\n\n Thank you for shopping at Max Mart\n')
            process.exit()
        }
    })
}