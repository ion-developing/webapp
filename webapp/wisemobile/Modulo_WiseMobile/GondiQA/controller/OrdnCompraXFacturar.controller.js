var oCtrl_OrdnCompraXFacturar;
var OrdnCompraXFacturar_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController", "com/axiomasoluciones/wisemobile/Modulo_WiseMobile/Utils/formatter"],
	function (jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController, formatter) {

		var oView;

		return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.OrdnCompraXFacturar", {
			formatter: formatter,
			onInit: function () {
				// ORR
				var toolbarText = sap.ui.getCore().byId("__title0");
				toolbarText.setText("Portal P2P");
				//

				oCtrl_OrdnCompraXFacturar = this;
				oView = this.getView();

				console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.OrdnCompraXFacturar");

				// ORR Se comenta para no crear el filtro
				//this.f_createAllFiltersPanel();

				sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function (oEvent) {
					var sRoute = oEvent.getParameter("name");

					if ("OrdnCompraXFacturar" === sRoute) {

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
				var odatePickerFrom = this.getView().byId("datePickerFrom");
				var odatePickerTo = this.getView().byId("datePickerTo");
				var ocomboTipoRecepcion = this.getView().byId("comboTipoRecepcion");
			//	var ocomboMoneda = this.getView().byId("comboMoneda");

				if (oComboRazonSocial || odatePickerFrom || odatePickerTo || ocomboTipoRecepcion || ocomboMoneda) {
					oComboRazonSocial.setSelectedKey("");
					odatePickerFrom.setValue("");
					odatePickerTo.setValue("");
					ocomboTipoRecepcion.setSelectedKey("");
			//		ocomboMoneda.setSelectedKey("");
				}

				sap.ui.getCore().getModel("mTablesOrdenesCompraxFacturar").setData("");
			},

			onPressFiltrar: function (oEvt) {
				//console.log(sap.ui.getCore().getModel("mCombos"));
				var oController = oView.getController();
				var oKeyFilter = "ORDENCOMPRACFACTURA";

				var condition_0 = this.getView().byId("comboRazonSocial").getSelectedKey();
				console.log(condition_0);

				var condition_1_ini = this.getView().byId("datePickerFrom").getValue();
				var condition_1_fin = this.getView().byId("datePickerTo").getValue();
				console.log(condition_1_ini);
				console.log(condition_1_fin)

				var condition_2 = this.getView().byId("comboTipoRecepcion").getSelectedKey();
				console.log(condition_2);

				//var condition_3 = this.getView().byId("comboMoneda").getSelectedKey();
				//console.log(condition_3);

			//	if (condition_0 == "" || condition_1_ini == "" || condition_1_fin == "" || condition_2 == "" || condition_3 == "") {
				if (condition_0 == "" || condition_1_ini == "" || condition_1_fin == "" || condition_2 == "") {
			MessageBox.error("Favor de llenar todos los campos");
					return;
				} else {
					var oFilterPanel = [
						{
							"key": "condition_0",
							"text": "Razón social: =" + condition_0,
							"exclude": false,
							"operation": "EQ",
							"keyField": "BUKRS",
							"value1": condition_0,
							"value2": "",
							"showIfGrouped": false,
							"typeField": "combo",
							"zstr": "<BUKRS>" + condition_0 + "</BUKRS>"
						},
						{
							"key": "condition_1",
							"text": "Fecha orden de Compra: " + condition_1_ini + "..." + condition_1_fin,
							"exclude": false,
							"operation": "BT",
							"keyField": "f_orden_Compra",
							"value1": condition_1_ini,
							"value2": condition_1_fin,
							"showIfGrouped": false,
							"typeField": "date",
							"zstr": "<f_orden_Compra><SIGN>I</SIGN><OPTION>BT</OPTION><LOW>" + condition_1_ini + "</LOW><HIGH>" + condition_1_fin + "</HIGH></f_orden_Compra>"
						},
						{
							"key": "condition_2",
							"text": "Tipo Recepción: =" + condition_2,
							"exclude": false,
							"operation": "EQ",
							"keyField": "tipo_recepcion",
							"value1": condition_2,
							"value2": "",
							"showIfGrouped": false,
							"typeField": "combo",
							"zstr": "<tipo_recepcion>" + condition_2 + "</tipo_recepcion>"
						},
						/* {
							"key": "condition_3",
							"text": "Moneda: =" + condition_3,
							"exclude": false,
							"operation": "EQ",
							"keyField": "WAERS",
							"value1": condition_3,
							"value2": "",
							"showIfGrouped": false,
							"typeField": "combo",
							"zstr": "<WAERS>" + condition_3 + "</WAERS>"
						} */
					];

					oC_Modulo_WiseMobile.onSearchNewFilter(oEvt, oController, oFilterPanel, oKeyFilter);
				}

			},

			createContent: function () {
				console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.OrdnCompraXFacturar');
			},

			f_createAllFiltersPanel: function (oEvt) {
				oC_Modulo_WiseMobile.f_createFilterPanel("ORDENCOMPRACFACTURA", oCtrl_OrdnCompraXFacturar, "idPage", 4);
			},

			onAfterRendering: function (oEvt) {
				if (OrdnCompraXFacturar_flag == true)
					return;

				OrdnCompraXFacturar_flag = true;

				var oTableID = oView.byId("idTableOrdnCompraXFacturar");
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
				this._oTPC.openDialog();
			},


		});

	});