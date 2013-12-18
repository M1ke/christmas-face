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
	classFbImg:'fb-pic',
	// classDetectImg:'img',
	classDetectImg:'fb-pic',
	domSetup:function(){
		var self=this;
		$('.fb-app').bind('fb-login',function(){
			self.getPicture($(this));
		});
		$('a.get-picture').click(function(e){
			e.preventDefault();
			self.getPicture();
		});
		$('a.get-face').click(function(e){
			e.preventDefault();
			var $img=$('.'+self.classDetectImg);
			var coords=$img.find('img').faceDetection({
				error:function(img,code,message){
					console.log(img);
					console.log(code);
					console.log(message);
				}
			});
			console.log(coords);
			for (var i = 0; i < coords.length; i++) {
				$('<div>', {
					'class':'face',
					'css': {
						'position':	'absolute',
						'left':		coords[i].positionX +5+'px',
						'top':		coords[i].positionY +5+'px',
						'width': 	coords[i].width		+'px',
						'height': 	coords[i].height	+'px'
					}
				})
				.appendTo($img);
			}
		});
	},
	getPicture:function($app){
		var self=this;
		if (!$app){
			$app=$('.fb-app');
		}
		FB.api('/me/picture',{redirect:false,type:'large'},function($app){
			return function(response){
				$app.find('div.fb-pic').remove();
				$.get('redir.php?file='+response.data.url,function(img){
					return function(){
						$('<img src="images/'+img.substr(img.lastIndexOf('/')+1)+'">').prependTo($app).wrap('<div class="'+self.classFbImg+'">');
						$('a.get-face').fadeIn();
					};
				}(response.data.url));
			};
		}($app));
	}
};

$(function(){
	christmasFace.domSetup();
});