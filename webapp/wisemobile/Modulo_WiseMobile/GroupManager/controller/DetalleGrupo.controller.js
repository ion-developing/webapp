var oCtrl_DetalleGrupo;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox"],
		function(jQuery, Controller, MessageBox) {

	var oView;
	var oNewDGru;
   	var mModel;
 	var sPathR;
 	var sPathD;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GroupManager.controller.DetalleGrupo", {

		onInit : function() {
			oCtrl_DetalleGrupo = this;
			oView = oCtrl_DetalleGrupo.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login");

	        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	sPathR = oEvent.getParameter("arguments").Modelo;
 				sPathD = oEvent.getParameter("arguments").oModelo;
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("DetalleGrupo" === sRoute) {
	        		
	        	}
	        });	
	        
	        mModel = new sap.ui.model.json.JSONModel();
			oView.setModel(mModel, "mGrupos");
			oView.bindElement({ path: "/CGRUPO/0", model: "mGrupos" });
	        
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
			oNewDGru = true;
			if (oEvt.data && oEvt.data.Modelo && oEvt.data.oModelo) {
   				var sPathJoin="/"+sPathR+"/"+sPathD
   				var sPath = sPathJoin;
   				var oModel = oCore.getModel('mMonitorGrupos');
   				
   				//Clonar data
   				var oObjct = jQuery.extend({}, oModel.getProperty(sPath));
   				mModel.setData( {"CGRUPO": [oObjct]} );
   				
   				this._uObject = jQuery.extend({}, mModel.getData().CGRUPO[0] );
   			}else{
   				mModel.setData( {"CGRUPO" : [{ ID_CENTRO_ACOPIO:"", DESCRIPCION:"" }]} );
   			}
		},
		
		onAfterHide: function(oEvt){
		},

		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login');
		},
		
		onPressEdit: function(oEvt){
			oNewDGru = false;
			
			//Clonar data
  			this._uObject = jQuery.extend({}, mModel.getData().CGRUPO[0] );
  			
  			var oVisualiz=true;
  			oCtrl_DetalleGrupo.f_toggleButtonsAndView(oVisualiz);
  			oCtrl_DetalleGrupo.byId("inputIDGrupo").setEnabled(!oVisualiz);
		},
		
		onPressCancel: function(){
			if (oNewDGru == true) {
				oCtrl_DetalleGrupo.back();
			}else{
				mModel.setData( {"CGRUPO" : [ this._uObject ]} );
      			mModel.refresh();
      			
      			var oVisualiz=false;
      			oCtrl_DetalleGrupo.f_toggleButtonsAndView(oVisualiz);
      			oCtrl_DetalleGrupo.byId("idfoGru_input").setVisible(!oVisualiz);
    		}
		},
		
		f_toggleButtonsAndView: function(oVisualiz){
			 /** Forms **/
			oCtrl_DetalleGrupo.byId("idfoGru_input").setVisible(oVisualiz);
	        /** Inputs **/
			oCtrl_DetalleGrupo.byId("inputIDGrupo").setEnabled(oVisualiz);
			oCtrl_DetalleGrupo.byId("inputOrden").setEnabled(oVisualiz);
			oCtrl_DetalleGrupo.byId("inputNombre").setEnabled(oVisualiz);
	        /** Buttons **/
			oCtrl_DetalleGrupo.byId("btnSave").setVisible(oVisualiz);
			oCtrl_DetalleGrupo.byId("btnEdit").setVisible(!oVisualiz);
			oCtrl_DetalleGrupo.byId("btnDelete").setVisible(!oVisualiz);
			oCtrl_DetalleGrupo.byId("btnCancel").setVisible(oVisualiz);
		},
	});

});