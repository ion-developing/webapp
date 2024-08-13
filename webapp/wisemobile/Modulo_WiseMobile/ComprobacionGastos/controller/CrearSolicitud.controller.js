var oCtrl_CrearSolicitud;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.controller.CrearSolicitud", {

		onInit : function() {
			oCtrl_CrearSolicitud = this;
   			oView = this.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.controller.CrearSolicitud");

	        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("CrearSolicitud" === sRoute) {
	        		
	        	}
	        });	
	        
			// attach handlers for validation errors
			sap.ui.getCore().attachValidationError(function(oEvt) {
				var control = oEvt.getParameter("element");
				if (control && control.setValueState) {
					control.setValueState("Error");
				}
			});
			sap.ui.getCore().attachValidationSuccess(function(oEvt) {
				var control = oEvt.getParameter("element");
				if (control && control.setValueState) {
					control.setValueState("None");
				}
			});

		},

		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.controller.CrearSolicitud');
		},
		
		onPressNuevaSolicitud: function(oEvt) {
			
			var oForm = oView.byId("idForm");
			
			if(oCnt_FHelps.f_Inputs_Form(oForm) == false){
				return;
			}
			
			var _timeout;
			
			var oBusyDialog_c = new sap.m.BusyDialog({
				title	: oCnt_FHelps.f_readTranslate("Wait.title"),
			    text	: oCnt_FHelps.f_readTranslate("EnviandoSolicitud.text"),
				close : function(oEvt) {
					jQuery.sap.clearDelayedCall(_timeout);
					oCnt_FHelps.f_Clean_Form(oForm);
					oView.byId("idTAComentarios").setValue("");
					
					oCnt_FHelps.f_showMessage("INFORMATION", oCnt_FHelps.f_readTranslate("Solicitud.Exito.text"), undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
				}
			});
			
			// open dialog
			oBusyDialog_c.open();

			// simulate end of operation
			_timeout = jQuery.sap.delayedCall(1000, this, function () {
				oBusyDialog_c.close();
			});
			
		},
		
		selectionChange : function() {
			var id_Division=this.getView().byId("idDivision").getSelectedKey();;
			
			if(id_Division=="1"){
				this.getView().byId("idCeco").setValue("MX01");
			}
			if(id_Division=="2"){
				this.getView().byId("idCeco").setValue("MX02");
			}
			if(id_Division=="3"){
				this.getView().byId("idCeco").setValue("MX03");
			}
		},
		
	});

});