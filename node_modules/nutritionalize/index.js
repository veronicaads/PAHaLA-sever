var fs = require('fs');
var papa = require('papaparse');
var path = require('path');

var foods = [];

fs.readFile(path.join(__dirname, "NutrInfo.csv"), "utf8", (err, data) =>{
    if(err) throw err;
    foods = (papa.parse(data, {header : true}).data); 
});

var sleep =  function(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
};


exports.getAllFoods = async function(){
    await sleep(500);
    if(typeof foods != undefined){
        return foods;
    }else{
        setTimeout(getAllFoods(), 250);
    } 
};

exports.getAllFoodsFromRestaurant = async function(restaurant){
    if(typeof restaurant != "string"){
        throw new Error("Please enter a string");
    }
    var tmp = [];
    await sleep(500);
    if(foods.length != 0){
        tmp = foods.filter(function(foodItem, index, arr){
            if (foodItem["Restaurant"] == restaurant){
                return true;
            }
        });
        return tmp;
    } else {
        setTimeout(getAllFoodsFromRestaurant(restaurant), 5000);
    }
};

exports.getAllFoodsInRange = async function(n, up, lo){
    var nutrient;

    if(typeof n != "string") {
        throw new Error("Please enter a valid string");
    }
    if((typeof up != "number" && typeof up != "undefined") || typeof lo != "number" && typeof lo != "undefined") {
       throw new Error("Please enter a number");
    }

    var upper = up || 3000;
    var lower = lo || 0;

    switch(n){
        case ("p"):
            nutrient = "Protein (g)";
            break;
        case ("f"):
            nutrient = "Total Fat (g)";
            break;
        case ("c"):
            nutrient = "Carbs (g)";
            break;
        case ("cal"):
            nutrient = "Calories";
            break;
        case ("s"):
            nutrient = "Sugars (g)";
            break;
        default: 
            nutrient = "Calories";
            break;
    }

    await sleep(500);

    var tmp = [];
    if(foods.length != 0){
        tmp = foods.filter(function(foodItem, index, arr){
            if (foodItem[nutrient] <= upper && foodItem[nutrient] >= lower){
                return true;
            }
        });
        console.log(tmp);
        return tmp;
    } else {
        setTimeout(getAllFoodsInRange(n, up, lo), 5000);
    }
};