/*> ../jspp_imports/base.js */
/*> ../../_1site/_scripts/includes/fb-quickapp.js */

var fbChristmasFace=function(){
	fbQuickApp.call(this,true);
};
fbChristmasFace.prototype=new fbQuickApp();
fbChristmasFace.prototype.constructor=fbChristmasFace;
fbChristmasFace.prototype.userLoggedIn=function($link){
	
};
fbFunctionQ.push(function(){
	if (!window.fbChristmas){
		window.fbChristmas=new fbChristmasFace();
	}
});

$(function(){

});