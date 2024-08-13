var F_mobiscroll_login;

var style=document.createElement("link");
style.rel="stylesheet";
style.type="text/css";
style.href="wisemobile/Public/JS/Mobiscroll/Login/css/style.css";
document.head.appendChild(style);

(function(){
    
    F_mobiscroll_login = function( oIdView ){
		
	    try{
	    	
	        document
	        .querySelector('.md-login-olvido')
	        .addEventListener('click', function (ev) {
	        	oCtrl_Login.onPressOlvido();
	        });
	        
	        document
	        .querySelector('.mbsc-input-ic')
	        .addEventListener('click', function (ev) {
	        	
	        	var c_ojito = $(".mbsc-input-ic");
	        	var input_pwd = $("input[name='Password']");
	        	
	        	if(c_ojito.hasClass("mbsc-ic-eye-blocked")){
	        		c_ojito.removeClass("mbsc-ic-eye-blocked");
	        		c_ojito.addClass("mbsc-ic-eye");
	        		input_pwd.attr('type', 'text');
	        	}
	        	else {
	        		c_ojito.removeClass("mbsc-ic-eye");
	        		c_ojito.addClass("mbsc-ic-eye-blocked");
	        		input_pwd.attr('type', 'password'); 
	        	}
	        	
	        });
	        
	    }
	    catch(ex){
	    	console.log(ex);
	    }
	};
	F_mobiscroll_login.valid = function () {

    	var input_user = $("input[name='User']");
    	var input_pwd = $("input[name='Password']");
    	
    	input_user.removeClass("ms-input-error-user");
    	input_pwd.removeClass("ms-input-error-pwd");
    	
    	if(input_user.val() == "" || input_pwd.val() == ""){
    		oCnt_FHelps.f_showMessage("WARNING", oCnt_FHelps.f_readTranslate("Required-fields"));
    		
    		(input_user.val() == "")? input_user.addClass("ms-input-error-user") : input_user.removeClass("ms-input-error-user");
    		(input_pwd.val() == "")? input_pwd.parent().addClass("ms-input-error-pwd") : input_pwd.parent().removeClass("ms-input-error-pwd");
    		
    		return false;
    	}
    	else {
    		return true;
    	}
	};
	
	F_mobiscroll_login.f_clean = function () {
		$("input[name='User']").val("");
		$("input[name='Password']").val("");
	};
	
	F_mobiscroll_login.translate = function () {
		$("input[name='User']").val("");
		$("input[name='Password']").val("");
	};
	
}())