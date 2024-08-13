var F_mobiscroll_calend;

var style=document.createElement("link");
style.rel="stylesheet";
style.type="text/css";
style.href="wisemobile/Public/JS/Mobiscroll/Eventcalendar/css/style.css";
document.head.appendChild(style);

(function(){
    
    F_mobiscroll_calend = function( oIdView ){
		/*
    	mobiscroll.settings = {
    	           theme: os,
    	           lang: lang
    	};
    	var now = new Date();
    	var mymobiscroll = mobiscroll.eventcalendar('#'+oIdView+'--demo', {
            lang: lang,         // Specify language like: lang: 'pl' or omit setting to use default
            theme: os,       // Specify theme like: theme: 'ios' or omit setting to use default
            display: 'inline',  // Specify display mode like: display: 'bottom' or omit setting to use default
            view: {             // More info about view: https://docs.mobiscroll.com/4-4-0/javascript/eventcalendar#opt-view
                eventList: { type: 'day' }
            },
            data: [{
                start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0),
                end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0),
                text: 'Reunión en Punto Central',
                color: '#f67944'
            },
            {
                start: new Date("2018-10-14 09:00"),
                end: new Date("2018-10-14 12:00"),
                text: 'Reunión en Femsa 1',
                color: '#f67944'
            },
            {
                start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0),
                end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0),
                text: 'Reunión en Femsa 2',
                color: '#f67944'
            },
            {
                start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0),
                end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
                text: 'Reunión en Femsa 3',
                color: '#f67944'
            },
            {
                start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0),
                end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 0),
                text: 'Reunión en casa de Exon',
                color: '#f67944'
            }]
        });
    	*/

    	var now = new Date();
    	var mymobiscroll = mobiscroll.eventcalendar('#'+oIdView+'--demo', {
    		theme: os,       // Specify theme like: theme: 'ios' or omit setting to use default
            lang: lang,         // Specify language like: lang: 'pl' or omit setting to use default
            display: 'inline',  // Specify display mode like: display: 'bottom' or omit setting to use default
            view: {             // More info about view: https://docs.mobiscroll.com/4-4-0/javascript/eventcalendar#opt-view
                eventList: { type: 'day' }
            },
            onEventSelect: function (event, inst) {
            	/*
            	var pos = event.event._id;
            	
            	var router = oC_Modulo_WiseMobile.getRouter(); //se declara en Component.js
            	router.navTo("CRUD_Agenda",{Modelo: "AGENDA", oModelo: pos}, false);
            	*/
            	var router = oC_Modulo_WiseMobile.getRouter(); //se declara en Component.js
            	router.navTo("MonitorAgenda",{}, false);
            },/*
            onPageChange: function (event, inst) {
            	alert("onPageChange");
            },*/
            onInit: function (event, inst) {
	        	
	        	var ofunction = function(){
	        		
	    			var aData = sap.ui.getCore().getModel("mAgenda").getProperty("/AGENDA");
	    			var aEvents = [];
	    			
	    			for(var i=0; i<aData.length; i++){
	    				aEvents.push(
	    				{
	    					id_actividad	: aData[i].id_actividad,
				        	start			: new Date(aData[i].f_inicio),
				            end				: new Date(aData[i].f_fin),
				            text			: aData[i].descripcion, 
				            color			: util.Formatter.Prioridad(aData[i].prioridad)
	    				});
	    			}
	    			
	    			mymobiscroll.setEvents(aEvents);
	        	};
	        	
	        	oCnt_FHelps.oServ_Cabeceras(undefined, ofunction);
	        },
    	});
    	
    	// Get the list of selected days
    	console.log(mymobiscroll.getVal());
    	
    	return mymobiscroll;
	};
	
	F_mobiscroll_calend.Add_event = function( oIdView ){
		
		var calendarInstance,
	    dateInstance,
	    selectInstance,
	    now = new Date();
		
		mobiscroll.form('#'+oIdView+'--myform', {
			theme: os,
			lang: lang,
			onInit: function (event, inst) {
				
				selectInstance = mobiscroll.select('#'+oIdView+'--eventPrio', {
					theme: os,
					lang: lang,
				    display: 'bottom',
				    group: true
				});
				
				calendarInstance = mobiscroll.eventcalendar('#'+oIdView+'--demo', {
					theme: os,
					lang: lang,
				    display: 'inline',
				    layout: 'liquid',
				    view: {
				        calendar: { type: 'week' }
				    },
				    data: [{
				        d: new Date(),
				        text: 'First Event'
				    }]
				});
				
				dateInstance = mobiscroll.range('#'+oIdView+'--eventDate', {
					theme: os,
					lang: lang,
				    controls: ['date', 'time'],
				    dateWheels: '|D M d|',
				    endInput: '#'+oIdView+'--endInput',
				    tabs: false
				});
				
				//dateInstance.setVal([now, new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 2)], true);
				
		    }
		});
		
		return ({dateInstance, selectInstance});
	};
	
    F_mobiscroll_calend.Range_view = function( oIdView ){
    	var now = new Date();
    	var mymobiscroll = mobiscroll.eventcalendar('#'+oIdView+'--demo', {
    		theme	: os,       // Specify theme like: theme: 'ios' or omit setting to use default
            lang	: sap.ui.getCore().User.Language,//lang,         // Specify language like: lang: 'pl' or omit setting to use default
            display	: 'inline',
            view: {
            	calendar: {
                    type: 'week',
                    size: 1,
                    popover: false
                },
                eventList: {
                    type: 'week',
                    size: 1
                }
            	/*
            	calendar: { type: 'month' },
                eventList: { type: 'month' }
                */
            },
            onEventSelect: function (event, inst) {
            	
            	var pos = event.event._id;
            	
            	var router = oC_Modulo_WiseMobile.getRouter(); //se declara en Component.js
            	router.navTo("CRUD_Agenda",{Modelo: "AGENDA", oModelo: pos}, false);
            },/*
            onPageChange: function (event, inst) {
            	alert("onPageChange");
            },*/
            onInit: function (event, inst) {
	        	
	        	//oCnt_FHelps.oServ_Cabeceras();
	        },
    	});
    	
    	// Get the list of selected days
    	console.log(mymobiscroll.getVal());
    	
    	return mymobiscroll;
    	
    };
}())
// https://docs.mobiscroll.com/javascript/forms
// https://docs.mobiscroll.com/javascript/eventcalendar
// https://docs.mobiscroll.com/javascript/eventcalendar#method-setEvents