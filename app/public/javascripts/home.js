var looper;
var degrees = 0;
document.getElementById("wheelImg").addEventListener('click', function(){
	degrees = 0;
	rotateAnimation("wheelImg", 8, 0);
});

//help from http://www.developphp.com/video/JavaScript/Transform-Rotate-Image-Spin-Smooth-Animation-Tutorial
function rotateAnimation(el,speed, count){
	var elem = document.getElementById("wheelImg");
	if(navigator.userAgent.match("Chrome")){
		elem.style.WebkitTransform = "rotate("+degrees+"deg)";
	} else if(navigator.userAgent.match("Firefox")){
		elem.style.MozTransform = "rotate("+degrees+"deg)";
	} else if(navigator.userAgent.match("MSIE")){
		elem.style.msTransform = "rotate("+degrees+"deg)";
	} else if(navigator.userAgent.match("Opera")){
		elem.style.OTransform = "rotate("+degrees+"deg)";
	} else {
		elem.style.transform = "rotate("+degrees+"deg)";
	}
	count++;
	if(degrees < 361){
		looper = setTimeout('rotateAnimation(\''+el+'\','+speed+', ' + count +')',speed);
	}
	degrees++;
	
}