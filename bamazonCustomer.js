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
    console.log("Connected");
    showProducts();
})

function showProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Item: " + res[i].product_name + " || Price: $" + res[i].price);
        };
        
        promptUser();
    });
};

function promptUser() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Please enter the ID of the item you'd like to purchase.",
            validate: function(num) {
                if (NaN(num) === false && parseInt(num) <= 10 && parseInt(num) >= 1) {
                    return true;
                }
                else {
                    return false;
                };
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many of the selected item would you like to purchase?",
            validate: function(value) {
                if (NaN(value) === false) {
                    return true;
                }
                else {
                    return false;
                };
            }
        }
    ])
    .then(function(answer) {
        var selectedId = parseInt(answer.id);
        var purchaseQuantity = parseInt(answer.quantity);
        console.log(selectedId);
        console.log(purchaseQuantity);

    })
}