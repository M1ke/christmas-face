/*> ../jspp_imports/base.js */
/*> ../../_1site/_scripts/includes/fb-quickapp.js */
/*> ../../_1site/_scripts/includes/math-rand.js */
/*> ../../_1site/_scripts/facedetection/facedetection.js */

var fbChristmasFace=function(){
	fbQuickApp.call(this,true);
};
fbChristmasFace.prototype=new fbQuickApp();
fbChristmasFace.prototype.constructor=fbChristmasFace;

fbFunctionQ.push(function(){
	if (!window.fbChristmas){
		window.fbChristmas=new fbChristmasFace();
		fbChristmas.fbLoginOptions={scope:'user_photos'};
		fbChristmas.textLoggedIn='Thanks, now for the cool part!';
	}
});

var christmasFace={
	classFbImg:'fb-pic',
	$app:{},
	domSetup:function(){
		var self=this;
		this.$app=$('.fb-app');
		this.$app.bind('fb-login',function(){
			// self.getPicture($(this));
		});
		$('a.get-picture').click(function(e){
			e.preventDefault();
			self.getPicture();
		});
		$('a.get-photos').click(function(e){
			e.preventDefault();
			$(this).html('Christmas elves at work&hellip;');
			self.getPhotos();
		});
		$('a.get-face').click(function(e){
			e.preventDefault();
			self.getFace($(this).data('face'));
		});
		console.log('dom setup');
	},
	getFace:function(selector,again){
		var $img=$(selector),hasFaces=false;
		var coords=$img.find('img').faceDetection({
			error:function(img,code,message){
				console.log(img);
				console.log(code);
				console.log(message);
			}
		});
		console.log(coords);
		for (var i=0; i<coords.length; i++){
			if (coords[i].confidence>-2){
				$('<div>',{
					'class':'face',
					'css':{
						'position':	'absolute',
						'left':		coords[i].positionX+5+'px',
						'top':		coords[i].positionY+5-coords[i].height+'px',
						'width': 	coords[i].width		+'px',
						'height': 	coords[i].height	+'px'
					}
				})
				.appendTo($img);
				hasFaces=true;
			}
		}
		if (again && !hasFaces){
			this.outputPhoto();
		}
	},
	getPicture:function(){
		var self=this;
		FB.api('/me/picture',{redirect:false,type:'large'},function(response){
			self.savePhoto(response.data.url);
		});
	},
	savePhoto:function(url,autoface){
		var self=this;
		$.get('save-image.php?file='+url,function(img){
			return function(){
				self.$app.find('.fb-pic').remove();
				$('<img src="images/'+img.substr(img.lastIndexOf('/')+1)+'">').prependTo(self.$app).wrap('<div class="fb-pic faces">').after('<div class="frame"></div>'+(rand(0,1)==1 ? '<div class="deer"></div>' : '')+(rand(0,1)==1 ? '<div class="tinsel"></div>' : ''));
				$('a.get-photos').text('Click to go again!');
				if (autoface){
					setTimeout(function(){
						window.scroll(0,self.$app.offset().top-10);
					},500);
					setTimeout(function(){
						self.getFace('.fb-pic');
					},1000);
				}
			};
		}(url));
	},
	photos:[],
	getPhotos:function($app){
		var self=this;
		if (this.photos.length>0){
			self.outputPhoto();
		}
		else {
			FB.api('/me/photos',function(response){
				$.each(response.data,function(key,photo){
					self.photos.push(photo);
				});
				setTimeout(function(){
					self.outputPhoto();
				},500);
			});
		}
	},
	outputPhoto:function(){
		if (this.photos.length>0){
			var select=rand(0,this.photos.length-1);
			this.savePhoto(this.photos[select].source,true);
		}
	},
};

$(function(){
	christmasFace.domSetup();
});