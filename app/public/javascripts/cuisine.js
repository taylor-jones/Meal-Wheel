document.addEventListener('DOMContentLoaded', pageLoad);

function pageLoad(){
	//get the count of cuisines
	const req = new XMLHttpRequest();
    req.open('POST', '/', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        const res = JSON.parse(req.responseText);
        console.log(res);
        bindButtons(res.cuisineCount);
      }
    });
    var context = null;
    req.send(context);

}

function bindButtons(count){
	console.log("Bind buttons test");
	console.log(count);


};