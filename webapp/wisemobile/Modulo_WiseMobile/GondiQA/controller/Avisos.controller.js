var oCtrl_Avisos;
var Avisos_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController"],
	function (jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController) {

		var oView;

		return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.Avisos", {

			onInit: function () {
				oCtrl_Avisos = this;
				oView = this.getView();

				console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.Avisos");

				// ORR Se comenta para no crear el filtro
				//this.f_createAllFiltersPanel();

				sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function (oEvent) {
					var sRoute = oEvent.getParameter("name");

					if ("Avisos" === sRoute) {

					}
				});

				// attach handlers for validation errors
				sap.ui.getCore().attachValidationError(function (oEvt) {
					var control = oEvt.getParameter("element");
					if (control && control.setValueState) {
						control.setValueState("Error");
					}
				});
				sap.ui.getCore().attachValidationSuccess(function (oEvt) {
					var control = oEvt.getParameter("element");
					if (control && control.setValueState) {
						control.setValueState("None");
					}
				});
			},

			onBeforeRendering: function () {
				var oComboRazonSocial = this.getView().byId("comboRazonSocial");
				if (oComboRazonSocial) {
					oComboRazonSocial.setSelectedKey("");
				}
				sap.ui.getCore().getModel("mTablesAvisos").setData("");
			},

			onPressFiltrar: function (oEvt) {
				//console.log(sap.ui.getCore().getModel("mCombos"));
				var oController = oView.getController();
				var oKeyFilter = "ESTADOCUENTA";

				var condition_0 = this.getView().byId("comboRazonSocial").getSelectedKey();
				console.log(condition_0);

				if (condition_0 == "") {
					MessageBox.error("Favor de llenar todos los campos");
					return;
				} else {
					var oFilterPanel = [
						{
							"key": "condition_0",
							"text": "=" + condition_0,
							"exclude": false,
							"operation": "EQ",
							"keyField": "BUKRS",
							"value1": condition_0,
							"value2": "",
							"showIfGrouped": false,
							"typeField": "combo",
							"zstr": "<BUKRS>" + condition_0 + "</BUKRS>"
						}
					];
	
					oC_Modulo_WiseMobile.onSearchNewFilter(oEvt, oController, oFilterPanel, oKeyFilter);
				}
			},

			onAfterRendering: function (oEvt) {

				// LIMPIAR MONITOR DE BUSQUEDA (EN CASO LO HALLA)
				oCnt_FHelps.f_LimpiarMonitorBusq(this);
				if (Avisos_flag == true)
					return;

				Avisos_flag = true;

				var oTableID = oView.byId("idTableAvisos");
				// Hidden/view Columns
				DemoPersoService.setMyPersData(oTableID);

				// init and activate controller
				this._oTPC = new TablePersoController({
					table: oTableID,
					//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
					componentName: "demoApp",
					persoService: DemoPersoService,
				}).activate();
			},

			onPersoPress: function (oEvt) {
				var oTable = oEvt.getSource().getParent().getParent();

				this._oTPC.openDialog();
			},

			createContent: function () {
				console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.Avisos');
			},

			f_createAllFiltersPanel: function (oEvt) {
				oC_Modulo_WiseMobile.f_createFilterPanel("ESTADOCUENTA", oCtrl_Avisos, "idPage", 1);
			},

			onItemPressAvisos: function (oEvt) {
				var sPath = oEvt.oSource.mBindingInfos.selected.binding.oContext.sPath;
				var oObject = sap.ui.getCore().getModel("mTablesAvisos").getProperty(sPath);

				function oFunction(oData) {
					sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
					sap.ui.getCore().getModel("mMessages").refresh();

					var oObjeto = sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:ZW18_UPDATE_NOTI_READINGResponse/ES_RETURN");
					oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.MESSAGE, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title"));

				}

				oCtrl_Avisos.oServ_EnviarActAviso(oObject, oFunction);
			},

			oServ_EnviarActAviso: function (oObject, callback) {

				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:ZW18_UPDATE_NOTI_READING>';
				soapMessage = soapMessage + '<IS_UPDATE_NOTI_READ_IN>';
				soapMessage = soapMessage + '<LIFNR>' + Lifnr + '</LIFNR>';
				soapMessage = soapMessage + '<BUKRS>' + oObject.BUKRS + '</BUKRS>';
				soapMessage = soapMessage + '<AVISOID>' + oObject.IDAVISO + '</AVISOID>';

				if (oObject.ESTATUSLECTURA == false) {
					soapMessage = soapMessage + '<EVENTO>1</EVENTO>';
				} else {
					soapMessage = soapMessage + '<EVENTO>2</EVENTO>';
				}

				soapMessage = soapMessage + '</IS_UPDATE_NOTI_READ_IN>';
				soapMessage = soapMessage + '</urn:ZW18_UPDATE_NOTI_READING>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';

				oBusyDialog_d.setText(oCnt_FHelps.f_readTranslate("EnviandoSolicitud.text"));
				oBusyDialog_d.open();

				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW18,
					type: "POST",
					cache: false,
					data: soapMessage,
					contentType: "application/soap+xml; charset=utf-8",
					headers: {
						"Authorization": "Basic " + btoa(oUsuario + ":" + oPassword),
						"accept-language": oLenguaje
					},
					success: OnSuccess,
					error: OnError
				});

				function OnSuccess(data, status) {
					var json = xml2json(data);
					oBusyDialog_d.close();
					callback(json);

				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					oCnt_FHelps.f_showMessage("ERROR", error);
					oBusyDialog_d.close();
				}
			},

		});

	});