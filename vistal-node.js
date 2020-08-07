const express = require('express')
const app = express()
const port = 3436
const bodyParser = require('body-parser')

//
// Requirement for set up the exercise
//
app.use(bodyParser.json()); // parse requests of content-type - application/json

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

//
// Let's start the exercise :
// 
// You have a restaurant and you want to manage the menu :
// You need to know which recipes you can sold and which ingredients you need to use,
// you also need to know what is the purchase price of a dish and what is the price you are selling it.
// ------------------------------

let recipes = [
    { id: 0, name: 'Spaghetti Bolognese', ingredients: ["onion", "spaghetti", "beef", "tomato sauce"], purchasePrice: 30, sellingPrice: 50 },
    { id: 1, name: 'Chicken Burger', ingredients: ["onion", "tomato", "chicken", "bread", "creamy sauce", "cheese"], purchasePrice: 50, sellingPrice: 100 },
    { id: 2, name: 'Chicken curry with rice', ingredients: ["rice", "chicken", "salt", "curry pasta"], purchasePrice: 45, sellingPrince: 70 },
    { id: 3, name: 'Pizza with peppers', ingredients: ["pasta", "onion", "peppers", "ham", "tomato sauce", "cheese"], purchasePrice: 80, sellingPrice: 110 }
]

// Question 1 : As a manager you want to fetch all the recipes. 
// Create a HTTP Request :
app.get('/recipes/all', (req, res) => {
    res.json(recipes);
});


// Question 2 : As a manager you want to get only one recipe depends on his id.
// Create a HTTP Request :
app.get('/recipes/search/:id', (req, res) => {
    const itemId = req.params.id;
    let recipe = recipes.find(element => element.id == itemId);
    if (recipe != null) {
        res.json(recipe);
    } else {
        res.send('ITEM NOT FOUND')
    }

});


// Question 3 : As a manager you want to modify the selling price of only one recipe.
// Create a HTTP Request :
app.put('/recipes/edit/:id', (req, res) => {
    const itemId = req.params.id;
    let recipe = recipes.find(element => element.id == itemId);
    if (recipe != null) {
        const newPrice = req.body;
        recipe.sellingPrice = newPrice.sellingPrice;
        res.json(recipe);
    } else {
        res.send('ITEM NOT FOUND')
    }

});


// Question 4 : As a manager you want to delete one recipe from the recipes list
// Create a HTTP Request :
app.delete('/recipes/delete/:id', (req, res) => {
    const itemId = req.params.id;
    let recipe = recipes.find(element => element.id == itemId);
    if (recipe != null) {
        let index = recipes.indexOf(recipe);
        recipes.splice(index, 1);
        res.json(recipes);
    } else {
        res.send('ITEM NOT FOUND')
    }

});



// Question 5 : As a manager you want to add a new recipe in the recipes list.
// Create a HTTP Request :
app.post('/recipes/add', (req, res) => {
    let nextID = recipes[recipes.length - 1].id + 1;
    let newRecipe = req.body
    newRecipe.id = nextID;
    recipes.push(newRecipe)
    res.json(recipes)
});





// Question 6 : As a manager you want to get all the recipes which contains a special ingredients. 
// For example you want to know which recipe contains cheese.
// Create a HTTP Request :
app.get('/recipes/search_ingred/:ingred', (req, res) => {
    let foundRecipe = recipes.filter(element =>
        element.ingredients.find(ingred =>
            ingred.includes(req.params.ingred)
        )
    )
    if (foundRecipe.length != 0) {
        res.json(foundRecipe);
    } else {
        res.send('ITEM NOT FOUND')
    }
});

// This is another way
// let found = []
// for (let item of recipes) {
//     for (let rec of item.ingredients) {
//         if (rec == req.params.ingred) {
//             found.push(item)
//         }
//     }
// }
// if (found.length != 0) {
//     res.json(found)
// } else {
//     res.send('ITEM NOT FOUND')
// }



// Question 7 : As a manager you want to get all the recipes' name. 
// For example he want to know which recipe contains cheese.
// Create a HTTP Request :
app.get('/recipes/search_recipe/:ingredients', (req, res) => {
    let recipeName = recipes.filter(element =>
            element.ingredients.includes(req.params.ingredients))
        .map(recipe => recipe.name);

    if (recipeName.length > 0) {
        res.json(recipeName);
    } else {
        res.send('ITEM NOT FOUND')
    }
})

// let foundRecipe = recipes.filter(element => element.name.includes('Chick'))


//
// End of the exercice
// ------------------------------
app.listen(port, () => console.log(`Example app listening on port ${port}!`))