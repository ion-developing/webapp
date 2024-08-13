var oCtrl_MonitorGrupos;
var MonitorGrupos_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/TablePersoController"],
		function(jQuery, Controller, MessageBox, TablePersoController) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GroupManager.controller.MonitorGrupos", {

		onInit : function() {
			oCtrl_MonitorGrupos = this;
			oView = oCtrl_MonitorGrupos.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login");

	        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("Grupos" === sRoute) {
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
	        oCtrl_MonitorGrupos.f_createAllFiltersPanel();
		},

   		back : function(evt) {
			window.history.go(-1);
		},
		
		onAfterShow: function(oEvt) {
		},
		
		onBeforeShow: function(oEvt){
		},
		
		onAfterHide: function(oEvt){
			//oCore.getModel("mMonitorGrupos").setProperty("/Grupos", []);
			//this.f_countersInTabsAndTables();
		},
		
		onAfterRendering : function(oEvt) {
			if(MonitorGrupos_flag == true)
				return;
			
			MonitorGrupos_flag = true;
			
   			var oTableID = oView.byId("idTableMonitorGrupos");
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
			var oCount	= oCore.getModel("mMonitorGrupos").getProperty("/Grupos").length;
			// Set Numero de registros encontrados
			this.byId("idCountTableMonitorGrupos").setText("("+oCount+")");
			this.byId("idTableMonitorGrupos").setGrowingThreshold(5);
		},

		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login');
		},

		f_createAllFiltersPanel: function(oEvt){
			//oC_Modulo_WiseMobile.f_createFilterPanel("GRUPOS", oCtrl_MonitorGrupos, undefined);
			oC_Modulo_WiseMobile.f_createFilterPanel("GRUPOS", oCtrl_MonitorGrupos, "idPage", 4);
		},
		
		onItemPressGrupos:function(oEvt){
			var sPath = oEvt.getParameter("listItem").getBindingContext("mMonitorGrupos").sPath;
			var separadoSpath= sPath.split('/');
			
			var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_MonitorGrupos);
			router._oConfig.transition = "show";
			router.navTo("DetalleGrupo",{Modelo:separadoSpath[1],oModelo:separadoSpath[2]},false);
			router._oConfig.transition = "slide";
			
			var oVisualiz=false;
			oCtrl_DetalleGrupo.f_toggleButtonsAndView(oVisualiz);
			oCtrl_DetalleGrupo.byId("idfoGru_input").setVisible(!oVisualiz);
			
		},
		
		onNuevoGrupo : function() {
			var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_MonitorGrupos);
			router.navTo("DetalleGrupo",{},false);

			var oVisualiz=true;
			oCtrl_DetalleGrupo.f_toggleButtonsAndView(oVisualiz);
			oCtrl_DetalleGrupo.byId("inputIDGrupo").setEnabled(!oVisualiz);
		}
	});

});