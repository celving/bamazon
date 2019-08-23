var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Th1sissc@ry",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    showProducts();
    // promptUser();
})

function showProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Item: " + res[i].product_name + " || Price: $" + res[i].price)
        };
    });
};