# bamazon

## 3 Part Project
 
 *Bamazon is a console store front where a user can buy product and a manager can restock and add new product 3 files were made to handle     store from a customer, manager, and supervisor position*
 
 ## Objectives
 
 ### Part 1 
  
* bamazon.js
     * Create a MySQL database to handle the store
     * Create a table to handle all the store's products giving the product an ID of:
          * Product ID
          * Name
          * Department
          * Price to Buyer
          * Ammount in Stock
          * Total Sale ammount (bonus)
     
     * Connect the bamazon.js file to the database to allow connection.query's 
     * Make a function to let the customer order a product based on its product id (integer)
     * Let the use choose an ammount they want to buy and tell them how much it's going to cost
     * Update the inventory in the database to the order
     
     ### Video of Working Bamazon Customer
     
     [Bamazon Demo](https://drive.google.com/file/d/1ausitUkvfZ7bGgQZwl8hzQtjtguZ0Sdg/view)
     
* bamazonManager.js (bonus)
     * The file lets the user play a managerial role in the app restocking items and even ordring new items
     * running the app gives the user 4 options:
          * See a list of all available products in stock
          * See a list of products that are low (<5)
          * Restock a product
          * Add a new product to the database
     
     * Updates the MySQL database accordingly
     
     ### Demo of Working Bamazon Manager
     
     [Bamazon Manager](https://drive.google.com/file/d/1ausitUkvfZ7bGgQZwl8hzQtjtguZ0Sdg/view)
     
* bamazonSupervisor.js (bonus)
     * This file lets the user play a supervisor role in the app, making sure the store is making money
     * To work a new database, departments was created the fields were
          * department_id
          * department_name
          * overhead (this was an number I created to represent the overhead in each department)
     * A SQL left join was used to share commonents of the products and departments tables looking for when a products department              matched a name in the departent 
     * By combining the product.product_sales and department.overhead a field was made showing the profit of each department
     * Running the app gives the supervisor 2 options:
          * Seeing the departments, this is where the join is used showing profits
          * Add a new department with its own overhead
          
     ### Demo of Working Amazon Supervisor
     
     [Bamazon Supervisor Mode](https://drive.google.com/file/d/1krDtOQavL4S0YCox9_H9epl-EyupWmGu/view)
     
 ## How to Use
 
      * With the code open the console 
      * type node + either bamazon.js, bamazonManager.js, bamazonSupervisor.js
      * if it is asking for a quantity only put an intiger
      * if its asking for a product name a combination will work
      
 ## Technologies Used
 
     * JavaScript to write the program
     * Node.js to run the program
     * Inquirer NPM to make the prompts
     * console.table to display the data as a table in the console
     * MySQL as the stores working database
     
     
