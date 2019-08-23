CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT PRIMARY KEY AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DEC(10,2) NOT NULL,
stock_quantity INT NOT NULL);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Electric toothbrush", "Health & Beauty", 40, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tennis shoes", "Clothing", 30, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Potato chips", "Grocery", 5, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Athletic shorts", "Clothing", 20, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iced tea", "Grocery", 8, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Skip-it", "Toys", 30, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dishwasher", "Appliances", 500, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hairbrush", "Health & Beauty", 10, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toothpaste", "Health & Beauty", 5, 300);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Micro USB charger", "Electronics", 30, 60);
