## Introduction

Nutritionalize provides you with nutritionalal information on menu items available in popular fast food restaurants. You can make use of it to get raw data on certain food items and filter out items based on your criteria.

## Installation

```
$ npm install nutritionalize
```

## Usage

```
var nutri = require('nutritionalize');
```

#### getAllFoods()

```
Example usage:

//Get an array of objects containing nutrition facts

nutri.getAllFoods().then((data) => {
  console.log(data);
});
```

This function will return an array of food objects, for example:

```
...
{
  'Menu Item': 'Latte (Medium)',
  'Serving Size': '16 fl oz',
  Calories: '180',
  'Calories from Fat': '90',
  'Total Fat (g)': '10',
  'Saturated Fat (g)': '6',
  'Trans Fat (g)': '0',
  'Carbs (g)': '13',
  'Dietary Fiber (g)': '0',
  'Sugars (g)': '13',
  'Protein (g)': '10',
  Restaurant: 'McDonald's',
  Category: 'Coffee' }
},
...
```

#### getAllFoodsFromRestaurant(restaurant)

```
Example usage:

//Get an array of objects containing nutrition facts from McDonald's menu items only

nutri.getAllFoodsFromRestaurant("McDonald's").then((data) => {
  console.log(data);
});

```

This function will return an array of food objects where `"Restaurant" : McDonald's`

> As of now only supported restaurants are "Subway", "McDonald's" and "Taco Bell". In the package there is a CSV file called "NutrInfo.csv", this contains all the nutritional data needed for the package. You can add to it to increase the size of the database.

#### getAllFoodsInRange(nutrient, upper, lower*)

```
Example usage:

//Get an array of objects containing nutrition facts that have nutrients in a certain range


//Get foods that are between 500 and 1000 calories

nutri.getAllFoodsInRange("cals", 1000, 500).then((data) => {
  console.log(data);
});


//Get foods that are between 10 and 30 calories

nutri.getAllFoodsInRange("p", 30, 10).then((data) => {
  console.log(data);
});


//Get foods that have less than or equal to 20 grams of sugar

nutri.getAllFoodsInRange("s", 20).then((data) => {
  console.log(data);
});

```

The current mapping for arguments to nutrition is:
* `"p"` for Protein (in grams)
* `"c"` for Carbs (in grams)
* `"f"` for Total Fats (in grams)
* `"cal"` for Calories
* `"s"` for Sugar (in grams)

*The lower argument is optional, if it is no supplied 0 will be used as default
