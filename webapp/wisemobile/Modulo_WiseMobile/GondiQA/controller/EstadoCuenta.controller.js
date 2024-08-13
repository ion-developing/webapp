var oCtrl_EstadoCuenta_Gondi;
var EstadoCuenta_Gondi_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController", "com/axiomasoluciones/wisemobile/Modulo_WiseMobile/Utils/formatter"],
	function (jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController, formatter) {

		var oView;

		return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.EstadoCuenta", {
			formatter, formatter,
			onInit: function () {
				// Filtro por columna tabla de partidas abiertas
				/*
				var that = this;
				var oSearchField = new sap.m.SearchField({
					placeholder: "Buscar...", // Texto de marcador de posición
					search: function (oEvent) {
						var tableId = that.byId("idTablePartidasAbiertas");
						console.log(tableId);

						var inputValue = oEvent.getParameter("query");
						var trimValue = inputValue.trim();
						var filterArr = [];
						var items = tableId.getBinding("items");
						var filter1 = new sap.ui.model.Filter("BELNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter2 = new sap.ui.model.Filter("XBLNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter3 = new sap.ui.model.Filter("UUID", sap.ui.model.FilterOperator.Contains, trimValue);
						filterArr = [filter1, filter2, filter3];

						var finalFilter = new sap.ui.model.Filter({
							filters: filterArr,
							and: false
						});
						items.filter(finalFilter);
					}
				});

				var oSearchFieldPc = new sap.m.SearchField({
					placeholder: "Buscar...", // Texto de marcador de posición
					search: function (oEvent) {
						var tableId = that.byId("idTablePartidasCompensadas");
						console.log(tableId);

						var inputValue = oEvent.getParameter("query");
						var trimValue = inputValue.trim();
						var filterArr = [];
						var items = tableId.getBinding("items");
						var filter1 = new sap.ui.model.Filter("BELNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter2 = new sap.ui.model.Filter("XBLNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter3 = new sap.ui.model.Filter("UUID", sap.ui.model.FilterOperator.Contains, trimValue);
						filterArr = [filter1, filter2, filter3];

						var finalFilter = new sap.ui.model.Filter({
							filters: filterArr,
							and: false
						});
						items.filter(finalFilter);
					}
				});

				var oResposivePopover = new sap.m.ResponsivePopover({
					title: "",
					placement: "Bottom",
					content: [oSearchField]
				});

				var oResposivePopoverPc = new sap.m.ResponsivePopover({
					title: "",
					placement: "Bottom",
					content: [oSearchFieldPc]
				});

				var oTable = this.getView().byId("idTablePartidasAbiertas");
				oTable.addEventDelegate({
					onAfterRendering: function () {
						var oHeader = this.$().find('.sapMListTblHeaderCell'); //Get hold of table header elements
						console.log(oHeader);
						for (var i = 0; i < oHeader.length; i++) {
							var oID = oHeader[i].id;
							console.log(oID);
							$('#' + oID).click(function (oEvent) {
								var oTarget = oEvent.currentTarget;
								var oLabelText = oTarget.childNodes[0].textContent;
								console.log(oLabelText);
								if (oLabelText === "UUID" || oLabelText === "No. Documento" || oLabelText === "Referencia") {
									oResposivePopover.setTitle(oLabelText);
									oResposivePopover.openBy(oTarget);
								}

							})
						}
					}
				}, oTable);

				var oTablePc = this.getView().byId("idTablePartidasCompensadas");
				oTable.addEventDelegate({
					onAfterRendering: function () {
						var oHeader = this.$().find('.sapMListTblHeaderCell'); //Get hold of table header elements
						console.log(oHeader);
						for (var i = 0; i < oHeader.length; i++) {
							var oID = oHeader[i].id;
							console.log(oID);
							$('#' + oID).click(function (oEvent) {
								var oTarget = oEvent.currentTarget;
								var oLabelText = oTarget.childNodes[0].textContent;
								if (oLabelText === "UUID" || oLabelText === "No. Documento" || oLabelText === "Referencia") {
									oResposivePopoverPc.setTitle(oLabelText);
									oResposivePopoverPc.openBy(oTarget);
								}
							})
						}
					}
				}, oTablePc);
				*/
				//

				oCtrl_EstadoCuenta_Gondi = this;
				oView = this.getView();

				console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.EstadoCuenta");

				// ORR Se comenta para no crear el filtro
				//this.f_createAllFiltersPanel();

				sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function (oEvent) {
					var sRoute = oEvent.getParameter("name");

					if ("EstadoCuenta_Gondi" === sRoute) {

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
					oComboRazonSocial.setSelectedKey(""); // limpia el valor seleccionado del select sociedades
				}
				sap.ui.getCore().getModel("mTablesPartidasAbiertas").setData(""); //impieza de datos
				sap.ui.getCore().getModel("mTablesPartidasCompensadas").setData("");

			},

			onPressFiltrar: function (oEvt) {
				//console.log(sap.ui.getCore().getModel("mCombos"));
				var oController = oView.getController();
				var oKeyFilter = "ESTADOCUENTA";

				var condition_0 = this.getView().byId("comboRazonSocial").getSelectedKey();
				console.log(condition_0);

				var condition_1_ini = this.getView().byId("datePickerFrom").getValue();
				var condition_1_fin = this.getView().byId("datePickerTo").getValue();
				console.log(condition_1_ini);
				console.log(condition_1_fin);

				if (condition_0 === "" || condition_1_ini === "" || condition_1_fin === "") {
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
						},
						{
							"key": "condition_1",
							"text": "Fecha Documento: " + condition_1_ini + "..." + condition_1_fin,
							"exclude": false,
							"operation": "BT",
							"keyField": "f_Documento",
							"value1": condition_1_ini,
							"value2": condition_1_fin,
							"showIfGrouped": false,
							"typeField": "date",
							"zstr": "<f_Documento><SIGN>I</SIGN><OPTION>BT</OPTION><LOW>" + condition_1_ini + "</LOW><HIGH>" + condition_1_fin + "</HIGH></f_Factura>"
						}
					];

					oC_Modulo_WiseMobile.onSearchNewFilter(oEvt, oController, oFilterPanel, oKeyFilter);
				}

			},

			createContent: function () {
				console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.EstadoCuenta');
			},

			f_createAllFiltersPanel: function (oEvt) {
				oC_Modulo_WiseMobile.f_createFilterPanel("ESTADOCUENTA", oCtrl_EstadoCuenta_Gondi, "idPage", 1);
			},

			onAfterRendering: function (oEvt) {
				if (EstadoCuenta_Gondi_flag == true)
					return;

				EstadoCuenta_Gondi_flag = true;

				var oTableID_1 = oView.byId("idTablePartidasAbiertas");
				// Hidden/view Columns
				DemoPersoService.setMyPersData(oTableID_1);

				// init and activate controller
				this._oTPC_1 = new TablePersoController({
					table: oTableID_1,
					//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
					componentName: "demoApp",
					persoService: DemoPersoService,
				}).activate();


				var oTableID_2 = oView.byId("idTablePartidasCompensadas");
				// Hidden/view Columns
				DemoPersoService.setMyPersData(oTableID_2, "EstadoCuenta_Gondi", 10);

				// init and activate controller
				this._oTPC_2 = new TablePersoController({
					table: oTableID_2,
					//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
					componentName: "demoApp",
					persoService: DemoPersoService,
				}).activate();
			},

			onPersoPress: function (oEvt) {
				var oTable = oEvt.getSource().getParent().getParent();

				if (oTable.getId().indexOf("idTablePartidasAbiertas") != -1)
					this._oTPC_1.openDialog();
				else if (oTable.getId().indexOf("idTablePartidasCompensadas") != -1)
					this._oTPC_2.openDialog();
			},

			onPressExportar: function (oEvt) {
				var oTableId = "idTablePartidasAbiertas";

				oCnt_FHelps.f_ExportarXLSX(oTableId, oView);
			},

			handleChangeSearchPA: function (oEvent) {
				var tableId = this.byId("idTablePartidasAbiertas");
				console.log(tableId);

				var inputValue = oEvent.getParameter("query");
				var trimValue = inputValue.trim();
				var filterArr = [];
				var items = tableId.getBinding("items");
				var filter1 = new sap.ui.model.Filter("BELNR", sap.ui.model.FilterOperator.Contains, trimValue);
				var filter2 = new sap.ui.model.Filter("XBLNR", sap.ui.model.FilterOperator.Contains, trimValue);
				var filter3 = new sap.ui.model.Filter("UUID", sap.ui.model.FilterOperator.Contains, trimValue);
				var filter4 = new sap.ui.model.Filter("AUGBL", sap.ui.model.FilterOperator.Contains, trimValue);
				filterArr = [filter1, filter2, filter3, filter4];

				var finalFilter = new sap.ui.model.Filter({
					filters: filterArr,
					and: false
				});
				items.filter(finalFilter);

			},

			handleChangeSearchPC: function (oEvent) {
				var tableId = this.byId("idTablePartidasCompensadas");
				console.log(tableId);

				var inputValue = oEvent.getParameter("query");
				var trimValue = inputValue.trim();
				var filterArr = [];
				var items = tableId.getBinding("items");
				var filter1 = new sap.ui.model.Filter("BELNR", sap.ui.model.FilterOperator.Contains, trimValue);
				var filter2 = new sap.ui.model.Filter("XBLNR", sap.ui.model.FilterOperator.Contains, trimValue);
				var filter3 = new sap.ui.model.Filter("UUID", sap.ui.model.FilterOperator.Contains, trimValue);
				var filter4 = new sap.ui.model.Filter("AUGBL", sap.ui.model.FilterOperator.Contains, trimValue);
				filterArr = [filter1, filter2, filter3, filter4];

				var finalFilter = new sap.ui.model.Filter({
					filters: filterArr,
					and: false
				});
				items.filter(finalFilter);

			},

			onFilterColumnDocPa: function (oEvent) {
				var that = this;
				var oSearchField = new sap.m.SearchField({
					placeholder: "Buscar...", // Texto de marcador de posición
					search: function (oEvent) {
						var tableId = that.byId("idTablePartidasAbiertas");
						console.log(tableId);

						var inputValue = oEvent.getParameter("query");
						var trimValue = inputValue.trim();
						var filterArr = [];
						var items = tableId.getBinding("items");
						var filter1 = new sap.ui.model.Filter("BELNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter2 = new sap.ui.model.Filter("XBLNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter3 = new sap.ui.model.Filter("UUID", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter4 = new sap.ui.model.Filter("AUGBL", sap.ui.model.FilterOperator.Contains, trimValue);
						filterArr = [filter1, filter2, filter3, filter4];

						var finalFilter = new sap.ui.model.Filter({
							filters: filterArr,
							and: false
						});
						items.filter(finalFilter);
					}
				});

				var oPopover = new sap.m.Popover({
					title: "Filtro",
					content: oSearchField,
					placement: sap.m.PlacementType.Auto
				});

				// Assume oButton is the button that opens the popover
				var oButton = this.getView().byId("docPaButton"); // Replace with the id of your button
				oPopover.openBy(oButton);
			},

			onFilterColumnReferenciaPa: function (oEvent) {
				var that = this;
				var oSearchField = new sap.m.SearchField({
					placeholder: "Buscar...", // Texto de marcador de posición
					search: function (oEvent) {
						var tableId = that.byId("idTablePartidasAbiertas");
						console.log(tableId);

						var inputValue = oEvent.getParameter("query");
						var trimValue = inputValue.trim();
						var filterArr = [];
						var items = tableId.getBinding("items");
						var filter1 = new sap.ui.model.Filter("BELNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter2 = new sap.ui.model.Filter("XBLNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter3 = new sap.ui.model.Filter("UUID", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter4 = new sap.ui.model.Filter("AUGBL", sap.ui.model.FilterOperator.Contains, trimValue);
						filterArr = [filter1, filter2, filter3, filter4];

						var finalFilter = new sap.ui.model.Filter({
							filters: filterArr,
							and: false
						});
						items.filter(finalFilter);
					}
				});

				var oPopover = new sap.m.Popover({
					title: "Filtro",
					content: oSearchField,
					placement: sap.m.PlacementType.Auto
				});

				// Assume oButton is the button that opens the popover
				var oButton = this.getView().byId("referenciaPaButton"); // Replace with the id of your button
				oPopover.openBy(oButton);
			},

			onFilterColumnUuidPa: function (oEvent) {
				var that = this;
				var oSearchField = new sap.m.SearchField({
					placeholder: "Buscar...", // Texto de marcador de posición
					search: function (oEvent) {
						var tableId = that.byId("idTablePartidasAbiertas");
						console.log(tableId);

						var inputValue = oEvent.getParameter("query");
						var trimValue = inputValue.trim();
						var filterArr = [];
						var items = tableId.getBinding("items");
						var filter1 = new sap.ui.model.Filter("BELNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter2 = new sap.ui.model.Filter("XBLNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter3 = new sap.ui.model.Filter("UUID", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter4 = new sap.ui.model.Filter("AUGBL", sap.ui.model.FilterOperator.Contains, trimValue);
						filterArr = [filter1, filter2, filter3, filter4];

						var finalFilter = new sap.ui.model.Filter({
							filters: filterArr,
							and: false
						});
						items.filter(finalFilter);
					}
				});

				var oPopover = new sap.m.Popover({
					title: "Filtro",
					content: oSearchField,
					placement: sap.m.PlacementType.Auto
				});

				// Assume oButton is the button that opens the popover
				var oButton = this.getView().byId("uuidPaButton"); // Replace with the id of your button
				oPopover.openBy(oButton);
			},

			onFilterColumnDocDePagosPa: function (oEvent) {
				var that = this;
				var oSearchField = new sap.m.SearchField({
					placeholder: "Buscar...", // Texto de marcador de posición
					search: function (oEvent) {
						var tableId = that.byId("idTablePartidasAbiertas");
						console.log(tableId);

						var inputValue = oEvent.getParameter("query");
						var trimValue = inputValue.trim();
						var filterArr = [];
						var items = tableId.getBinding("items");
						var filter1 = new sap.ui.model.Filter("BELNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter2 = new sap.ui.model.Filter("XBLNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter3 = new sap.ui.model.Filter("UUID", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter4 = new sap.ui.model.Filter("AUGBL", sap.ui.model.FilterOperator.Contains, trimValue);
						filterArr = [filter1, filter2, filter3, filter4];

						var finalFilter = new sap.ui.model.Filter({
							filters: filterArr,
							and: false
						});
						items.filter(finalFilter);
					}
				});

				var oPopover = new sap.m.Popover({
					title: "Filtro",
					content: oSearchField,
					placement: sap.m.PlacementType.Auto
				});

				// Assume oButton is the button that opens the popover
				var oButton = this.getView().byId("uuidPaButton"); // Replace with the id of your button
				oPopover.openBy(oButton);
			},

			onFilterColumnDocPc: function (oEvent) {
				var that = this;
				var oSearchField = new sap.m.SearchField({
					placeholder: "Buscar...", // Texto de marcador de posición
					search: function (oEvent) {
						var tableId = that.byId("idTablePartidasCompensadas");
						console.log(tableId);

						var inputValue = oEvent.getParameter("query");
						var trimValue = inputValue.trim();
						var filterArr = [];
						var items = tableId.getBinding("items");
						var filter1 = new sap.ui.model.Filter("BELNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter2 = new sap.ui.model.Filter("XBLNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter3 = new sap.ui.model.Filter("UUID", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter4 = new sap.ui.model.Filter("AUGBL", sap.ui.model.FilterOperator.Contains, trimValue);
						filterArr = [filter1, filter2, filter3, filter4];

						var finalFilter = new sap.ui.model.Filter({
							filters: filterArr,
							and: false
						});
						items.filter(finalFilter);
					}
				});

				var oPopover = new sap.m.Popover({
					title: "Filtro",
					content: oSearchField,
					placement: sap.m.PlacementType.Auto
				});

				// Assume oButton is the button that opens the popover
				var oButton = this.getView().byId("docPcButton"); // Replace with the id of your button
				oPopover.openBy(oButton);
			},

			onFilterColumnReferenciaPc: function (oEvent) {
				var that = this;
				var oSearchField = new sap.m.SearchField({
					placeholder: "Buscar...", // Texto de marcador de posición
					search: function (oEvent) {
						var tableId = that.byId("idTablePartidasCompensadas");
						console.log(tableId);

						var inputValue = oEvent.getParameter("query");
						var trimValue = inputValue.trim();
						var filterArr = [];
						var items = tableId.getBinding("items");
						var filter1 = new sap.ui.model.Filter("BELNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter2 = new sap.ui.model.Filter("XBLNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter3 = new sap.ui.model.Filter("UUID", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter4 = new sap.ui.model.Filter("AUGBL", sap.ui.model.FilterOperator.Contains, trimValue);
						filterArr = [filter1, filter2, filter3, filter4];

						var finalFilter = new sap.ui.model.Filter({
							filters: filterArr,
							and: false
						});
						items.filter(finalFilter);
					}
				});

				var oPopover = new sap.m.Popover({
					title: "Filtro",
					content: oSearchField,
					placement: sap.m.PlacementType.Auto
				});

				// Assume oButton is the button that opens the popover
				var oButton = this.getView().byId("referenciaPcButton"); // Replace with the id of your button
				oPopover.openBy(oButton);
			},

			onFilterColumnUuidPc: function (oEvent) {
				var that = this;
				var oSearchField = new sap.m.SearchField({
					placeholder: "Buscar...", // Texto de marcador de posición
					search: function (oEvent) {
						var tableId = that.byId("idTablePartidasCompensadas");
						console.log(tableId);

						var inputValue = oEvent.getParameter("query");
						var trimValue = inputValue.trim();
						var filterArr = [];
						var items = tableId.getBinding("items");
						var filter1 = new sap.ui.model.Filter("BELNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter2 = new sap.ui.model.Filter("XBLNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter3 = new sap.ui.model.Filter("UUID", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter4 = new sap.ui.model.Filter("AUGBL", sap.ui.model.FilterOperator.Contains, trimValue);
						filterArr = [filter1, filter2, filter3, filter4];

						var finalFilter = new sap.ui.model.Filter({
							filters: filterArr,
							and: false
						});
						items.filter(finalFilter);
					}
				});

				var oPopover = new sap.m.Popover({
					title: "Filtro",
					content: oSearchField,
					placement: sap.m.PlacementType.Auto
				});

				// Assume oButton is the button that opens the popover
				var oButton = this.getView().byId("uuidPcButton"); // Replace with the id of your button
				oPopover.openBy(oButton);
			},

			onFilterColumnDocDePagosPc: function (oEvent) {
				var that = this;
				var oSearchField = new sap.m.SearchField({
					placeholder: "Buscar...", // Texto de marcador de posición
					search: function (oEvent) {
						var tableId = that.byId("idTablePartidasCompensadas");
						console.log(tableId);

						var inputValue = oEvent.getParameter("query");
						var trimValue = inputValue.trim();
						var filterArr = [];
						var items = tableId.getBinding("items");
						var filter1 = new sap.ui.model.Filter("BELNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter2 = new sap.ui.model.Filter("XBLNR", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter3 = new sap.ui.model.Filter("UUID", sap.ui.model.FilterOperator.Contains, trimValue);
						var filter4 = new sap.ui.model.Filter("AUGBL", sap.ui.model.FilterOperator.Contains, trimValue);
						filterArr = [filter1, filter2, filter3, filter4];

						var finalFilter = new sap.ui.model.Filter({
							filters: filterArr,
							and: false
						});
						items.filter(finalFilter);
					}
				});

				var oPopover = new sap.m.Popover({
					title: "Filtro",
					content: oSearchField,
					placement: sap.m.PlacementType.Auto
				});

				// Assume oButton is the button that opens the popover
				var oButton = this.getView().byId("uuidPcButton"); // Replace with the id of your button
				oPopover.openBy(oButton);
			}

		});

	});