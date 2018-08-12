$(function() {

  /**
   * Cache DOM
   */
  const $likedBtn = $('#likedButton');
  const $dislikedBtn = $('#dislikedButton');
  const $submittedBtn = $('#submittedButton');
  const $recipeItem = $('.recipe-item');
  const $recipeItemLiked = $('.recipe-item-liked');
  const $recipeItemDisliked = $('.recipe-item-disliked');
  const $recipeItemSubmitted = $('.recipe-item-submitted');
  const $btnLink = $('.btn-nav-link');

  const $userId = $('#user-id');
  const $userName = $('#user-name');
  const $userEmail = $('#user-email');
  const $userPassword = $('#user-password');
  const $alertContainer = $('#alert-container');

  const $profileDelete = $('#profile-delete');

  let visibleRecipes = '';


  /**
   * Event Handlers
   */

  $('#submit-username').click(function(e) {
    e.preventDefault();
    updateUserComponent({
      user_id: parseInt($userId.val()),
      user_name: $userName.val(),
    }, (response) => {
      if (response.changedRows > 0) {
        showAlert('success', 'User Name successfully changed!');
      }
    });
  });


  $('#submit-email').click(function(e) {
    e.preventDefault();
    updateUserComponent({
      user_id: parseInt($userId.val()),
      user_email: $userEmail.val(),
    }, (response) => {
      if (response.changedRows > 0) {
        showAlert('success', 'Email successfully changed!');
      }
    });
  });


  $('#submit-password').click(function(e) {
    e.preventDefault();
    updateUserComponent({
      user_id: parseInt($userId.val()),
      user_password: $userPassword.val(),
    }, (response) => {
      if (response.changedRows > 0) {
        showAlert('success', 'Passowrd successfully changed!');
      }
    });
  });


  $likedBtn.click(function(event) {
    visibleRecipes == 'liked' ? showNone() : showLiked();
  });

  $dislikedBtn.click(function(event) {
    visibleRecipes == 'disliked' ? showNone() : showDisliked();
  });

  $submittedBtn.click(() => {
    visibleRecipes == 'submitted' ? showNone() : showSubmitted();
  });


  /**
   * Delete Profile
   */
  $profileDelete.click(() => {
    var result = confirm('Are you sure you want to delete your profile? This will also delete all of your recipes you have submitted and favorited.');
    if (result) {
      const req = new XMLHttpRequest();
      req.open('DELETE', '/users/', true);
      req.addEventListener('load', () => {
        if (req.status >= 200 && req.status < 400) {
          window.location.href = '/';
        }
      });

      req.send(null);
    }
  });


  /**
   * Functions
   */

  // Displays the favorited recipes
  function showLiked() {
    // hide all the recipes
    showNone();
    $likedBtn.addClass('active');
    $recipeItemLiked.show();
    visibleRecipes = 'liked';
  }

  // Displays the disliked recipes
  function showDisliked() {
    // hide all the recipes
    showNone();
    $dislikedBtn.addClass('active');
    $recipeItemDisliked.show();
    visibleRecipes = 'disliked';
  }

  // displays the submitted recipes
  function showSubmitted() {
    showNone();
    $submittedBtn.addClass('active');
    $recipeItemSubmitted.show();
    visibleRecipes = 'submitted';
  }

  function showNone() {
    $recipeItem.hide();
    $btnLink.removeClass('active');
    visibleRecipes = '';
  }

  function updateUserComponent(context, next) {
    const req = new XMLHttpRequest();
    req.open('PUT', '/users/update', true);
    req.setRequestHeader('content-type', 'application/json');
    req.addEventListener('load', () => {
      if (req.status >= 200 && req.status < 400) {
        const res = JSON.parse(req.responseText);
        if (res.changedRows > 0) {
          next(res);
        } else {
          showAlert('warning', 'Nothing changed');
        }
      } else {
        showAlert('danger', 'Something went wrong.');
      }
    });

    req.send(JSON.stringify(context));
  }


  /*
   * shows an alert to the user indicating the
   * result of an attempt to change any data.
   */
  function showAlert(type, content) {
    // remove the alert in case there's already one showing
    $alertContainer.removeClass('show');
    const renderHTML = `<div class="alert alert-${type}" role="alert">${content}</div>`;

    $alertContainer.html(renderHTML);
    $alertContainer.addClass('show');

    setTimeout(function() {
      $alertContainer.removeClass('show');
    }, 2000);
  }

});
