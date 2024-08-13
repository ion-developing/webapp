var oCtrl_DetalleRol;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox"],
		function(jQuery, Controller, MessageBox) {

	var oView;
   	var oNewDRol;
   	var mModel;
 	var sPathR;
 	var sPathD;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Roles.controller.DetalleRol", {

		onInit : function() {
			oCtrl_DetalleRol = this;
			oView = oCtrl_DetalleRol.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Roles.controller.oCtrl_DetalleRol");

	        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	sPathR = oEvent.getParameter("arguments").Modelo;
 				sPathD = oEvent.getParameter("arguments").oModelo;
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("DetalleRol" === sRoute) {
	        		
	        	}
	        });	
	        
	        mModel = new sap.ui.model.json.JSONModel();
			oView.setModel(mModel, "mRoles");
			oView.bindElement({ path: "/CROL/0", model: "mRoles" });
	        
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
			oNewDRol = true;
			if (oEvt.data && oEvt.data.Modelo && oEvt.data.oModelo) {
   				var sPathJoin="/"+sPathR+"/"+sPathD
   				var sPath = sPathJoin;
   				var oModel = oCore.getModel('mMonitorRoles');
   				
   				//Clonar data
   				var oObjct = jQuery.extend({}, oModel.getProperty(sPath));
   				mModel.setData( {"CROL": [oObjct]} );
   				
   				this._uObject = jQuery.extend({}, mModel.getData().CROL[0] );
   			}else{
   				mModel.setData( {"CROL" : [{ ID_CENTRO_ACOPIO:"", DESCRIPCION:"" }]} );
   			}
		},
		
		onAfterHide: function(oEvt){
		},

		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Roles.controller.DetalleRol');
		},
		
		onPressEdit: function(oEvt){
			oNewDRol = false;
			
			//Clonar data
  			this._uObject = jQuery.extend({}, mModel.getData().CROL[0] );
  			
  			var oVisualiz=true;
  			oCtrl_DetalleRol.f_toggleButtonsAndView(oVisualiz);
  			oCtrl_DetalleRol.byId("inputIdRol").setEnabled(!oVisualiz);
  			oCtrl_DetalleRol.byId("switchActivo").setEnabled(oVisualiz);
		},
		
		onPressCancel: function(){
			if (oNewDRol == true) {
				oCtrl_DetalleRol.back();
			}else{
				mModel.setData( {"CROL" : [ this._uObject ]} );
      			mModel.refresh();
      			
      			var oVisualiz=false;
      			oCtrl_DetalleRol.f_toggleButtonsAndView(oVisualiz);
      			oCtrl_DetalleRol.byId("idfoRol1_input").setVisible(!oVisualiz);
      			oCtrl_DetalleRol.byId("idfoRol2_input").setVisible(!oVisualiz);
      			oCtrl_DetalleRol.byId("switchActivo").setEnabled(oVisualiz);
    		}
		},
		
		f_toggleButtonsAndView: function(oVisualiz){
			 /** Forms **/
			oCtrl_DetalleRol.byId("idfoRol1_input").setVisible(oVisualiz);
			oCtrl_DetalleRol.byId("idfoRol2_input").setVisible(oVisualiz);
	        /** Inputs **/
			oCtrl_DetalleRol.byId("inputIdRol").setEnabled(oVisualiz);
			oCtrl_DetalleRol.byId("inputNombre").setEnabled(oVisualiz);
	        /** Buttons **/
			oCtrl_DetalleRol.byId("btnSave").setVisible(oVisualiz);
			oCtrl_DetalleRol.byId("btnEdit").setVisible(!oVisualiz);
			oCtrl_DetalleRol.byId("btnDelete").setVisible(!oVisualiz);
			oCtrl_DetalleRol.byId("btnCancel").setVisible(oVisualiz);
		},
	});

});