var oCtrl_EnvioFacturas;
var EnvioFacturas_flag;
var oBusyDialog_d;

// ORR Parámetro global para tipo de recepción
var tipoRecepcion = "";

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController", "com/axiomasoluciones/wisemobile/Modulo_WiseMobile/Utils/formatter"],
	function (jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController, formatter) {
		var oView;
		var mModel;
		var mModelServ;
		var _oFlag_Key;
		var mFiles = {};
		var _CantFiles = -1;
		var _CantFiles1 = -1;
		var _tipo_recepcion;

		return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.EnvioFacturas", {
			//Se incluye el formateador de cantidades para
			formatter: formatter,
			onInit: function () {
				oCtrl_EnvioFacturas = this;
				oView = this.getView();
				_oFlag_Key = "1";

				mModel = new sap.ui.model.json.JSONModel({});

				oView.setModel(mModel, "mEnvioFacturas");
				oView.bindElement({ path: "/", model: "mEnvioFacturas" });

				mModelServ = new sap.ui.model.Binding(mModel, "/", mModel.getContext("/"));
				mModelServ.attachChange(function (oEvent) {
					console.log("event: ", oEvent);

					if (mModel.getProperty("/CantFiles") == _CantFiles) {
						this.f_COC_CONSINCFDI();
					}
					if (mModel.getProperty("/CantFiles1") == _CantFiles1) {
						this.f_SOC_CONSINCFDI();
					}
				}, this);


				if (oBusyDialog_d == undefined)
					oBusyDialog_d = new sap.m.BusyDialog({
						title: oCnt_FHelps.f_readTranslate("Wait.title")
					});

				var oTable = this.byId("idTableEnvioFacturas");
				var aItems = oTable.getItems();
				for (var i = 0; i < aItems.length; i++)
					aItems[i].setSelected(true);
				oTable.setVisible(true);

			},

			createContent: function () {
				console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.EnvioFacturas');
			},

			onAfterRendering: function (oEvt) {
				/*
				 * LIMPIAR
				 */
				// INICIO
				this.f_Limpiar_Cjas();
				oView.byId("idTableEnvioFacturas").setFooterText("Total: $0.00");

				if (EnvioFacturas_flag == true)
					return;

				EnvioFacturas_flag = true;

				var oTableID = oView.byId("idTableEnvioFacturas")
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

			f_Show_Hide_: function (pKey) {
				var that = this;
				// Mostrar u ocultar la tabla de aprobaciones de anticipos o Comprobaciones

				var oTable = oView.byId("idTableEnvioFacturas");
				var oTable_2 = oView.byId("idTableEnvioFacturasConsignacion");
				// ORR Buzón de facturas
				/*
				var oTable_3 = oView.byId("idTableConsultaBuzonFacturas");
				var oTable_4 = oView.byId("purchaseOrderTable");
				var oToolBar_1 = oView.byId("toolbarAddSalesOrder");
				*/
				//
				var oTitle = oView.byId("idEnvioFacturasTitle");

				oTable.setVisible(false);
				oTable_2.setVisible(false);
				// ORR Buzón de facturas
				/*
				oTable_3.setVisible(false);
				oTable_4.setVisible(false);
				oToolBar_1.setVisible(false);
				*/
				_oFlag_Key = pKey;

				// MOSTRAR TODO
				var oForm = oView.byId("idFormEnvioFacturas");
				var oFElements = oForm.getFormContainers()[0].getFormElements();

				for (var i = 0; i < oFElements.length; i++) {
					oFElements[i].setVisible(true);
				}

				oView.byId("idTableEnvioFacturas").setVisible(false);
				oView.byId("idTableEnvioFacturasConsignacion").setVisible(false);
				// ORR Buzón de facturas
				//oView.byId("idTableConsultaBuzonFacturas").setVisible(false);

				//oCtrl_Menu.oServ_Sociedades_ZW18();
				//oCtrl_EnvioFacturas.oServ_Monedas_ZW18();
				//oCtrl_EnvioFacturas.oServ_Impuestos_ZW18();
				console.log("pKey: ", pKey);
				switch (pKey) {

					// CON OREN DE COMPRA
					case "1": // CFDI
						oView.byId("idFEArea").setVisible(false);
						oView.byId("idFEResponsable").setVisible(false);
						oView.byId("idFEConcepto").setVisible(false);
						oView.byId("idFEFactura").setVisible(false);
						oView.byId("idFEFechaFactura").setVisible(false);
						oView.byId("idFESubtotal").setVisible(false);
						oView.byId("idFEIVA").setVisible(false);
						oView.byId("idFEMoneda").setVisible(false);
						oView.byId("idFEDocOtros").setVisible(sap.ui.getCore().getModel("mConfiguracion").getProperty("/1/PERMISOSV/0").INV_ADD_OTHER_PDF);

						oTable.setVisible(true);
						// SERVICIOS WEB

						break;

					case "2": // Sin CFDI
						oView.byId("idFEArea").setVisible(false);
						oView.byId("idFEResponsable").setVisible(false);
						oView.byId("idFEDocXML").setVisible(false);
						oView.byId("idFESubtotal").setVisible(false);
						oView.byId("idFEConcepto").setVisible(false);
						oView.byId("idFEDocOtros").setVisible(sap.ui.getCore().getModel("mConfiguracion").getProperty("/1/PERMISOSV/0").INV_ADD_OTHER_PDF);

						oTable.setVisible(true);
						break;

					// SIN OREN DE COMPRA
					case "3": // CFDI
						oView.byId("idFEFechaFactura").setVisible(false);
						oView.byId("idFESubtotal").setVisible(false);
						oView.byId("idFEIVA").setVisible(false);
						oView.byId("idFEMoneda").setVisible(false);
						oView.byId("idFEDocOtros").setVisible(sap.ui.getCore().getModel("mConfiguracion").getProperty("/1/PERMISOSV/0").INV_ADD_OTHER_PDF);
						break;

					case "4": // Sin CFDI
						oView.byId("idFEDocXML").setVisible(false);
						oView.byId("idFEDocOtros").setVisible(sap.ui.getCore().getModel("mConfiguracion").getProperty("/1/PERMISOSV/0").INV_ADD_OTHER_PDF);
						break;

					case "5": // Consignación
						oView.byId("idFEArea").setVisible(false);
						oView.byId("idFEResponsable").setVisible(false);
						oView.byId("idFEConcepto").setVisible(false);
						oView.byId("idFEFactura").setVisible(false);
						oView.byId("idFEFechaFactura").setVisible(false);
						oView.byId("idFESubtotal").setVisible(false);
						oView.byId("idFEIVA").setVisible(false);
						oView.byId("idFEMoneda").setVisible(false);
						oView.byId("idFEDocOtros").setVisible(false);

						oTable_2.setVisible(true);
						// SERVICIOS WEB

						break;
					// ORR Buzón de facturas
					/*
					case "6": // Agregar Buzón Factura - CFDI
						oView.byId("idFEArea").setVisible(false);
						oView.byId("idFEResponsable").setVisible(false);
						oView.byId("idFEConcepto").setVisible(false);
						oView.byId("idFEFactura").setVisible(false);
						oView.byId("idFEFechaFactura").setVisible(false);
						oView.byId("idFESubtotal").setVisible(false);
						oView.byId("idFEIVA").setVisible(false);
						oView.byId("idFEMoneda").setVisible(false);
						oView.byId("idFEDocOtros").setVisible(false);

						oTable_4.setVisible(true);
						oToolBar_1.setVisible(true);

						break;

					case "7": // Agregar Buzón Factura - Sin CFDI
						oView.byId("idFEArea").setVisible(false);
						oView.byId("idFEResponsable").setVisible(false);
						oView.byId("idFEConcepto").setVisible(false);
						oView.byId("idFESubtotal").setVisible(false);
						oView.byId("idFEIVA").setVisible(false);
						oView.byId("idFEDocOtros").setVisible(false);
						oView.byId("idFEDocXML").setVisible(false);

						oTable_4.setVisible(true);
						oToolBar_1.setVisible(true);

						break;

					case "8": // Buzón de facturas / Sin Entradas
						oView.byId("idFEArea").setVisible(false);
						oView.byId("idFEResponsable").setVisible(false);
						oView.byId("idFEConcepto").setVisible(false);
						oView.byId("idFEFactura").setVisible(false);
						oView.byId("idFEFechaFactura").setVisible(false);
						oView.byId("idFESubtotal").setVisible(false);
						oView.byId("idFEIVA").setVisible(false);
						oView.byId("idFEMoneda").setVisible(false);
						oView.byId("idFEDocOtros").setVisible(false);

						break;
					*/
				}

				oTitle.bindProperty("text", "i18n>EnvioFacturas." + pKey + ".title");
			},

			f_UpdateCantidadReg: function () {
				var n = parseInt(mModel.getProperty("/CantFiles"));
				mModel.setProperty("/CantFiles", (n + 1));
			},
			f_UpdateCantidadReg1: function () {
				var n = parseInt(mModel.getProperty("/CantFiles1"));
				mModel.setProperty("/CantFiles1", (n + 1));
			},

			f_COC_CONSINCFDI: function () {
				function oFunction(oData) {

					oCtrl_EnvioFacturas.f_Limpiar_Cjas();

					sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
					sap.ui.getCore().getModel("mMessages").refresh();

					var oObjeto = sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:ZW18_ADD_INV_POResponse/ES_RETURN");
					oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.MESSAGE);
				}

				var oObject = oCtrl_EnvioFacturas.getView().getModel("mEnvioFacturas").getData();

				oObject.XmlXstring = mFiles["data_file_xml"] != undefined ? mFiles["data_file_xml"].replace("data:text/xml;base64,", "") : "";
				oObject.PdfXstring = mFiles["data_file_pdf"] != undefined ? mFiles["data_file_pdf"].replace("data:application/pdf;base64,", "") : "";
				oObject._OtroXstring = mFiles["data_file_otro"] != undefined ? mFiles["data_file_otro"].replace("data:application/pdf;base64,", "") : "";

				//oCtrl_EnvioFacturas.oServ_EnviarFactCOC_ZW18(oObject,oFunction);
				////Flag key ==1
				if (_oFlag_Key == "1") {
					oCtrl_EnvioFacturas.oServ_ValidacionXML(oObject, oFunction); // Envía la solicitud  XML 

				} else if (_oFlag_Key == "2") { // condición para el flag "2"
					oCtrl_EnvioFacturas.oServ_EnviarFactCOC_ZW18(oObject, oFunction); //solicitud OC sin CFDI
				} else if (_oFlag_Key == "5") {
					oCtrl_EnvioFacturas.oServ_EnviarFactConsignacion_ZW18(oObject, oFunction);
				}


			},
			/*
			f_COC_CONSINCFDI : function() {
				function oFunction(oData){
					
					oCtrl_EnvioFacturas.f_Limpiar_Cjas();
	
					sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
					sap.ui.getCore().getModel("mMessages").refresh();
					
					var oObjeto=sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:ZW18_ADD_INV_POResponse/ES_RETURN");
					oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.MESSAGE );
				}
				
				var oObject=oCtrl_EnvioFacturas.getView().getModel("mEnvioFacturas").getData();
				
				oObject.XmlXstring = mFiles["data_file_xml"] != undefined ? mFiles["data_file_xml"].replace("data:text/xml;base64,","") : "" ;
				oObject.PdfXstring = mFiles["data_file_pdf"] != undefined ? mFiles["data_file_pdf"].replace("data:application/pdf;base64,","") : "" ;
				oObject._OtroXstring = mFiles["data_file_otro"] != undefined ? mFiles["data_file_otro"].replace("data:application/pdf;base64,","") : "" ;
				
				oCtrl_EnvioFacturas.oServ_EnviarFactCOC_ZW18(oObject,oFunction);
			},
			*/
			/*
			// ORR Validacion PAC
			f_COC_CONSINCFDI: function () {
				function oFunction(oData) {
	
					oCtrl_EnvioFacturas.f_Limpiar_Cjas();
	
					sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
					sap.ui.getCore().getModel("mMessages").refresh();
	
					var oObjeto = sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:ZW18_ADD_INV_POResponse/ES_RETURN");
					oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.MESSAGE);
				}
	
				var oObject = oCtrl_EnvioFacturas.getView().getModel("mEnvioFacturas").getData();
	
				oObject.XmlXstring = mFiles["data_file_xml"] != undefined ? mFiles["data_file_xml"].replace("data:text/xml;base64,", "") : "";
				oObject.PdfXstring = mFiles["data_file_pdf"] != undefined ? mFiles["data_file_pdf"].replace("data:application/pdf;base64,", "") : "";
				oObject._OtroXstring = mFiles["data_file_otro"] != undefined ? mFiles["data_file_otro"].replace("data:application/pdf;base64,", "") : "";
	
				////Flag key ==1
				//if(_oFlag_Key == "1" ) {
					//oCtrl_EnvioFacturas.oServ_ValidacionXML(oObject,oFunction);
				//}
				//oCtrl_EnvioFacturas.oServ_EnviarFactCOC_ZW18(oObject,oFunction);
	
	
				/// validación XML
				if (_oFlag_Key == "1") {
					oCtrl_EnvioFacturas.oServ_ValidacionXML(oObject, function (data, status) {
						var json = xml2json(data);
						var errorOccurred = false;
	
						// Error en XML
						if (json.Error == 'true') {
							if (json.ErrorMessage != null) {
								oCnt_FHelps.f_showMessage("ERROR", json.ErrorMessage);
								errorOccurred = true;
							} else {
								var msgError = "Error en la validación del XML con el PAC";
								oCnt_FHelps.f_showMessage("ERROR", msgError);
								errorOccurred = true;
							}
						} else {
							if (json['s:Envelope']['s:Body']['DocumentValidationResponse'] != null) {
								if (json['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult'] != null) {
									json['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult']['FailedRules']['RuleResult'].forEach(ruleResult => {
										oCnt_FHelps.f_showMessage('ERROR', ruleResult.Message);
										errorOccurred = true;
									});
								}
							}
						}
	
						// Si no hubo errores en la validación XML, ejecutar oServ_EnviarFactCOC_ZW18
						if (!errorOccurred) {
							oCtrl_EnvioFacturas.oServ_EnviarFactCOC_ZW18(oObject, oFunction);
						}
	
	
					});
				}
			},
			*/
			f_SOC_CONSINCFDI: function () {

				function oFunction(oData) {

					oCtrl_EnvioFacturas.f_Limpiar_Cjas();
					sap.ui.getCore().getModel("mCombos").setProperty("/AREA_ZW18", []);
					sap.ui.getCore().getModel("mCombos").setProperty("/RESPONSABLE_ZW18", []);
					sap.ui.getCore().getModel("mCombos").setProperty("/CONCEPTO_ZW18", []);
					sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
					sap.ui.getCore().getModel("mMessages").refresh();

					var oObjeto = sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:Zw18FmWsCreateInvoiWoPoResponse/ImReturn");
					oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.Message);

				}

				var oObject = oCtrl_EnvioFacturas.getView().getModel("mEnvioFacturas").getData();

				if (_oFlag_Key == "4") {

					var data = sap.ui.getCore().getModel("mCombos").getData().IMPUESTOS_ZW18;
					var length = data.length;

					for (i = 0; i < length; i++) {
						if (data[i].TAXPER == oObject.TaxCode) {
							oObject.TaxCode = data[i].MWSKZ;
							oObject.TAXPER = data[i].TAXPER;
							break;
						}
					}
				}

				if (_oFlag_Key == "3") {
					oObject.Subtotal = "";
					oObject.Bldat = "";
					oObject.TaxCode = "";
				}


				oObject.OpdfXstring = mFiles["data_file_otro"] != undefined ? mFiles["data_file_otro"].replace("data:application/pdf;base64,", "") : "";
				oObject.XmlXstring = mFiles["data_file_xml"] != undefined ? mFiles["data_file_xml"].replace("data:text/xml;base64,", "") : "";
				oObject.PdfXstring = mFiles["data_file_pdf"] != undefined ? mFiles["data_file_pdf"].replace("data:application/pdf;base64,", "") : "";

				//oCtrl_EnvioFacturas.oServ_EnviarFectSOC_ZW18(oObject, oFunction);
				if (_oFlag_Key == "3") {
					oCtrl_EnvioFacturas.oServ_ValidacionXML_SinOCCFDI(oObject, oFunction); // Envía la solicitud  XML 

				} else if (_oFlag_Key == "4") { // condición para el flag "2"
					oCtrl_EnvioFacturas.oServ_EnviarFectSOC_ZW18(oObject, oFunction); //solicitud OC sin CFDI
				}

			},
			/*
			f_SOC_CONSINCFDI: function () {


				function oFunction(oData) {

					oCtrl_EnvioFacturas.f_Limpiar_Cjas();
					sap.ui.getCore().getModel("mCombos").setProperty("/AREA_ZW18", []);
					sap.ui.getCore().getModel("mCombos").setProperty("/RESPONSABLE_ZW18", []);
					sap.ui.getCore().getModel("mCombos").setProperty("/CONCEPTO_ZW18", []);
					sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
					sap.ui.getCore().getModel("mMessages").refresh();

					var oObjeto = sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:Zw18FmWsCreateInvoiWoPoResponse/ImReturn");
					oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.Message);

				}

				var oObject = oCtrl_EnvioFacturas.getView().getModel("mEnvioFacturas").getData();

				if (_oFlag_Key == "4") {

					var data = sap.ui.getCore().getModel("mCombos").getData().IMPUESTOS_ZW18;
					var length = data.length;

					for (i = 0; i < length; i++) {
						if (data[i].TAXPER == oObject.TaxCode) {
							oObject.TaxCode = data[i].MWSKZ;
							oObject.TAXPER = data[i].TAXPER;
							break;
						}
					}
				}

				if (_oFlag_Key == "3") {
					oObject.Subtotal = "";
					oObject.Bldat = "";
					oObject.TaxCode = "";
				}


				oObject.OpdfXstring = mFiles["data_file_otro"] != undefined ? mFiles["data_file_otro"].replace("data:application/pdf;base64,", "") : "";
				oObject.XmlXstring = mFiles["data_file_xml"] != undefined ? mFiles["data_file_xml"].replace("data:text/xml;base64,", "") : "";
				oObject.PdfXstring = mFiles["data_file_pdf"] != undefined ? mFiles["data_file_pdf"].replace("data:application/pdf;base64,", "") : "";
				oCtrl_EnvioFacturas.oServ_EnviarFectSOC_ZW18(oObject, oFunction);

			},
			*/
			onPressEnviar: function (oEvt) {

				var that = this;
				var _timeout;

				//var oForm = oView.byId("idFormEnvioFacturas");
				var oDocXML = oView.byId("idDocXML");
				var oDocPDF = oView.byId("idDocPDF");
				var ComboSociedad = oView.byId("idComboSociedad");
				var fecha_factura = oView.byId("idFechaFactura");
				var factura = oView.byId("idFactura");
				var ComboIva = oView.byId("idComboIva");
				var ComboMoneda = oView.byId("idComboMoneda");
				var ComboArea = oView.byId("idComboArea");
				var ComboResponsable = oView.byId("idComboResponsable");
				var ComboConcepto = oView.byId("idComboConcepto");

				// RESET VARIABLES
				mModel.setProperty("/CantFiles", 0);
				mModel.setProperty("/CantFiles1", 0);

				if (_oFlag_Key == "1" || _oFlag_Key == "2") {
					if (_oFlag_Key == "1" && oCnt_FHelps.f_Inputs([oDocXML, oDocPDF, ComboSociedad]) == false) {
						return;

					}
					// ORR Validación anterior donde tomaba el combo del IVA como obligatorio
					/*
					if(_oFlag_Key=="2" && oCnt_FHelps.f_Inputs([oDocPDF,ComboSociedad,fecha_factura,factura,ComboIva,ComboMoneda]) == false){					
						return;
						
					}
					*/
					// ORR Validación para que el combo del IVA en caso de ser cero, no se ponga como obligatorio
					var comboIva = ComboIva.getSelectedItem();

					if (comboIva === null || comboIva === "") {
						console.log("Entra a if");
						if (_oFlag_Key == "2" && oCnt_FHelps.f_Inputs([oDocPDF, ComboSociedad, fecha_factura, factura, ComboIva, ComboMoneda]) == false) {
							return;

						}

					} else {
						console.log("Entra a else");
						if (_oFlag_Key == "2" && oCnt_FHelps.f_Inputs([oDocPDF, ComboSociedad, fecha_factura, factura, ComboMoneda]) == false) {
							return;

						}
					}

					// ORR Validación para agregar al menos un documento
					var oItems = oCore.getModel("mTables").getProperty("/ORDENCOMPRA_CFACTURA_1");
					if (oItems.length === 0) {
						MessageBox.information("Agregue al menos un documento");
						return;
					}

					if (_oFlag_Key == "1")
						var domRef_xml = oCtrl_EnvioFacturas.getView().byId("idDocXML").getFocusDomRef();

					var domRef_pdf = oCtrl_EnvioFacturas.getView().byId("idDocPDF").getFocusDomRef();
					var domRef_otro = oCtrl_EnvioFacturas.getView().byId("idDocOtroPDF").getFocusDomRef();

					if (_oFlag_Key == "1")
						if (domRef_xml != undefined) file_xml = domRef_xml.files[0];

					if (domRef_pdf != undefined) file_pdf = domRef_pdf.files[0];
					if (domRef_otro != undefined) file_otro = domRef_otro.files[0];

					// BG Validación en caso de que se oculte el campo de "Otros documentos"
					var file_otro = undefined; //BG

					if (domRef_otro !== undefined && domRef_otro !== null) {
						if (domRef_otro.style.display !== "none") {
							// Si domRef_otro está definido y no está oculto
							file_otro = domRef_otro.files[0]; //asignar fila
						}
					}
					//

					var data_file_xml;
					var data_file_pdf;
					var data_file_otro;

					_CantFiles = 0;

					if (_oFlag_Key == "1")
						if (file_xml != undefined) _CantFiles++;	// 1


					if (file_pdf != undefined) _CantFiles++;	// 2

					// BG Validación en caso de que se oculte el campo de "Otros documentos"
					//if (file_otro != undefined) _CantFiles++;// 3
					if (file_otro !== undefined && file_otro !== null) { ///3
						// file_otro está definido y no es nulo
						_CantFiles++; //
					}

					// EXCLUSIVO PARA : CON ORDEN DE COMPRA CON CFDI
					if (_oFlag_Key == "1")
						if (file_xml != undefined) {
							oCnt_FHelps.f_ToBase64Binary(file_xml,
								function (File64xml) {
									mFiles["data_file_xml"] = File64xml;
									setTimeout(function () {
										that.f_UpdateCantidadReg();
									}, 50);
								});
						}

					if (file_pdf != undefined) {
						oCnt_FHelps.f_ToBase64Binary(file_pdf,
							function (File64pdf) {
								mFiles["data_file_pdf"] = File64pdf;
								setTimeout(function () {
									that.f_UpdateCantidadReg();
								}, 500);
							});
					}
					if (file_otro != undefined) {
						oCnt_FHelps.f_ToBase64Binary(file_otro,
							function (File64otro) {
								mFiles["data_file_otro"] = File64otro;
								setTimeout(function () {
									that.f_UpdateCantidadReg();
								}, 800);
							});
					}
				}
				else if (_oFlag_Key == "3") {
					if (oCnt_FHelps.f_Inputs([oDocXML, oDocPDF, ComboSociedad, factura, ComboArea, ComboResponsable, ComboConcepto]) == false) {
						return;

					}

					var domRef_xml = oCtrl_EnvioFacturas.getView().byId("idDocXML").getFocusDomRef();
					var domRef_pdf = oCtrl_EnvioFacturas.getView().byId("idDocPDF").getFocusDomRef();
					var domRef_otro = oCtrl_EnvioFacturas.getView().byId("idDocOtroPDF").getFocusDomRef();

					if (domRef_xml != undefined) file_xml = domRef_xml.files[0];
					if (domRef_pdf != undefined) file_pdf = domRef_pdf.files[0];
					if (domRef_otro != undefined) file_otro = domRef_otro.files[0];

					var data_file_xml;
					var data_file_pdf;
					var data_file_otro;

					_CantFiles1 = 0;

					if (file_xml != undefined) _CantFiles1++;	// 1
					if (file_pdf != undefined) _CantFiles1++;	// 2
					if (file_otro != undefined) _CantFiles1++;// 3

					if (file_xml != undefined) {
						oCnt_FHelps.f_ToBase64Binary(file_xml,
							function (File64xml) {
								mFiles["data_file_xml"] = File64xml;
								setTimeout(function () {
									that.f_UpdateCantidadReg1();
								}, 50);
							});
					}

					if (file_pdf != undefined) {
						oCnt_FHelps.f_ToBase64Binary(file_pdf,
							function (File64pdf) {
								mFiles["data_file_pdf"] = File64pdf;
								setTimeout(function () {
									that.f_UpdateCantidadReg1();
								}, 500);
							});
					}
					if (file_otro != undefined) {
						oCnt_FHelps.f_ToBase64Binary(file_otro,
							function (File64otro) {
								mFiles["data_file_otro"] = File64otro;
								setTimeout(function () {
									that.f_UpdateCantidadReg1();
								}, 800);
							});
					}


					//////////////////
					/*var domRef_xml = oCtrl_EnvioFacturas.getView().byId("idDocXML").getFocusDomRef();
					var domRef_pdf = oCtrl_EnvioFacturas.getView().byId("idDocPDF").getFocusDomRef();
					var domRef_otro_pdf = oCtrl_EnvioFacturas.getView().byId("idDocOtroPDF").getFocusDomRef();
				var file_xml = domRef_xml.files[0];
				var file_pdf = domRef_pdf.files[0];
				var file_otro_pdf = domRef_otro_pdf.files[0];
				var data_file_xml;
				var data_file_pdf;
				var data_file_otro_pdf;
				
				var oFunction1 =  function(File64xml){
					
					data_file_xml = File64xml;
					
					var oFunction2 =  function(File64pdf){
						data_file_pdf = File64pdf;
						
						function oFunction(oData){
							
							oCtrl_EnvioFacturas.f_Limpiar_Cjas();
							sap.ui.getCore().getModel("mCombos").setProperty("/AREA_ZW18", []);
							sap.ui.getCore().getModel("mCombos").setProperty("/RESPONSABLE_ZW18", []);
							sap.ui.getCore().getModel("mCombos").setProperty("/CONCEPTO_ZW18", []);
							sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
							sap.ui.getCore().getModel("mMessages").refresh();
						    
							var oObjeto=sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:Zw18FmWsCreateIncinvWoPoResponse/ImReturn");
							oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.Message, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
							 
						}
						
						var oObject=oCtrl_EnvioFacturas.getView().getModel("mEnvioFacturas").getData();
						
						//oObject.XmlXstring = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48Y2ZkaTpDb21wcm9iYW50ZSB4bWxuczpjZmRpPSJodHRwOi8vd3d3LnNhdC5nb2IubXgvY2ZkLzMiIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiIHhzaTpzY2hlbWFMb2NhdGlvbj0iaHR0cDovL3d3dy5zYXQuZ29iLm14L2NmZC8zIGh0dHA6Ly93d3cuc2F0LmdvYi5teC9zaXRpb19pbnRlcm5ldC9jZmQvMy9jZmR2MzMueHNkIiBWZXJzaW9uPSIzLjMiIFNlcmllPSJBIiBGb2xpbz0iMjYxNCIgRmVjaGE9IjIwMTgtMTItMTNUMTE6MjU6MTIiIFNlbGxvPSJmT2lneGpSZGY5RTNhVkJTZTVCcGppaFFPUTN5anZwajhQZ1BlTnBOQkVaY0VuMmVCQ0pZRWxPYmlTcXlNbnZZMk9JN242Z00wcUZOeWowU3BFZmRuYktRNHVlTUdad0FUU2tqV2xMdWt2RmVvclJDVXZCaERGeXkrWDc5eUV1Wllid1A0cUJlbzFrTmY2NkdCTzhqOTJHZ3Y2L2VReXpFLzhqa21wZk9KN2VHQUhYb1N5YThUZ1N2SmNWdUx3ck1TZGVpdHBhUzQ0TTR3ek1pdnlpRDRRRDNtc3ZPMzJhZ0tQN1JKUER0TDFiOHA5cy9hNFY4d1U1SDVyMkpVYk41ZUxTNUlZbXM3WDBmRGVTVVhCRG52WG5Kbkp6SGJCNVZrMGJ0NUI2SngvK2NxVzhjU0R3aDEyRkRGYjA3ejZxWHo3K3EybDZycGZ2REd3b1dhSlpCdUE9PSIgRm9ybWFQYWdvPSI5OSIgTm9DZXJ0aWZpY2Fkbz0iMDAwMDEwMDAwMDA0MDQ5OTU2NzUiIENlcnRpZmljYWRvPSJNSUlHQ2pDQ0EvS2dBd0lCQWdJVU1EQXdNREV3TURBd01EQTBNRFE1T1RVMk56VXdEUVlKS29aSWh2Y05BUUVMQlFBd2dnR3lNVGd3TmdZRFZRUUREQzlCTGtNdUlHUmxiQ0JUWlhKMmFXTnBieUJrWlNCQlpHMXBibWx6ZEhKaFkybkRzMjRnVkhKcFluVjBZWEpwWVRFdk1DMEdBMVVFQ2d3bVUyVnlkbWxqYVc4Z1pHVWdRV1J0YVc1cGMzUnlZV05wdzdOdUlGUnlhV0oxZEdGeWFXRXhPREEyQmdOVkJBc01MMEZrYldsdWFYTjBjbUZqYWNPemJpQmtaU0JUWldkMWNtbGtZV1FnWkdVZ2JHRWdTVzVtYjNKdFlXTnB3N051TVI4d0hRWUpLb1pJaHZjTkFRa0JGaEJoWTI5a2MwQnpZWFF1WjI5aUxtMTRNU1l3SkFZRFZRUUpEQjFCZGk0Z1NHbGtZV3huYnlBM055d2dRMjlzTGlCSGRXVnljbVZ5YnpFT01Bd0dBMVVFRVF3Rk1EWXpNREF4Q3pBSkJnTlZCQVlUQWsxWU1Sa3dGd1lEVlFRSURCQkVhWE4wY21sMGJ5QkdaV1JsY21Gc01SUXdFZ1lEVlFRSERBdERkV0YxYUhURHFXMXZZekVWTUJNR0ExVUVMUk1NVTBGVU9UY3dOekF4VGs0ek1WMHdXd1lKS29aSWh2Y05BUWtDREU1U1pYTndiMjV6WVdKc1pUb2dRV1J0YVc1cGMzUnlZV05wdzdOdUlFTmxiblJ5WVd3Z1pHVWdVMlZ5ZG1samFXOXpJRlJ5YVdKMWRHRnlhVzl6SUdGc0lFTnZiblJ5YVdKMWVXVnVkR1V3SGhjTk1UY3dNVE13TVRneE5qQTVXaGNOTWpFd01UTXdNVGd4TmpBNVdqQ0JxakVoTUI4R0ExVUVBeE1ZU2xWQlRpQlNRVTFQVGlCTVQxQkZXaUJOVDFKVVJWSkJNU0V3SHdZRFZRUXBFeGhLVlVGT0lGSkJUVTlPSUV4UFVFVmFJRTFQVWxSRlVrRXhJVEFmQmdOVkJBb1RHRXBWUVU0Z1VrRk5UMDRnVEU5UVJWb2dUVTlTVkVWU1FURVdNQlFHQTFVRUxSTU5URTlOU2pjMU1EZ3pNRUZCTURFYk1Ca0dBMVVFQlJNU1RFOU5TamMxTURnek1FaFdXbEJTVGpBeU1Rb3dDQVlEVlFRTEV3RkRNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUJDZ0tDQVFFQWhhUUFsellxcFdUMnhIRDd3UXBHeVFJcDRlNUtVcHpydTdmSlRBdmpzdk9oWU91V1FIbkFFVVg1bHp4YnN5YkhSTW1xbE54QTV0RVVHRDMzNzd1OWMrbmdvTGNzV1lpWlJnRDF4OFI5bXJXUlNGZkpBcnZaOVJ6WksyM1AwUkFyUUt4bEJvWVVxRUg1WmRlRVkrU3NIZ1oxeWlsczhxaERxZFJYQmlVTXR5Snphd3ZWcUVsUUpMVTJycUtPWVJNY0VCZGhJZ215SXBpamtuZFpOaHhLelRUZWpJMm9mL3hiODR6bWZEZkJjS3FZOGFiYk1PK2toTmdqQXdLalJqT2h2bFpkYUY5OEJ5dTI1dTFraHNHVkR4eXVhY0VyMlRIL2xiektVNjV5MzJUOFR1aUpUdnFLd2F3S1VUTmFtaFp0MDNnNkw1dnJyVjVKNHFBU3ZwMDhJUUlEQVFBQm94MHdHekFNQmdOVkhSTUJBZjhFQWpBQU1Bc0dBMVVkRHdRRUF3SUd3REFOQmdrcWhraUc5dzBCQVFzRkFBT0NBZ0VBZTFtNmRBbUZaWU1QRXJGMHdaZ1drRzJ4WmpQTHFoNkFMVVdEdGw5ZkNBQnFoeDJiTkhQSXZXYlRPWWpoSFNmMlk5N0lwWGdHaERNT0VOTFp3VlJqSlVyYW5SdldoVkphajNwWjZGcCs2cEdPQjVkTjRzOHNsaEI0ditFZUlPZExZNzJ2bUR3c3A5YzFKV1dobVlCb3NodTB3SGpYVnBrb3diOU5OaGZ6UktpOGVwaHh3S3ZWaFBWYkNINFJ0RUpNbkJEbXpKVXpHRFZtN29UR3VKbUFJR3ZRd292cVNUWS84TC9DU2ozL1htdW5FV3dJR3JMZ2RmUEpvVm91UWNGQnZ5Z2p3ZWhOZG5lZll3SEhjUnVYZ2x2elRBcTFHc25XbUhJdk55bFJWZ1dUcWxTUDFoUUNSTmxoemxOYVBCbi8zbTdqS05FeGxBVE04eUF6MGxiTW5Kc0ZkNi9FNGU3UTA4ckJIdmRrWHdVR0JyU0ZVTzZQbHZvQThRQjVPTjR4UXJJVkUwRFdmTU5Kei9jQnVBajBMTnJ2aGNIYVNpeWFpTHp3SW1ldWRXeDdWWXZRbDB0ZjhUdDNBc3B2bnFaSW9sSlN3TmQ1M1R3anNLTWQrR0FMNnhyWUNmanB3U2xNNklCZyswellZYVBWSDBLYmc5NTNqL1FYNkhCTDJCUWdtTGJBOTU1T3dkZno2eUJNQUFRKy9lUXZZZ29YOXBreGtwUFJzNElVUDlFMXpjM0NYYVNXVGV0VXhBZVV6Y1ZqUzE4elpBUGtuVzVhckRsME5hM3pqbTJpaXdXWERRWHdjMFM4UEZmVnlyZDFINzRGSHBhczdaRlpHSk82ek9oVFlBMEJwOFJydkN4WCtxa0dpMFluaFlscW0rYjVkOXluandlZWNhcmR3Z2M9IiBTdWJUb3RhbD0iMTc0NjAuMDAiIE1vbmVkYT0iTVhOIiBUb3RhbD0iMjAyNTMuNjAiIFRpcG9EZUNvbXByb2JhbnRlPSJJIiBNZXRvZG9QYWdvPSJQUEQiIEx1Z2FyRXhwZWRpY2lvbj0iODk0MTAiPgogIDxjZmRpOkVtaXNvciBOb21icmU9IkpVQU4gUkFNT04gTE9QRVogTU9SVEVSQSIgUmZjPSJMT01KNzUwODMwQUEwIiBSZWdpbWVuRmlzY2FsPSI2MTIiLz4KICA8Y2ZkaTpSZWNlcHRvciBSZmM9IlNNRTE0MDYwNTg1MCIgTm9tYnJlPSJTVFlST1BFSyBNRVhJQ08gUy5BLiBERSBDLlYuIiBVc29DRkRJPSJHMDMiLz4KICA8Y2ZkaTpDb25jZXB0b3M+CiAgICA8Y2ZkaTpDb25jZXB0byBDbGF2ZVByb2RTZXJ2PSI5MzE0MTgwOCIgTm9JZGVudGlmaWNhY2lvbj0iUkwtMDEiIENhbnRpZGFkPSIxLjAwIiBDbGF2ZVVuaWRhZD0iRTQ4IiBVbmlkYWQ9IlNFUlZJQ0lPIiBEZXNjcmlwY2lvbj0iRVNUVURJTyBERSBSVUlETyBMQUJPUkFMIFkgUEVSU09OQUwiIFZhbG9yVW5pdGFyaW89IjE3NDYwLjAwIiBJbXBvcnRlPSIxNzQ2MC4wMCI+CiAgICAgIDxjZmRpOkltcHVlc3Rvcz4KICAgICAgICA8Y2ZkaTpUcmFzbGFkb3M+CiAgICAgICAgICA8Y2ZkaTpUcmFzbGFkbyBCYXNlPSIxNzQ2MC4wMCIgSW1wdWVzdG89IjAwMiIgVGlwb0ZhY3Rvcj0iVGFzYSIgVGFzYU9DdW90YT0iMC4xNjAwMDAiIEltcG9ydGU9IjI3OTMuNjAiLz4KICAgICAgICA8L2NmZGk6VHJhc2xhZG9zPgogICAgICA8L2NmZGk6SW1wdWVzdG9zPgogICAgPC9jZmRpOkNvbmNlcHRvPgogIDwvY2ZkaTpDb25jZXB0b3M+CiAgPGNmZGk6SW1wdWVzdG9zIFRvdGFsSW1wdWVzdG9zVHJhc2xhZGFkb3M9IjI3OTMuNjAiPgogICAgPGNmZGk6VHJhc2xhZG9zPgogICAgICA8Y2ZkaTpUcmFzbGFkbyBJbXB1ZXN0bz0iMDAyIiBUaXBvRmFjdG9yPSJUYXNhIiBUYXNhT0N1b3RhPSIwLjE2MDAwMCIgSW1wb3J0ZT0iMjc5My42MCIvPgogICAgPC9jZmRpOlRyYXNsYWRvcz4KICA8L2NmZGk6SW1wdWVzdG9zPgogIDxjZmRpOkNvbXBsZW1lbnRvPgogICAgPHRmZDpUaW1icmVGaXNjYWxEaWdpdGFsIHhtbG5zOnRmZD0iaHR0cDovL3d3dy5zYXQuZ29iLm14L1RpbWJyZUZpc2NhbERpZ2l0YWwiIHhzaTpzY2hlbWFMb2NhdGlvbj0iaHR0cDovL3d3dy5zYXQuZ29iLm14L1RpbWJyZUZpc2NhbERpZ2l0YWwgaHR0cDovL3d3dy5zYXQuZ29iLm14L3NpdGlvX2ludGVybmV0L2NmZC9UaW1icmVGaXNjYWxEaWdpdGFsL1RpbWJyZUZpc2NhbERpZ2l0YWx2MTEueHNkIiBWZXJzaW9uPSIxLjEiIFVVSUQ9ImU5OWZmZTM0LWYwNWMtNDk5Yy04ZWYwLWFlYmQ2NmY2ZWU1MiIgRmVjaGFUaW1icmFkbz0iMjAxOC0xMi0xM1QxMToyNToxMyIgUmZjUHJvdkNlcnRpZj0iQVVSMTAwMTI4Tk4zIiBTZWxsb1NBVD0iWHZGS3FPUmwvdllWNEs1bTVhczRnUGFBbkJabEVYU1VqallTT3hvbXZjek1XZi9EK0Q3Ly9qNWdFUEY3eFVTem1jeGpiRHJuREx2S25UOWIyWVRFMFVXL1hVNzhyQkc0dllSMEVmODlGMnVRRmdLUnJMOUVyVitHQWxGWk03WFRDWVB4MDgrUzNYRVJ0Z3BTSE1XNzc4b2JURWJOMmJ0dk5tay9KQit5OTIwNGRkSkFHZnhLVTNOT3pRcE1PT29DL1A0UGEva01sTlcwRkVpSXhDOXZ3TytkQzQzUWYyN3c1OXZVM2tXakQ3NzlpOUt0OUZoa2JMaEUyd1NnTWNMUDNlaWVCT2VNQnBPYWh5THVIUXZTdis0cHh3czVIOEV1cmw5dE5MczFEZWdtcVlMUFd0ZTVFUlJOdFFaL1VhTEdwM00zc2RKY3ZDejlqSTlkOGxVZ1N3PT0iIFNlbGxvQ0ZEPSJmT2lneGpSZGY5RTNhVkJTZTVCcGppaFFPUTN5anZwajhQZ1BlTnBOQkVaY0VuMmVCQ0pZRWxPYmlTcXlNbnZZMk9JN242Z00wcUZOeWowU3BFZmRuYktRNHVlTUdad0FUU2tqV2xMdWt2RmVvclJDVXZCaERGeXkrWDc5eUV1Wllid1A0cUJlbzFrTmY2NkdCTzhqOTJHZ3Y2L2VReXpFLzhqa21wZk9KN2VHQUhYb1N5YThUZ1N2SmNWdUx3ck1TZGVpdHBhUzQ0TTR3ek1pdnlpRDRRRDNtc3ZPMzJhZ0tQN1JKUER0TDFiOHA5cy9hNFY4d1U1SDVyMkpVYk41ZUxTNUlZbXM3WDBmRGVTVVhCRG52WG5Kbkp6SGJCNVZrMGJ0NUI2SngvK2NxVzhjU0R3aDEyRkRGYjA3ejZxWHo3K3EybDZycGZ2REd3b1dhSlpCdUE9PSIgTm9DZXJ0aWZpY2Fkb1NBVD0iMDAwMDEwMDAwMDA0MDQ2MjQ0NjUiLz4KICA8L2NmZGk6Q29tcGxlbWVudG8+CjwvY2ZkaTpDb21wcm9iYW50ZT4=";
						//oObject.PdfXstring = "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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
						
						oObject.Subtotal="";
						oObject.Bldat="";
						oObject.TaxCode="";
						oObject.OpdfXstring="";
						oObject.XmlXstring = data_file_xml.replace("data:text/xml;base64,","");
						oObject.PdfXstring = data_file_pdf.replace("data:application/pdf;base64,","");
						oCtrl_EnvioFacturas.oServ_EnviarFectSOC_ZW18(oObject,oFunction);
					}
					
					oCnt_FHelps.f_ToBase64Binary(file_pdf, oFunction2);
				}
				
				oCnt_FHelps.f_ToBase64Binary(file_xml, oFunction1);*/
				}
				else if (_oFlag_Key == "4") {
					/*var domRef_pdf = oCtrl_EnvioFacturas.getView().byId("idDocPDF").getFocusDomRef();
					var domRef_otro_pdf = oCtrl_EnvioFacturas.getView().byId("idDocOtroPDF").getFocusDomRef();
				var file_pdf = domRef_pdf.files[0];
				var file_otro_pdf = domRef_otro_pdf.files[0];
				var data_file_pdf;
				var data_file_otro_pdf;
				*/

					///////////////////////////////////////////////

					//var domRef_xml = oCtrl_EnvioFacturas.getView().byId("idDocXML").getFocusDomRef();
					var domRef_pdf = oCtrl_EnvioFacturas.getView().byId("idDocPDF").getFocusDomRef();
					var domRef_otro = oCtrl_EnvioFacturas.getView().byId("idDocOtroPDF").getFocusDomRef();

					//if(domRef_xml != undefined) file_xml = domRef_xml.files[0];
					if (domRef_pdf != undefined) file_pdf = domRef_pdf.files[0];
					if (domRef_otro != undefined) file_otro = domRef_otro.files[0];

					//var data_file_xml;
					var data_file_pdf;
					var data_file_otro;

					_CantFiles1 = 0;

					//if(file_xml != undefined) _CantFiles1++;	// 1
					if (file_pdf != undefined) _CantFiles1++;	// 2
					if (file_otro != undefined) _CantFiles1++;// 3



					if (file_pdf != undefined) {
						oCnt_FHelps.f_ToBase64Binary(file_pdf,
							function (File64pdf) {
								mFiles["data_file_pdf"] = File64pdf;
								setTimeout(function () {
									that.f_UpdateCantidadReg1();
								}, 500);
							});
					}
					if (file_otro != undefined) {
						oCnt_FHelps.f_ToBase64Binary(file_otro,
							function (File64otro) {
								mFiles["data_file_otro"] = File64otro;
								setTimeout(function () {
									that.f_UpdateCantidadReg1();
								}, 800);
							});
					}

					////////////////////////////////////////////////
					//var oFunction1 =  function(File64xml){

					//data_file_pdf = File64xml;

					/*	var oFunction2 =  function(File64pdf){
							data_file_pdf = File64pdf;
							
							function oFunction(oData){
								
								oCtrl_EnvioFacturas.f_Limpiar_Cjas();
								sap.ui.getCore().getModel("mCombos").setProperty("/AREA_ZW18", []);
								sap.ui.getCore().getModel("mCombos").setProperty("/RESPONSABLE_ZW18", []);
								sap.ui.getCore().getModel("mCombos").setProperty("/CONCEPTO_ZW18", []);
								sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
								sap.ui.getCore().getModel("mMessages").refresh();
							    
								var oObjeto=sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:Zw18FmWsCreateIncinvWoPoResponse/ImReturn");
								oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.Message, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
								 
							}
							
							var oObject=oCtrl_EnvioFacturas.getView().getModel("mEnvioFacturas").getData();
							
							//oObject.XmlXstring = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48Y2ZkaTpDb21wcm9iYW50ZSB4bWxuczpjZmRpPSJodHRwOi8vd3d3LnNhdC5nb2IubXgvY2ZkLzMiIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiIHhzaTpzY2hlbWFMb2NhdGlvbj0iaHR0cDovL3d3dy5zYXQuZ29iLm14L2NmZC8zIGh0dHA6Ly93d3cuc2F0LmdvYi5teC9zaXRpb19pbnRlcm5ldC9jZmQvMy9jZmR2MzMueHNkIiBWZXJzaW9uPSIzLjMiIFNlcmllPSJBIiBGb2xpbz0iMjYxNCIgRmVjaGE9IjIwMTgtMTItMTNUMTE6MjU6MTIiIFNlbGxvPSJmT2lneGpSZGY5RTNhVkJTZTVCcGppaFFPUTN5anZwajhQZ1BlTnBOQkVaY0VuMmVCQ0pZRWxPYmlTcXlNbnZZMk9JN242Z00wcUZOeWowU3BFZmRuYktRNHVlTUdad0FUU2tqV2xMdWt2RmVvclJDVXZCaERGeXkrWDc5eUV1Wllid1A0cUJlbzFrTmY2NkdCTzhqOTJHZ3Y2L2VReXpFLzhqa21wZk9KN2VHQUhYb1N5YThUZ1N2SmNWdUx3ck1TZGVpdHBhUzQ0TTR3ek1pdnlpRDRRRDNtc3ZPMzJhZ0tQN1JKUER0TDFiOHA5cy9hNFY4d1U1SDVyMkpVYk41ZUxTNUlZbXM3WDBmRGVTVVhCRG52WG5Kbkp6SGJCNVZrMGJ0NUI2SngvK2NxVzhjU0R3aDEyRkRGYjA3ejZxWHo3K3EybDZycGZ2REd3b1dhSlpCdUE9PSIgRm9ybWFQYWdvPSI5OSIgTm9DZXJ0aWZpY2Fkbz0iMDAwMDEwMDAwMDA0MDQ5OTU2NzUiIENlcnRpZmljYWRvPSJNSUlHQ2pDQ0EvS2dBd0lCQWdJVU1EQXdNREV3TURBd01EQTBNRFE1T1RVMk56VXdEUVlKS29aSWh2Y05BUUVMQlFBd2dnR3lNVGd3TmdZRFZRUUREQzlCTGtNdUlHUmxiQ0JUWlhKMmFXTnBieUJrWlNCQlpHMXBibWx6ZEhKaFkybkRzMjRnVkhKcFluVjBZWEpwWVRFdk1DMEdBMVVFQ2d3bVUyVnlkbWxqYVc4Z1pHVWdRV1J0YVc1cGMzUnlZV05wdzdOdUlGUnlhV0oxZEdGeWFXRXhPREEyQmdOVkJBc01MMEZrYldsdWFYTjBjbUZqYWNPemJpQmtaU0JUWldkMWNtbGtZV1FnWkdVZ2JHRWdTVzVtYjNKdFlXTnB3N051TVI4d0hRWUpLb1pJaHZjTkFRa0JGaEJoWTI5a2MwQnpZWFF1WjI5aUxtMTRNU1l3SkFZRFZRUUpEQjFCZGk0Z1NHbGtZV3huYnlBM055d2dRMjlzTGlCSGRXVnljbVZ5YnpFT01Bd0dBMVVFRVF3Rk1EWXpNREF4Q3pBSkJnTlZCQVlUQWsxWU1Sa3dGd1lEVlFRSURCQkVhWE4wY21sMGJ5QkdaV1JsY21Gc01SUXdFZ1lEVlFRSERBdERkV0YxYUhURHFXMXZZekVWTUJNR0ExVUVMUk1NVTBGVU9UY3dOekF4VGs0ek1WMHdXd1lKS29aSWh2Y05BUWtDREU1U1pYTndiMjV6WVdKc1pUb2dRV1J0YVc1cGMzUnlZV05wdzdOdUlFTmxiblJ5WVd3Z1pHVWdVMlZ5ZG1samFXOXpJRlJ5YVdKMWRHRnlhVzl6SUdGc0lFTnZiblJ5YVdKMWVXVnVkR1V3SGhjTk1UY3dNVE13TVRneE5qQTVXaGNOTWpFd01UTXdNVGd4TmpBNVdqQ0JxakVoTUI4R0ExVUVBeE1ZU2xWQlRpQlNRVTFQVGlCTVQxQkZXaUJOVDFKVVJWSkJNU0V3SHdZRFZRUXBFeGhLVlVGT0lGSkJUVTlPSUV4UFVFVmFJRTFQVWxSRlVrRXhJVEFmQmdOVkJBb1RHRXBWUVU0Z1VrRk5UMDRnVEU5UVJWb2dUVTlTVkVWU1FURVdNQlFHQTFVRUxSTU5URTlOU2pjMU1EZ3pNRUZCTURFYk1Ca0dBMVVFQlJNU1RFOU5TamMxTURnek1FaFdXbEJTVGpBeU1Rb3dDQVlEVlFRTEV3RkRNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUJDZ0tDQVFFQWhhUUFsellxcFdUMnhIRDd3UXBHeVFJcDRlNUtVcHpydTdmSlRBdmpzdk9oWU91V1FIbkFFVVg1bHp4YnN5YkhSTW1xbE54QTV0RVVHRDMzNzd1OWMrbmdvTGNzV1lpWlJnRDF4OFI5bXJXUlNGZkpBcnZaOVJ6WksyM1AwUkFyUUt4bEJvWVVxRUg1WmRlRVkrU3NIZ1oxeWlsczhxaERxZFJYQmlVTXR5Snphd3ZWcUVsUUpMVTJycUtPWVJNY0VCZGhJZ215SXBpamtuZFpOaHhLelRUZWpJMm9mL3hiODR6bWZEZkJjS3FZOGFiYk1PK2toTmdqQXdLalJqT2h2bFpkYUY5OEJ5dTI1dTFraHNHVkR4eXVhY0VyMlRIL2xiektVNjV5MzJUOFR1aUpUdnFLd2F3S1VUTmFtaFp0MDNnNkw1dnJyVjVKNHFBU3ZwMDhJUUlEQVFBQm94MHdHekFNQmdOVkhSTUJBZjhFQWpBQU1Bc0dBMVVkRHdRRUF3SUd3REFOQmdrcWhraUc5dzBCQVFzRkFBT0NBZ0VBZTFtNmRBbUZaWU1QRXJGMHdaZ1drRzJ4WmpQTHFoNkFMVVdEdGw5ZkNBQnFoeDJiTkhQSXZXYlRPWWpoSFNmMlk5N0lwWGdHaERNT0VOTFp3VlJqSlVyYW5SdldoVkphajNwWjZGcCs2cEdPQjVkTjRzOHNsaEI0ditFZUlPZExZNzJ2bUR3c3A5YzFKV1dobVlCb3NodTB3SGpYVnBrb3diOU5OaGZ6UktpOGVwaHh3S3ZWaFBWYkNINFJ0RUpNbkJEbXpKVXpHRFZtN29UR3VKbUFJR3ZRd292cVNUWS84TC9DU2ozL1htdW5FV3dJR3JMZ2RmUEpvVm91UWNGQnZ5Z2p3ZWhOZG5lZll3SEhjUnVYZ2x2elRBcTFHc25XbUhJdk55bFJWZ1dUcWxTUDFoUUNSTmxoemxOYVBCbi8zbTdqS05FeGxBVE04eUF6MGxiTW5Kc0ZkNi9FNGU3UTA4ckJIdmRrWHdVR0JyU0ZVTzZQbHZvQThRQjVPTjR4UXJJVkUwRFdmTU5Kei9jQnVBajBMTnJ2aGNIYVNpeWFpTHp3SW1ldWRXeDdWWXZRbDB0ZjhUdDNBc3B2bnFaSW9sSlN3TmQ1M1R3anNLTWQrR0FMNnhyWUNmanB3U2xNNklCZyswellZYVBWSDBLYmc5NTNqL1FYNkhCTDJCUWdtTGJBOTU1T3dkZno2eUJNQUFRKy9lUXZZZ29YOXBreGtwUFJzNElVUDlFMXpjM0NYYVNXVGV0VXhBZVV6Y1ZqUzE4elpBUGtuVzVhckRsME5hM3pqbTJpaXdXWERRWHdjMFM4UEZmVnlyZDFINzRGSHBhczdaRlpHSk82ek9oVFlBMEJwOFJydkN4WCtxa0dpMFluaFlscW0rYjVkOXluandlZWNhcmR3Z2M9IiBTdWJUb3RhbD0iMTc0NjAuMDAiIE1vbmVkYT0iTVhOIiBUb3RhbD0iMjAyNTMuNjAiIFRpcG9EZUNvbXByb2JhbnRlPSJJIiBNZXRvZG9QYWdvPSJQUEQiIEx1Z2FyRXhwZWRpY2lvbj0iODk0MTAiPgogIDxjZmRpOkVtaXNvciBOb21icmU9IkpVQU4gUkFNT04gTE9QRVogTU9SVEVSQSIgUmZjPSJMT01KNzUwODMwQUEwIiBSZWdpbWVuRmlzY2FsPSI2MTIiLz4KICA8Y2ZkaTpSZWNlcHRvciBSZmM9IlNNRTE0MDYwNTg1MCIgTm9tYnJlPSJTVFlST1BFSyBNRVhJQ08gUy5BLiBERSBDLlYuIiBVc29DRkRJPSJHMDMiLz4KICA8Y2ZkaTpDb25jZXB0b3M+CiAgICA8Y2ZkaTpDb25jZXB0byBDbGF2ZVByb2RTZXJ2PSI5MzE0MTgwOCIgTm9JZGVudGlmaWNhY2lvbj0iUkwtMDEiIENhbnRpZGFkPSIxLjAwIiBDbGF2ZVVuaWRhZD0iRTQ4IiBVbmlkYWQ9IlNFUlZJQ0lPIiBEZXNjcmlwY2lvbj0iRVNUVURJTyBERSBSVUlETyBMQUJPUkFMIFkgUEVSU09OQUwiIFZhbG9yVW5pdGFyaW89IjE3NDYwLjAwIiBJbXBvcnRlPSIxNzQ2MC4wMCI+CiAgICAgIDxjZmRpOkltcHVlc3Rvcz4KICAgICAgICA8Y2ZkaTpUcmFzbGFkb3M+CiAgICAgICAgICA8Y2ZkaTpUcmFzbGFkbyBCYXNlPSIxNzQ2MC4wMCIgSW1wdWVzdG89IjAwMiIgVGlwb0ZhY3Rvcj0iVGFzYSIgVGFzYU9DdW90YT0iMC4xNjAwMDAiIEltcG9ydGU9IjI3OTMuNjAiLz4KICAgICAgICA8L2NmZGk6VHJhc2xhZG9zPgogICAgICA8L2NmZGk6SW1wdWVzdG9zPgogICAgPC9jZmRpOkNvbmNlcHRvPgogIDwvY2ZkaTpDb25jZXB0b3M+CiAgPGNmZGk6SW1wdWVzdG9zIFRvdGFsSW1wdWVzdG9zVHJhc2xhZGFkb3M9IjI3OTMuNjAiPgogICAgPGNmZGk6VHJhc2xhZG9zPgogICAgICA8Y2ZkaTpUcmFzbGFkbyBJbXB1ZXN0bz0iMDAyIiBUaXBvRmFjdG9yPSJUYXNhIiBUYXNhT0N1b3RhPSIwLjE2MDAwMCIgSW1wb3J0ZT0iMjc5My42MCIvPgogICAgPC9jZmRpOlRyYXNsYWRvcz4KICA8L2NmZGk6SW1wdWVzdG9zPgogIDxjZmRpOkNvbXBsZW1lbnRvPgogICAgPHRmZDpUaW1icmVGaXNjYWxEaWdpdGFsIHhtbG5zOnRmZD0iaHR0cDovL3d3dy5zYXQuZ29iLm14L1RpbWJyZUZpc2NhbERpZ2l0YWwiIHhzaTpzY2hlbWFMb2NhdGlvbj0iaHR0cDovL3d3dy5zYXQuZ29iLm14L1RpbWJyZUZpc2NhbERpZ2l0YWwgaHR0cDovL3d3dy5zYXQuZ29iLm14L3NpdGlvX2ludGVybmV0L2NmZC9UaW1icmVGaXNjYWxEaWdpdGFsL1RpbWJyZUZpc2NhbERpZ2l0YWx2MTEueHNkIiBWZXJzaW9uPSIxLjEiIFVVSUQ9ImU5OWZmZTM0LWYwNWMtNDk5Yy04ZWYwLWFlYmQ2NmY2ZWU1MiIgRmVjaGFUaW1icmFkbz0iMjAxOC0xMi0xM1QxMToyNToxMyIgUmZjUHJvdkNlcnRpZj0iQVVSMTAwMTI4Tk4zIiBTZWxsb1NBVD0iWHZGS3FPUmwvdllWNEs1bTVhczRnUGFBbkJabEVYU1VqallTT3hvbXZjek1XZi9EK0Q3Ly9qNWdFUEY3eFVTem1jeGpiRHJuREx2S25UOWIyWVRFMFVXL1hVNzhyQkc0dllSMEVmODlGMnVRRmdLUnJMOUVyVitHQWxGWk03WFRDWVB4MDgrUzNYRVJ0Z3BTSE1XNzc4b2JURWJOMmJ0dk5tay9KQit5OTIwNGRkSkFHZnhLVTNOT3pRcE1PT29DL1A0UGEva01sTlcwRkVpSXhDOXZ3TytkQzQzUWYyN3c1OXZVM2tXakQ3NzlpOUt0OUZoa2JMaEUyd1NnTWNMUDNlaWVCT2VNQnBPYWh5THVIUXZTdis0cHh3czVIOEV1cmw5dE5MczFEZWdtcVlMUFd0ZTVFUlJOdFFaL1VhTEdwM00zc2RKY3ZDejlqSTlkOGxVZ1N3PT0iIFNlbGxvQ0ZEPSJmT2lneGpSZGY5RTNhVkJTZTVCcGppaFFPUTN5anZwajhQZ1BlTnBOQkVaY0VuMmVCQ0pZRWxPYmlTcXlNbnZZMk9JN242Z00wcUZOeWowU3BFZmRuYktRNHVlTUdad0FUU2tqV2xMdWt2RmVvclJDVXZCaERGeXkrWDc5eUV1Wllid1A0cUJlbzFrTmY2NkdCTzhqOTJHZ3Y2L2VReXpFLzhqa21wZk9KN2VHQUhYb1N5YThUZ1N2SmNWdUx3ck1TZGVpdHBhUzQ0TTR3ek1pdnlpRDRRRDNtc3ZPMzJhZ0tQN1JKUER0TDFiOHA5cy9hNFY4d1U1SDVyMkpVYk41ZUxTNUlZbXM3WDBmRGVTVVhCRG52WG5Kbkp6SGJCNVZrMGJ0NUI2SngvK2NxVzhjU0R3aDEyRkRGYjA3ejZxWHo3K3EybDZycGZ2REd3b1dhSlpCdUE9PSIgTm9DZXJ0aWZpY2Fkb1NBVD0iMDAwMDEwMDAwMDA0MDQ2MjQ0NjUiLz4KICA8L2NmZGk6Q29tcGxlbWVudG8+CjwvY2ZkaTpDb21wcm9iYW50ZT4=";
							//oObject.PdfXstring = "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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
							
							oObject.XmlXstring = "";
							oObject.OpdfXstring = "";
							oObject.PdfXstring = data_file_pdf.replace("data:application/pdf;base64,","");
							
							var data=sap.ui.getCore().getModel("mCombos").getData().IMPUESTOS_ZW18;
							var length=data.length;
							
							for(i=0;i<length;i++){
								if(data[i].TAXPER==oObject.TaxCode){
									oObject.TaxCode=data[i].MWSKZ;
									break;
								}
							}
							
							oCtrl_EnvioFacturas.oServ_EnviarFectSOC_ZW18(oObject,oFunction);
						}
						
						oCnt_FHelps.f_ToBase64Binary(file_pdf, oFunction2);*/
					//}

					//oCnt_FHelps.f_ToBase64Binary(file_xml, oFunction1);
				}
				else if (_oFlag_Key == "5") {

					if (oCnt_FHelps.f_Inputs([oDocXML, oDocPDF, ComboSociedad]) == false) {
						return;
					}

					// ORR Validación para agregar al menos un documento
					var oItems = oCore.getModel("mTables").getProperty("/CONSIGNACION_CFACTURA_1");
					console.log(oItems);

					if (oItems.length === 0) {
						MessageBox.information("Agregue al menos un documento");
						return;
					}

					var domRef_xml = oCtrl_EnvioFacturas.getView().byId("idDocXML").getFocusDomRef();
					var domRef_pdf = oCtrl_EnvioFacturas.getView().byId("idDocPDF").getFocusDomRef();

					if (domRef_xml != undefined) file_xml = domRef_xml.files[0];
					if (domRef_pdf != undefined) file_pdf = domRef_pdf.files[0];

					var data_file_xml;
					var data_file_pdf;

					_CantFiles = 0;

					if (file_xml != undefined) _CantFiles++;	// 1
					if (file_pdf != undefined) _CantFiles++;	// 2

					if (file_xml != undefined) {
						oCnt_FHelps.f_ToBase64Binary(file_xml,
							function (File64xml) {
								mFiles["data_file_xml"] = File64xml;
								setTimeout(function () {
									that.f_UpdateCantidadReg();
								}, 50);
							});
					}

					if (file_pdf != undefined) {
						oCnt_FHelps.f_ToBase64Binary(file_pdf,
							function (File64pdf) {
								mFiles["data_file_pdf"] = File64pdf;
								setTimeout(function () {
									that.f_UpdateCantidadReg();
								}, 500);
							});
					}
				}
				// open dialog

				// simulate end of operation


				//////

				/*var oBusyDialog_c = new sap.m.BusyDialog({
					title	: oCnt_FHelps.f_readTranslate("Wait.title"),
					text	: oCnt_FHelps.f_readTranslate("EnvioFacturas."+_oFlag_Key+".text"),
					close : function(oEvt) {
						that.f_Limpiar_Cjas();
						jQuery.sap.clearDelayedCall(_timeout);
						oCnt_FHelps.f_showMessage("INFORMATION", oCnt_FHelps.f_readTranslate("EnvioFacturas.1.Exito.text"), undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
						oView.byId("idTableEnvioFacturas").setFooterText("Total: $0.00");
						
						if(_oFlag_Key=="2" || _oFlag_Key=="1")
							oCore.getModel("mTables").setProperty("/ORDENCOMPRA_CFACTURA_1", []);
					}
				});
				
				// open dialog
				oBusyDialog_c.open();
	
				// simulate end of operation
				_timeout = jQuery.sap.delayedCall(1000, this, function () {
					oBusyDialog_c.close();
				});*/

			},

			onPressSelectDoc: function (oEvt) {
				var that = this;

				// ORR Se resetean para no entrar en la validción de OnInit
				// RESET VARIABLES
				mModel.setProperty("/CantFiles", 0);
				mModel.setProperty("/CantFiles1", 0);

				//var oForm = oView.byId("idFormEnvioFacturas");
				sap.ui.getCore().getModel("mTables").setProperty("/ORDENCOMPRA_CFACTURA", []);
				var oComboSociedad = oView.byId("idComboSociedad");

				if (oCnt_FHelps.f_Inputs([oComboSociedad]) == false) {
					return;
				}

				sap.ui.getCore().getModel("mTables").getData().ORDENCOMPRA_CFACTURA_1 = [];
				sap.ui.getCore().getModel("mTables").refresh();
				oView.byId("idTableEnvioFacturas").setFooterText("Total: $0.00");

				/*	
				if(that.FormSelectDoc == undefined)
					that.FormSelectDoc = new sap.ui.layout.form.Form({
						editable: true,
						layout: new sap.ui.layout.form.ResponsiveGridLayout({
							labelSpanXL:3,labelSpanL:3,labelSpanM:3,labelSpanS:12,
							adjustLabelSpan:false,
							emptySpanXL:4,emptySpanL:4,emptySpanM:4,emptySpanS:0,
							columnsXL:1,columnsL:1,columnsM:1,
							singleContainerFullSize:false,
						}),
						formContainers: [
							new sap.ui.layout.form.FormContainer("IdFormContainer",{
								formElements: [
									 new sap.ui.layout.form.FormElement({
										 //label: "{i18n>Filters.razon_social}",
										 label: new sap.m.Label({
											 text : "{i18n>Filters.razon_social}",
											 textDirection: "LTR"
										 }),
										 fields: [
											 new sap.m.Select("id_SelectDoc_FSociedad",{
													//selectedKey: "mEnvioFacturas>BUKRS",
													items: {
														path: "mCombos>/SOCIEDADES_ZW18",
														template: new sap.ui.core.ListItem({
															key:"{mCombos>BUKRS}", text:"{mCombos>BUTXT}"
														})
													}
											 })
										 ]
									}),
									new sap.ui.layout.form.FormElement({
										 //label: "{i18n>Filters.f_orden_Compra} {i18n>CONDITIONPANEL_LABELFROM}",
										 label: new sap.m.Label({
											 text : "{i18n>Filters.f_orden_Compra} {i18n>CONDITIONPANEL_LABELFROM}",
											 textDirection: "LTR"
										 }),
										 fields: [
											 new sap.m.DatePicker("id_SelectDoc_FFecha1",{
													displayFormat: "dd/MM/yyyy",
													valueFormat: "yyyy-MM-dd"
											 })
										 ]
									}),
									new sap.ui.layout.form.FormElement({
										 //label: "{i18n>CONDITIONPANEL_LABELTO}",
										 label: new sap.m.Label({
											 text : "{i18n>CONDITIONPANEL_LABELTO}",
											 textDirection: "LTR"
										 }),
										 fields: [
											 new sap.m.DatePicker("id_SelectDoc_FFecha2",{
													displayFormat: "dd/MM/yyyy",
													valueFormat: "yyyy-MM-dd"
											 })
										 ]
									}),
									new sap.ui.layout.form.FormElement({
										 //label: "{i18n>Filters.tipo_recepcion}",
										 label: new sap.m.Label({
											 text : "{i18n>Filters.tipo_recepcion}",
											 textDirection: "LTR"
										 }),
										 fields: [
											 new sap.m.Select("id_SelectDoc_FTRecepcion",{
													//selectedKey: "mEnvioFacturas>TIPO",
													  forceSelection: false,
													items: {
														path: "mCombos>/TIPORECEPCION",
														template: new sap.ui.core.ListItem({
															key:"{mCombos>TIPO}", text:"{mCombos>TEXT}"
														})
													}
											 })
										 ]
									}),
								]
							})
						]
					})
					*/


				if (that.Table_Documentos == undefined)
					// ORR Crear contenido nuevo para filtros
					that.simpleFormFilters = new sap.ui.layout.form.SimpleForm({
						title: "{i18n>FilterPanel.Title}",
						layout: "ResponsiveGridLayout",
						content: [

							new sap.m.Label({ text: "{i18n>Filters.razon_social}" }),
							new sap.m.ComboBox({
								width: "50%",
								id: "comboRazonSocial",
								items: {
									path: "mCombos>/SOCIEDADES_ZW18",
									template: new sap.ui.core.ListItem({
										key: "{mCombos>BUKRS}",
										text: "{mCombos>BUTXT}"
									})
								}
							}),

							new sap.m.Label({ text: "{i18n>Filters.f_orden_Compra}" }),

							new sap.m.DatePicker({
								id: "datePickerFrom",
								placeholder: "{i18n>Filters.fecha_inicial}",
								valueFormat: "yyyy-MM-dd"
							}),
							/*
							new sap.m.Text({ 
								text: "-",
								class:"sapUiSmallMarginBegin sapUiSmallMarginEnd"
							}),
							*/
							new sap.m.DatePicker({
								id: "datePickerTo",
								placeholder: "{i18n>Filters.fecha_final}",
								valueFormat: "yyyy-MM-dd"
							}),

							new sap.m.Label({ text: "{i18n>Filters.tipo_recepcion}" }),
							new sap.m.ComboBox({
								width: "50%",
								id: "comboTipoRecepcion",
								items: {
									path: "mCombos>/TIPORECEPCION",
									template: new sap.ui.core.ListItem({
										key: "{mCombos>TIPO}",
										text: "{mCombos>TEXT}"
									})
								}
							}),

							/* new sap.m.Label({ text: "{i18n>Filters.moneda}" }),
							new sap.m.ComboBox({
								width: "50%",
								id: "comboMoneda",
								items: {
									path: "mCombos>/MONEDAS_ZW18",
									template: new sap.ui.core.ListItem({
										key: "{mCombos>WAERS}",
										text: "{mCombos>LTEXT}"
									})
								}
							}), */

							new sap.m.Label({ text: "{i18n>Filters.orden_compra}" }),
							new sap.m.Input({
								id: "ordenCompra",
								value: "",
								width: "50%"
							}),

							new sap.m.Label({ text: " " }),
							new sap.m.Button({
								text: "{i18n>FilterPanel.Button.1}",
								type: "Accept",
								icon: "sap-icon://filter",
								width: "10%",
								press: function () {
									console.log(sap.ui.getCore().getModel("mCombos"));
									var oController = oView.getController();
									var oKeyFilter = "ORDENCOMPRACFACTURA_2";

									//var condition_0 = that.getView().byId("comboRazonSocial").getSelectedKey();

									var condition_0 = sap.ui.getCore().byId("comboRazonSocial").getSelectedKey();
									console.log(condition_0);

									var condition_1_ini = sap.ui.getCore().byId("datePickerFrom").getValue();
									var condition_1_fin = sap.ui.getCore().byId("datePickerTo").getValue();
									console.log(condition_1_ini);
									console.log(condition_1_fin)

									var condition_2 = sap.ui.getCore().byId("comboTipoRecepcion").getSelectedKey();
									console.log(condition_2);

								/* 	var condition_3 = sap.ui.getCore().byId("comboMoneda").getSelectedKey();
									console.log(condition_3); */

									var condition_4 = sap.ui.getCore().byId("ordenCompra").getValue();
									console.log(condition_4);

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
											"keyField": "AEDAT",
											"value1": condition_1_ini,
											"value2": condition_1_fin,
											"showIfGrouped": false,
											"typeField": "date",
											"zstr": "<AEDAT><SIGN>I</SIGN><OPTION>BT</OPTION><LOW>" + condition_1_ini + "</LOW><HIGH>" + condition_1_fin + "</HIGH></AEDAT>"
										},
										{
											"key": "condition_2",
											"text": "Tipo Recepción: =" + condition_2,
											"exclude": false,
											"operation": "EQ",
											"keyField": "TIPO",
											"value1": condition_2,
											"value2": "",
											"showIfGrouped": false,
											"typeField": "combo",
											"zstr": "<TIPO>" + condition_2 + "</TIPO>"
										},
									/* 	{
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
										}, */
										{
											"key": "condition_4",
											"text": "Orden de compra: =" + condition_4,
											"exclude": false,
											"operation": "EQ",
											"keyField": "EBELN",
											"value1": condition_4,
											"value2": "",
											"showIfGrouped": false,
											"typeField": "string",
											"zstr": "<EBELN>" + condition_4 + "</EBELN>"
										}
									];

									oC_Modulo_WiseMobile.onSearchNewFilter(oEvt, oController, oFilterPanel, oKeyFilter);
								}
							}),

						]
					});

				that.Table_Documentos = new sap.m.Table("idTableDocumentos", {
					mode: "MultiSelect",
					footerText: "Total: $0.00",
					//Se quitaron estas propiedades para que seleccione correctamente todos los Items
					//growing: true,
					//growingThreshold: 5,
					//growingScrollToLoad : true,
					headerToolbar: new sap.m.Toolbar({
						content: [
							new sap.m.ToolbarSpacer(),
							new sap.m.Button({
								type: "Emphasized",
								icon: "sap-icon://add",
								text: "{i18n>EnvioFacturas.Popup.Button.1}",
								press: function (oEvt) {
									var that = this;

									var oTable = oCore.byId("idTableDocumentos");
									var length = oTable.getSelectedItems().length;

									if (length == 0) {
										var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
										oCnt_FHelps.f_showMessage("WARNING", oText);
									}
									else if (length >= 1) {
										var oPaths = oTable._aSelectedPaths; // getSelectedItems
										var oNameModel = oTable.getBindingInfo("items").model;
										var oModel = oCore.getModel(oNameModel);

										var total = 0.0;
										for (i = 0; i < oPaths.length; i++) {

											var oObject = jQuery.extend({}, oModel.getProperty(oPaths[i]));
											var monto = parseFloat(oObject.NETWR.replace("$", ""));
											total = total + monto;

											sap.ui.getCore().getModel("mTables").getData().ORDENCOMPRA_CFACTURA_1.push(oObject);

										}
										// Redondear a dos decimales y convertir a número
										var totalRedondeado = parseFloat(total.toFixed(2));
										// modelo local
										mModel.setProperty("/Subto", totalRedondeado);

										oView.byId("idTableEnvioFacturas").setFooterText("Total: $" + parseFloat(totalRedondeado).toFixed(2));
										sap.ui.getCore().getModel("mTables").refresh();
										//Logica para marcar el checkbox de los registros seleccionados 
										var oTable2 = oView.byId("idTableEnvioFacturas");
										var aItems = oTable2.getItems();
										for (var i = 0; i < aItems.length; i++)
											aItems[i].setSelected(true);
										oTable.setVisible(true);

										oDialog.close();
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
						var oTable = oCore.byId("idTableDocumentos");
						var length = oTable.getSelectedItems().length;

						var total = 0.0;

						if (length == 0) {
							oTable.setFooterText("Total: $0.00");
						}
						else {
							for (var i = 0; i < length; i++) {
								var oItem = oTable.getSelectedItems()[i];
								var idx = oTable.indexOfItem(oItem);
								var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
								var oModel = oCore.getModel(oNameModel);
								var oPath = oTable.getBindingInfo("items").path;

								var oObject = jQuery.extend({}, oModel.getProperty(oPath + "/" + idx));
								var monto = parseFloat(oObject.NETWR.replace("$", ""));
								total = total + monto;

							}
							oTable.setFooterText("Total: $" + parseFloat(total).toFixed(2));
						}
					},
					columns: [
						new sap.m.Column("idCol91", {
							header: new sap.m.Label({ text: "{i18n>EnvioFacturas.Documentos.Popup.Table.Column.1}" })
						}),
						new sap.m.Column("idCol92", {
							header: new sap.m.Label({ text: "{i18n>EnvioFacturas.Documentos.Popup.Table.Column.2}" })
						}),
						new sap.m.Column("idCol93", {
							header: new sap.m.Label({ text: "{i18n>EnvioFacturas.Documentos.Popup.Table.Column.3}" })
						}),
						new sap.m.Column("idCol94", {
							minScreenWidth: "Tablet",
							demandPopin: true,
							header: new sap.m.Label({ text: "{i18n>EnvioFacturas.Documentos.Popup.Table.Column.4}" })
						}),
						new sap.m.Column("idCol95", {
							minScreenWidth: "Tablet",
							demandPopin: true,
							header: new sap.m.Label({ text: "{i18n>EnvioFacturas.Documentos.Popup.Table.Column.5}" })
						}),
						new sap.m.Column("idCol96", {
							minScreenWidth: "Tablet",
							demandPopin: true,
							header: new sap.m.Label({ text: "{i18n>EnvioFacturas.Documentos.Popup.Table.Column.6}" })
						}),
						new sap.m.Column("idCol97", {
							minScreenWidth: "Tablet",
							demandPopin: true,
							header: new sap.m.Label({ text: "{i18n>EnvioFacturas.Documentos.Popup.Table.Column.7}" })
						}),
						new sap.m.Column("idCol98", {
							minScreenWidth: "Tablet",
							demandPopin: true,
							header: new sap.m.Label({ text: "{i18n>EnvioFacturas.Documentos.Popup.Table.Column.8}" })
						}),
						new sap.m.Column("idCol99", {
							minScreenWidth: "Tablet",
							demandPopin: true,
							header: new sap.m.Label({ text: "{i18n>EnvioFacturas.Documentos.Popup.Table.Column.9}" })
						}),
						new sap.m.Column("idCol100", {
							minScreenWidth: "Tablet",
							demandPopin: true,
							header: new sap.m.Label({ text: "{i18n>EnvioFacturas.Documentos.Popup.Table.Column.10}" })
						}),
						new sap.m.Column("idCol101", {
							minScreenWidth: "Tablet",
							demandPopin: true,
							header: new sap.m.Label({ text: "{i18n>EnvioFacturas.Documentos.Popup.Table.Column.11}" })
						}),
						new sap.m.Column("idCol102", {
							minScreenWidth: "Tablet",
							demandPopin: true,
							header: new sap.m.Label({ text: "{i18n>EnvioFacturas.Documentos.Popup.Table.Column.12}" })
						}),
						new sap.m.Column("idCol103", {
							minScreenWidth: "Tablet",
							demandPopin: true,
							header: new sap.m.Label({ text: "{i18n>EnvioFacturas.Documentos.Popup.Table.Column.13}" })
						})
					]
				}).bindItems({
					path: "mTables>/ORDENCOMPRA_CFACTURA",
					template:
						new sap.m.ColumnListItem({
							vAlign: "Middle",
							//type : "{type}",
							detailPress: function () {
								setTimeout(function () {
									sap.m.MessageToast.show("detail is pressed");
								}, 10);
							},
							cells: [
								new sap.m.Text({ text: "{mTables>EBELN}" }),
								new sap.m.Text({ text: "{mTables>EBELP}" }),
								new sap.m.Text({ text: "{mTables>MBLNR}" }),
								new sap.m.Text({ text: "{mTables>XBLNR}" }),
								new sap.m.Text({ text: "{mTables>AEDAT}" }),
								new sap.m.Text({ text: "{mTables>MATNR}" }),
								new sap.m.Text({ text: "{mTables>PO_UNIT}" }),
								new sap.m.Text({ text: "{mTables>TXZ01}" }),
								new sap.m.Text({ text: "{mTables>MENGE}" }),
								new sap.m.Text({ text: "{mTables>ZMENGE}" }),
								new sap.m.Text({ text: "{mTables>PO_UNIT}" }),
								//	Se agrega la conversión para el popup
								new sap.m.Text({
									text: {
										parts: ["mTables>NETWR"],
										formatter: function (value) {
											return oCtrl_EnvioFacturas.formatter.formatCurrency(value);
										}.bind(this)
									}
								}),
								new sap.m.Text({ text: "{mTables>WAERS}" })
							]
						})
				});

				var oDialog = new sap.m.Dialog("idPageDialog", {
					title: "{i18n>EnvioFacturas.Popup.title}",
					contentWidth: "100%",
					content: [
						// ORR Se añade el simpleform que sustituye a los filtros
						that.simpleFormFilters,
						that.Table_Documentos
					],
					buttons: [
						new sap.m.Button({
							text: "{i18n>Popup.Button.Cancelar}",
							press: function (oEvt) {

								oDialog.close();
							}
						})
					],
					beforeClose: function (oEvt) {

						var oContent = oDialog.removeAllContent();
						for (var i = 0; i < oContent.length; i++)
							oContent[i].destroy();

						that.Table_Documentos = undefined;
						that.FormSelectDoc = undefined;
						oCtrl_Main_P2P._oTPC_Core["idTableDocumentos"].destroy();
						oCtrl_Main_P2P._oTPC_Core["idTableDocumentos"] = undefined;

					},
					afterClose: function (oEvt) {
						oDialog.destroy();
					},
					beforeOpen: function (oEvt) {
						//var oSociedad = oView.byId("idComboSociedad").getSelectedItem();
						// .getKey() // .getText()
						// POR DEFECTO: RAZON SOCIAL ES EL PRIMER FILTRO
						//sap.ui.getCore().getModel("mFiltItems").setProperty("/ORDENCOMPRACFACTURA_2/0/zvalue1", oSociedad.getText())
						//oCtrl_EnvioFacturas.f_createAllFiltersPanel();

						// ORR Se comenta para no crear el filtro dentro del popup de "Envío de facturas"
						//oC_Modulo_WiseMobile.f_createFilterPanel("ORDENCOMPRACFACTURA_2", that, "idPageDialog", 5);

						if (oCtrl_Main_P2P._oTPC_Core["idTableDocumentos"] == undefined) {
							var oTableID = oCore.byId("idTableDocumentos");
							// Hidden/view Columns
							DemoPersoService.setMyPersData(oTableID);

							// init and activate controller
							oCtrl_Main_P2P._oTPC_Core["idTableDocumentos"] = new TablePersoController({
								table: oTableID,
								//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
								componentName: "demoApp",
								persoService: DemoPersoService,
							}).activate();
						}
					},
					afterOpen: function (oEvt) {
						oDialog.insertContent(that.FormSelectDoc, 0);
					}

				});
				//to get access to the global model
				oView.addDependent(oDialog);
				oDialog.open();
			},

			onPressSelectDocConsignacion: function (oEvt) {
				var that = this;

				// ORR Se resetean para no entrar en la validción de OnInit
				// RESET VARIABLES
				mModel.setProperty("/CantFiles", 0);
				mModel.setProperty("/CantFiles1", 0);

				//var oForm = oView.byId("idFormEnvioFacturas");
				sap.ui.getCore().getModel("mTables").setProperty("/CONSIGNACION_CFACTURA", []);
				var oComboSociedad = oView.byId("idComboSociedad");

				if (oCnt_FHelps.f_Inputs([oComboSociedad]) == false) {
					return;
				}

				sap.ui.getCore().getModel("mTables").getData().CONSIGNACION_CFACTURA_1 = [];
				sap.ui.getCore().getModel("mTables").refresh();
				oView.byId("idTableEnvioFacturasConsignacion").setFooterText("Total: $0.00");

				/*	
				if(that.FormSelectDoc == undefined)
					that.FormSelectDoc = new sap.ui.layout.form.Form({
						editable: true,
						layout: new sap.ui.layout.form.ResponsiveGridLayout({
							labelSpanXL:3,labelSpanL:3,labelSpanM:3,labelSpanS:12,
							adjustLabelSpan:false,
							emptySpanXL:4,emptySpanL:4,emptySpanM:4,emptySpanS:0,
							columnsXL:1,columnsL:1,columnsM:1,
							singleContainerFullSize:false,
						}),
						formContainers: [
							new sap.ui.layout.form.FormContainer("IdFormContainer",{
								formElements: [
									 new sap.ui.layout.form.FormElement({
										 //label: "{i18n>Filters.razon_social}",
										 label: new sap.m.Label({
											 text : "{i18n>Filters.razon_social}",
											 textDirection: "LTR"
										 }),
										 fields: [
											 new sap.m.Select("id_SelectDoc_FSociedad",{
													//selectedKey: "mEnvioFacturas>BUKRS",
													items: {
														path: "mCombos>/SOCIEDADES_ZW18",
														template: new sap.ui.core.ListItem({
															key:"{mCombos>BUKRS}", text:"{mCombos>BUTXT}"
														})
													}
											 })
										 ]
									}),
									new sap.ui.layout.form.FormElement({
										 //label: "{i18n>Filters.f_orden_Compra} {i18n>CONDITIONPANEL_LABELFROM}",
										 label: new sap.m.Label({
											 text : "{i18n>Filters.f_orden_Compra} {i18n>CONDITIONPANEL_LABELFROM}",
											 textDirection: "LTR"
										 }),
										 fields: [
											 new sap.m.DatePicker("id_SelectDoc_FFecha1",{
													displayFormat: "dd/MM/yyyy",
													valueFormat: "yyyy-MM-dd"
											 })
										 ]
									}),
									new sap.ui.layout.form.FormElement({
										 //label: "{i18n>CONDITIONPANEL_LABELTO}",
										 label: new sap.m.Label({
											 text : "{i18n>CONDITIONPANEL_LABELTO}",
											 textDirection: "LTR"
										 }),
										 fields: [
											 new sap.m.DatePicker("id_SelectDoc_FFecha2",{
													displayFormat: "dd/MM/yyyy",
													valueFormat: "yyyy-MM-dd"
											 })
										 ]
									}),
									new sap.ui.layout.form.FormElement({
										 //label: "{i18n>Filters.tipo_recepcion}",
										 label: new sap.m.Label({
											 text : "{i18n>Filters.tipo_recepcion}",
											 textDirection: "LTR"
										 }),
										 fields: [
											 new sap.m.Select("id_SelectDoc_FTRecepcion",{
													//selectedKey: "mEnvioFacturas>TIPO",
													  forceSelection: false,
													items: {
														path: "mCombos>/TIPORECEPCION",
														template: new sap.ui.core.ListItem({
															key:"{mCombos>TIPO}", text:"{mCombos>TEXT}"
														})
													}
											 })
										 ]
									}),
								]
							})
						]
					})
					*/


				if (that.Table_Documentos == undefined)
					// ORR Crear contenido nuevo para filtros en pantalla de "Consiganción"
					that.simpleFormFilters = new sap.ui.layout.form.SimpleForm({
						title: "{i18n>FilterPanel.Title}",
						layout: "ResponsiveGridLayout",
						content: [

							new sap.m.Label({ text: "{i18n>Filters.razon_social}" }),
							new sap.m.ComboBox({
								width: "50%",
								id: "comboRazonSocial",
								items: {
									path: "mCombos>/SOCIEDADES_ZW18",
									template: new sap.ui.core.ListItem({
										key: "{mCombos>BUKRS}",
										text: "{mCombos>BUTXT}"
									})
								}
							}),

							new sap.m.Label({ text: "{i18n>Filters.f_orden_Compra}" }),

							new sap.m.DatePicker({
								id: "datePickerFrom",
								placeholder: "{i18n>Filters.fecha_inicial}",
								valueFormat: "yyyy-MM-dd"
							}),
							/*
							new sap.m.Text({ 
								text: "-",
								class:"sapUiSmallMarginBegin sapUiSmallMarginEnd"
							}),
							*/
							new sap.m.DatePicker({
								id: "datePickerTo",
								placeholder: "{i18n>Filters.fecha_final}",
								valueFormat: "yyyy-MM-dd"
							}),

							new sap.m.Label({ text: " " }),
							new sap.m.Button({
								text: "{i18n>FilterPanel.Button.1}",
								type: "Accept",
								icon: "sap-icon://filter",
								width: "10%",
								press: function () {
									console.log(sap.ui.getCore().getModel("mCombos"));
									var oController = oView.getController();
									var oKeyFilter = "CONSIGNACIONCFACTURA_2";

									//var condition_0 = that.getView().byId("comboRazonSocial").getSelectedKey();

									var condition_0 = sap.ui.getCore().byId("comboRazonSocial").getSelectedKey();
									console.log(condition_0);

									var condition_1_ini = sap.ui.getCore().byId("datePickerFrom").getValue();
									var condition_1_fin = sap.ui.getCore().byId("datePickerTo").getValue();
									console.log(condition_1_ini);
									console.log(condition_1_fin)

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
											"keyField": "DATE",
											"value1": condition_1_ini,
											"value2": condition_1_fin,
											"showIfGrouped": false,
											"typeField": "date",
											"zstr": "<DATE><SIGN>I</SIGN><OPTION>BT</OPTION><LOW>" + condition_1_ini + "</LOW><HIGH>" + condition_1_fin + "</HIGH></DATE>"
										},
										{
											"key": "condition_2",
											"text": "",
											"exclude": false,
											"operation": "EQ",
											"keyField": "EBELN",
											"value1": "",
											"value2": "",
											"zstr": "<EBELN></EBELN>"
										}
									]

									oC_Modulo_WiseMobile.onSearchNewFilter(oEvt, oController, oFilterPanel, oKeyFilter);
								}
							}),

						]
					});

				that.Table_Documentos = new sap.m.Table("idTableDocumentos", {
					mode: "MultiSelect",
					footerText: "Total: $0.00",
					//Se quitaron estas propiedades para que seleccione correctamente todos los Items
					//growing: true,
					//growingThreshold: 5,
					//growingScrollToLoad : true,
					headerToolbar: new sap.m.Toolbar({
						content: [
							new sap.m.ToolbarSpacer(),
							new sap.m.Button({
								type: "Emphasized",
								icon: "sap-icon://add",
								text: "{i18n>EnvioFacturas.Popup.Button.1}",
								press: function (oEvt) {
									var that = this;

									var oTable = oCore.byId("idTableDocumentos");
									var length = oTable.getSelectedItems().length;

									if (length == 0) {
										var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
										oCnt_FHelps.f_showMessage("WARNING", oText);
									}
									else if (length >= 1) {
										var oPaths = oTable._aSelectedPaths; // getSelectedItems
										var oNameModel = oTable.getBindingInfo("items").model;
										var oModel = oCore.getModel(oNameModel);

										var total = 0.0;
										for (i = 0; i < oPaths.length; i++) {

											var oObject = jQuery.extend({}, oModel.getProperty(oPaths[i]));
											var monto = parseFloat(oObject.NETWR.replace("$", ""));
											total = total + monto;

											sap.ui.getCore().getModel("mTables").getData().CONSIGNACION_CFACTURA_1.push(oObject);

										}
										// modelo local
										mModel.setProperty("/Subto", total);

										oView.byId("idTableEnvioFacturasConsignacion").setFooterText("Total: $" + parseFloat(total).toFixed(2));
										sap.ui.getCore().getModel("mTables").refresh();
										//Logica para marcar el checkbox de los registros seleccionados 
										var oTable2 = oView.byId("idTableEnvioFacturasConsignacion");
										var aItems = oTable2.getItems();
										for (var i = 0; i < aItems.length; i++)
											aItems[i].setSelected(true);
										oTable.setVisible(true);

										oDialog.close();
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
						var oTable = oCore.byId("idTableDocumentos");
						var length = oTable.getSelectedItems().length;

						var total = 0.0;

						if (length == 0) {
							oTable.setFooterText("Total: $0.00");
						}
						else {
							for (var i = 0; i < length; i++) {
								var oItem = oTable.getSelectedItems()[i];
								var idx = oTable.indexOfItem(oItem);
								var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
								var oModel = oCore.getModel(oNameModel);
								var oPath = oTable.getBindingInfo("items").path;

								var oObject = jQuery.extend({}, oModel.getProperty(oPath + "/" + idx));
								var monto = parseFloat(oObject.NETWR.replace("$", ""));
								total = total + monto;

							}
							oTable.setFooterText("Total: $" + parseFloat(total).toFixed(2));
						}
					},
					columns: [
						new sap.m.Column("idCol91", {
							header: new sap.m.Label({ text: "{i18n>EnvioFacturasConsignacion.Documentos.Popup.Table.Column.1}" })
						}),
						new sap.m.Column("idCol92", {
							header: new sap.m.Label({ text: "{i18n>EnvioFacturasConsignacion.Documentos.Popup.Table.Column.2}" })
						}),
						new sap.m.Column("idCol93", {
							header: new sap.m.Label({ text: "{i18n>EnvioFacturasConsignacion.Documentos.Popup.Table.Column.3}" })
						}),
						new sap.m.Column("idCol94", {
							minScreenWidth: "Tablet",
							demandPopin: true,
							header: new sap.m.Label({ text: "{i18n>EnvioFacturasConsignacion.Documentos.Popup.Table.Column.4}" })
						}),
						new sap.m.Column("idCol95", {
							minScreenWidth: "Tablet",
							demandPopin: true,
							header: new sap.m.Label({ text: "{i18n>EnvioFacturasConsignacion.Documentos.Popup.Table.Column.5}" })
						}),
						new sap.m.Column("idCol96", {
							minScreenWidth: "Tablet",
							demandPopin: true,
							header: new sap.m.Label({ text: "{i18n>EnvioFacturasConsignacion.Documentos.Popup.Table.Column.6}" })
						}),
						new sap.m.Column("idCol97", {
							minScreenWidth: "Tablet",
							demandPopin: true,
							header: new sap.m.Label({ text: "{i18n>EnvioFacturasConsignacion.Documentos.Popup.Table.Column.7}" })
						}),
						new sap.m.Column("idCol98", {
							minScreenWidth: "Tablet",
							demandPopin: true,
							header: new sap.m.Label({ text: "{i18n>EnvioFacturasConsignacion.Documentos.Popup.Table.Column.8}" })
						}),
						new sap.m.Column("idCol99", {
							minScreenWidth: "Tablet",
							demandPopin: true,
							header: new sap.m.Label({ text: "{i18n>EnvioFacturasConsignacion.Documentos.Popup.Table.Column.9}" })
						}),
						new sap.m.Column("idCol100", {
							minScreenWidth: "Tablet",
							demandPopin: true,
							header: new sap.m.Label({ text: "{i18n>EnvioFacturasConsignacion.Documentos.Popup.Table.Column.10}" })
						})
					]
				}).bindItems({
					path: "mTables>/CONSIGNACION_CFACTURA",
					template:
						new sap.m.ColumnListItem({
							vAlign: "Middle",
							//type : "{type}",
							detailPress: function () {
								setTimeout(function () {
									sap.m.MessageToast.show("detail is pressed");
								}, 10);
							},
							cells: [
								new sap.m.Text({ text: "{mTables>ZSEM}" }),
								new sap.m.Text({ text: "{mTables>RANGO_SEM/LOW}" }),
								new sap.m.Text({ text: "{mTables>RANGO_SEM/HIGH}" }),
								new sap.m.Text({ text: "{mTables>MBLNR}" }),
								new sap.m.Text({ text: "{mTables>MATNR}" }),
								new sap.m.Text({ text: "{mTables>MAKTX}" }),
								//	Se agrega la conversión para el popup
								new sap.m.Text({
									text: {
										parts: ["mTables>BSTMG"],
										formatter: function (value) {
											return oCtrl_EnvioFacturas.formatter.formatCurrency(value);
										}.bind(this)
									}
								}),
								new sap.m.Text({ text: "{mTables>BSTME}" }),
								new sap.m.Text({
									text: {
										parts: ["mTables>NETWR"],
										formatter: function (value) {
											return oCtrl_EnvioFacturas.formatter.formatCurrency(value);
										}.bind(this)
									}
								}),
								new sap.m.Text({ text: "{mTables>WAERS}" })
							]
						})
				});

				var oDialog = new sap.m.Dialog("idPageDialog", {
					title: "{i18n>EnvioFacturas.Popup.title}",
					contentWidth: "100%",
					content: [
						// ORR Se añade el simpleform que sustituye a los filtros
						that.simpleFormFilters,
						that.Table_Documentos
					],
					buttons: [
						new sap.m.Button({
							text: "{i18n>Popup.Button.Cancelar}",
							press: function (oEvt) {

								oDialog.close();
							}
						})
					],
					beforeClose: function (oEvt) {

						var oContent = oDialog.removeAllContent();
						for (var i = 0; i < oContent.length; i++)
							oContent[i].destroy();

						that.Table_Documentos = undefined;
						that.FormSelectDoc = undefined;
						oCtrl_Main_P2P._oTPC_Core["idTableDocumentos"].destroy();
						oCtrl_Main_P2P._oTPC_Core["idTableDocumentos"] = undefined;

					},
					afterClose: function (oEvt) {
						oDialog.destroy();
					},
					beforeOpen: function (oEvt) {
						//var oSociedad = oView.byId("idComboSociedad").getSelectedItem();
						// .getKey() // .getText()
						// POR DEFECTO: RAZON SOCIAL ES EL PRIMER FILTRO
						//sap.ui.getCore().getModel("mFiltItems").setProperty("/ORDENCOMPRACFACTURA_2/0/zvalue1", oSociedad.getText())
						//oCtrl_EnvioFacturas.f_createAllFiltersPanel();

						// ORR Se comenta para no crear el filtro dentro del popup de "Envío de facturas"
						//oC_Modulo_WiseMobile.f_createFilterPanel("CONSIGNACIONCFACTURA_2", that, "idPageDialog", 3);

						if (oCtrl_Main_P2P._oTPC_Core["idTableDocumentos"] == undefined) {
							var oTableID = oCore.byId("idTableDocumentos");
							// Hidden/view Columns
							DemoPersoService.setMyPersData(oTableID);

							// init and activate controller
							oCtrl_Main_P2P._oTPC_Core["idTableDocumentos"] = new TablePersoController({
								table: oTableID,
								//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
								componentName: "demoApp",
								persoService: DemoPersoService,
							}).activate();
						}
					},
					afterOpen: function (oEvt) {
						oDialog.insertContent(that.FormSelectDoc, 0);
					}

				});
				//to get access to the global model
				oView.addDependent(oDialog);
				oDialog.open();
			},

			f_createAllFiltersPanel: function (oEvt) {
				oC_Modulo_WiseMobile.f_createFilterPanel("ORDENCOMPRACFACTURA_2", this, "idPageDialog", 5);
				oC_Modulo_WiseMobile.f_createFilterPanel("CONSIGNACIONCFACTURA_2", this, "idPageDialog", 3);
				//oC_Modulo_WiseMobile.f_createFilterPanel("ORDENCOMPRACFACTURA_2", oCtrl_OrdnCompraXFacturar, "idPage", 5);
			},

			f_bindTable: function (Parameters, oKeyFilter) {/*
			var oTable = oCore.byId("idTableDocumentos");
			oTable.setGrowingThreshold(5);
			oTable.bindItems({
		        path: "mTables>/ORDENCOMPRA_CFACTURA",
		        template: oTable.getBindingInfo("items").template
		    });
		    */
				/*
				if(oCnt_FHelps.f_Inputs([
					oCore.byId("id_SelectDoc_FSociedad"),
					oCore.byId("id_SelectDoc_FFecha1"),
					oCore.byId("id_SelectDoc_FFecha2"),
					oCore.byId("id_SelectDoc_FTRecepcion")
				]) == true){
					
					_tipo_recepcion=oCore.byId("id_SelectDoc_FTRecepcion").getSelectedKey();
					Parameters.push({
						zstr: "<BUKRS>"+oCore.byId("id_SelectDoc_FSociedad").getSelectedKey()+"</BUKRS>"
					});
					Parameters.push({
						zstr: oCnt_FHelps.f_json2xml({ AEDAT: { SIGN:"I",OPTION:"BT",
							LOW : oCore.byId("id_SelectDoc_FFecha1").getValue(),
							HIGH: oCore.byId("id_SelectDoc_FFecha2").getValue(),
						}})
					});
					Parameters.push({
						zstr: "<TIPO>"+oCore.byId("id_SelectDoc_FTRecepcion").getSelectedKey()+"</TIPO>"
					});
					
					this.oServ_SelecDoc(Parameters);
				}*/
				if (oKeyFilter != "CONSIGNACIONCFACTURA_2") {
					this.oServ_SelecDoc(Parameters);
				} else {
					this.oServ_SelecDocConsignacion(Parameters);
				}
			},

			oServ_SelecDoc: function (pParameters) {
				var oParam = "";
				var oOrden = "";
				for (var i = 0; i < pParameters.length; i++) {
					if (pParameters[i].key == "condition_4")
						oOrden = pParameters[i].zstr;
					else
						oParam += pParameters[i].zstr;
				}

				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">'
					+ '<soap:Header/>'
					+ '<soap:Body>'
					+ '<urn:_-WI18_-PO_PENDING_INV>'
					+ '<IS_PO_PENDI_INV_IN>'/*
					      	+'<BUKRS>1173</BUKRS>
				            +'<EKORG/>
				            +'<LIFNR>3500000612</LIFNR>
				            +'<EBELN/>
				            +'<AEDAT>
				               +'<SIGN>I</SIGN>
				               +'<OPTION>BT</OPTION>
				               +'<LOW>2018-01-01</LOW>
				               +'<HIGH>2019-04-25</HIGH>
				            +'</AEDAT>
				            +'<FLAG/>
				            +'<FOLIO></FOLIO>
				            +'<TIPO>1</TIPO>
				            +'<WAERS>MXN</WAERS>
				            +'<LISTEBELN>
				               +'<item>
				                  +'<EBELN></EBELN>
				               +'</item>
				            +'</LISTEBELN>*/
					+ '<EKORG/>'
					+ '<LIFNR>' + Lifnr + '</LIFNR>'
					+ '<EBELN/>'
					+ '<FLAG/>'
					+ '<FOLIO></FOLIO>'
					+ '<LISTEBELN>'
					+ '<item>'
					+ oOrden
					+ '</item>'
					+ '</LISTEBELN>'
					+ oParam
					+ '<IDIOMA>' + oLenguaje + '</IDIOMA>'
					+ '</IS_PO_PENDI_INV_IN>'
					+ '</urn:_-WI18_-PO_PENDING_INV>'
					+ '</soap:Body>'
					+ '</soap:Envelope>';

				oBusyDialog_d.setText("");
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
					oBusyDialog_d.close();
					var json = xml2json(data);
					console.log("JSON:", json);
					sap.ui.getCore().getModel("mMessages").setData(json);//revisar datos
					sap.ui.getCore().getModel("mMessages").refresh();

					var oObjeto = sap.ui.getCore().getModel("mMessages").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-PO_PENDING_INV.Response/ES_RETURN");

					if (oObjeto.TYPE == "S") {

						//var oTable = oCore.byId("idTableDocumentos");

						var oItems = sap.ui.getCore().getModel("mMessages").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-PO_PENDING_INV.Response/ET_PO/item");

						if (oItems.length != undefined) {
							oCore.getModel("mTables").setProperty("/ORDENCOMPRA_CFACTURA", oItems);
						} else {
							oCore.getModel("mTables").setProperty("/ORDENCOMPRA_CFACTURA", [oItems]);
						}
					} else { //Error
						var MessageError = "No hay registros para esta consulta";
						oCnt_FHelps.f_showMessage("WARNING", MessageError);
					}
				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					oCnt_FHelps.f_showMessage("ERROR", error);
					oBusyDialog_d.close();
				}
			},

			oServ_SelecDocConsignacion: function (pParameters) {
				var oParam = "";
				var oOrden = "";
				for (var i = 0; i < pParameters.length; i++) {
					if (pParameters[i].key == "condition_2")
						oOrden = pParameters[i].zstr;
					else
						oParam += pParameters[i].zstr;
				}

				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">'
					+ '<soap:Header/>'
					+ '<soap:Body>'
					+ '<urn:_-WI18_-CONSIGN_LIST>'
					+ '<IS_CONSIGN_LIST_IN>'
					+ oParam
					+ '<LIFNR>' + Lifnr + '</LIFNR>'
					+ '<WERKS/>'
					+ '<IDIOMA>' + oLenguaje + '</IDIOMA>'
					+ '<MBLNR>'
					+ '<item>'
					+ oOrden
					+ '</item>'
					+ '</MBLNR>'
					+ '</IS_CONSIGN_LIST_IN>'
					+ '</urn:_-WI18_-CONSIGN_LIST>'
					+ '</soap:Body>'
					+ '</soap:Envelope>';

				oBusyDialog_d.setText("");
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
					oBusyDialog_d.close();
					var json = xml2json(data);
					sap.ui.getCore().getModel("mMessages").setData(json);//revisar datos
					sap.ui.getCore().getModel("mMessages").refresh();

					var oObjeto = sap.ui.getCore().getModel("mMessages").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-CONSIGN_LIST.Response/ES_RETURN");

					if (oObjeto.TYPE == "S") {

						//var oTable = oCore.byId("idTableDocumentos");

						var oItems = sap.ui.getCore().getModel("mMessages").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-CONSIGN_LIST.Response/ET_MATERIAL/item");

						if (oItems.length != undefined) {
							oCore.getModel("mTables").setProperty("/CONSIGNACION_CFACTURA", oItems);
						} else {
							oCore.getModel("mTables").setProperty("/CONSIGNACION_CFACTURA", [oItems]);
						}
					} else { //Error
						var MessageError = "No hay registros para esta consulta";
						oCnt_FHelps.f_showMessage("WARNING", MessageError);
					}
				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					oCnt_FHelps.f_showMessage("ERROR", error);
					oBusyDialog_d.close();
				}
			},

			f_Limpiar_Cjas: function () {
				/*
				var oForm = oView.byId("idFormEnvioFacturas");
				var oFElements = oForm.getFormContainers()[0].getFormElements();
				
				for(var i=0; i< oFElements.length; i++){
					var oField = oFElements[i].getFields()[0];
					
					switch(oField.getMetadata()){
						case "sap.m.Input":
							oField.setValue("");
							break;
					}
				}
				*/
				// o
				mModel.setProperty("/", {});

				//RESET VARIABLES
				mFiles = {};
				_CantFiles = -1;
				_CantFiles1 = -1;
				oCore.getModel("mTables").setProperty("/ORDENCOMPRA_CFACTURA_1", []);
				oCore.getModel("mTables").setProperty("/ORDENCOMPRA_CFACTURA", []);
				// FIN
			},

			onChangeSociedad: function () {

				var ExBukrs = oView.byId('idComboSociedad').getSelectedKey();
				oCtrl_EnvioFacturas.oServ_Impuestos_ZW18(ExBukrs);
				oCtrl_EnvioFacturas.oServ_AreaResp_ZW18(ExBukrs);
				oCtrl_EnvioFacturas.oServ_Concepto_ZW18(ExBukrs);
			},
			onChangeArea: function (oEvt) {

				var IdDireccion = oView.byId('idComboArea').getSelectedKey();

				// ORR Se agrega /SOAP:Envelope/SOAP:Body/n0:_-WI18_-FM_WS_AREA_RESP.Response/IM_GERENCIA/item
				//var mData=sap.ui.getCore().getModel("mCombos").getProperty("/AREA_RESP_ZW18");
				var mData = sap.ui.getCore().getModel("mCombos").getProperty("/AREA_RESP_ZW18/SOAP:Envelope/SOAP:Body/n0:_-WI18_-FM_WS_AREA_RESP.Response/IM_GERENCIA/item");
				var length = mData.length;
				var data = [];

				for (i = 0; i < length; i++) {
					// ORR Se cambia por ID_DIRECCION
					if (mData[i].ID_DIRECCION == IdDireccion) {

						data.push(mData[i]);
					}
				}

				// ORR Setear /RESPONSABLE_ZW18 para el combo de Responsable en la vista EnvioFacturas
				sap.ui.getCore().getModel("mCombos").setProperty("/RESPONSABLE_ZW18", data);

			},


			oServ_Impuestos_ZW18: function (ExBukrs) {
				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI18_-GET_TAX_LIST>';
				soapMessage = soapMessage + '<IV_BUKRS>' + ExBukrs + '</IV_BUKRS>';
				if (oLenguaje == "ES") {
					soapMessage = soapMessage + '<IV_LANGUAGE>S</IV_LANGUAGE>';
				}
				if (oLenguaje == "EN") {
					soapMessage = soapMessage + '<IV_LANGUAGE>E</IV_LANGUAGE>';
				}
				soapMessage = soapMessage + '</urn:_-WI18_-GET_TAX_LIST>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';

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

					sap.ui.getCore().getModel("mCombos").setProperty("/IMPUESTOS_ZW18", json);//revisar datos
					sap.ui.getCore().getModel("mCombos").refresh();


					var length = sap.ui.getCore().getModel("mCombos").getProperty("/IMPUESTOS_ZW18/SOAP:Envelope/SOAP:Body/n0:_-WI18_-GET_TAX_LIST.Response/ET_TAX_LIST/item").length;

					if (length == undefined) {

						var mData = sap.ui.getCore().getModel("mCombos").getProperty("/IMPUESTOS_ZW18/SOAP:Envelope/SOAP:Body/n0:_-WI18_-GET_TAX_LIST.Response/ET_TAX_LIST/item");

						sap.ui.getCore().getModel("mCombos").setProperty("/IMPUESTOS_ZW18", [mData]);//revisar datos
						sap.ui.getCore().getModel("mCombos").refresh();
					} else {
						var mData = sap.ui.getCore().getModel("mCombos").getProperty("/IMPUESTOS_ZW18/SOAP:Envelope/SOAP:Body/n0:_-WI18_-GET_TAX_LIST.Response/ET_TAX_LIST/item");

						sap.ui.getCore().getModel("mCombos").setProperty("/IMPUESTOS_ZW18", mData);//revisar datos
						sap.ui.getCore().getModel("mCombos").refresh();
					}
				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					oCnt_FHelps.f_showMessage("ERROR", error);
				}
			},

			oServ_AreaResp_ZW18: function (ExBukrs) {
				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI18_-FM_WS_AREA_RESP>';
				soapMessage = soapMessage + '<EX_BUKRS>' + ExBukrs + '</EX_BUKRS>';
				soapMessage = soapMessage + '</urn:_-WI18_-FM_WS_AREA_RESP>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';
				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW18_2,
					crossDomain: true,
					type: "POST",
					cache: false,
					data: soapMessage,
					contentType: "application/soap+xml; charset=utf-8",
					headers: {
						"Authorization": "Basic " + btoa(oUsuario + ":" + oPassword),
						"accept-language": oLenguaje,
						"Access-Control-Allow-Origin": "*"
					},
					success: OnSuccess,
					error: OnError
				});
				function OnSuccess(data, status) {
					var json = xml2json(data);

					sap.ui.getCore().getModel("mCombos").setProperty("/AREA_RESP_ZW18", json);//revisar datos

					// ORR Tenía doble "::" n0::_-WI18_-FM_WS_AREA_RESP
					var length = sap.ui.getCore().getModel("mCombos").getProperty("/AREA_RESP_ZW18/SOAP:Envelope/SOAP:Body/n0:_-WI18_-FM_WS_AREA_RESP.Response/IM_GERENCIA/item").length;
					var mData = sap.ui.getCore().getModel("mCombos").getProperty("/AREA_RESP_ZW18/SOAP:Envelope/SOAP:Body/n0:_-WI18_-FM_WS_AREA_RESP.Response/IM_GERENCIA/item");

					if (length == undefined) {
						// ORR Se comenta para que no llene el campo Responsable al inicio
						//sap.ui.getCore().getModel("mCombos").setProperty("/AREA_RESP_ZW18", [mData]);
						sap.ui.getCore().getModel("mCombos").setProperty("/AREA_ZW18", [mData]);
						sap.ui.getCore().getModel("mCombos").refresh();
					} else {
						var data = [];
						var cont = false;
						for (i = 0; i < length; i++) {
							cont = false;
							if (i == 0) {
								data.push(mData[i]);
							}
							else {
								for (j = 0; j < data.length; j++) {

									// ORR Se cambia por ID_DIRECCION
									if (mData[i].ID_DIRECCION == data[j].ID_DIRECCION) {
										cont = true;
										break;
									}
								}
								if (cont == false) {
									data.push(mData[i]);
								}
							}

						}
						// ORR Se comenta para que no llene el campo Responsable al inicio
						//sap.ui.getCore().getModel("mCombos").setProperty("/AREA_RESP_ZW18",mData);
						sap.ui.getCore().getModel("mCombos").setProperty("/AREA_ZW18", data);
					}
				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					oCnt_FHelps.f_showMessage("ERROR", error);
				}
			},

			oServ_Concepto_ZW18: function (ExBukrs) {
				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI18_-FM_WS_LIST_CONCEPTOS>';
				soapMessage = soapMessage + '<EX_BUKRS>' + ExBukrs + '</EX_BUKRS>';
				soapMessage = soapMessage + '</urn:_-WI18_-FM_WS_LIST_CONCEPTOS>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';
				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW18_2,
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

					sap.ui.getCore().getModel("mCombos").setProperty("/CONCEPTO_ZW18", json);//revisar datos
					var length = sap.ui.getCore().getModel("mCombos").getProperty("/CONCEPTO_ZW18/SOAP:Envelope/SOAP:Body/n0:_-WI18_-FM_WS_LIST_CONCEPTOS.Response/IM_LIST_CONCEPTOS/item").length;
					var mData = sap.ui.getCore().getModel("mCombos").getProperty("/CONCEPTO_ZW18/SOAP:Envelope/SOAP:Body/n0:_-WI18_-FM_WS_LIST_CONCEPTOS.Response/IM_LIST_CONCEPTOS/item");

					if (length == undefined) {
						sap.ui.getCore().getModel("mCombos").setProperty("/CONCEPTO_ZW18", [mData]);

					} else {

						sap.ui.getCore().getModel("mCombos").setProperty("/CONCEPTO_ZW18", mData);
						sap.ui.getCore().getModel("mCombos").refresh();
					}
				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					oCnt_FHelps.f_showMessage("ERROR", error);
				}
			},

			oServ_EnviarFectSOC_ZW18: function (oObject, callback) {

				// ORR Se añade that para mandar a llamar onClearFieldsConSinCfdi
				var that = this;

				// ORR Validación para cuando el campo del combo de IVA viene en ceros
				if (oObject.TAXPER === undefined) {
					oObject.TAXPER = "0.00";
				}
				console.log(oObject.TAXPER);
				//console.log(typeof oObject.TAXPER)

				if (oObject.Bldat != "") {
					var fecha = (oObject.Bldat).split('-');
					oObject.Bldat = fecha[0] + "-" + ((fecha[1].length == 1) ? ("0" + fecha[1]) : (fecha[1])) + "-" + ((fecha[2].length == 1) ? ("0" + fecha[2]) : (fecha[2]));
				}
				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI18_-FM_WS_CREATE_INVOI_WO_PO>';
				soapMessage = soapMessage + '<EX_CREATE_INCINV_IN>';
				soapMessage = soapMessage + '<BUKRS>' + oObject.Bukrs + '</BUKRS>';
				//soapMessage=soapMessage+'<Ekorg/>';
				soapMessage = soapMessage + '<LIFNR>' + Lifnr + '</LIFNR>';
				soapMessage = soapMessage + '<ID_DIRECCION>' + oObject.IdDireccion + '</ID_DIRECCION>';
				soapMessage = soapMessage + '<ID_GERENCIA>' + oObject.IdGerencia + '</ID_GERENCIA>';
				soapMessage = soapMessage + '<FACTURA>' + oObject.Factura + '</FACTURA>';

				//soapMessage=soapMessage+'<Tax>0.00</Tax>';

				soapMessage = soapMessage + '<PDF_XSTRING>' + oObject.PdfXstring + '</PDF_XSTRING>';
				soapMessage = soapMessage + '<OPDF_XSTRING>' + oObject.OpdfXstring + '</OPDF_XSTRING>';
				if (_oFlag_Key == "4") {
					soapMessage = soapMessage + '<FLAG>2</FLAG>';
					soapMessage = soapMessage + '<WAERS>' + oObject.Waers + '</WAERS>';
					soapMessage = soapMessage + '<SUBTOTAL>' + oObject.Subtotal + '</SUBTOTAL>';
					soapMessage = soapMessage + '<BLDAT>' + oObject.Bldat + '</BLDAT>';
					soapMessage = soapMessage + '<TAX_CODE>' + oObject.TaxCode + '</TAX_CODE>';
					soapMessage = soapMessage + '<TAX>' + oObject.TAXPER + '</TAX>';
				}
				if (_oFlag_Key == "3") {
					soapMessage = soapMessage + '<FLAG>1</FLAG>';
					soapMessage = soapMessage + '<XML_XSTRING>' + oObject.XmlXstring + '</XML_XSTRING>';
				}

				//soapMessage=soapMessage+'<Reten>0.00</Reten>';
				soapMessage = soapMessage + '<ID_CONCEPTO>' + oObject.IdConcepto + '</ID_CONCEPTO>';
				//soapMessage=soapMessage+'<Total>0.00</Total>';

				//soapMessage=soapMessage+'<Kidno/>';
				soapMessage = soapMessage + '<IDIOMA>' + oLenguaje + '</IDIOMA>';

				soapMessage = soapMessage + '</EX_CREATE_INCINV_IN>';
				soapMessage = soapMessage + '</urn:_-WI18_-FM_WS_CREATE_INVOI_WO_PO>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';

				oBusyDialog_d.setText(oCnt_FHelps.f_readTranslate("EnvioFacturas." + _oFlag_Key + ".text"));
				oBusyDialog_d.open();
				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW18_2,
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
					sap.ui.getCore().getModel("mMessages").setData(json);//revisar datos
					sap.ui.getCore().getModel("mMessages").refresh();

					var oObjeto = sap.ui.getCore().getModel("mMessages").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-FM_WS_CREATE_INVOI_WO_PO.Response/IM_RETURN");

					if (oObjeto.TYPE == "S") {
						oCnt_FHelps.f_showMessage("SUCCESS", oObjeto.MESSAGE);

						// ORR Prueba para borrado de datos
						that.onClearFieldsConSinCfdi();

						// RESET VARIABLES
						//mModel.setProperty("/CantFiles", 0);
						mModel.setProperty("/CantFiles1", 0);
					} else {
						oCnt_FHelps.f_showMessage("ERROR", oObjeto.MESSAGE);

						// ORR Prueba para borrado de datos
						that.onClearFieldsConSinCfdi();

						// RESET VARIABLES
						//mModel.setProperty("/CantFiles", 0);
						mModel.setProperty("/CantFiles1", 0);

					}

				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					oCnt_FHelps.f_showMessage("ERROR", error);
					oBusyDialog_d.close();

					// ORR Prueba para borrado de datos
					that.onClearFieldsConSinCfdi();

					// RESET VARIABLES
					//mModel.setProperty("/CantFiles", 0);
					mModel.setProperty("/CantFiles1", 0);
				}
			},

			oServ_EnviarFactCOC_ZW18: function (oObject, callback) {
				// ORR Se manda a llamar onTipoRecepción desde el component y se asigna tipoRecepcion
				tipoRecepcion = oC_Modulo_WiseMobile.onTipoRecepción();

				// ORR Se añade that para mandar a llamar onClearFieldsConSinCfdi
				var that = this;

				// ORR Validación para cuando el campo del combo de IVA viene en ceros
				if (oObject.TaxCode === undefined || oObject.TaxCode === "") {
					oObject.TaxCode = "0.00";
				}
				console.log(oObject.TaxCode);
				//console.log(typeof oObject.TaxCode)

				// ORR De acuerdo a la definición se manda en 1 (Depreced)
				//var tipoCocCfdi = "1";

				var oParam;

				if (_oFlag_Key == "1") // COC con CFDI
					oParam = '<XML>' + oObject.XmlXstring + '</XML>'
						+ '<LIFNR>' + Lifnr + '</LIFNR>'
						+ '<FLAG>1</FLAG>'
						+ '<SUBTO>' + oObject.Subto + '</SUBTO>'
						+ '<TIPO>' + tipoRecepcion + '</TIPO>';
				//+'<TIPO>'+_tipo_recepcion+'</TIPO>';

				else if (_oFlag_Key == "2") // COC sin CFDI
					oParam = '<LIFNR>' + Lifnr + '</LIFNR>'
						+ '<DATE>' + oObject.Bldat + '</DATE>'
						+ '<TAX>' + oObject.TaxCode + '</TAX>'
						+ '<XBLNR>' + oObject.Factura + '</XBLNR>'
						+ '<SUBTO>' + oObject.Subto + '</SUBTO>'
						+ '<TIPO>' + tipoRecepcion + '</TIPO>'
						+ '<WAERS>' + oObject.Waers + '</WAERS>'
						+ '<FLAG>2</FLAG>'
						+ '<RETEN>0.00</RETEN>'
						+ '<SUBTOTAL>0.00</SUBTOTAL>';


				/**
				 * TABLA DE DOCUMENTOS
				 */
				var PItems = "";
				var oItems = oCore.getModel("mTables").getProperty("/ORDENCOMPRA_CFACTURA_1");

				// ORR Validación para agregar al menos un documento
				/*
				console.log(oItems);
				if (oItems.length === 0) {
					MessageBox.information("Agregue al menos un documento");
				}
				*/
				//

				delete oItems[0].BUZEI;
				delete oItems[0].MATNR;
				delete oItems[0].TXZ01;
				delete oItems[0].SERVICE_TEXT;
				delete oItems[0].LINE_TEXT;
				delete oItems[0].MEINS;
				delete oItems[0].AEDAT;
				delete oItems[0].BUDAT;
				delete oItems[0].PUNIT;
				delete oItems[0].MENGE;

				for (var i = 0; i < oItems.length; i++) {
					PItems += "<item>" + oCnt_FHelps.f_json2xml(oItems[i]) + "</item>";
				}

				var oITEMS_PEDIDO = (oItems.length == 0) ? '<item></item>' : PItems;
				/**
				 * 
				 */

				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">'
					+ '<soap:Header/>'
					+ '<soap:Body>'
					+ '<urn:_-WI18_-ADD_INV_PO>'
					+ '<IS_FAC_ORDER>'
					+ '<BUKRS>' + oObject.Bukrs + '</BUKRS>'
					+ '<EKORG/>'
					+ '<PDF>' + oObject.PdfXstring + '</PDF>'
					+ '<OPDF>' + oObject._OtroXstring + '</OPDF>'
					// PARAMETROS ADICIONALES
					+ oParam
					+ '<PEDIDO>'/*
				               +'<item>'
				                  +'<EBELN>4700013745</EBELN>'
				                  +'<EBELP>00010</EBELP>'
				                  +'<MBLNR></MBLNR>'
				                  +'<XBLNR>1000135159</XBLNR>'
				                  +'<MENGE>1.000</MENGE>'
				                  +'<NETWR>17460.00</NETWR>'
				                  +'<WAERS>MXN</WAERS>'
				                  +'<INVOICE_DOC_ITEM>000000</INVOICE_DOC_ITEM>'
				                  +'<PO_NUMBER>4700013745</PO_NUMBER>'
				                  +'<PO_ITEM>00010</PO_ITEM>'
				                  +'<REF_DOC>1000135159</REF_DOC>'
				                  +'<REF_DOC_YEAR>2018</REF_DOC_YEAR>'
				                  +'<REF_DOC_IT>0001</REF_DOC_IT>'
				                  +'<ITEM_AMOUNT>17460.0000</ITEM_AMOUNT>'
				                  +'<QUANTITY>0.000</QUANTITY>'
				                  +'<PO_UNIT></PO_UNIT>'
				                  +'<PO_PR_QNT>0.000</PO_PR_QNT>'
				                  +'<PO_PR_UOM></PO_PR_UOM>'
				                  +'<COND_TYPE></COND_TYPE>'
				                  +'<SHEET_NO>1000135159</SHEET_NO>'
				                  +'<SHEET_ITEM>0000000010</SHEET_ITEM>'
				                  +'<PACKNO></PACKNO>'
				                  +'<INTROW></INTROW>'
				                  +'<ZEKKN></ZEKKN>'
				               +'</item>'*/
					+ oITEMS_PEDIDO
					+ '</PEDIDO>'
					+ '<IDIOMA>' + oLenguaje + '</IDIOMA>'
					//
					+ '</IS_FAC_ORDER>'
					+ '</urn:_-WI18_-ADD_INV_PO>'
					+ '</soap:Body>'
					+ '</soap:Envelope>';

				oBusyDialog_d.setText(oCnt_FHelps.f_readTranslate("EnvioFacturas." + _oFlag_Key + ".text"));
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
					sap.ui.getCore().getModel("mMessages").setData(json);//revisar datos
					sap.ui.getCore().getModel("mMessages").refresh();

					var oObjeto = sap.ui.getCore().getModel("mMessages").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-ADD_INV_PO.Response/ES_RETURN");

					if (oObjeto.TYPE == "S") {
						if (oObjeto.MESSAGE != null) {
							oCnt_FHelps.f_showMessage("SUCCESS", oObjeto.MESSAGE);
						} else {
							var msgSuccess = "Éxito en el envío de Facturas"
							oCnt_FHelps.f_showMessage("SUCCESS", msgSuccess);
						}
						// ORR Prueba para borrado de datos
						that.onClearFieldsConSinCfdi();

						// RESET VARIABLES
						mModel.setProperty("/CantFiles", 0);
						//mModel.setProperty("/CantFiles1", 0);

						// ORR Limpiar tabla
						sap.ui.getCore().getModel("mTables").setProperty("/ORDENCOMPRA_CFACTURA_1", []);
						sap.ui.getCore().getModel("mTables").refresh();

						// Setear datos de total en ceros
						oView.byId("idTableEnvioFacturas").setFooterText("Total: $0.00");

					} else {
						//Error
						if (oObjeto.MESSAGE != null) {
							oCnt_FHelps.f_showMessage("ERROR", oObjeto.MESSAGE);
						} else {
							var msgError = "Error en el envío de Facturas"
							oCnt_FHelps.f_showMessage("ERROR", msgError);
						}
						// ORR Prueba para borrado de datos
						that.onClearFieldsConSinCfdi();

						// RESET VARIABLES
						mModel.setProperty("/CantFiles", 0);
						//mModel.setProperty("/CantFiles1", 0);

						// ORR Limpiar tabla
						sap.ui.getCore().getModel("mTables").setProperty("/ORDENCOMPRA_CFACTURA_1", []);
						sap.ui.getCore().getModel("mTables").refresh();

						// Setear datos de total en ceros
						oView.byId("idTableEnvioFacturas").setFooterText("Total: $0.00");
					}

				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					oCnt_FHelps.f_showMessage("ERROR", error);
					oBusyDialog_d.close();

					// ORR Prueba para borrado de datos
					that.onClearFieldsConSinCfdi();

					// RESET VARIABLES
					mModel.setProperty("/CantFiles", 0);
					//mModel.setProperty("/CantFiles1", 0);

					// ORR Limpiar tabla
					sap.ui.getCore().getModel("mTables").setProperty("/ORDENCOMPRA_CFACTURA_1", []);
					sap.ui.getCore().getModel("mTables").refresh();

					// Setear datos de total en ceros
					oView.byId("idTableEnvioFacturas").setFooterText("Total: $0.00");
				}
			},
			// BG Validacion PAC COC CFDI
			oServ_ValidacionXML: function (oObject, callback) {
				// ORR Se manda a llamar onTipoRecepción desde el component y se asigna tipoRecepcion
				tipoRecepcion = oC_Modulo_WiseMobile.onTipoRecepción();

				// ORR Se añade that para mandar a llamar onClearFieldsConSinCfdi
				var that = this;

		//		var apiKey = 'siufhvypptrbnswdfzzbdkqgm88kst8bt6kprxt8uvr3uz7dhngyzh3uu7ebasq7uzvccdswhe7nbngm';
				var encodedString = oObject.XmlXstring;

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

				//console.log(xmlString);
			//	var soapMessage = buildSoapMessage(xmlString, apiKey); //PAC
				var soapMessage1 = buildSoapMessage1(oObject);  //SAP

				oBusyDialog_d.setText(oCnt_FHelps.f_readTranslate("EnvioFacturas." + _oFlag_Key + ".text"));
				oBusyDialog_d.open();


			/* 	$.ajax({
					url: validacionPAC,
					type: "POST",
					cache: false,
					data: soapMessage,
					contentType: "text/xml; charset=utf-8",
					headers: {
						"SOAPAction": "urn:schemas.reachcore.com:document-validation:5.0/IDocumentValidationService/ValidateDocument"
					},
					success: function (data) {
						//conversión de JSON
						var jsonResponse = xmlToJson(data);
						handleValidationSuccess(jsonResponse, soapMessage1);
					},
					error: handleError
				}); */
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
					//  mensaje SOAP de OC con CFDI SAP 
					// CFDI CON OC
					//var tipoCocCfdi = "1";

					var oParam;

					if (_oFlag_Key == "1") // COC con CFDI
						oParam = '<XML>' + oObject.XmlXstring + '</XML>'
							+ '<LIFNR>' + Lifnr + '</LIFNR>'
							+ '<FLAG>1</FLAG>'
							+ '<SUBTO>' + oObject.Subto + '</SUBTO>'
							+ '<TIPO>' + tipoRecepcion + '</TIPO>';

					var PItems = "";
					var oItems = oCore.getModel("mTables").getProperty("/ORDENCOMPRA_CFACTURA_1");

					delete oItems[0].BUZEI;
					delete oItems[0].MATNR;
					delete oItems[0].TXZ01;
					delete oItems[0].SERVICE_TEXT;
					delete oItems[0].LINE_TEXT;
					delete oItems[0].MEINS;
					delete oItems[0].AEDAT;
					delete oItems[0].BUDAT;
					delete oItems[0].PUNIT;
					delete oItems[0].MENGE;

					for (var i = 0; i < oItems.length; i++) {
						PItems += "<item>" + oCnt_FHelps.f_json2xml(oItems[i]) + "</item>";
					}

					var oITEMS_PEDIDO = (oItems.length == 0) ? '<item></item>' : PItems;

					var soapMessage1 = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">'
						+ '<soap:Header/>'
						+ '<soap:Body>'
						+ '<urn:_-WI18_-ADD_INV_PO>'
						+ '<IS_FAC_ORDER>'
						+ '<BUKRS>' + oObject.Bukrs + '</BUKRS>'
						+ '<EKORG/>'
						+ '<PDF>' + oObject.PdfXstring + '</PDF>'
						+ '<OPDF>' + oObject._OtroXstring + '</OPDF>'
						// PARAMETROS ADICIONALES
						+ oParam
						+ '<PEDIDO>'/*
				               +'<item>'
				                  +'<EBELN>4700013745</EBELN>'
				                  +'<EBELP>00010</EBELP>'
				                  +'<MBLNR></MBLNR>'
				                  +'<XBLNR>1000135159</XBLNR>'
				                  +'<MENGE>1.000</MENGE>'
				                  +'<NETWR>17460.00</NETWR>'
				                  +'<WAERS>MXN</WAERS>'
				                  +'<INVOICE_DOC_ITEM>000000</INVOICE_DOC_ITEM>'
				                  +'<PO_NUMBER>4700013745</PO_NUMBER>'
				                  +'<PO_ITEM>00010</PO_ITEM>'
				                  +'<REF_DOC>1000135159</REF_DOC>'
				                  +'<REF_DOC_YEAR>2018</REF_DOC_YEAR>'
				                  +'<REF_DOC_IT>0001</REF_DOC_IT>'
				                  +'<ITEM_AMOUNT>17460.0000</ITEM_AMOUNT>'
				                  +'<QUANTITY>0.000</QUANTITY>'
				                  +'<PO_UNIT></PO_UNIT>'
				                  +'<PO_PR_QNT>0.000</PO_PR_QNT>'
				                  +'<PO_PR_UOM></PO_PR_UOM>'
				                  +'<COND_TYPE></COND_TYPE>'
				                  +'<SHEET_NO>1000135159</SHEET_NO>'
				                  +'<SHEET_ITEM>0000000010</SHEET_ITEM>'
				                  +'<PACKNO></PACKNO>'
				                  +'<INTROW></INTROW>'
				                  +'<ZEKKN></ZEKKN>'
				               +'</item>'*/
						+ oITEMS_PEDIDO
						+ '</PEDIDO>'
						+ '<IDIOMA>' + oLenguaje + '</IDIOMA>'
						//
						+ '</IS_FAC_ORDER>'
						+ '</urn:_-WI18_-ADD_INV_PO>'
						+ '</soap:Body>'
						+ '</soap:Envelope>';

					oBusyDialog_d.setText(oCnt_FHelps.f_readTranslate("EnvioFacturas." + _oFlag_Key + ".text"));
					oBusyDialog_d.open();
					// ...
					return soapMessage1;
				}

				//Validacion del XML cuando es valido/invalido
				// function handleValidationSuccess(jsonResponse, soapMessage1) {
				// 	//var json1= xml2json(jsonResponse);
				// 	//	console.log("Este es el json:",json1);
				// 	try {
				// 		console.log("JSON:", jsonResponse);
				// 		oBusyDialog_d.close();
				// 		sap.ui.getCore().getModel("mMessages").setData(jsonResponse);
				// 		sap.ui.getCore().getModel("mMessages").refresh();

				// 		var DocumentIsValid = jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult']['@attributes']['DocumentIsValid'];
				// 		//	console.log("DocumentIsValid:", DocumentIsValid);
				// 		if (DocumentIsValid != "false") {
				// 			callWebService(soapMessage1);
				// 		} else {
				// 			handleValidationFailure(jsonResponse);
				// 		}
				// 	} catch (error) {
				// 		// Manejar el error de sintaxis del JSON cuando viene con errores de sintaxis
				// 		oCnt_FHelps.f_showMessage("ERROR", "Error de sintaxis en el JSON recibido primer paso");
				// 		console.log("El XML tiene errores, tiene error de sintaxis por esta razón no se puede visializar:", error);
				// 	}

				// }

			/* 	function callWebService(soapMessage1) {
					$.ajax({
						url: webServiceURL_ZW18,
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
						url: webServiceURL_ZW18,
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
					var json1 = xml2json(data1);
					oBusyDialog_d.close();
					sap.ui.getCore().getModel("mMessages").setData(json1);
					sap.ui.getCore().getModel("mMessages").refresh();
					console.log("SAP", json1);
					var oObjeto1 = sap.ui.getCore().getModel("mMessages").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-ADD_INV_PO.Response/ES_RETURN");

					if (oObjeto1.TYPE == "S") {
						var message = oObjeto1.MESSAGE || "Éxito en el envío de Facturas";
						oCnt_FHelps.f_showMessage("SUCCESS", message);
					} else {
						var message = oObjeto1.MESSAGE || "Error en el envío de Facturas";
						oCnt_FHelps.f_showMessage("ERROR", message);
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

				} */

				// ORR Prueba para borrado de datos
				that.onClearFieldsConSinCfdi();

				// RESET VARIABLES
				mModel.setProperty("/CantFiles", 0);
				//mModel.setProperty("/CantFiles1", 0);

				// ORR Limpiar tabla
				sap.ui.getCore().getModel("mTables").setProperty("/ORDENCOMPRA_CFACTURA_1", []);
				sap.ui.getCore().getModel("mTables").refresh();

				// Setear datos de total en ceros
				oView.byId("idTableEnvioFacturas").setFooterText("Total: $0.00");

			},

			// BG Validacion PAC SOC CFDI
			oServ_ValidacionXML_SinOCCFDI: function (oObject, callback) {

				// ORR Se añade that para mandar a llamar onClearFieldsConSinCfdi
				var that = this;

			//	var apiKey = 'siufhvypptrbnswdfzzbdkqgm88kst8bt6kprxt8uvr3uz7dhngyzh3uu7ebasq7uzvccdswhe7nbngm';
				var encodedString = oObject.XmlXstring;

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

				//console.log(xmlString);
			//	var soapMessage = buildSoapMessage(xmlString, apiKey);
				var soapMessage1 = buildSoapMessage1(oObject);

				oBusyDialog_d.setText(oCnt_FHelps.f_readTranslate("EnvioFacturas." + _oFlag_Key + ".text"));
				oBusyDialog_d.open();


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
						//Conversión de data a JSON
						var jsonResponse = xmlToJson(data);
						handleValidationSuccess(jsonResponse, soapMessage1);
					},
					error: handleError
				}); */
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
					//  mensaje SOAP de sin OC con CFDI
					// ORR Se añade that para mandar a llamar onClearFieldsConSinCfdi
					var that = this;

					// ORR Validación para cuando el campo del combo de IVA viene en ceros
					if (oObject.TAXPER === undefined) {
						oObject.TAXPER = "0.00";
					}
					console.log(oObject.TAXPER);
					//console.log(typeof oObject.TAXPER)

					if (oObject.Bldat != "") {
						var fecha = (oObject.Bldat).split('-');
						oObject.Bldat = fecha[0] + "-" + ((fecha[1].length == 1) ? ("0" + fecha[1]) : (fecha[1])) + "-" + ((fecha[2].length == 1) ? ("0" + fecha[2]) : (fecha[2]));
					}
					var soapMessage1 = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
					soapMessage1 = soapMessage1 + '<soap:Header/>';
					soapMessage1 = soapMessage1 + '<soap:Body>';
					soapMessage1 = soapMessage1 + '<urn:_-WI18_-FM_WS_CREATE_INVOI_WO_PO>';
					soapMessage1 = soapMessage1 + '<EX_CREATE_INCINV_IN>';
					soapMessage1 = soapMessage1 + '<BUKRS>' + oObject.Bukrs + '</BUKRS>';
					//soapMessage=soapMessage+'<Ekorg/>';
					soapMessage1 = soapMessage1 + '<LIFNR>' + Lifnr + '</LIFNR>';
					soapMessage1 = soapMessage1 + '<ID_DIRECCION>' + oObject.IdDireccion + '</ID_DIRECCION>';
					soapMessage1 = soapMessage1 + '<ID_GERENCIA>' + oObject.IdGerencia + '</ID_GERENCIA>';
					soapMessage1 = soapMessage1 + '<FACTURA>' + oObject.Factura + '</FACTURA>';
					soapMessage1 = soapMessage1 + '<PDF_XSTRING>' + oObject.PdfXstring + '</PDF_XSTRING>';
					soapMessage1 = soapMessage1 + '<OPDF_XSTRING>' + oObject.OpdfXstring + '</OPDF_XSTRING>';
					if (_oFlag_Key == "3") {
						soapMessage1 = soapMessage1 + '<FLAG>1</FLAG>';
						soapMessage1 = soapMessage1 + '<XML_XSTRING>' + oObject.XmlXstring + '</XML_XSTRING>';
					}

					//soapMessage=soapMessage+'<Reten>0.00</Reten>';
					soapMessage1 = soapMessage1 + '<ID_CONCEPTO>' + oObject.IdConcepto + '</ID_CONCEPTO>';
					//soapMessage=soapMessage+'<Total>0.00</Total>';

					//soapMessage=soapMessage+'<Kidno/>';
					soapMessage1 = soapMessage1 + '<IDIOMA>' + oLenguaje + '</IDIOMA>';

					soapMessage1 = soapMessage1 + '</EX_CREATE_INCINV_IN>';
					soapMessage1 = soapMessage1 + '</urn:_-WI18_-FM_WS_CREATE_INVOI_WO_PO>';
					soapMessage1 = soapMessage1 + '</soap:Body>';
					soapMessage1 = soapMessage1 + '</soap:Envelope>';

					oBusyDialog_d.setText(oCnt_FHelps.f_readTranslate("EnvioFacturas." + _oFlag_Key + ".text"));
					oBusyDialog_d.open();
					// ...
					return soapMessage1;
				}

				//Validacion del XML cuando es valido/invalido
				// function handleValidationSuccess(jsonResponse, soapMessage1) {
				// 	try {
				// 		//var json = xml2json(jsonResponse);
				// 		//	console.log(jsonResponse);
				// 		oBusyDialog_d.close();
				// 		sap.ui.getCore().getModel("mMessages").setData(jsonResponse);
				// 		sap.ui.getCore().getModel("mMessages").refresh();

				// 		var DocumentIsValid = jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult']['@attributes']['DocumentIsValid'];
				// 		//	console.log("DocumentIsValid:", DocumentIsValid);
				// 		if (DocumentIsValid != "false") {
				// 			callWebService(soapMessage1);
				// 		} else {
				// 			handleValidationFailure(jsonResponse);
				// 		}
				// 	} catch (error) {
				// 		// Manejar el error de sintaxis del JSON cuando viene con errores de sintaxis
				// 		oCnt_FHelps.f_showMessage("ERROR", "Error de sintaxis en el JSON recibido");
				// 		console.log("El XML tiene errores, tiene error de sintaxis por esta razón no se puede visializar:", error);
				// 	}

				// }

				/* function callWebService(soapMessage1) {
					$.ajax({
						url: webServiceURL_ZW18_2,
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
						url: webServiceURL_ZW18_2,
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
					var json1 = xml2json(data1);
					oBusyDialog_d.close();
					sap.ui.getCore().getModel("mMessages").setData(json1);
					sap.ui.getCore().getModel("mMessages").refresh();

					var oObjeto = sap.ui.getCore().getModel("mMessages").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-FM_WS_CREATE_INVOI_WO_PO.Response/IM_RETURN");

					if (oObjeto.TYPE == "S") {
						oCnt_FHelps.f_showMessage("SUCCESS", oObjeto.MESSAGE);
					} else {
						oCnt_FHelps.f_showMessage("ERROR", oObjeto.MESSAGE);
					}
				}

				function handleError(xhr, textStatus, errorThrown) {
					var errorMessage = errorThrown || "Error en la llamada AJAX";
					oCnt_FHelps.f_showMessage("ERROR", errorMessage);
				}

				// function handleValidationFailure(jsonResponse) {
				// 	// validación del XML cuando no es valido
				// 	try {
				// 		var errorMessages = [];
				// 		var Error = jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['Error']['#text'];
				// 		///////
				// 		if (Error != "false") {
				// 			var ErrorMesssage = jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ErrorMesssage'];
				// 			console.log(ErrorMesssage);
				// 			if (ErrorMesssage != null) {
				// 				//	console.log(ErrorMesssage);
				// 				errorMessages.push(ErrorMesssage);
				// 			} else {
				// 				errorMessages.push("Error en la validación del XML con el PAC");
				// 			}
				// 		} else {
				// 			if (jsonResponse['s:Envelope'] &&
				// 				jsonResponse['s:Envelope']['s:Body'] &&
				// 				jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse'] &&
				// 				jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult'] &&
				// 				jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult']['FailedRules'] &&
				// 				jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult']['FailedRules']['RuleResult']) {
				// 				var ruleResult = jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult']['FailedRules']['RuleResult'];
				// 				console.log(ruleResult);
				// 				if (Array.isArray(ruleResult)) {
				// 					ruleResult.forEach(rule => {
				// 						//	var title = rule['@attributes']['Title'];
				// 						var mensaje = rule.Message['#text'];
				// 						mensaje = mensaje.replace(/\\r\\n/g, ''); // Eliminar saltos de linea
				// 						mensaje = mensaje.replace(/\\\"/g, '"'); // Restaurar comillas dobles
				// 						errorMessages.push(mensaje);
				// 					});
				// 				} else {
				// 					//Si esun unico objeto
				// 					//	var title = ruleResult['@attributes']['Title'];
				// 					var mensaje = ruleResult.Message['#text'];
				// 					mensaje = mensaje.replace(/\\r\\n/g, ''); // Eliminar saltos de linea
				// 					mensaje = mensaje.replace(/\\\"/g, '"'); // Restaurar comillas dobles
				// 					errorMessages.push(mensaje);
				// 				}
				// 			}
				// 		}
				// 		var errorMessage = errorMessages.join("\n");
				// 		if (errorMessage !== "") {
				// 			oCnt_FHelps.f_showMessage("ERROR", errorMessage);
				// 			return;

				// 		}
				// 	} catch (error) {
				// 		// Manejar el error de sintaxis del JSON cuando viene con errores de sintaxtos
				// 		oCnt_FHelps.f_showMessage("ERROR", "Error de sintaxis en el JSON recibido");
				// 		console.error("El XML tiene errores, tiene error de sintaxis por esta razón no se puede visializar:", error);
				// 	}

				// }

				// ORR Prueba para borrado de datos
				that.onClearFieldsConSinCfdi();

				// RESET VARIABLES
				//mModel.setProperty("/CantFiles", 0);
				mModel.setProperty("/CantFiles1", 0);
			},

			oServ_EnviarFactConsignacion_ZW18: function (oObject, callback) {
				// ORR Se añade that para mandar a llamar onClearFieldsConSinCfdi
				var that = this;

			//	var apiKey = 'siufhvypptrbnswdfzzbdkqgm88kst8bt6kprxt8uvr3uz7dhngyzh3uu7ebasq7uzvccdswhe7nbngm';
				var encodedString = oObject.XmlXstring;

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

				//console.log(xmlString);
			//	var soapMessage = buildSoapMessage(xmlString, apiKey);
				var soapMessage1 = buildSoapMessage1(oObject);

				oBusyDialog_d.setText(oCnt_FHelps.f_readTranslate("EnvioFacturas." + _oFlag_Key + ".text"));
				oBusyDialog_d.open();


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
						//Conversión de XML Data a JSON
						var jsonResponse = xmlToJson(data);
						handleValidationSuccess(jsonResponse, soapMessage1);
					},
					error: handleError
				}); */

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
					/** 
		* TABLA DE DOCUMENTOS Consignacion
		*/
					var PItems = "";
					// ORR Se comenta ya que esta validación se hace desde el método de onPressEnviar

					var oItems = oCore.getModel("mTables").getProperty("/CONSIGNACION_CFACTURA_1");
					/*
					if (oItems.length === 0) {
						MessageBox.information("Agregue al menos un documento");
					}
					*/
					//
					for (var i = 0; i < oItems.length; i++) {
						PItems += "<item>" + oCnt_FHelps.f_json2xml(oItems[i]) + "</item>";
					}
					var oITEMS_CONSIGNACION = (oItems.length == 0) ? '<item></item>' : PItems;
					/**
					*
					*/
					var soapMessage1 = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">'
						+ '<soap:Header/>'
						+ '<soap:Body>'
						+ '<urn:_-WI18_-ADD_CONSIG>'
						+ '<IS_ADD_CONSIG_IN>'
						+ '<DATE>'
						+ '<SIGN>' + oItems[0].RANGO_SEM.SIGN + '</SIGN>'
						+ '<OPTION>' + oItems[0].RANGO_SEM.OPTION + '</OPTION>'
						+ '<LOW>' + oItems[0].RANGO_SEM.LOW + '</LOW>'
						+ '<HIGH>' + oItems[0].RANGO_SEM.LOW + '</HIGH>'
						+ '</DATE>'
						+ '<WERKS/>'
						+ '<BUKRS>' + oObject.Bukrs + '</BUKRS>'
						+ '<XBLNR/>'
						+ '<LIFNR>' + Lifnr + '</LIFNR>'
						+ '<NETWR>'
						+ oITEMS_CONSIGNACION
						+ '</NETWR>'
						+ '<XML>' + oObject.XmlXstring + '</XML>'
						+ '<PDF>' + oObject.PdfXstring + '</PDF>'
						+ '<IDIOMA>' + oLenguaje + '</IDIOMA>'
						//
						+ '</IS_ADD_CONSIG_IN>'
						+ '</urn:_-WI18_-ADD_CONSIG>'
						+ '</soap:Body>'
						+ '</soap:Envelope>';

					oBusyDialog_d.setText(oCnt_FHelps.f_readTranslate("EnvioFacturas." + _oFlag_Key + ".text"));
					oBusyDialog_d.open();
					// ...
					return soapMessage1;
				}

				//Validacion del XML cuando es valido/invalido
				// function handleValidationSuccess(jsonResponse, soapMessage1) {
				// 	try {
				// 		//	var json = xml2json(jsonResponse);
				// 		//	console.log(jsonResponse);
				// 		oBusyDialog_d.close();
				// 		sap.ui.getCore().getModel("mMessages").setData(jsonResponse);
				// 		sap.ui.getCore().getModel("mMessages").refresh();

				// 		var DocumentIsValid = jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult']['@attributes']['DocumentIsValid'];
				// 		//	console.log("DocumentIsValid:", DocumentIsValid);
				// 		if (DocumentIsValid != "false") {
				// 			callWebService(soapMessage1);
				// 		} else {
				// 			handleValidationFailure(jsonResponse);
				// 		}
				// 	} catch (error) {
				// 		// Manejar el error de sintaxis del JSON cuando viene con errores de sintaxis
				// 		oCnt_FHelps.f_showMessage("ERROR", "Error de sintaxis en el JSON recibido");
				// 		console.log("El XML tiene errores, tiene error de sintaxis por esta razón no se puede visializar:", error);
				// 	}

				// }

				/* function callWebService(soapMessage1) {
					$.ajax({
						url: webServiceURL_ZW18,
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
						url: webServiceURL_ZW18,
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
					var json1 = xml2json(data1);
					oBusyDialog_d.close();

					sap.ui.getCore().getModel("mMessages").setData(json1);//revisar datos
					sap.ui.getCore().getModel("mMessages").refresh();
					var oObjeto = sap.ui.getCore().getModel("mMessages").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-ADD_CONSIG.Response/ES_RETURN");
					if (oObjeto.TYPE == "S") {
						if (oObjeto.MESSAGE != null) {
							oCnt_FHelps.f_showMessage("SUCCESS", oObjeto.MESSAGE);
						} else {
							var msgSuccess = "Éxito en el envío de Facturas"
							oCnt_FHelps.f_showMessage("SUCCESS", msgSuccess);
						}
					} else {
						//Error
						if (oObjeto.MESSAGE != null) {
							oCnt_FHelps.f_showMessage("ERROR", oObjeto.MESSAGE);
						} else {
							var msgError = "Error en el envío de Facturas"
							oCnt_FHelps.f_showMessage("ERROR", msgError);
						}
					}
				}

				function handleError(xhr, textStatus, errorThrown) {
					var errorMessage = errorThrown || "Error en la llamada AJAX";
					oCnt_FHelps.f_showMessage("ERROR", errorMessage);
				}

				// function handleValidationFailure(jsonResponse) {
				// 	// validación del XML cuando no es valido
				// 	try {
				// 		var errorMessages = [];
				// 		var Error = jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['Error']['#text'];
				// 		///////
				// 		if (Error != "false") {
				// 			var ErrorMesssage = jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ErrorMesssage'];
				// 			console.log(ErrorMesssage);
				// 			if (ErrorMesssage != null) {
				// 				//	console.log(ErrorMesssage);
				// 				errorMessages.push(ErrorMesssage);
				// 			} else {
				// 				errorMessages.push("Error en la validación del XML con el PAC");
				// 			}
				// 		} else {
				// 			if (jsonResponse['s:Envelope'] &&
				// 				jsonResponse['s:Envelope']['s:Body'] &&
				// 				jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse'] &&
				// 				jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult'] &&
				// 				jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult']['FailedRules'] &&
				// 				jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult']['FailedRules']['RuleResult']) {
				// 				var ruleResult = jsonResponse['s:Envelope']['s:Body']['DocumentValidationResponse']['ValidationResult']['FailedRules']['RuleResult'];
				// 				console.log(ruleResult);
				// 				if (Array.isArray(ruleResult)) {
				// 					ruleResult.forEach(rule => {
				// 						//	var title = rule['@attributes']['Title'];
				// 						var mensaje = rule.Message['#text'];
				// 						mensaje = mensaje.replace(/\\r\\n/g, ''); // Eliminar saltos de linea
				// 						mensaje = mensaje.replace(/\\\"/g, '"'); // Restaurar comillas dobles
				// 						errorMessages.push(mensaje);
				// 					});
				// 				} else {
				// 					//Si es un unico objeto...
				// 					//	var title = ruleResult['@attributes']['Title'];
				// 					var mensaje = ruleResult.Message['#text'];
				// 					mensaje = mensaje.replace(/\\r\\n/g, ''); // Elimina saltos de linea
				// 					mensaje = mensaje.replace(/\\\"/g, '"'); // Restaura comillas dobles
				// 					errorMessages.push(mensaje);
				// 				}
				// 			}
				// 		}
				// 		var errorMessage = errorMessages.join("\n");
				// 		if (errorMessage !== "") {
				// 			oCnt_FHelps.f_showMessage("ERROR", errorMessage);
				// 			return;

				// 		}
				// 	} catch (error) {
				// 		// Manejar el error de sintaxis del JSON cuando viene con errores de sintaxtos
				// 		oCnt_FHelps.f_showMessage("ERROR", "Error de sintaxis en el JSON recibido");
				// 		console.error("El XML tiene errores, tiene error de sintaxis por esta razón no se puede visializar:", error);
				// 	}

				// }

				// ORR Prueba para borrado de datos
				that.onClearFieldsConSinCfdi();

				// RESET VARIABLES
				mModel.setProperty("/CantFiles", 0);
				mModel.setProperty("/CantFiles1", 0);

				// ORR Limpiar tabla
				sap.ui.getCore().getModel("mTables").setProperty("/CONSIGNACION_CFACTURA_1", []);
				sap.ui.getCore().getModel("mTables").refresh();

				// Setear datos de total en ceros
				oView.byId("idTableEnvioFacturasConsignacion").setFooterText("Total: $0.00");
			},

			handleValueChange: function (oEvent) {/*
			sap.m.MessageToast.show("Press 'Upload File' to upload file '" +
									oEvent.getParameter("newValue") + "'");*/
			},

			onClearFieldsConSinCfdi: function () {

				// ORR Extraer todos los campos de la vista por su ID
				var comboRazonSocial = this.getView().byId("idComboSociedad");
				var fechaFactura = this.getView().byId("idFechaFactura");
				var factura = this.getView().byId("idFactura");
				var comboIva = this.getView().byId("idComboIva");
				var comboMoneda = this.getView().byId("idComboMoneda");
				var documentoPdf = this.getView().byId("idDocPDF");
				var documentoOtros = this.getView().byId("idDocOtroPDF");
				var documentoXml = this.getView().byId("idDocXML");
				var comboConcepto = this.getView().byId("idComboConcepto");
				var comboResponsable = this.getView().byId("idComboResponsable");
				var comboArea = this.getView().byId("idComboArea");

				// ORR Setear valores en vacíos
				comboRazonSocial.setSelectedKey("");
				fechaFactura.setValue("");
				factura.setValue("");
				comboIva.setSelectedKey(null);
				comboMoneda.setSelectedKey("");
				documentoPdf.setValue("");
				documentoOtros.setValue("");
				documentoXml.setValue("");
				comboConcepto.setSelectedKey("");
				comboResponsable.setSelectedKey("");
				comboArea.setSelectedKey("");
			}

		});

	});