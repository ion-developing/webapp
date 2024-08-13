var oCtrl_DetalleAplicacion;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox"],
		function(jQuery, Controller, MessageBox) {

	var oView;
   	var oNewDApp;
   	var mModel;
 	var sPathR;
 	var sPathD;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ApplicationManager.controller.DetalleAplicacion", {

		onInit : function() {
			oCtrl_DetalleAplicacion = this;
			oView = oCtrl_DetalleAplicacion.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.AplicationManager.controller.DetalleAplicacion");

	        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	sPathR = oEvent.getParameter("arguments").Modelo;
 				sPathD = oEvent.getParameter("arguments").oModelo;
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("DetalleAplicacion" === sRoute) {
	        		
	        	}
	        });	
	        
	        mModel = new sap.ui.model.json.JSONModel();
			oView.setModel(mModel, "mAplicaciones");
			oView.bindElement({ path: "/CAPLICACION/0", model: "mAplicaciones" });
	        
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
	        
		},
		
		back : function(evt) {
			window.history.go(-1);
		},
		
		onAfterShow: function(oEvt) {
		},
		
		onBeforeShow: function(oEvt){
			oNewDApp = true;
			if (oEvt.data && oEvt.data.Modelo && oEvt.data.oModelo) {
   				var sPathJoin="/"+sPathR+"/"+sPathD
   				var sPath = sPathJoin;
   				var oModel = oCore.getModel('mMonitorAplicaciones');
   				
   				//Clonar data
   				var oObjct = jQuery.extend({}, oModel.getProperty(sPath));
   				mModel.setData( {"CAPLICACION": [oObjct]} );
   				
   				this._uObject = jQuery.extend({}, mModel.getData().CAPLICACION[0] );
   			}else{
   				mModel.setData( {"CAPLICACION" : [{ ID_CENTRO_ACOPIO:"", DESCRIPCION:"" }]} );
   			}
		},
		
		onAfterHide: function(oEvt){
		},

		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.AplicationManager.controller.DetalleAplicacion');
		},
		
		onPressEdit: function(oEvt){
			oNewDApp = false;
			
			//Clonar data
  			this._uObject = jQuery.extend({}, mModel.getData().CAPLICACION[0] );
  			
  			var oVisualiz=true;
  			oCtrl_DetalleAplicacion.f_toggleButtonsAndView(oVisualiz);
  			oCtrl_DetalleAplicacion.byId("inputIdApp").setEnabled(!oVisualiz);
  			oCtrl_DetalleAplicacion.byId("switchActivo").setEnabled(oVisualiz);
		},
		
		onPressCancel: function(){
			if (oNewDApp == true) {
				oCtrl_DetalleAplicacion.back();
			}else{
				mModel.setData( {"CAPLICACION" : [ this._uObject ]} );
      			mModel.refresh();
      			
      			var oVisualiz=false;
      			oCtrl_DetalleAplicacion.f_toggleButtonsAndView(oVisualiz);
      			oCtrl_DetalleAplicacion.byId("idfoApp1_input").setVisible(!oVisualiz);
    			oCtrl_DetalleAplicacion.byId("idfoApp2_input").setVisible(!oVisualiz);
      			oCtrl_DetalleAplicacion.byId("switchActivo").setEnabled(oVisualiz);
			}
		},
		
		f_toggleButtonsAndView: function(oVisualiz){
			 /** Forms **/
			oCtrl_DetalleAplicacion.byId("idfoApp1_input").setVisible(oVisualiz);
			oCtrl_DetalleAplicacion.byId("idfoApp2_input").setVisible(oVisualiz);
			 /** Inputs **/
			oCtrl_DetalleAplicacion.byId("inputIdApp").setEnabled(oVisualiz);
			oCtrl_DetalleAplicacion.byId("inputNombreApp").setEnabled(oVisualiz);
			oCtrl_DetalleAplicacion.byId("inputDescripcion").setEnabled(oVisualiz);
			oCtrl_DetalleAplicacion.byId("inputRuta").setEnabled(oVisualiz);
			oCtrl_DetalleAplicacion.byId("inputIdGrupo").setEnabled(oVisualiz);
			/** Buttons **/
			oCtrl_DetalleAplicacion.byId("btnSave").setVisible(oVisualiz);
			oCtrl_DetalleAplicacion.byId("btnEdit").setVisible(!oVisualiz);
			oCtrl_DetalleAplicacion.byId("btnDelete").setVisible(!oVisualiz);
			oCtrl_DetalleAplicacion.byId("btnCancel").setVisible(oVisualiz);
		},
	});

});