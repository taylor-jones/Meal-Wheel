document.addEventListener('DOMContentLoaded', pageLoad);

function pageLoad(){
	//get the count of cuisines
	const req = new XMLHttpRequest();
    req.open('POST', '/cuisines', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        const res = JSON.parse(req.responseText);
        bindButtons(res);
      }
    });
    var context = '{"taskId": "getCount"}';
    req.send(context);

}

function bindButtons(rows){
	var n = rows.length;
	for(var i = 0; i < n; i++){
		var id = 'delete_' + rows[i].cuisine_id;
		var delete_button = document.getElementById(id);
		const cid = rows[i].cuisine_id;
		delete_button.addEventListener('click', function(event){
			const req = new XMLHttpRequest();
		    req.open('POST', '/cuisines', true);
		    req.setRequestHeader('Content-Type', 'application/json');
		    req.addEventListener('load', function() {
		      if (req.status >= 200 && req.status < 400) {
		        const res = JSON.parse(req.responseText);
		        //console.log(res);
		        //Here we will need to delete the table element as well
		      }
		    });
		    var context = '{"taskId": "delete", "deleteId":' + cid + '}';
		    req.send(context);

		});
	}
};