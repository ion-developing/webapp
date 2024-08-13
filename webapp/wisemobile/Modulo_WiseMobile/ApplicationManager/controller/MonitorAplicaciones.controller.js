var oCtrl_MonitorAplicaciones;
var MonitorAplicaciones_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/TablePersoController"],
		function(jQuery, Controller, MessageBox, TablePersoController) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ApplicationManager.controller.MonitorAplicaciones", {

		onInit : function() {
			oCtrl_MonitorAplicaciones = this;
			oView = oCtrl_MonitorAplicaciones.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login");

	        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("Aplicaciones" === sRoute) {
	        		oBusyDialog.close();
	        	}
	        });	
	        
	        oView.addEventDelegate({
   				// not added the controller as delegate to avoid controller functions with similar names as the events
   				onBeforeShow : jQuery.proxy(function(oEvt) {
   					this.onBeforeShow(oEvt);
   				}, this),
   				onAfterShow : jQuery.proxy(function(oEvt) {
   					this.onAfterShow(oEvt);
   				}, this),
   				onAfterHide : jQuery.proxy(function(oEvt) {
   					this.onAfterHide(oEvt);
   				}, this)
   			});
	        
	        // Filters
	        oCtrl_MonitorAplicaciones.f_createAllFiltersPanel();
		},

		back : function(evt) {
			window.history.go(-1);
		},
		
		onAfterShow: function(oEvt) {
		},
		
		onBeforeShow: function(oEvt){
		},
		
		onAfterHide: function(oEvt){
			//oCore.getModel("mMonitorAplicaciones").setProperty("/Aplicaciones", []);
			//this.f_countersInTabsAndTables();
		},
		
		onAfterRendering : function(oEvt) {
			if(MonitorAplicaciones_flag == true)
				return;
			
			MonitorAplicaciones_flag = true;
			
   			var oTableID = oView.byId("idTableMonitorAplicaciones");
   			// Hidden/view Columns
   			DemoPersoService.setMyPersData( oTableID );
   			
   			// init and activate controller
			this._oTPC = new TablePersoController({
				table: oTableID,
				//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
				componentName: "demoApp",
				persoService: DemoPersoService,
			}).activate();
   		},
   		
   		onPersoPress: function(oEvt) {
			var oTable = oEvt.getSource().getParent().getParent();
   			
			this._oTPC.openDialog();
		},
		
		f_countersInTabsAndTables: function(){
			var oCount	= oCore.getModel("mMonitorAplicaciones").getProperty("/Aplicaciones").length;
			// Set Numero de registros encontrados
			this.byId("idCountTableMonitorAplicaciones").setText("("+oCount+")");
			this.byId("idTableMonitorAplicaciones").setGrowingThreshold(5);
		},

		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login');
		},

		f_createAllFiltersPanel: function(oEvt){
			//oC_Modulo_WiseMobile.f_createFilterPanel("APLICACIONES", oCtrl_MonitorAplicaciones, undefined);
			oC_Modulo_WiseMobile.f_createFilterPanel("APLICACIONES", oCtrl_MonitorAplicaciones, "idPage", 4);
		},
		
		onItemPressAplicaciones:function(oEvt){
			var sPath = oEvt.getParameter("listItem").getBindingContext("mMonitorAplicaciones").sPath;
			var separadoSpath= sPath.split('/');
			
			var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_MonitorAplicaciones);
			router._oConfig.transition = "show";
			router.navTo("DetalleAplicacion",{Modelo:separadoSpath[1],oModelo:separadoSpath[2]},false);
			router._oConfig.transition = "slide";
			
			var oVisualiz=false;
			oCtrl_DetalleAplicacion.f_toggleButtonsAndView(oVisualiz);
			oCtrl_DetalleAplicacion.byId("idfoApp1_input").setVisible(!oVisualiz);
			oCtrl_DetalleAplicacion.byId("idfoApp2_input").setVisible(!oVisualiz);
			oCtrl_DetalleAplicacion.byId("switchActivo").setEnabled(oVisualiz);
			
		},
		
		onNuevaAplicacion : function() {
			var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_MonitorAplicaciones);
			router.navTo("DetalleAplicacion",{},false);

			var oVisualiz=true;
			oCtrl_DetalleAplicacion.f_toggleButtonsAndView(oVisualiz);
			oCtrl_DetalleAplicacion.byId("inputIdApp").setEnabled(!oVisualiz);
			oCtrl_DetalleAplicacion.byId("switchActivo").setEnabled(oVisualiz);
		}
	});

});