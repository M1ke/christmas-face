/*> ../jspp_imports/base.js */
/*> ../../_1site/_scripts/includes/fb-quickapp.js */

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
		fbChristmas.api('/me/picture',{redirect:false,type:'large'},function($app){
			return function(response){
				$(this).find('img.fb-pic').remove();
				$('<img src="'+response.url+'">').addClass('fb-pic').prependTo($(this));
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