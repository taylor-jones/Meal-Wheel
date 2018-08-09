/**
* Cache DOM
*/
const $likedBtn = $('#likedButton');
const $dislikedBtn = $('#dislikedButton');
const $recipeItem = $('.recipe-item');
const $recipeItemLiked = $('.recipe-item-liked');
const $recipeItemDisliked = $('.recipe-item-disliked');

// hide all the recipes by default.
$recipeItem.hide();

	/**
	* Event Handlers
	*/

$likedBtn.click(function(event){
    showLiked();
    event.preventDefault();
});

$dislikedBtn.click(function(event){
    showDisliked();
    event.stopImmediatePropagation();
    event.preventDefault();
});

// Displays the favorited recipes
function showLiked() {
    // hide all the recipes
    $recipeItem.hide();
    $recipeItemLiked.show();
}

// Displays the disliked recipes
function showDisliked() {
    // hide all the recipes
    $recipeItem.hide();
    $recipeItemDisliked.show();
}



