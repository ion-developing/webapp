var oCtrl_DetalleUsuario;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox"],
		function(jQuery, Controller, MessageBox) {

	var oView;
   	var oNewDUsu;
   	var mModel;
 	var sPathR;
 	var sPathD;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Usuarios.controller.DetalleUsuario", {

		onInit : function() {
			oCtrl_DetalleUsuario = this;
			oView = oCtrl_DetalleUsuario.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Usuarios.controller.DetalleUsuario");

	        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	sPathR = oEvent.getParameter("arguments").Modelo;
 				sPathD = oEvent.getParameter("arguments").oModelo;
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("DetalleUsuario" === sRoute) {
	        		
	        	}
	        });	
	        
	        mModel = new sap.ui.model.json.JSONModel();
			oView.setModel(mModel, "mUsuarios");
			oView.bindElement({ path: "/CUSUARIO/0", model: "mUsuarios" });
	        
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
			oNewDUsu = true;
			if (oEvt.data && oEvt.data.Modelo && oEvt.data.oModelo) {
   				var sPathJoin="/"+sPathR+"/"+sPathD
   				var sPath = sPathJoin;
   				var oModel = oCore.getModel('mMonitorUsuarios');
   				
   				//Clonar data
   				var oObjct = jQuery.extend({}, oModel.getProperty(sPath));
   				mModel.setData( {"CUSUARIO": [oObjct]} );
   				
   				this._uObject = jQuery.extend({}, mModel.getData().CUSUARIO[0] );
   			}else{
   				mModel.setData( {"CUSUARIO" : [{ ID_CENTRO_ACOPIO:"", DESCRIPCION:"" }]} );
   			}
		},
		
		onAfterHide: function(oEvt){
		},

		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Usuarios.controller.DetalleUsuario');
		},
		
		onPressEdit: function(oEvt){
			oNewDUsu = false;
			
			//Clonar data
  			this._uObject = jQuery.extend({}, mModel.getData().CUSUARIO[0] );
  			
  			var oVisualiz=true;
  			oCtrl_DetalleUsuario.f_toggleButtonsAndView(oVisualiz);
  			oCtrl_DetalleUsuario.byId("switchActivo").setEnabled(oVisualiz);
		},
		
		onPressCancel: function(){
			if (oNewDUsu == true) {
				oCtrl_DetalleUsuario.back();
			}else{
				mModel.setData( {"CUSUARIO" : [ this._uObject ]} );
      			mModel.refresh();
      			
      			var oVisualiz=false;
      			oCtrl_DetalleUsuario.f_toggleButtonsAndView(oVisualiz);
      			oCtrl_DetalleUsuario.byId("idfoUsu1_input").setVisible(!oVisualiz);
    			oCtrl_DetalleUsuario.byId("idfoUsu2_input").setVisible(!oVisualiz);
    			oCtrl_DetalleUsuario.byId("idfoUsu3_input").setVisible(!oVisualiz);
    			oCtrl_DetalleUsuario.byId("switchActivo").setEnabled(oVisualiz);
			}
		},
		
		f_toggleButtonsAndView: function(oVisualiz){
			 /** Forms **/
			oCtrl_DetalleUsuario.byId("idfoUsu1_input").setVisible(oVisualiz);
			oCtrl_DetalleUsuario.byId("idfoUsu2_input").setVisible(oVisualiz);
			oCtrl_DetalleUsuario.byId("idfoUsu3_input").setVisible(oVisualiz);
	        /** Inputs **/
			oCtrl_DetalleUsuario.byId("inputApellidos").setEnabled(oVisualiz);
			oCtrl_DetalleUsuario.byId("inputNombres").setEnabled(oVisualiz);
			oCtrl_DetalleUsuario.byId("inputTelefono").setEnabled(oVisualiz);
			oCtrl_DetalleUsuario.byId("inputCorreo").setEnabled(oVisualiz);
			oCtrl_DetalleUsuario.byId("inputDescripcion").setEnabled(oVisualiz);
			oCtrl_DetalleUsuario.byId("inputUsuario").setEnabled(oVisualiz);
	        /** Buttons **/
			oCtrl_DetalleUsuario.byId("btnSave").setVisible(oVisualiz);
			oCtrl_DetalleUsuario.byId("btnEdit").setVisible(!oVisualiz);
			oCtrl_DetalleUsuario.byId("btnDelete").setVisible(!oVisualiz);
			oCtrl_DetalleUsuario.byId("btnCancel").setVisible(oVisualiz);
		},
	});

});