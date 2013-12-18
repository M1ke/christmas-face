/*> ../jspp_imports/base.js */
/*> ../../_1site/_scripts/includes/fb-quickapp.js */
/*> ../../_1site/_scripts/facedetection/facedetection.js */

var fbChristmasFace=function(){
	fbQuickApp.call(this,true);
};
fbChristmasFace.prototype=new fbQuickApp();
fbChristmasFace.prototype.constructor=fbChristmasFace;

fbFunctionQ.push(function(){
	if (!window.fbChristmas){
		window.fbChristmas=new fbChristmasFace();
	}
});

var christmasFace={
	getPicture:function($app){
		if (!$app){
			$app=$('.fb-app');
		}
		FB.api('/me/picture',{redirect:false,type:'large'},function($app){
			return function(response){
				$app.find('img.fb-pic').remove();
				$('<img src="'+response.data.url+'">').addClass('fb-pic').prependTo($app);
			};
		}($app));
	}
};

$(function(){
	$('.fb-app').bind('fb-login',function(){
		christmasFace.getPicture($(this));
	});
	$('a.get-picture').click(function(e){
		e.preventDefault();
		christmasFace.getPicture();
	});
});