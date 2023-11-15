const APIKey = process.env.MealKey;

function getRandomRecipe() {
    let queryURL = `www.themealdb.com/api/json/v2/${APIKey}/randomselection.php`
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    let data = response;

});

}

module.exports = {
    APIKey,
    getRandomRecipe,
};