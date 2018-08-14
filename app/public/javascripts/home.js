 /**
  * rotating wheel, click it to spin it
  */

 var looper;
 var degrees = 0;
 document.getElementById("wheelImg").addEventListener('click', function() {
   degrees = 0;
   rotateAnimation("wheelImg", 8, 0);
 });

 //help from http://www.developphp.com/video/JavaScript/Transform-Rotate-Image-Spin-Smooth-Animation-Tutorial
 function rotateAnimation(el, speed, count) {
   var elem = document.getElementById("wheelImg");
   if (navigator.userAgent.match("Chrome")) {
     elem.style.WebkitTransform = "rotate(" + degrees + "deg)";
   } else if (navigator.userAgent.match("Firefox")) {
     elem.style.MozTransform = "rotate(" + degrees + "deg)";
   } else if (navigator.userAgent.match("MSIE")) {
     elem.style.msTransform = "rotate(" + degrees + "deg)";
   } else if (navigator.userAgent.match("Opera")) {
     elem.style.OTransform = "rotate(" + degrees + "deg)";
   } else {
     elem.style.transform = "rotate(" + degrees + "deg)";
   }
   count++;
   if (degrees < 361) {
     looper = setTimeout('rotateAnimation(\'' + el + '\',' + speed + ', ' + count + ')', speed);
   }
   degrees++;
 }

 $(function() {
    const NON_EMPTY_CLASS = 'non-empty';

   /**
    * Cache DOM
    */

   const spinButton = document.querySelector('#spinWheel');
   const display = document.querySelector('#recipeDisplay');

   const category = document.querySelector('#category');
   const cuisine = document.querySelector('#cuisine');
   const diet = document.querySelector('#diet');

  const $clear = $('.form-control-clear');
  const $select = $('select');

  $(category).prev().addClass(NON_EMPTY_CLASS);

  /**
   * Event Handlers
   */

  $(category).change(() => {
    $(category).prev().addClass(NON_EMPTY_CLASS);
  });

  $(cuisine).change(() => {
    $(cuisine).prev().addClass(NON_EMPTY_CLASS);
  });

  $(diet).change(() => {
    $(diet).prev().addClass(NON_EMPTY_CLASS);
  });


  // clear any of the filters
  $clear.click(function() {
    const $el = $(this);
    const $next = $el.next();

    if ($next.is('input')) {
      $next.val('');
    } else {
      $next.prop('selectedIndex', 0);
    }

    $el.removeClass(NON_EMPTY_CLASS);
  });


   /**
    * Random recipe button click event handler
    */

   spinButton.addEventListener('click', function(e) {
     degrees = 0;
     rotateAnimation('wheelImg', 8, 0);

     const req = new XMLHttpRequest();

     // See routes/index.js for POST code
     req.open('POST', '/', true);
     req.setRequestHeader('Content-Type', 'application/json');
     req.addEventListener('load', function() {
       if (req.status >= 200 && req.status < 400) {
         if (req.responseText) {
           const res = JSON.parse(req.responseText);
           display.innerHTML = res.recipe;
         }
       }
     });

     const context = {
       category: sanitize(category.value),
       cuisine: sanitize(cuisine.value),
       diet: sanitize(diet.value),
     };

     req.send(JSON.stringify(context));
     e.preventDefault();
     e.stopPropagation();
   });



   /**
    * Functions
    */

   function isNumeric(n) {
     return !isNaN(parseFloat(n)) && isFinite(n);
   }


   // Converts a value to its appropriate value type.
   function sanitize(value) {
     if (value === 'null' || undefined) {
       return null;
     } else if (isNumeric(value)) {
       return parseInt(value);
     }
     return value;
   }

 });
