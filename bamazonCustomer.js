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
        var productArray = [];
        for (var j = 0; j < res.length; j++) {
            productArray.push(res[j]);
        };
        for (var i = 0; i < productArray.length; i++) {
            console.log("ID: " + productArray[i].item_id + " || Item: " + productArray[i].product_name + " || Price: $" + productArray[i].price);
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
                num = parseInt(num)
                return (!isNaN(num) && num <= 10 && num >= 1)
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many of the selected item would you like to purchase?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                else {
                    return false;
                };
            }
        }
    ])
    .then(function(answer) {
        debugger
        var selectedId = parseInt(answer.id);
        var purchaseQuantity = parseInt(answer.quantity);
        console.log(selectedId);
        console.log(purchaseQuantity);

    }).catch(function(err){
        console.log(err.message)
        debugger
    })
}