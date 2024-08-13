var oCtrl_MonitorRoles;
var MonitorRoles_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/TablePersoController"],
		function(jQuery, Controller, MessageBox, TablePersoController) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Roles.controller.MonitorRoles", {

		onInit : function() {
			oCtrl_MonitorRoles = this;
			oView = oCtrl_MonitorRoles.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Roles.controller.MonitorRoles");

	        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("Roles" === sRoute) {
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
	        oCtrl_MonitorRoles.f_createAllFiltersPanel();
		},
		
		back : function(evt) {
			window.history.go(-1);
		},
		
		onAfterShow: function(oEvt) {
		},
		
		onBeforeShow: function(oEvt){
		},
		
		onAfterHide: function(oEvt){
			//oCore.getModel("mMonitorRoles").setProperty("/Roles", []);
			//this.f_countersInTabsAndTables();
		},
		
		onAfterRendering : function(oEvt) {
			if(MonitorRoles_flag == true)
				return;
			
			MonitorRoles_flag = true;
			
   			var oTableID = oView.byId("idTableMonitorRoles");
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
			var oCount	= oCore.getModel("mMonitorRoles").getProperty("/Roles").length;
			// Set Numero de registros encontrados
			this.byId("idCountTableMonitorRoles").setText("("+oCount+")");
			this.byId("idTableMonitorRoles").setGrowingThreshold(5);
		},

		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Roles.controller.MonitorRoles');
		},

		f_createAllFiltersPanel: function(oEvt){
			//oC_Modulo_WiseMobile.f_createFilterPanel("ROLES", oCtrl_MonitorRoles, undefined);
			oC_Modulo_WiseMobile.f_createFilterPanel("ROLES", oCtrl_MonitorRoles, "idPage", 4);
		},
		
		onItemPressRoles:function(oEvt){
			var sPath = oEvt.getParameter("listItem").getBindingContext("mMonitorRoles").sPath;
			var separadoSpath= sPath.split('/');
			
			var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_MonitorRoles);
			router._oConfig.transition = "show";
			router.navTo("DetalleRol",{Modelo:separadoSpath[1],oModelo:separadoSpath[2]},false);
			router._oConfig.transition = "slide";
			
			var oVisualiz=false;
			oCtrl_DetalleRol.f_toggleButtonsAndView(oVisualiz);
			oCtrl_DetalleRol.byId("idfoRol1_input").setVisible(!oVisualiz);
			oCtrl_DetalleRol.byId("idfoRol2_input").setVisible(!oVisualiz);
			oCtrl_DetalleRol.byId("switchActivo").setEnabled(oVisualiz);
			
		},
		
		onNuevoRol: function() {
			var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_MonitorRoles);
			router.navTo("DetalleRol",{},false);

			var oVisualiz=true;
			oCtrl_DetalleRol.f_toggleButtonsAndView(oVisualiz);
			oCtrl_DetalleRol.byId("inputIdRol").setEnabled(!oVisualiz);
			oCtrl_DetalleRol.byId("switchActivo").setEnabled(oVisualiz);
		},
		
		onDataExportRE : function(oEvt) {
			oC_Modulo_WiseMobile.ExportToExcel(oCtrl_MonitorRoles,"idTableMonitorRoles","Hoja 1");
		},
	});

});