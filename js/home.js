
var fbQuickApp=function(init,loginEl){
	this.url='';
	this.user=0;
	this.fbLoginOptions={scope:'email'};
	this.loginEl=loginEl ? loginEl : 'a.fb-login';
	if (init){
		this.onClickLogin();
		this.getLoginStatus();
	}
};
fbQuickApp.prototype.onClickLogin=function(){
	$(document).on('click',this.loginEl,{App:this},this.clickLoginEvent);
};
fbQuickApp.prototype.clickLogin=function($link){
	$link.click({App:this},this.clickLoginEvent);
};
fbQuickApp.prototype.clickLoginEvent=function(e){
	e.preventDefault();
	$(this).html('Connecting to Facebook&hellip;');
	e.data.App.fbLogin($(this));
};
fbQuickApp.prototype.dialog=function(request,callback){
	FB.ui(request,function(App){
		return function(response){
			callback.call(App,response);
		}
	}(this));
};
fbQuickApp.prototype.fbLogin=function($link){
	FB.login(function(App,$link){
		return function(response){
			if (response.status=='connected'){
				App.userLoggedIn($link);
			}
			else {
				App.userNotLoggedIn($link);
			}
		}
	}(this,$link),this.fbLoginOptions);
};
fbQuickApp.prototype.friendRequest=function(details,callback){
	// message
	details=$.extend(this.requestDefaults,details);
	details.method='apprequests';
	this.dialog(details,callback);
};
fbQuickApp.prototype.getLoginStatus=function(){
	FB.getLoginStatus(function(App){
		return function(response){
			if (response.status==='connected'){
				FB.api('me/permissions',function(App){
					return function(response){
						var perms=App.fbLoginOptions.scope.split(',');
						var allPerms=true;
						for (i=0;i<perms.length;i++){
							if (!response.data[0][perms[i]]){
								allPerms=false;
							}
						}
						if (!allPerms){
							App.fbLogin();
						}
						else {
							App.userLoggedIn();
						}
					}
				}(App));
			}
		}
	}(this));
};
fbQuickApp.prototype.postToFeed=function(post,callback){
	// caption, description, to
	post=$.extend(this.postDefaults,post);
	post.method='feed';
	this.dialog(post,callback);
};
fbQuickApp.prototype.userLoggedIn=function(){
	$(this.loginEl).parent().html('Logged in with Facebook').addClass('logged-in');
	$('.fb-app').fadeIn();
};
fbQuickApp.prototype.userNotLoggedIn=function($link){
	$link.text('Please try again');
};

/* HOW TO USE

var fbYourApp=function(){
	fbQuickApp.call(this,true);
};
fbYourApp.prototype=new fbQuickApp();
fbYourApp.prototype.constructor=fbYourApp;
fbYourApp.prototype.userLoggedIn=function($link){
	if (l.user==0){
		
	}
	else {
		
	}
};
fbFunctionQ.push(function(){
	if (!window.fbYourAppObject){
		window.fbYourAppObject=new fbYourApp();
	}
});

var fbChristmasFace=function(){
	fbQuickApp.call(this,true);
};
fbChristmasFace.prototype=new fbQuickApp();
fbChristmasFace.prototype.constructor=fbChristmasFace;
fbChristmasFace.prototype.userLoggedIn=function($link){
	if (l.user==0){
		
	}
	else {
		
	}
};
fbFunctionQ.push(function(){
	if (!window.fbChristmas){
		window.fbChristmas=new fbChristmasFace();
	}
});

$(function(){

});