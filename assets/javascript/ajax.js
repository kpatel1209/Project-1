$(document).ready(function() {

    let ingredientList = [];

    // $("#add-ing-btn").on("change", function(){
    //     let ingred = $("#user-ing-input").val(this.value);
    //     // let ingredientList = [];
    //     // ingredientList.push(ingred);
    //     console.log(ingred);
    // });
 
    $("#submit-ing-btn").on("click", function(){
        
        let searchResult = ["beef", "onion"];

        console.log(searchResult);

        // Clear local storage for this search results
        localStorage.clear();

        let queryURL = "https://api.edamam.com/search?q=" + searchResult + "&app_id=6d5a3956&app_key=7fec86da650323ec5cbd0d0c2ed5e986";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            // console.log(queryURL);
            // console.log(response);

    
            let results = response.hits;
            console.log("RESULTS", results);

            for (let i = 0; i < results.length; i++) {
                let name = results[i].recipe.label;
                let img = results[i].recipe.image;
                let diet = results[i].recipe.dietLabels;
                let prep = results[i].recipe.totalTime;
                let servings = results[i].recipe.yield;
                let ingredients = results[i].recipe.ingredientLines;

                localStorage.setItem(`recipe-${i}`, JSON.stringify({
                    name: name,
                    img: img, 
                    diet: diet,
                    prep: prep, 
                    servings: servings,
                    ingredients: ingredients
                }));
    
                // Console log each of the API call results
                console.log("Recipe Name: ", name);
                console.log("Image Link: ", img);
                console.log("Diet Type: ", diet);
                console.log("Prep Time: ", prep);
                console.log("Servings: ", servings);
                
                // Store all the required results into local storage
                // localStorage.setItem("name", JSON.stringify(name));
                // localStorage.setItem("image", JSON.stringify(img));
                // localStorage.setItem("diet", JSON.stringify(diet));
                // localStorage.setItem("prep", JSON.stringify(prep));
                // localStorage.setItem("servings", JSON.stringify(servings));
                // localStorage.setItem("ingredients", JSON.stringify(ingredients));
    
                // Add the HTML for the recipe card to the DOM with the results from the API call
                let recipe = $(`
                    <div class="row">
                        <div class="col s12">
                            <div class="card" id="recipe-boxes">
                                <div class="card-content" id="recipe-content">
                                    <div class="recipe-title">
                                        <h6 class="lable center" id="recipe-name"> 
                                            <strong>${name}</strong>
                                            <button class="recipe-fav-button" id="recipe-${i}" ><i class="material-icons">favorite_border</i></button>
                                            </h6>
                                    </div>                                        
                                    <div class="recipe-text">
                                        <p class="prep">Prep Time: ${prep}</p>
                                        <p class="diet">Diet: ${diet}</p>
                                        <p class="yield">Servings: ${servings}</p>
                                    </div>
                                    <div>    
                                        <img src="${img}" id="recipe-image">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);

                //Add a click event for each card that we create that sends data to firebase every time we click the favorite button
                
                $("#recipe-loadins").append(recipe);
            }
            $(".recipe-fav-button").click(function() {
                //we want to get the ID from whatever button we clicked on 
                let recipeId = $(this).attr("id");
                let recipeInfo = localStorage.getItem(recipeId);
                let userId = sessionStorage.getItem("currentUser");
                console.log(recipeInfo);
                firebase.database().ref('users/' + userId + "/favorites").push(recipeInfo);

            })
         });
    });
});


