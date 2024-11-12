fetch('recipes.json')
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                const querySearch = window.location.search; 
                const urlParams = new URLSearchParams (querySearch);
                const recipeNumber = urlParams.get('recipe');
                const recipe = data[recipeNumber - 1];
                
                recipeName.innerHTML = recipe.name;
                description.innerHTML = recipe.description;
                cuisine.innerHTML = "Cuisine: " + recipe.cuisine;
                prepTime.innerHTML = "Prep time: " + recipe.prepTime;
                cookTime.innerHTML = "Cook time: " +  recipe.cookTime;
                servings.innerHTML = "Servings: " +  recipe.servings;
                difficulty.innerHTML = "Difficulty: " +  recipe.difficulty;
                image.src = recipe.image;
                
                if(recipe.prepTime > 60){
                    num = recipe.prepTime;
                    var hours = Math.floor(num / 60);
                    var minutes = num % 60;  
                    prepTime.innerHTML = "Prep time: " + hours + "hour + " + minutes + "minutes";
                }

                if(recipe.cookTime > 60){
                    num = recipe.cookTime;
                    var hours = Math.floor(num / 60);
                    var minutes = num % 60;  
                    cookTime.innerHTML = "Prep time: " + hours + " hour and " + minutes + " minutes";
                }

                for(i = 0; i < recipe.ingredients.length; i++){
                    const ingredient = document.createElement("li");
                    ingredient.innerHTML = recipe.ingredients[i].item + " " + recipe.ingredients[i].amount + " " + recipe.ingredients[i].unit;
                    ingredients.appendChild(ingredient);
                };

                for(i = 0; i < recipe.instructions.length; i++){
                    const instruction = document.createElement("li");
                    instruction.innerHTML = recipe.instructions[i].step + " " + recipe.instructions[i].text;
                    instructions.appendChild(instruction);
                };

                for(i in recipe.nutritionalInfo){
                    const nutritional = document.createElement("li");
                    nutritional.innerHTML = i + " " + recipe.nutritionalInfo[i] ;
                    nutritionalInfo.appendChild(nutritional);
                };

                for(i = 0; i < recipe.tags.length; i++){
                const tag = document.createElement("li");
                tag.innerHTML = "#" + recipe.tags[i];
                tags.appendChild(tag);
                };

                double.addEventListener("click" , (event) => {
                    servings.innerHTML = "Servings: " +  recipe.servings*2;
                    ingredients.innerHTML = " ";
                    
                    for(i = 0; i < recipe.ingredients.length; i++){ 
                        const ingredient = document.createElement("li");
                        ingredient.innerHTML = recipe.ingredients[i].item + " " + recipe.ingredients[i].amount*2 + " " + recipe.ingredients[i].unit;
                        ingredients.appendChild(ingredient);
                    };
                    
                })

                convert.addEventListener("click", (event) => {
                    console.log(ingredients)
                    ingredients.innerHTML = " ";
                    for(i = 0; i < recipe.ingredients.length; i++){ 
                        const ingredient = document.createElement("li");
                        if(recipe.ingredients[i].unit === "grams"){
                            amount = recipe.ingredients[i].amount*0.0022046226;
                            amount = amount.toFixed(2);
                            unit = "pounds";
                        }else{
                            amount = recipe.ingredients[i].amount;
                            unit = recipe.ingredients[i].unit;
                        }
                        ingredient.innerHTML = recipe.ingredients[i].item + " " + amount + " " + unit;
                        ingredients.appendChild(ingredient);
                    };
                })
            })

