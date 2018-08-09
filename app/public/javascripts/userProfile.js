/**
* Cache DOM
*/
const $likedBtn = $('#likedButton');
const $dislikedBtn = $('#dislikedButton');
const $recipeItem = $('.recipe-item');
const $recipeItemLiked = $('.recipe-item-liked');
const $recipeItemDisliked = $('.recipe-item-disliked');

var likedVisible = false;
var dislikedVisible = false;
	/**
	* Event Handlers
	*/

$likedBtn.click(function(event){
	if(likedVisible == true){
		$recipeItem.hide();
		likedVisible = false;
	}
	else{
		showLiked();
		likedVisible = true;
	}
    event.preventDefault();
});

$dislikedBtn.click(function(event){
	if(dislikedVisible == true){
		$recipeItem.hide();
		dislikedVisible = false;
	}
	else{
		showDisliked();
		dislikedVisible = true;
	}
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



