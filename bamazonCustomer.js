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
            console.log("ID: " + res[i].item_id + " || Item: " + res[i].product_name + " || Price: $" + res[i].price + " || Current stock: " + res[i].stock_quantity);
        };
        
        promptUser();

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
                        return (!isNaN(value))
                    }
                }
            ])
            .then(function(answer) {
                var selectedId = answer.id;
                var itemPrice = parseInt(res[selectedId - 1].price);
                var stockQuantity = parseInt(res[selectedId - 1].stock_quantity);
                var purchaseQuantity = parseInt(answer.quantity);
                var remainingQuantity = stockQuantity - purchaseQuantity;
                if (stockQuantity >= purchaseQuantity) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                          {
                            stock_quantity: remainingQuantity
                          },
                          {
                            item_id: selectedId
                          }
                        ],
                        function(error) {
                          if (error) throw err;
                          console.log("\nPurchase complete! Your total cost comes to $" + itemPrice * purchaseQuantity + "\n----------------------\n");
                          showProducts();
                        }
                      );
                }
        
                else {
                    console.log("\nSorry, we only have " + stockQuantity + " of that item in stock.\n---------------------\n")
                    showProducts();
                };
        
            }).catch(function(err){
                console.log(err.message)
            })
        }
    });
};

