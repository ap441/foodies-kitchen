const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

async function fetcRecipe(){
    const data = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=5b39da84bacf4046ba1867a8302ad57e&addRecipeInformation=true&includeIngredients=true&instructionsRequired=true&number=4`);
    const response = await data.json();
    console.log(response);

    response.recipes.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        
        recipeDiv.innerHTML = `
            <img src="${meal.image}">
            <h3>${meal.title}</h3>
            <p>${meal.dishTypes[0]}</p>
        `

        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        button.addEventListener('click', () => {
            openRecipePopup(meal);
        });

        recipeContainer.appendChild(recipeDiv);
    });
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2><a href="${meal.sourceUrl}" target="_blank">${meal.title}</a></h2>
        <a href="${meal.sourceUrl}" target="_blank"><img src="${meal.image}"></a>
        <h3>Summary</h3>
        <p>${meal.summary}</p>
        <h4><b><i><u><a href="${meal.sourceUrl}" target="_blank">RECIPE</a></u></b></i></h4>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});


fetcRecipe();
