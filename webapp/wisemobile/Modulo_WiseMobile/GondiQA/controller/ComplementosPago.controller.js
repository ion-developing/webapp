var oCtrl_ComplementosPago;
var ComplementosPago_flag = false;
var oBusyDialog_c;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController", "com/axiomasoluciones/wisemobile/Modulo_WiseMobile/Utils/formatter"],
	function (jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController, formatter) {

		var oView;

		return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.ComplementosPago", {
			formatter: formatter,
			onInit: function () {

				oCtrl_ComplementosPago = this;
				oView = this.getView();

				console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.ComplementosPago");

				// ORR Se comenta para no crear el filtro
				//this.f_createAllFiltersPanel();

				sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function (oEvent) {
					var sRoute = oEvent.getParameter("name");

					if ("ComplementosPago" === sRoute) {

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
				var ocomboSociedad = this.getView().byId("comboSociedad");
				var odatePickerFrom = this.getView().byId("datePickerFrom");
				var odatePickerTo = this.getView().byId("datePickerTo");
				var ocomboEstado = this.getView().byId("comboEstado");

				if (ocomboSociedad || odatePickerFrom || odatePickerTo || ocomboEstado) {
					ocomboSociedad.setSelectedKey("");
					odatePickerFrom.setValue("");
					odatePickerTo.setValue("");
					ocomboEstado.setSelectedKey("");
				}

				sap.ui.getCore().getModel("mTablesListadoDocComp").setData("");
			},


			onPressFiltrar: function (oEvt) {
				//console.log(sap.ui.getCore().getModel("mCombos"));
				var oController = oView.getController();
				var oKeyFilter = "COMPLEMENTOS";

				var condition_0 = this.getView().byId("comboSociedad").getSelectedKey();
				console.log(condition_0);

				var condition_1_ini = this.getView().byId("datePickerFrom").getValue();
				var condition_1_fin = this.getView().byId("datePickerTo").getValue();
				console.log(condition_1_ini);
				console.log(condition_1_fin)

				var condition_2 = this.getView().byId("comboEstado").getSelectedKey();
				console.log(condition_2);

				if (condition_0 === "" || condition_1_ini === "" || condition_1_fin === "" || condition_2 === "") {
					MessageBox.error("Favor de llenar todos los campos");
					return;
				} else {
					var oFilterPanel = [
						{
							"key": "condition_0",
							"text": "Sociedad: =" + condition_0,
							"exclude": false,
							"operation": "EQ",
							"keyField": "sociedad",
							"value1": condition_0,
							"value2": "",
							"showIfGrouped": false,
							"typeField": "combo",
							"zstr": "<sociedad>" + condition_0 + "</sociedad>"
						},
						{
							"key": "condition_1",
							"text": "Fecha Pago: " + condition_1_ini + "..." + condition_1_fin,
							"exclude": false,
							"operation": "BT",
							"keyField": "f_pago",
							"value1": condition_1_ini,
							"value2": condition_1_fin,
							"showIfGrouped": false,
							"typeField": "date",
							"zstr": "<f_pago><SIGN>I</SIGN><OPTION>BT</OPTION><LOW>" + condition_1_ini + "</LOW><HIGH>" + condition_1_fin + "</HIGH></f_pago>"
						},
						{
							"key": "condition_2",
							"text": "Estado: =" + condition_2,
							"exclude": false,
							"operation": "EQ",
							"keyField": "estado",
							"value1": condition_2,
							"value2": "",
							"showIfGrouped": false,
							"typeField": "combo",
							"zstr": "<estado>" + condition_2 + "</estado>"
						}
					];

					oC_Modulo_WiseMobile.onSearchNewFilter(oEvt, oController, oFilterPanel, oKeyFilter);
				}
			},

			createContent: function () {
				console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.ComplementosPago');
			},

			f_createAllFiltersPanel: function (oEvt) {
				oC_Modulo_WiseMobile.f_createFilterPanel("COMPLEMENTOS", this, "idPage", 3);
			},

			onBeforeShow: function () {
				var oTableID = oView.byId("idTableComplementosPago");
				oControl = oCtrl_ComplementosPago.getView().byId("idPage").removeContent(0);

				if (oCtrl_ComplementosPago.f_createAllFiltersPanel() != true) {
					oTableID.removeSelections();
					oTableID.setGrowingThreshold(5);

					sap.ui.getCore().getModel("mTablesListadoDocComp").setData({ DOC_COMPENSADOS: [] });//revisar datos
					sap.ui.getCore().getModel("mTablesListadoDocComp").refresh();


				}

				setTimeout(function () {
					oControl.destroy();
				}, 250);

			},

			onAfterRendering: function (oEvt) {

				// LIMPIAR MONITOR DE BUSQUEDA (EN CASO LO HALLA)
				oCnt_FHelps.f_LimpiarMonitorBusq(this);
				if (ComplementosPago_flag == true)
					return;

				ComplementosPago_flag = true;

				var oTableID = oView.byId("idTableComplementosPago");
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

			onPressCargarXML: function (oEvt) {
				var that = this;

				var oTable = oView.byId("idTableComplementosPago");
				var length = oTable.getSelectedItems().length;

				if (length == 0) {
					var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
					oCnt_FHelps.f_showMessage("WARNING", oText);
				}
				else if (length >= 1) {
					var idx = oTable.indexOfItem(oTable.getSelectedItem()); // getSelectedItems
					var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
					var oModel = oCore.getModel(oNameModel);
					var oPath = oTable.getBindingInfo("items").path;

					var oObject = oModel.getProperty(oPath + "/" + idx);
					oCore.getModel("mComplemento").setProperty("/", oObject);
					/*
					 * AQUI VIENE
					 */
					var oFileUploaderXML = new sap.ui.unified.FileUploader({
						name: "testxml",
						//uploadUrl: "../../../../upload/",
						sendXHR: true,
						value: "",
						//width: "400px",
						tooltip: "Upload your file to the local server.",
						placeholder: "Choose a file for uploading...",
						fileType: ["xml"],
						maximumFileSize: 2,
						uploadOnChange: false,
						multiple: true,
						buttonText: "Browse...",
						//additionalData: "abc=123&test=456",
						fileSizeExceed: function (oEvent) {
							var fileSize = oEvent.getParameter("fileSize"),
								fileName = oEvent.getParameter("fileName");
							oCnt_FHelps.f_showMessage("WARNING", "The chosen file '" + fileName + "' is " + fileSize + " MB big, this exceeds the maximum filesize of " + oEvent.getSource().getMaximumFileSize() + " MB.");
						}
					});

					var oFileUploaderPDF = new sap.ui.unified.FileUploader({
						name: "testpdf",
						//uploadUrl: "../../../../upload/",
						sendXHR: true,
						value: "",
						//width: "400px",
						tooltip: "Upload your file to the local server.",
						placeholder: "Choose a file for uploading...",
						fileType: ["pdf"],
						maximumFileSize: 2,
						uploadOnChange: false,
						multiple: true,
						buttonText: "Browse...",
						//additionalData: "abc=123&test=456",
						fileSizeExceed: function (oEvent) {
							var fileSize = oEvent.getParameter("fileSize"),
								fileName = oEvent.getParameter("fileName");
							oCnt_FHelps.f_showMessage("WARNING", "The chosen file '" + fileName + "' is " + fileSize + " MB big, this exceeds the maximum filesize of " + oEvent.getSource().getMaximumFileSize() + " MB.");
						}
					});

					var oDialog = new sap.m.Dialog({
						customHeader: new sap.m.Bar({
							contentMiddle: new sap.m.Label({
								text: "{i18n>ComplementosPago.CargarXML.Popup.title}"
							}),
							contentRight: new sap.m.Button({
								icon: "sap-icon://decline",
								press: function () {
									oDialog.close();
								}
							})
						}),
						content: [
							new sap.ui.layout.form.Form({
								editable: true,
								layout: new sap.ui.layout.form.ResponsiveGridLayout(),
								formContainers: [
									new sap.ui.layout.form.FormContainer({
										formElements: [
											new sap.ui.layout.form.FormElement({
												label: "{i18n>ComplementosPago.CargarXML.Popup.Form.Label.1}",
												fields: [
													new sap.m.Input({ value: "{mComplemento>/BUKRS}", enabled: false })
												]
											}),
											new sap.ui.layout.form.FormElement({
												label: "{i18n>ComplementosPago.CargarXML.Popup.Form.Label.2}",
												fields: [
													new sap.m.Input({ value: "{mComplemento>/BELNR}", enabled: false })
												]
											}),
											new sap.ui.layout.form.FormElement({
												label: "{i18n>ComplementosPago.CargarXML.Popup.Form.Label.3}",
												fields: [
													new sap.m.Input({ value: "{mComplemento>/GJAHR}", enabled: false })
												]
											}),
											new sap.ui.layout.form.FormElement({
												label: "{i18n>ComplementosPago.CargarXML.Popup.Form.Label.4}",
												fields: [
													oFileUploaderXML
												]
											}),
											new sap.ui.layout.form.FormElement({
												label: "{i18n>ComplementosPago.CargarXML.Popup.Form.Label.5}",
												fields: [
													oFileUploaderPDF
												]
											})
										]
									})
								]
							})

						],
						buttons: [
							new sap.m.Button({
								text: "{i18n>Popup.Button.Enviar}",
								press: function (oEvt) {

									var oForm = oView.byId("idFormEnvioFacturas");

									if (oCnt_FHelps.f_Inputs([oFileUploaderXML, oFileUploaderPDF]) == true) {
										oDialog.close();

										var domRef_xml = oFileUploaderXML.getFocusDomRef();
										var domRef_pdf = oFileUploaderPDF.getFocusDomRef();
										var file_xml = domRef_xml.files[0];
										var file_pdf = domRef_pdf.files[0];
										var data_file_xml;
										var data_file_pdf;

										var oFunction1 = function (File64xml) {

											data_file_xml = File64xml;

											var oFunction2 = function (File64pdf) {
												data_file_pdf = File64pdf;

												function oFunction(oData) {

													sap.ui.getCore().getModel("mMessages").setData(oData);

													var length = sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:ZW12_FM_WS_SAVE_XML_DATAResponse/IM_OUT_RETURN/item").length;
													var mData = sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:ZW12_FM_WS_SAVE_XML_DATAResponse/IM_OUT_RETURN/item");

													if (length == undefined) {
														sap.ui.getCore().getModel("mMessages").setData([mData]);
													} else {
														sap.ui.getCore().getModel("mMessages").setData(mData);
													}

													////////////
													var oObjeto = sap.ui.getCore().getModel("mMessages").getData()[0];

													function oFunction3(oData) {
														setTimeout(function () {
															oCtrl_ComplementosPago.byId("FilterPanel").getButton_Search().firePress();
														}, 500);

													}

													if (oObjeto.Type == "E") {
														oCnt_FHelps.f_showMessage("WARNING", oObjeto.Message, oFunction3, oCnt_FHelps.f_readTranslate("ComplementosPago.Error.Popup.title"));
													} else {
														oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.Message, oFunction3, oCnt_FHelps.f_readTranslate("Mensaje.title"));
													}


												}

												// CONSULTA : https://www.browserling.com/tools/file-to-base64
												oObject.binario_xml = data_file_xml.replace("data:text/xml;base64,", "");
												oObject.binario_pdf = data_file_pdf.replace("data:application/pdf;base64,", "");
												oCtrl_ComplementosPago.oServ_EnviarCargarXML(oObject, oFunction);
											}

											oCnt_FHelps.f_ToBase64Binary(file_pdf, oFunction2);
										}

										oCnt_FHelps.f_ToBase64Binary(file_xml, oFunction1);

										// open dialog

										// simulate end of operation

									}


								}
							}),
							new sap.m.Button({
								text: "{i18n>Popup.Button.Cancelar}",
								press: function (oEvt) {
									oDialog.close();
								}
							}),
						],
						beforeClose: function (oEvt) {
							var oContent = oDialog.removeAllContent();
						},
						afterClose: function (oEvt) {
							oDialog.destroy();
						}
					});
					oDialog.open();
				}
			},

			_convertArrayBufferFileToBinary: function (result) {
				var bytes = new Uint8Array(result);
				var length = bytes.byteLength;
				var binary = "";
				for (var i = 0; i < length; i++) {
					binary += String.fromCharCode(bytes[i]);
				}
				return binary;
			},

			_b64EncodeStringUTF8: function (str) {
				return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
					return String.fromCharCode('0x' + p1);
				}));
			},


			onPressError: function (oEvt) {
				var that = this;

				var oTable = oView.byId("idTableComplementosPago");
				var length = oTable.getSelectedItems().length;

				if (length != 1) {
					var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
					oCnt_FHelps.f_showMessage("WARNING", oText);
				}
				else {
					var idx = oTable.indexOfItem(oTable.getSelectedItem()); // getSelectedItems
					var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
					var oModel = oCore.getModel(oNameModel);
					var oPath = oTable.getBindingInfo("items").path;

					var oObject = oModel.getProperty(oPath + "/" + idx);
					/*
					 * AQUI VIENE
					 */
					if (that.Table_Error == undefined)
						that.Table_Error = new sap.m.Table("idTableError", {
							// BG Listado de errores
							//growing: true,
							//growingThreshold: 5,
							growingScrollToLoad: true,
							selectionChange: function (e) {
								sap.m.MessageToast.show("selection is changed");
							},
							itemPress: function (e) {
								sap.m.MessageToast.show("item is pressed");
							},
							headerToolbar: new sap.m.Toolbar({
								content: [
									new sap.m.ToolbarSpacer(),
									new sap.m.Button({
										icon: "sap-icon://table-column",
										press: function (oEvt) {
											var oTable = oEvt.getSource().getParent().getParent();
											oCtrl_Main_P2P.onPersoPress(oEvt, oTable);
										}
									})
								]
							}),
							columns: [
								new sap.m.Column("idCol45", {
									width: "2.5rem",
									header: new sap.m.Label({
										text: "Pos"
									})
								}),
								new sap.m.Column("idCol46", {
									header: new sap.m.Label({
										text: "{i18n>ComplementosPago.Error.Popup.Table.Column.1}"
									})
								}),
								new sap.m.Column("idCol47", {
									header: new sap.m.Label({
										text: "{i18n>ComplementosPago.Error.Popup.Table.Column.2}"
									})
								})
							]
						}).bindItems({
							path: "mTablesError>/ERROR",
							template:
								new sap.m.ColumnListItem({
									vAlign: "Middle",
									detailPress: function () {
										setTimeout(function () {
											sap.m.MessageToast.show("detail is pressed");
										}, 10);
									},
									cells: [
										new sap.m.Text({ text: "{mTablesError>No}" }),
										new sap.m.Text({ text: "{mTablesError>LOG_MSG_NO}" }),
										new sap.m.Text({ text: "{mTablesError>MESSAGE}" })
									]
								})
						});

					//if(oObject.Flgerr=="X"){
					oCtrl_ComplementosPago.oServ_ListarErrorLog(oObject);

					var oDialog = new sap.m.Dialog({
						contentWidth: "100%",
						customHeader: new sap.m.Bar({
							contentMiddle: new sap.m.Label({
								text: "{i18n>ComplementosPago.Error.Popup.title}"
							}),
							contentRight: new sap.m.Button({
								icon: "sap-icon://decline",
								press: function () {
									oDialog.close();
								}
							})
						}),
						content: [
							new sap.ui.layout.form.Form({
								editable: true,
								layout: new sap.ui.layout.form.ResponsiveGridLayout(),
								formContainers: [
									new sap.ui.layout.form.FormContainer({
										formElements: [
											new sap.ui.layout.form.FormElement({
												label: "{i18n>ComplementosPago.Error.Popup.Form.Label.1}",
												fields: [
													new sap.m.Input({ value: oObject.BUKRS, enabled: false })
												]
											}),
											new sap.ui.layout.form.FormElement({
												label: "{i18n>ComplementosPago.Error.Popup.Form.Label.2}",
												fields: [
													new sap.m.Input({ value: oObject.BELNR, enabled: false })
												]
											}),
											new sap.ui.layout.form.FormElement({
												label: "{i18n>ComplementosPago.Error.Popup.Form.Label.3}",
												fields: [
													new sap.m.Input({ value: oObject.GJAHR, enabled: false })
												]
											})
										]
									})
								]
							}),
							that.Table_Error
						],
						buttons: [
							new sap.m.Button({
								text: "{i18n>Popup.Button.Cancelar}",
								press: function (oEvt) {
									oDialog.close();
								}
							})
						],
						beforeOpen: function (oEvt) {

							if (oCtrl_Main_P2P._oTPC_Core["idTableError"] == undefined) {
								var oTableID = oCore.byId("idTableError");
								// Hidden/view Columns
								DemoPersoService.setMyPersData(oTableID);

								// init and activate controller
								oCtrl_Main_P2P._oTPC_Core["idTableError"] = new TablePersoController({
									table: oTableID,
									//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
									componentName: "demoApp",
									persoService: DemoPersoService,
								}).activate();
							}
						},
						beforeClose: function (oEvt) {
							oDialog.removeAllContent();
						},
						afterClose: function (oEvt) {
							oDialog.destroy();
						}
					});
					oDialog.open();
					oBusyDialog.open();
					//}

				}
			},

			f_PopUp_DocRelac: function (oObject) {
				var that = this;
				oCtrl_ComplementosPago.oServ_ListarDocumentosRelacionados(oObject);
				if (that.Table_DocRelac == undefined)
					that.Table_DocRelac = new sap.m.Table("idTableDocRelac", {
						growing: true,
						growingThreshold: 5,
						growingScrollToLoad: true,
						selectionChange: function (e) {
							sap.m.MessageToast.show("selection is changed");
						},
						itemPress: function (e) {
							sap.m.MessageToast.show("item is pressed");
						},
						headerToolbar: new sap.m.Toolbar({
							content: [
								new sap.m.ToolbarSpacer(),
								new sap.m.Button({
									icon: "sap-icon://table-column",
									press: function (oEvt) {
										var oTable = oEvt.getSource().getParent().getParent();
										oCtrl_Main_P2P.onPersoPress(oEvt, oTable);
									}
								})
							]
						}),
						columns: [
							new sap.m.Column("idCol51", {
								width: "1.5rem",
								header: new sap.m.Label({
									text: "Pos"
								})
							}),
							new sap.m.Column("idCol52", {
								header: new sap.m.Label({
									text: "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.1}"
								})
							}),
							new sap.m.Column("idCol53", {
								header: new sap.m.Label({
									text: "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.2}"
								})
							}),
							new sap.m.Column("idCol54", {
								hAlign: "Center",
								header: new sap.m.Label({
									text: "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.3}"
								})
							}),
							new sap.m.Column("idCol55", {
								minScreenWidth: "Tablet",
								demandPopin: true,
								header: new sap.m.Label({
									text: "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.4}"
								})
							}),
							new sap.m.Column("idCol56", {
								minScreenWidth: "Tablet",
								demandPopin: true,
								hAlign: "Center",
								header: new sap.m.Label({
									text: "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.5}"
								})
							}),
							new sap.m.Column("idCol57", {
								minScreenWidth: "Tablet",
								demandPopin: true,
								header: new sap.m.Label({
									text: "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.6}"
								})
							}),
							new sap.m.Column("idCol58", {
								minScreenWidth: "Tablet",
								demandPopin: true,
								hAlign: "Center",
								header: new sap.m.Label({
									text: "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.7}"
								})
							}),
							new sap.m.Column("idCol59", {
								minScreenWidth: "Tablet",
								demandPopin: true,
								header: new sap.m.Label({
									text: "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.8}"
								})
							}),
							new sap.m.Column("idCol60", {
								minScreenWidth: "Tablet",
								demandPopin: true,
								hAlign: "Center",
								header: new sap.m.Label({
									text: "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.9}"
								})
							}),
							new sap.m.Column("idCol61", {
								minScreenWidth: "Tablet",
								demandPopin: true,
								header: new sap.m.Label({
									text: "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.10}"
								})
							}),
							new sap.m.Column("idCol62", {
								minScreenWidth: "Tablet",
								demandPopin: true,
								hAlign: "Center",
								header: new sap.m.Label({
									text: "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.11}"
								})
							}),
							new sap.m.Column("idCol63", {
								minScreenWidth: "Tablet",
								demandPopin: true,
								header: new sap.m.Label({
									text: "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.12}"
								})
							}),
							new sap.m.Column("idCol64", {
								minScreenWidth: "Tablet",
								demandPopin: true,
								hAlign: "Center",
								header: new sap.m.Label({
									text: "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.13}"
								})
							})
						]
					}).bindItems({
						path: "mTablesDocumentosRelac>/DOC_RELAC",
						template:
							new sap.m.ColumnListItem({
								vAlign: "Middle",
								detailPress: function () {
									setTimeout(function () {
										sap.m.MessageToast.show("detail is pressed");
									}, 10);
								},
								cells: [
									new sap.m.Text({ text: "{mTablesDocumentosRelac>No}" }),
									new sap.m.Text({ text: "{mTablesDocumentosRelac>ID_DOCPAY}" }),
									new sap.m.Text({ text: "{mTablesDocumentosRelac>XBLNR_DOCR}" }),
									new sap.m.Text({ text: "{mTablesDocumentosRelac>UUID_DOCREL}" }),
									new sap.m.Text({ text: "{mTablesDocumentosRelac>PAYMETH}" }),
									new sap.m.Text({ text: "{mTablesDocumentosRelac>IDPARCIALIDAD}" }),
									new sap.m.Text({ text: "{mTablesDocumentosRelac>WAERS_DOC}" }),
									new sap.m.Text({ text: "{mTablesDocumentosRelac>EXCHRATE_DOC}" }),
									new sap.m.Text({ text: "{mTablesDocumentosRelac>AMTPREBAL_DOC}" }),
									new sap.m.Text({ text: "{mTablesDocumentosRelac>AMTPAID_DOC}" }),
									new sap.m.Text({ text: "{mTablesDocumentosRelac>AMTOUTBAL_DOC}" }),
									new sap.m.Text({ text: "{mTablesDocumentosRelac>BUKRS_DOCREL}" }),
									new sap.m.Text({ text: "{mTablesDocumentosRelac>BELNR_DOCREL}" }),
									new sap.m.Text({ text: "{mTablesDocumentosRelac>GJAHR_DOCREL}" })
								]
							})
					});

				var oDialog = new sap.m.Dialog({
					contentWidth: "100%",
					customHeader: new sap.m.Bar({
						contentMiddle: new sap.m.Label({
							text: "{i18n>ComplementosPago.DocRelac.Popup.title}"
						}),
						contentRight: new sap.m.Button({
							icon: "sap-icon://decline",
							press: function () {
								oDialog.close();
							}
						})
					}),
					content: [
						new sap.ui.layout.form.Form({
							editable: true,
							layout: new sap.ui.layout.form.ResponsiveGridLayout(),
							formContainers: [
								new sap.ui.layout.form.FormContainer({
									formElements: [
										new sap.ui.layout.form.FormElement({
											label: "{i18n>ComplementosPago.DocRelac.Popup.Form.Label.1}",
											fields: [
												new sap.m.Input({ value: "{mDocumento>/BUKRS}", enabled: false })
											]
										}),
										new sap.ui.layout.form.FormElement({
											label: "{i18n>ComplementosPago.DocRelac.Popup.Form.Label.2}",
											fields: [
												new sap.m.Input({ value: "{mDocumento>/BELNR}", enabled: false })
											]
										}),
										new sap.ui.layout.form.FormElement({
											label: "{i18n>ComplementosPago.DocRelac.Popup.Form.Label.3}",
											fields: [
												new sap.m.Input({ value: "{mDocumento>/GJAHR}", enabled: false })
											]
										}),
										new sap.ui.layout.form.FormElement({
											label: "{i18n>ComplementosPago.DocRelac.Popup.Form.Label.4}",
											fields: [
												new sap.m.Input({ value: "{mDocumento>/PAYMEANS}", enabled: false })
											]
										}),
										new sap.ui.layout.form.FormElement({
											label: "{i18n>ComplementosPago.DocRelac.Popup.Form.Label.5}",
											fields: [
												new sap.m.Input({ value: "{mDocumento>/PAYAMTDOC}", enabled: false })
											]
										}),
										new sap.ui.layout.form.FormElement({
											label: "{i18n>ComplementosPago.DocRelac.Popup.Form.Label.6}",
											fields: [
												new sap.m.Input({ value: "{mDocumento>/WAERSPAYDOC}", enabled: false })
											]
										})
									]
								})
							]
						}),
						that.Table_DocRelac
					],
					buttons: [
						new sap.m.Button({
							text: "{i18n>Popup.Button.Cancelar}",
							press: function (oEvt) {
								oDialog.close();
							}
						})
					],
					beforeOpen: function (oEvt) {

						if (oCtrl_Main_P2P._oTPC_Core["idTableDocRelac"] == undefined) {
							var oTableID = oCore.byId("idTableDocRelac");
							// Hidden/view Columns
							DemoPersoService.setMyPersData(oTableID);

							// init and activate controller
							oCtrl_Main_P2P._oTPC_Core["idTableDocRelac"] = new TablePersoController({
								table: oTableID,
								//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
								componentName: "demoApp",
								persoService: DemoPersoService,
							}).activate();
						}
					},
					beforeClose: function (oEvt) {
						oDialog.removeAllContent();
					},
					afterClose: function (oEvt) {
						oDialog.destroy();
					}
				});
				oDialog.open();
				oBusyDialog.open();
			},

			onPressDetPagos: function (oEvt) {
				var that = this;

				var oTable = oView.byId("idTableComplementosPago");
				var length = oTable.getSelectedItems().length;

				if (length == 0) {
					var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
					oCnt_FHelps.f_showMessage("WARNING", oText);
				}
				else if (length >= 1) {
					var idx = oTable.indexOfItem(oTable.getSelectedItem()); // getSelectedItems
					var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
					var oModel = oCore.getModel(oNameModel);
					var oPath = oTable.getBindingInfo("items").path;

					var oObject = oModel.getProperty(oPath + "/" + idx);
					oCore.getModel("mComplemento").setProperty("/", oObject);
					/*
					 * AQUI VIENE
					 */
					oCtrl_ComplementosPago.oServ_ListarDetallePagos(oObject);
					if (that.Table_DetPagos == undefined)
						that.Table_DetPagos = new sap.m.Table("idTableDetPagos", {
							mode: "MultiSelect",
							growing: true,
							growingThreshold: 5,
							growingScrollToLoad: true,
							headerToolbar: new sap.m.Toolbar({
								content: [
									new sap.m.ToolbarSpacer(),
									new sap.m.Button({
										text: "{i18n>ComplementosPago.DetPagos.Popup.Table.Toolbar.Button.1}",
										press: function (oEvt) {

											var oTable = oEvt.getSource().getParent().getParent();
											var length = oTable.getSelectedItems().length;

											if (length != 1) {
												var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
												oCnt_FHelps.f_showMessage("WARNING", oText);
											}
											else {
												var idx = oTable.indexOfItem(oTable.getSelectedItem()); // getSelectedItems
												var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
												var oModel = oCore.getModel(oNameModel);
												var oPath = oTable.getBindingInfo("items").path;

												var oObject = oModel.getProperty(oPath + "/" + idx);
												oCore.getModel("mDocumento").setProperty("/", oObject);
												/*
												 * AQUI VIENE
												 */
												oCtrl_ComplementosPago.f_PopUp_DocRelac(oObject);
											}
										}
									}),
									new sap.m.Button({
										icon: "sap-icon://table-column",
										press: function (oEvt) {
											var oTable = oEvt.getSource().getParent().getParent();
											oCtrl_Main_P2P.onPersoPress(oEvt, oTable);
										}
									})
								]
							}),
							selectionChange: function (e) {
								//sap.m.MessageToast.show("selection is changed");
							},
							itemPress: function (e) {
								//sap.m.MessageToast.show("item is pressed");
							},
							columns: [
								new sap.m.Column("idCol70", {
									width: "1.5rem",
									header: new sap.m.Label({
										text: "Pos"
									})
								}),
								new sap.m.Column("idCol71", {
									header: new sap.m.Label({
										text: "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.1}"
									})
								}),
								new sap.m.Column("idCol72", {
									header: new sap.m.Label({
										text: "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.2}"
									})
								}),
								new sap.m.Column("idCol73", {
									hAlign: "Center",
									minScreenWidth: "Tablet",
									demandPopin: true,
									header: new sap.m.Label({
										text: "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.3}"
									})
								}),
								new sap.m.Column("idCol74", {
									minScreenWidth: "Tablet",
									demandPopin: true,
									header: new sap.m.Label({
										text: "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.4}"
									})
								}),
								new sap.m.Column("idCol75", {
									minScreenWidth: "Tablet",
									demandPopin: true,
									hAlign: "Center",
									header: new sap.m.Label({
										text: "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.5}"
									})
								}),
								new sap.m.Column("idCol76", {
									minScreenWidth: "Tablet",
									demandPopin: true,
									header: new sap.m.Label({
										text: "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.6}"
									})
								}),
								new sap.m.Column("idCol77", {
									minScreenWidth: "Tablet",
									demandPopin: true,
									hAlign: "Center",
									header: new sap.m.Label({
										text: "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.7}"
									})
								}),
								new sap.m.Column("idCol78", {
									minScreenWidth: "Tablet",
									demandPopin: true,
									header: new sap.m.Label({
										text: "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.8}"
									})
								}),
								new sap.m.Column("idCol79", {
									minScreenWidth: "Tablet",
									demandPopin: true,
									hAlign: "Center",
									header: new sap.m.Label({
										text: "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.9}"
									})
								}),
								new sap.m.Column("idCol80", {
									minScreenWidth: "Tablet",
									demandPopin: true,
									header: new sap.m.Label({
										text: "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.10}"
									})
								}),
								new sap.m.Column("idCol81", {
									minScreenWidth: "Tablet",
									demandPopin: true,
									hAlign: "Center",
									header: new sap.m.Label({
										text: "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.11}"
									})
								}),
								new sap.m.Column("idCol82", {
									minScreenWidth: "Tablet",
									demandPopin: true,
									header: new sap.m.Label({
										text: "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.12}"
									})
								}),
								new sap.m.Column("idCol83", {
									minScreenWidth: "Tablet",
									demandPopin: true,
									hAlign: "Center",
									header: new sap.m.Label({
										text: "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.13}"
									})
								}),
								new sap.m.Column("idCol84", {
									minScreenWidth: "Tablet",
									demandPopin: true,
									header: new sap.m.Label({
										text: "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.14}"
									})
								}),
								new sap.m.Column("idCol85", {
									minScreenWidth: "Tablet",
									demandPopin: true,
									hAlign: "Center",
									header: new sap.m.Label({
										text: "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.15}"
									})
								})
							]
						}).bindItems({
							path: "mTablesDetallePago>/DOC_PAGO",
							template:
								new sap.m.ColumnListItem({
									vAlign: "Middle",
									detailPress: function () {
										setTimeout(function () {
											sap.m.MessageToast.show("detail is pressed");
										}, 10);
									},
									cells: [
										new sap.m.Text({ text: "{mTablesDetallePago>No}" }),
										new sap.m.Text({ text: "{mTablesDetallePago>ID_DOCPAY}" }),
										new sap.m.Text({ text: "{mTablesDetallePago>BUKRS_PAY}" }),
										new sap.m.Text({ text: "{mTablesDetallePago>BELNR_PAY}" }),
										new sap.m.Text({ text: "{mTablesDetallePago>GJAHR_PAY}" }),
										new sap.m.Text({ text: "{mTablesDetallePago>PAYMEANS}" }),
										//	new sap.m.Text({ text: "{mTablesDetallePago>PAYAMTDOC}" }),
										new sap.m.Text({
											text: {
												parts: ["mTablesDetallePago>PAYAMTDOC"],
												formatter: function (value) {
													return oCtrl_ComplementosPago.formatter.formatCurrency(value);
												}
											}
										}),
										//new sap.m.Text({ text: "{mTablesDetallePago>SUBTOTAL}" }),
										new sap.m.Text({
											text: {
												parts: ["mTablesDetallePago>SUBTOTAL"],
												formatter: function (value) {
													return oCtrl_ComplementosPago.formatter.formatCurrency(value);
												}
											}
										}),
										new sap.m.Text({ text: "{mTablesDetallePago>IMPUESTO_TRAS}" }),
										new sap.m.Text({ text: "{mTablesDetallePago>IMPUESTO_RETE}" }),
										new sap.m.Text({ text: "{mTablesDetallePago>WAERSPAYDOC}" }),
										new sap.m.Text({ text: "{mTablesDetallePago>PAYEXCHRAT}" }),
										new sap.m.Text({ text: "{mTablesDetallePago>BLARTPAY_TXT}" }),
										new sap.m.Text({ text: "{mTablesDetallePago>UMSKZ_TXT}" }),
										new sap.m.Text({ text: "{mTablesDetallePago>XBLNR_PAY}" }),
										new sap.m.Text({ text: "{mTablesDetallePago>EBELN}" }),
									]
								})
						});

					var oDialog = new sap.m.Dialog({
						contentWidth: "100%",
						customHeader: new sap.m.Bar({
							contentMiddle: new sap.m.Label({
								text: "{i18n>ComplementosPago.DetPagos.Popup.title}"
							}),
							contentRight: new sap.m.Button({
								icon: "sap-icon://decline",
								press: function () {
									oDialog.close();
								}
							})
						}),
						content: [
							new sap.ui.layout.form.Form({
								editable: true,
								layout: new sap.ui.layout.form.ResponsiveGridLayout(),
								formContainers: [
									new sap.ui.layout.form.FormContainer({
										formElements: [
											new sap.ui.layout.form.FormElement({
												label: "{i18n>ComplementosPago.DetPagos.Popup.Form.Label.1}",
												fields: [
													new sap.m.Input({ value: "{mComplemento>/BUKRS}", enabled: false })
												]
											}),
											new sap.ui.layout.form.FormElement({
												label: "{i18n>ComplementosPago.DetPagos.Popup.Form.Label.2}",
												fields: [
													new sap.m.Input({ value: "{mComplemento>/BELNR}", enabled: false })
												]
											}),
											new sap.ui.layout.form.FormElement({
												label: "{i18n>ComplementosPago.DetPagos.Popup.Form.Label.3}",
												fields: [
													new sap.m.Input({ value: "{mComplemento>/GJAHR}", enabled: false })
												]
											})
										]
									})
								]
							}),
							that.Table_DetPagos
						],
						buttons: [
							new sap.m.Button({
								text: "{i18n>Popup.Button.Cancelar}",
								press: function (oEvt) {
									oDialog.close();
								}
							})
						],
						beforeOpen: function (oEvt) {

							if (oCtrl_Main_P2P._oTPC_Core["idTableDetPagos"] == undefined) {
								var oTableID = oCore.byId("idTableDetPagos");
								// Hidden/view Columns
								DemoPersoService.setMyPersData(oTableID);

								// init and activate controller
								oCtrl_Main_P2P._oTPC_Core["idTableDetPagos"] = new TablePersoController({
									table: oTableID,
									//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
									componentName: "demoApp",
									persoService: DemoPersoService,
								}).activate();
							}
						},
						beforeClose: function (oEvt) {
							oDialog.removeAllContent();
						},
						afterClose: function (oEvt) {
							oDialog.destroy();
						}
					});
					oDialog.open();
					oBusyDialog.open();
				}
			},

			onPressOpciones: function (oEvt) {
				var that = this;
				var oButton = oEvt.getSource();

				if (this._actsheet == undefined)
					this._actsheet = new sap.m.ActionSheet({
						placement: "Auto",
						buttons: [
							new sap.m.Button({
								text: "{i18n>ComplementosPago.Monitor.Table.Toolbar.Button.1}",
								press: function (oEvt) {
									that.onPressCargarXML(oEvt);
								}
							}),
							new sap.m.Button({
								text: "{i18n>ComplementosPago.Monitor.Table.Toolbar.Button.2}",
								press: function (oEvt) {
									that.onPressError(oEvt);
								}
							}),
							new sap.m.Button({
								text: "{i18n>ComplementosPago.Monitor.Table.Toolbar.Button.3}",
								press: function (oEvt) {
									that.onPressDetPagos(oEvt);
								}
							})
						]
					});

				this._actsheet.openBy(oButton);
			},
			/*
			oServ_EnviarCargarXML: function (oObject, callback) {
				var that = this;
				
				//var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				//soapMessage = soapMessage + '<soap:Header/>';
				//soapMessage = soapMessage + '<soap:Body>';
				//soapMessage = soapMessage + '<urn:_-WI12_-FM_WS_SAVE_XML_DATA>';
				//soapMessage = soapMessage + '<EX_IN_XML_DATA>';
				//soapMessage = soapMessage + '<BUKRS>' + oObject.BUKRS + '</BUKRS>';
				//soapMessage = soapMessage + '<BELNR>' + oObject.BELNR + '</BELNR>';
				//soapMessage = soapMessage + '<GJAHR>' + oObject.GJAHR + '</GJAHR>';
				//soapMessage = soapMessage + '<XMLBIN>' + oObject.binario_xml + '</XMLBIN>';
				//soapMessage = soapMessage + '<PDFBIN>' + oObject.binario_pdf + '</PDFBIN>';
				//soapMessage = soapMessage + '</EX_IN_XML_DATA>';
				//soapMessage = soapMessage + '</urn:_-WI12_-FM_WS_SAVE_XML_DATA>';
				//soapMessage = soapMessage + '</soap:Body>';
				//soapMessage = soapMessage + '</soap:Envelope>';
				
				
				var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soapenv:Header/>';
				soapMessage = soapMessage + '<soapenv:Body>';
				soapMessage = soapMessage + '<urn:_-WI12_-FM_WS_SAVE_XML_DATA>';
				soapMessage = soapMessage + '<EX_IN_XML_DATA>';
				soapMessage = soapMessage + '<BUKRS>' + oObject.BUKRS + '</BUKRS>';
				soapMessage = soapMessage + '<BELNR>' + oObject.BELNR + '</BELNR>';
				soapMessage = soapMessage + '<GJAHR>' + oObject.GJAHR + '</GJAHR>';
				soapMessage = soapMessage + '<XMLBIN>' + oObject.binario_xml + '</XMLBIN>';
				soapMessage = soapMessage + '<PDFBIN>' + oObject.binario_pdf + '</PDFBIN>';
				soapMessage = soapMessage + '</EX_IN_XML_DATA>';
				soapMessage = soapMessage + '</urn:_-WI12_-FM_WS_SAVE_XML_DATA>';
				soapMessage = soapMessage + '</soapenv:Body>';
				soapMessage = soapMessage + '</soapenv:Envelope>';

				if (that.oBusyDialog_c == undefined)
					that.oBusyDialog_c = new sap.m.BusyDialog({
						title: oCnt_FHelps.f_readTranslate("Wait.title"),
						text: oCnt_FHelps.f_readTranslate("CargarXML.Wait.text"),
					});

				that.oBusyDialog_c.open();

				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW12,
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
					that.oBusyDialog_c.close();
					var json = xml2json(data);
					//callback(json);
					sap.ui.getCore().getModel("mMessages").setData(json);//revisar datos
					sap.ui.getCore().getModel("mMessages").refresh();

					var oObjeto = sap.ui.getCore().getModel("mMessages").getProperty("/SOAP:Envelope/SOAP:Body/n0:ZW12_FM_WS_SAVE_XML_DATAResponse/IM_OUT_RETURN/item");
					var flagError = '';
					var MessageSuccess = '';
					//Si oObjeto.length esta definido significa que hay mas de un mensaje
					if (oObjeto.length == undefined) {
						//Valida que no hay ERRORES
						if (oObjeto.TYPE != "S")
							flagError = 'X';
					} else {
						//Valida que no hay ERRORES
						for (var i = 0; i < oObjeto.length; i++) {
							MessageSuccess = oObjeto[i].MESSAGE;
							if (oObjeto[i].TYPE != "S")
								flagError = 'X';
						}
					}
					//Muestra POPUP
					if (flagError == "") {
						oCnt_FHelps.f_showMessage("SUCCESS", MessageSuccess);
						sap.ui.getCore().getModel("mTablesListadoDocComp").setData({ DOC_COMPENSADOS: {} });
					}else{
						oCnt_FHelps.f_showMessage("WARNING", oObjeto.MESSAGE);
					}
				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					oCnt_FHelps.f_showMessage("ERROR", error);
					that.oBusyDialog_c.close();
				}
			},
			*/
			// BG Se modifica método para validación con PAC
			oServ_EnviarCargarXML: function (oObject, callback) {
			//	var apiKey = 'siufhvypptrbnswdfzzbdkqgm88kst8bt6kprxt8uvr3uz7dhngyzh3uu7ebasq7uzvccdswhe7nbngm';
				var encodedString = oObject.binario_xml;

				// Función para convertir una cadena base64 a un ArrayBuffer
				function base64ToArrayBuffer(base64) {
					var binaryString = atob(base64);
					var length = binaryString.length;
					var bytes = new Uint8Array(length);

					for (var i = 0; i < length; i++) {
						bytes[i] = binaryString.charCodeAt(i);
					}

					return bytes.buffer;
				}
				// Convertir la cadena base64 a un ArrayBuffer
				var arrayBuffer = base64ToArrayBuffer(encodedString);

				// Crear un objeto XML a partir del ArrayBuffer
				var decoder = new TextDecoder("utf-8");
				var xmlString = decoder.decode(arrayBuffer);

				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(xmlString, "text/xml");

				//console.log(xmlDoc); 
				//Serializar xmlDoc para que tengamos el XML "normal"
				var xmlString = new XMLSerializer().serializeToString(xmlDoc);

				console.log(xmlString);
			//	var soapMessage = buildSoapMessage(xmlString, apiKey);
				var soapMessage1 = buildSoapMessage1(oObject);

				//oBusyDialog_d.open();


				/* $.ajax({
					url: validacionPAC,
					type: "POST",
					cache: false,
					data: soapMessage,
					contentType: "text/xml; charset=utf-8",
					headers: {
						"SOAPAction": "urn:schemas.reachcore.com:document-validation:5.0/IDocumentValidationService/ValidateDocument"
					},
					success: function (data) {
						var jsonResponse = xmlToJson(data);
						handleValidationSuccess(jsonResponse, soapMessage1);
					},
					error: handleError
				});
 */
				//Para evitar erroresde sintaxis al convertir la respuesta XML a JSON
				function xmlToJson(xml) {
					// Crear el objeto JSON
					var obj = {};

					if (xml.nodeType === 1) { // Elemento
						// Atributos
						if (xml.attributes.length > 0) {
							obj["@attributes"] = {};
							for (var j = 0; j < xml.attributes.length; j++) {
								var attribute = xml.attributes.item(j);
								obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
							}
						}
					} else if (xml.nodeType === 3) { // Texto
						obj = xml.nodeValue;
					}

					// Hijos
					if (xml.hasChildNodes()) {
						for (var i = 0; i < xml.childNodes.length; i++) {
							var item = xml.childNodes.item(i);
							var nodeName = item.nodeName;
							if (typeof (obj[nodeName]) === "undefined") {
								obj[nodeName] = xmlToJson(item);
							} else {
								if (typeof (obj[nodeName].push) === "undefined") {
									var old = obj[nodeName];
									obj[nodeName] = [];
									obj[nodeName].push(old);
								}
								obj[nodeName].push(xmlToJson(item));
							}
						}
					}
					return obj;
				}
				//////////
				// function buildSoapMessage(xmlString, apiKey) {
				// 	//  SOAP mensaje PAC
				// 	var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cus="http://www.reachcore.com/CFDI/customHeaders" xmlns:urn="urn:schemas.reachcore.com:document-validation:5.0">'
				// 		+ '<soapenv:Header>'
				// 		+ '<cus:ApiKey>' + apiKey + '</cus:ApiKey>'
				// 		+ '</soapenv:Header>'
				// 		+ '<soapenv:Body>'
				// 		+ ' <urn:DocumentValidationRequest>'
				// 		+ '<urn:Document><![CDATA[' + xmlString + ']]></urn:Document>'
				// 		+ '<urn:TransactionProperties>'
				// 		+ '<urn:TransactionProperty Key="StatusSAT" Value=""/>'
				// 		+ '</urn:TransactionProperties>'
				// 		//	+' <urn:CustomData>'+CustomData+'</urn:CustomData>' */
				// 		+ '</urn:DocumentValidationRequest>'
				// 		+ '</soapenv:Body>'
				// 		+ '</soapenv:Envelope>';
				// 	return soapMessage;
				// }
				function buildSoapMessage1(oObject) {
					//  mensaje SOAP de Complementos de pago
					var that = this;

					var soapMessage1 = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
					soapMessage1 = soapMessage1 + '<soapenv:Header/>';
					soapMessage1 = soapMessage1 + '<soapenv:Body>';
					soapMessage1 = soapMessage1 + '<urn:_-WI12_-FM_WS_SAVE_XML_DATA>';
					soapMessage1 = soapMessage1 + '<EX_IN_XML_DATA>';
					soapMessage1 = soapMessage1 + '<BUKRS>' + oObject.BUKRS + '</BUKRS>';
					soapMessage1 = soapMessage1 + '<BELNR>' + oObject.BELNR + '</BELNR>';
					soapMessage1 = soapMessage1 + '<GJAHR>' + oObject.GJAHR + '</GJAHR>';
					soapMessage1 = soapMessage1 + '<XMLBIN>' + oObject.binario_xml + '</XMLBIN>';
					soapMessage1 = soapMessage1 + '<PDFBIN>' + oObject.binario_pdf + '</PDFBIN>';
					soapMessage1 = soapMessage1 + '</EX_IN_XML_DATA>';
					soapMessage1 = soapMessage1 + '</urn:_-WI12_-FM_WS_SAVE_XML_DATA>';
					soapMessage1 = soapMessage1 + '</soapenv:Body>';
					soapMessage1 = soapMessage1 + '</soapenv:Envelope>';

					return soapMessage1;
				}
				////Validacion del PAC
				/* function handleValidationSuccess(jsonResponse, soapMessage1) {
					try {
						//var json = xml2json(data);

				//		console.log(jsonResponse);
						oBusyDialog_d.close();
						sap.ui.getCore().getModel("mMessages").setData(jsonResponse);
						sap.ui.getCore().getModel("mMessages").refresh();

						var DocumentIsValid = jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult']['@attributes']['DocumentIsValid'];
						//	console.log("DocumentIsValid:", DocumentIsValid);
						if (DocumentIsValid != "false") {
							callWebService(soapMessage1);
						} else {
							handleValidationFailure(jsonResponse);
						}
					} catch (error) {
						// Manejar el error de sintaxis del JSON cuando viene con errores de sintaxis
						oCnt_FHelps.f_showMessage("ERROR", "Error de sintaxis en el JSON recibido");
						console.log("El XML tiene errores, tiene error de sintaxis por esta razón no se puede visializar:", error);
					}

				} */

				//Llamamos a la función AJAX de JQuery Complementos de pago
				/* function callWebService(soapMessage1) {
					$.ajax({
						url: webServiceURL_ZW12,
						type: "POST",
						cache: false,
						data: soapMessage1,
						contentType: "application/soap+xml; charset=utf-8",
						headers: {
							"Authorization": "Basic " + btoa(oUsuario + ":" + oPassword),
							"accept-language": oLenguaje
						},
						success: function (data1) {
							handleWebServiceSuccess(data1);
						},
						error: handleError
					});
				} */
					$.ajax({
						url: webServiceURL_ZW12,
						type: "POST",
						cache: false,
						data: soapMessage1,
						contentType: "application/soap+xml; charset=utf-8",
						headers: {
							"Authorization": "Basic " + btoa(oUsuario + ":" + oPassword),
							"accept-language": oLenguaje
						},
						success: function (data1) {
							handleWebServiceSuccess(data1);
						},
						error: handleError
					});

				function handleWebServiceSuccess(data1) {
					//	that.oBusyDialog_c.close();
					var json1 = xml2json(data1);
					//callback(json);
					console.log(json1);
					sap.ui.getCore().getModel("mMessages").setData(json1);//revisar datos
					sap.ui.getCore().getModel("mMessages").refresh();

					var oObjeto = sap.ui.getCore().getModel("mMessages").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_SAVE_XML_DATA.Response/IM_OUT_RETURN/item");
					console.log("mensajes", oObjeto);
					var flagError = '';
					var MessageSuccess = '';
					//Si oObjeto.length esta definido significa que hay mas de un mensaje
					if (oObjeto.length == undefined) {
						//Valida que no hay ERRORES
						if (oObjeto.TYPE != "S")
							flagError = 'X';
					} else {
						//Valida que no hay ERRORES
						for (var i = 0; i < oObjeto.length; i++) {
							MessageSuccess = oObjeto[i].MESSAGE;
							if (oObjeto[i].TYPE != "S")
								flagError = 'X';
						}
					}
					//Muestra POPUP
					if (flagError == "") {
						oCnt_FHelps.f_showMessage("SUCCESS", MessageSuccess);
						sap.ui.getCore().getModel("mTablesListadoDocComp").setData({ DOC_COMPENSADOS: {} });
					} else {
						oCnt_FHelps.f_showMessage("WARNING", oObjeto.MESSAGE);
					}

				}

				function handleError(xhr, textStatus, errorThrown) {
					var errorMessage = errorThrown || "Error en la llamada AJAX";
					oCnt_FHelps.f_showMessage("ERROR", errorMessage);
				}

				/* function handleValidationFailure(jsonResponse) {
					// validación del XML cuando no es valido
					try {
						var errorMessages = [];
						var Error = jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['Error']['#text'];
						///////
						if (Error != "false") {
							var ErrorMesssage = jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ErrorMesssage'];
							console.log(ErrorMesssage);
							if (ErrorMesssage != null) {
								//	console.log(ErrorMesssage);
								errorMessages.push(ErrorMesssage);
							} else {
								errorMessages.push("Error en la validación del XML con el PAC");
							}
						} else {
							if (jsonResponse['s:Envelope'] &&
								jsonResponse['s:Envelope']['s:Body'] &&
								jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse'] &&
								jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult'] &&
								jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult']['FailedRules'] &&
								jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult']['FailedRules']['RuleResult']) {
								var ruleResult = jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult']['FailedRules']['RuleResult'];
								console.log(ruleResult);
								if (Array.isArray(ruleResult)) {
									ruleResult.forEach(rule => {
										//	var title = rule['@attributes']['Title'];
										var mensaje = rule.Message['#text'];
										mensaje = mensaje.replace(/\\r\\n/g, ''); // Eliminar saltos de linea
										mensaje = mensaje.replace(/\\\"/g, '"'); // Restaurar comillas dobles
										errorMessages.push(mensaje);
									});
								} else {
									//Si es un unico objeto...
									//	var title = ruleResult['@attributes']['Title'];
									var mensaje = ruleResult.Message['#text'];
									mensaje = mensaje.replace(/\\r\\n/g, ''); // Elimina saltos de linea
									mensaje = mensaje.replace(/\\\"/g, '"'); // Restaura comillas dobles
									errorMessages.push(mensaje);
								}
							}
						}
						var errorMessage = errorMessages.join("\n");
						if (errorMessage !== "") {
							oCnt_FHelps.f_showMessage("ERROR", errorMessage);
							return;

						}
					} catch (error) {
						// Manejar el error de sintaxis del JSON cuando viene con errores de sintaxtos
						oCnt_FHelps.f_showMessage("ERROR", "Error de sintaxis en el JSON recibido");
						console.error("El XML tiene errores, tiene error de sintaxis por esta razón no se puede visializar:", error);
					}
 */
				//}
			},

			oServ_ListarErrorLog: function (oObject) {
				/*
				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI12_-FM_WS_GET_ERROR_LOG>';
				soapMessage = soapMessage + '<EX_IN_LOG_ERROR>';
				soapMessage = soapMessage + '<BUKRS>' + oObject.BUKRS + '</BUKRS>';
				soapMessage = soapMessage + '<BELNR>' + oObject.BELNR + '</BELNR>';
				soapMessage = soapMessage + '<GJAHR>' + oObject.GJAHR + '</GJAHR>';
				soapMessage = soapMessage + '</EX_IN_LOG_ERROR>';
				soapMessage = soapMessage + '</urn:_-WI12_-FM_WS_GET_ERROR_LOG>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';
				*/

				var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soapenv:Header/>';
				soapMessage = soapMessage + '<soapenv:Body>';
				soapMessage = soapMessage + '<urn:_-WI12_-FM_WS_GET_ERROR_LOG>';
				soapMessage = soapMessage + '<EX_IN_LOG_ERROR>';
				soapMessage = soapMessage + '<BUKRS>' + oObject.BUKRS + '</BUKRS>';
				soapMessage = soapMessage + '<BELNR>' + oObject.BELNR + '</BELNR>';
				soapMessage = soapMessage + '<GJAHR>' + oObject.GJAHR + '</GJAHR>';
				soapMessage = soapMessage + '</EX_IN_LOG_ERROR>';
				soapMessage = soapMessage + '</urn:_-WI12_-FM_WS_GET_ERROR_LOG>';
				soapMessage = soapMessage + '</soapenv:Body>';
				soapMessage = soapMessage + '</soapenv:Envelope>';

				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW12,
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
					console.log(json);
					sap.ui.getCore().getModel("mTablesError").setData(json);

					var Type = sap.ui.getCore().getModel("mTablesError").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_ERROR_LOG.Response/ET_RETURN");
					var Message = sap.ui.getCore().getModel("mTablesError").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_ERROR_LOG.Response/ET_RETURN").item.MESSAGE;

					if (Type != undefined) {
						var length = sap.ui.getCore().getModel("mTablesError").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_ERROR_LOG.Response/ET_RETURN/item").length;

						if (length == undefined) {

							var mData = sap.ui.getCore().getModel("mTablesError").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_ERROR_LOG.Response/ET_RETURN/item");
							mData.No = 1;
							sap.ui.getCore().getModel("mTablesError").setData({ ERROR: [mData] });//revisar datos
							sap.ui.getCore().getModel("mTablesError").refresh();
						} else {
							var mData = sap.ui.getCore().getModel("mTablesError").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_ERROR_LOG.Response/ET_RETURN/item");

							for (i = 0; i < mData.length; i++) {
								mData[i].No = i + 1;
							}
							var filteredData = mData.filter(function (item) {
								return item.TYPE === "E";
							});


							sap.ui.getCore().getModel("mTablesError").setData({ ERROR: filteredData });//revisar datos
							sap.ui.getCore().getModel("mTablesError").refresh();
						}
					} else {
						oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Error.title"));
					}
					oBusyDialog.close();
				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					oCnt_FHelps.f_showMessage("ERROR", error);
				}
			},

			oServ_ListarDetallePagos: function (oObject) {
				/*
				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI12_-FM_WS_GET_PAYMENTS>';
				soapMessage = soapMessage + '<EX_IN_PAYMENT_DATA>';
				soapMessage = soapMessage + '<BUKRS>' + oObject.BUKRS + '</BUKRS>';
				soapMessage = soapMessage + '<BELNR>' + oObject.BELNR + '</BELNR>';
				soapMessage = soapMessage + '<GJAHR>' + oObject.GJAHR + '</GJAHR>';
				soapMessage = soapMessage + '</EX_IN_PAYMENT_DATA>';
				soapMessage = soapMessage + '</urn:_-WI12_-FM_WS_GET_PAYMENTS>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';
				*/

				var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soapenv:Header/>';
				soapMessage = soapMessage + '<soapenv:Body>';
				soapMessage = soapMessage + '<urn:_-WI12_-FM_WS_GET_PAYMENTS>';
				soapMessage = soapMessage + '<EX_IN_PAYMENT_DATA>';
				soapMessage = soapMessage + '<BUKRS>' + oObject.BUKRS + '</BUKRS>';
				soapMessage = soapMessage + '<BELNR>' + oObject.BELNR + '</BELNR>';
				soapMessage = soapMessage + '<GJAHR>' + oObject.GJAHR + '</GJAHR>';
				soapMessage = soapMessage + '</EX_IN_PAYMENT_DATA>';
				soapMessage = soapMessage + '</urn:_-WI12_-FM_WS_GET_PAYMENTS>';
				soapMessage = soapMessage + '</soapenv:Body>';
				soapMessage = soapMessage + '</soapenv:Envelope>';

				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW12,
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
					sap.ui.getCore().getModel("mTablesDetallePago").setData(json);

					var Type = sap.ui.getCore().getModel("mTablesDetallePago").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_PAYMENTS.Response/ET_RETURN").item.TYPE;
					var Message = sap.ui.getCore().getModel("mTablesDetallePago").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_PAYMENTS.Response/ET_RETURN").item.MESSAGE;

					if (Type == "S") {
						var length = sap.ui.getCore().getModel("mTablesDetallePago").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_PAYMENTS.Response/IM_OUT_PAYMENT_DATA/item").length;

						if (length == undefined) {

							var mData = sap.ui.getCore().getModel("mTablesDetallePago").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_PAYMENTS.Response/IM_OUT_PAYMENT_DATA/item");
							mData.No = 1;
							sap.ui.getCore().getModel("mTablesDetallePago").setData({ DOC_PAGO: [mData] });//revisar datos
							sap.ui.getCore().getModel("mTablesDetallePago").refresh();
						} else {
							var mData = sap.ui.getCore().getModel("mTablesDetallePago").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_PAYMENTS.Response/IM_OUT_PAYMENT_DATA/item");

							for (i = 0; i < mData.length; i++) {
								mData[i].No = i + 1;
							}

							sap.ui.getCore().getModel("mTablesDetallePago").setData({ DOC_PAGO: mData });//revisar datos
							sap.ui.getCore().getModel("mTablesDetallePago").refresh();
						}
					} else {
						oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Error.title"));
					}

					oBusyDialog.close();

				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					oCnt_FHelps.f_showMessage("ERROR", error);
				}
			},

			oServ_ListarDocumentosRelacionados: function (oObject) {
				/*
				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI12_-FM_WS_GET_LINKED_DOCS>';
				soapMessage = soapMessage + '<EX_IN_LINKED_DOCS>';
				soapMessage = soapMessage + '<BUKRS>' + oObject.BUKRS + '</BUKRS>';
				soapMessage = soapMessage + '<BELNR>' + oObject.BELNR + '</BELNR>';
				soapMessage = soapMessage + '<GJAHR>' + oObject.GJAHR + '</GJAHR>';
				soapMessage = soapMessage + '<ID_DOCPAY>' + oObject.ID_DOCPAY + '</ID_DOCPAY>';
				soapMessage = soapMessage + '</EX_IN_LINKED_DOCS>';
				soapMessage = soapMessage + '</urn:_-WI12_-FM_WS_GET_LINKED_DOCS>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';
				*/

				var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soapenv:Header/>';
				soapMessage = soapMessage + '<soapenv:Body>';
				soapMessage = soapMessage + '<urn:_-WI12_-FM_WS_GET_LINKED_DOCS>';
				soapMessage = soapMessage + '<EX_IN_LINKED_DOCS>';
				soapMessage = soapMessage + '<BUKRS>' + oObject.BUKRS + '</BUKRS>';
				soapMessage = soapMessage + '<BELNR>' + oObject.BELNR + '</BELNR>';
				soapMessage = soapMessage + '<GJAHR>' + oObject.GJAHR + '</GJAHR>';
				soapMessage = soapMessage + '<ID_DOCPAY>' + oObject.ID_DOCPAY + '</ID_DOCPAY>';
				soapMessage = soapMessage + '</EX_IN_LINKED_DOCS>';
				soapMessage = soapMessage + '</urn:_-WI12_-FM_WS_GET_LINKED_DOCS>';
				soapMessage = soapMessage + '</soapenv:Body>';
				soapMessage = soapMessage + '</soapenv:Envelope>';

				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW12,
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
					sap.ui.getCore().getModel("mTablesDocumentosRelac").setData(json);

					var Type = sap.ui.getCore().getModel("mTablesDocumentosRelac").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_LINKED_DOCS.Response/ET_RETURN").item.TYPE;
					var Message = sap.ui.getCore().getModel("mTablesDocumentosRelac").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_LINKED_DOCS.Response/ET_RETURN").item.MESSAGE;

					if (Type == "S") {
						var length = sap.ui.getCore().getModel("mTablesDocumentosRelac").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_LINKED_DOCS.Response/IM_OUT_LINKED_DOCS/item").length;

						if (length == undefined) {

							var mData = sap.ui.getCore().getModel("mTablesDocumentosRelac").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_LINKED_DOCS.Response/IM_OUT_LINKED_DOCS/item");
							mData.No = 1;
							sap.ui.getCore().getModel("mTablesDocumentosRelac").setData({ DOC_RELAC: [mData] });//revisar datos
							sap.ui.getCore().getModel("mTablesDocumentosRelac").refresh();
						} else {
							var mData = sap.ui.getCore().getModel("mTablesDocumentosRelac").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_LINKED_DOCS.Response/IM_OUT_LINKED_DOCS/item");

							for (i = 0; i < mData.length; i++) {
								mData[i].No = i + 1;
							}

							sap.ui.getCore().getModel("mTablesDocumentosRelac").setData({ DOC_RELAC: mData });//revisar datos
							sap.ui.getCore().getModel("mTablesDocumentosRelac").refresh();
						}
					} else {
						oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Error.title"));
					}

					oBusyDialog.close();
				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					oCnt_FHelps.f_showMessage("ERROR", error);
				}
			},

		});

	});