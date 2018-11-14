
-- creates the database and the table products 
create database bamazon;
create table products(
--the characteristics of all the fields in the products table
id int not null auto_increment,
product_name varchar(50),
department_name varchar(50),
price int,
stock_quantity int,
primary key(id)

);
--populates the initial retail
insert into products(product_name, department_name, price, stock_quantity) values
('alexa dot 2', 'electronics', 45, 20 ),
('ring doorbell', 'electronics', 99, 5),
('DC legacy slim black', 'clothing', 92, 6),
('TOA track pants', 'clothing', 72, 12),
('Bronze 56k track jacket', 'clothing', 120, 4),
('Bobs burgers shade cover', 'automotive', 25, 20),
('Playstation 4 slim', 'electronics', 300, 4),
('jharo fixed gear bike red', 'sporting', 350, 3),
('DC legacy slim heritage', 'clothing', 92, 8),
('VX1000 video camera', 'electronics', 530, 2);
--adds the produc_sales field for part 3
ALTER TABLE products ADD COLUMN product_sales int;
--populates the department table with name and dummy value for overhead
INSERT INTO departments(department_name, overhead) values
('electronics', 50),
('clothing', 60),
('automotive', 20),
('sporting', 15),
('soda', 30);
--creates the departments table for part 3
CREATE TABLE departments(
  department_id int not null auto_increment,
  department_name varchar(50),
  overhead int,
  primary key(department_id));
select * from departments;
select * from products;