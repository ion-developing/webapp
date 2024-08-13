var oCtrl_ListadoFacturas;
var ListadoFacturas_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator", "sap/m/TablePersoController", 'sap/m/MessageToast', "com/axiomasoluciones/wisemobile/Modulo_WiseMobile/Utils/formatter"],
	function (jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController, MessageToast, formatter) {

		var oView;

		return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.ListadoFacturas", {
			formatter: formatter,
			onInit: function () {
				oCtrl_ListadoFacturas = this;
				oView = this.getView();

				console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.ListadoFacturas");

				// ORR Se comenta para no crear el filtro
				//this.f_createAllFiltersPanel();

				sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function (oEvent) {
					var sRoute = oEvent.getParameter("name");

					if ("ListadoFacturas" === sRoute) {

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
				var ocomboEstado = this.getView().byId("comboEstado");

				if (oComboRazonSocial || odatePickerFrom || odatePickerTo || ocomboEstado) {
					oComboRazonSocial.setSelectedKey("");
					odatePickerFrom.setValue("");
					odatePickerTo.setValue("");
					ocomboEstado.setSelectedKey("");
				}

				sap.ui.getCore().getModel("mTablesListadoFacturas").setData("");
			},

			onPressFiltrar: function (oEvt) {
				//console.log(sap.ui.getCore().getModel("mCombos"));
				var oController = oView.getController();
				var oKeyFilter = "LISTADOFACTURA";

				var condition_0 = this.getView().byId("comboRazonSocial").getSelectedKey();
				console.log(condition_0);

				var condition_1_ini = this.getView().byId("datePickerFrom").getValue();
				var condition_1_fin = this.getView().byId("datePickerTo").getValue();
				console.log(condition_1_ini);
				console.log(condition_1_fin)

				var condition_2 = this.getView().byId("comboEstado").getSelectedKey();
				console.log(condition_2);

				if (condition_0 == "" || condition_1_ini == "" || condition_1_fin == "") {
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
							"text": "Fecha Factura: " + condition_1_ini + "..." + condition_1_fin,
							"exclude": false,
							"operation": "BT",
							"keyField": "f_Factura",
							"value1": condition_1_ini,
							"value2": condition_1_fin,
							"showIfGrouped": false,
							"typeField": "date",
							"zstr": "<f_Factura><SIGN>I</SIGN><OPTION>BT</OPTION><LOW>" + condition_1_ini + "</LOW><HIGH>" + condition_1_fin + "</HIGH></f_Factura>"
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

				var model = sap.ui.getCore().getModel("mTablesListadoFacturas");
				console.log(model);

			},

			createContent: function () {
				console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.ListadoFacturas');
			},

			f_createAllFiltersPanel: function (oEvt) {
				oC_Modulo_WiseMobile.f_createFilterPanel("LISTADOFACTURA", oCtrl_ListadoFacturas, "idPage", 3);
			},

			onAfterRendering: function (oEvt) {

				// LIMPIAR MONITOR DE BUSQUEDA (EN CASO LO HALLA)
				oCnt_FHelps.f_LimpiarMonitorBusq(this);
				if (ListadoFacturas_flag == true)
					return;

				ListadoFacturas_flag = true;

				var oTableID = oView.byId("idTableListadoFacturas");
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

			f_PreparingTableHTMLToExport: function () {
				MessageToast.show(" Descargando..");
				/*var datos = oCore.getModel("mTables").getData().LISTADOFACTURAS;
				
				var d = '<tr>'+
					'<th>TipoSolicitudDsc</th>'+
					'<th>Fecha</th>'+
					'<th>ZIDSOLICITUD</th>'+
					'</tr>';
				
				var d = '<tr>';
				for(var i=1; i<=8;i++){
					d = d + '<th>'+oCnt_FHelps.f_readTranslate("ListadoFacturas.Monitor.Table.Column."+i)+'</th>';
				}
				d = d + '</tr>';
	
				for (var i = 1; i < datos.length; i++) {
					d+= '<tr>'+
					'<td>'+datos[i].Factura+'</td>'+
					'<td>'+datos[i].NoDoc+'</td>'+
					'<td>'+datos[i].ImporteSinIva+'</td>'+
					'<td>'+datos[i].Moneda+'</td>'+
					'<td>'+datos[i].VenNeto+'</td>'+
					'<td>'+datos[i].FechaPago+'</td>'+
					'<td>'+datos[i].Fecha+'</td>'+
					'<td>'+datos[i].Estado+'</td>'+
					'</tr>';
				}
				$("idVListadoFacturas--idTableListadoFacturas-listUl").append(d);
				
				tableToExcel("idVListadoFacturas--idTableListadoFacturas-listUl", "Hoja 1");*/

				// DG Exportar tabla en listado de facturas
				var datos = oCore.getModel("mTables").getData().LISTADOFACTURAS;

				var d = '<tr>' +
					'<th>TipoSolicitudDsc</th>' +
					'<th>Fecha</th>' +
					'<th>ZIDSOLICITUD</th>' +
					'</tr>';

				var d = '<tr>';
				for (var i = 1; i <= 8; i++) {
					d = d + '<th>' + oCnt_FHelps.f_readTranslate("ListadoFacturas.Monitor.Table.Column." + i) + '</th>';
				}
				d = d + '</tr>';

				for (var i = 1; i < datos.length; i++) {
					d += '<tr>' +
						'<td>' + datos[i].Factura + '</td>' +
						'<td>' + datos[i].NoDoc + '</td>' +
						'<td>' + datos[i].ImporteSinIva + '</td>' +
						'<td>' + datos[i].Moneda + '</td>' +
						'<td>' + datos[i].VenNeto + '</td>' +
						'<td>' + datos[i].FechaPago + '</td>' +
						'<td>' + datos[i].Fecha + '</td>' +
						'<td>' + datos[i].Estado + '</td>' +
						'</tr>';
				}
				$("idVListadoFacturas--idTableListadoFacturas-listUl").append(d);

				tableToExcel("idVListadoFacturas--idTableListadoFacturas-listUl", "Hoja 1");
			},

			onGetPdf: function (oEvt) {
				console.log("getPdf");
				var oButton = oEvt.getSource();
				var oBindingContext = oButton.getBindingContext("mTablesListadoFacturas");
				var oSelectedData = oBindingContext.getObject();

				if (!oSelectedData.PDF) {
					MessageBox.warning("No hay archivo PDF asociado a esta factura");
					return;
				} else {
					// Convert the base64 string to a Blob
					var base64EncodedPDF = oSelectedData.PDF; // the encoded string
					var decodedPdfContent = atob(base64EncodedPDF);
					var byteArray = new Uint8Array(decodedPdfContent.length)
					for (var i = 0; i < decodedPdfContent.length; i++) {
						byteArray[i] = decodedPdfContent.charCodeAt(i);
					}
					var blob = new Blob([byteArray.buffer], { type: 'application/pdf' });
					var _pdfurl = URL.createObjectURL(blob);


					// Open PDF viewer
					if (!this._PDFViewer) {
						this._PDFViewer = new sap.m.PDFViewer({
							width: "auto",
							source: _pdfurl // my blob url
						});
						jQuery.sap.addUrlWhitelist("blob"); // register blob url as whitelist
					}
					this._PDFViewer.downloadPDF = function () {
						File.save(
							byteArray.buffer,
							"Hello_UI5",
							"pdf",
							"application/pdf"
						);
					};
					this._PDFViewer.open();
				}



			},

			onGetXml: function (oEvt) {
				var oButton = oEvt.getSource();
				var oBindingContext = oButton.getBindingContext("mTablesListadoFacturas");
				var oSelectedData = oBindingContext.getObject();

				if (!oSelectedData.XML) {
					MessageBox.warning("No hay archivo XML asociado a esta factura");
					return;
				} else {
					// Convert the base64 string to a Blob
					var base64EncodedXML = oSelectedData.XML;
					var xmlString = atob(base64EncodedXML);
					var blob = new Blob([xmlString], { type: "application/xml" });
					var url = URL.createObjectURL(blob);

					// Create a link element and click on it
					let doc = document.createElement("a");
					doc.href = url;
					doc.text = "Hello";
					//doc.download = "text.xml";
					//doc.click();
					window.open(url, '_blank');
				};


			}

		});

	});