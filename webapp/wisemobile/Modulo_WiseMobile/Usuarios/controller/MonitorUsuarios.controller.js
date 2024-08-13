var oCtrl_MonitorUsuarios;
var MonitorUsuarios_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/TablePersoController"],
		function(jQuery, Controller, MessageBox, TablePersoController) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Usuarios.controller.MonitorUsuarios", {

		onInit : function() {
			oCtrl_MonitorUsuarios = this;
			oView = oCtrl_MonitorUsuarios.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login");

	        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("Usuarios" === sRoute) {
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
	        oCtrl_MonitorUsuarios.f_createAllFiltersPanel();
		},
		
		back : function(evt) {
			window.history.go(-1);
		},
		
		onAfterShow: function(oEvt) {
		},
		
		onBeforeShow: function(oEvt){
		},
		
		onAfterHide: function(oEvt){
			//oCore.getModel("mMonitorUsuarios").setProperty("/Usuarios", []);
			//this.f_countersInTabsAndTables();
		},
		
		onAfterRendering : function(oEvt) {
			if(MonitorUsuarios_flag == true)
				return;
			
			MonitorUsuarios_flag = true;
			
   			var oTableID = oView.byId("idTableMonitorUsuarios");
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
			var oCount	= oCore.getModel("mMonitorUsuarios").getProperty("/Usuarios").length;
			// Set Numero de registros encontrados
			this.byId("idCountTableMonitorUsuarios").setText("("+oCount+")");
			this.byId("idTableMonitorUsuarios").setGrowingThreshold(5);
		},

		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login');
		},

		f_createAllFiltersPanel: function(oEvt){
			//oC_Modulo_WiseMobile.f_createFilterPanel("USUARIOS", oCtrl_MonitorUsuarios, , "idPage", 4);
			oC_Modulo_WiseMobile.f_createFilterPanel("USUARIOS", oCtrl_MonitorUsuarios, "idPage", 4);
		},
		
		onItemPressUsuarios:function(oEvt){
			var sPath = oEvt.getParameter("listItem").getBindingContext("mMonitorUsuarios").sPath;
			var separadoSpath= sPath.split('/');
			
			var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_MonitorUsuarios);
			router._oConfig.transition = "show";
			router.navTo("DetalleUsuario",{Modelo:separadoSpath[1],oModelo:separadoSpath[2]},false);
			router._oConfig.transition = "slide";
			
			var oVisualiz=false;
			oCtrl_DetalleUsuario.f_toggleButtonsAndView(oVisualiz);
			oCtrl_DetalleUsuario.byId("idfoUsu1_input").setVisible(!oVisualiz);
			oCtrl_DetalleUsuario.byId("idfoUsu2_input").setVisible(!oVisualiz);
			oCtrl_DetalleUsuario.byId("idfoUsu3_input").setVisible(!oVisualiz);
			oCtrl_DetalleUsuario.byId("switchActivo").setEnabled(oVisualiz);
			
		},
		
		onNuevoUsuario: function() {
			var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_MonitorUsuarios);
			router.navTo("DetalleUsuario",{},false);
			
			 var oVisualiz=true;
			 oCtrl_DetalleUsuario.f_toggleButtonsAndView(oVisualiz);
			 oCtrl_DetalleUsuario.byId("switchActivo").setEnabled(oVisualiz);
		}
	});

});