var F_mobiscroll_card;

var style=document.createElement("link");
style.rel="stylesheet";
style.type="text/css";
style.href="wisemobile/Public/JS/Mobiscroll/Card/css/style.css";
document.head.appendChild(style);

(function(){
    
    F_mobiscroll_card = function( oIdView,oIdDiv,oModel,oIdList ){
		    	
    	mobiscroll.card('#'+oIdView+oIdDiv, {
    	    theme: os
    	});
    	
    	mobiscroll.settings = {
    			lang: lang,  // Specify language like: lang: 'pl' or omit setting to use default
    			theme: os    // Specify theme like: theme: 'ios' or omit setting to use default
    	};
    	    
    	mobiscroll.listview('.md-lv', {
    	        enhance: true
    	});
    	
    	mobiscroll.listview('#'+oIdView+oIdList+'.md-lv-checklist', {
    	        theme: os,          // Specify theme like: theme: 'ios' or omit setting to use default
    	        lang: lang,
    	        swipe:false,
    	        onInit: function (event, inst) {
    	        	
    	        	if(oModel=="CLIENTE"){
    	        		var aData = sap.ui.getCore().getModel("mReg").getProperty("/"+oModel);
        	        	var aClients = aData;
    	        		for(var i=0; i<aClients.length; i++){
        	    			inst.add(null, '<input type="checkbox" data-role="none" />'+aClients[i].RAZONSOCIAL +' <label class="mbsc-label">'+aClients[i].FECHA_INGRESO +' </label></input>', event.index + 1); 
        	    		}
    	        	}else if(oModel=="TICKETS"){
    	        		var aData = sap.ui.getCore().getModel("mReg").getProperty("/"+oModel);
        	        	var aTickets = aData;
    	        		for(var i=0; i<aTickets.length; i++){
        	    			inst.add(null, '<input type="checkbox" data-role="none" />'+aTickets[i].DESCRIPCION +' <label class="mbsc-label">'+aTickets[i].EMPRESA +' </label> <label class="mbsc-label">'+aTickets[i].FECHAINICIAL_PLANEADA +' </label> </input>', event.index + 1); 
        	    		}
    	        	}
    	        },
    	});
	};
	
}())