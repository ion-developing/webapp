var oCtrl_LtaComprobaciones;
var LtaComprobaciones_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.controller.LtaComprobaciones", {
		_formFragments: {},
		
		onInit : function() {
			oCtrl_LtaComprobaciones = this;
   			oView = this.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.controller.LtaComprobaciones");

			this.f_createAllFiltersPanel();
			this._formFragments.ActionSheet 			= sap.ui.xmlfragment("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.view.fragments.ActionSheet", this);
	        this._formFragments.OpcionesComprobacion 	= sap.ui.xmlfragment("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.view.fragments.OpcionesComprobacion", this);
			this._formFragments.EditCecos 				= sap.ui.xmlfragment("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.view.fragments.EditCecos", this);
			this._formFragments.DetalleCecos 			= sap.ui.xmlfragment("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.view.fragments.DetalleCecos", this);
	        
			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("LtaComprobaciones" === sRoute) {
	        		
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
		
		onAfterRendering : function(oEvt) {
			if(LtaComprobaciones_flag == true)
				return;
			
			LtaComprobaciones_flag = true;
			
			var oTableID = oView.byId("idTableLtaComprobaciones");
   			// Hidden/view Columns
   			DemoPersoService.setMyPersData( oTableID );
   			
   			// init and activate controller
			this._oTPC = new TablePersoController({
				table: oTableID,
				//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
				componentName: "demoApp",
				persoService: DemoPersoService,
			}).activate();
   		},
   		
   		onPersoPress: function(oEvt) {
   			var oTable = oEvt.getSource().getParent().getParent();
   			
   			if(oTable.getId() == "idTableDetalleCecos")
   				oCtrl_Main_CG.onPersoPress(oEvt);
   			else
   				this._oTPC.openDialog();
		},
		
		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.controller.LtaComprobaciones');
		},
		
		f_createAllFiltersPanel: function(oEvt){
			oC_Modulo_WiseMobile.f_createFilterPanel("LTAANTICIPOS", oCtrl_LtaComprobaciones, "idPage", 4);
		},
		
		onPressOpciones: function(oEvt){
			var that = this;
			var oButton = oEvt.getSource();

			// create action sheet only once
			if (!that._actionSheet1) {
				that._actionSheet1 = that._formFragments.OpcionesComprobacion;
				that.getView().addDependent(that._actionSheet1);
			}

			that._actionSheet1.openBy(oButton);
		},
		
		onSettingsTable: function(oEvt){
			var oTable = oEvt.getSource().getParent().getParent();
			var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
			var oModel = oCore.getModel( oNameModel );
			var oPath = oTable.getBindingInfo("items").path;
			var oPosCountT = oTable.getHeaderToolbar().getContent().length-1;
			var oCountTable = oTable.getHeaderToolbar().getContent()[oPosCountT];
			
			var aCampos = [ 
				{key : "Aprobadopor",   text : oCnt_FHelps.f_readTranslate("LtaComprobaciones.Monitor.Table.Column.11")}, 
				{key : "FechaAprobacion", text : oCnt_FHelps.f_readTranslate("LtaComprobaciones.Monitor.Table.Column.12")}, 
				{key : "Contabilizado", text : oCnt_FHelps.f_readTranslate("LtaComprobaciones.Monitor.Table.Column.13")}, 
				{key : "FechaContabiliza", text : oCnt_FHelps.f_readTranslate("LtaComprobaciones.Monitor.Table.Column.14")}
			];
			
			var aVSFItems = [];
			
			for (var i = 0; i < aCampos.length; i++) {
				var itemTemplate = new sap.m.ViewSettingsItem({text:"{mTables>"+aCampos[i].key+"}", key:"{mTables>"+aCampos[i].key+"}"});
				
				var viewSettingsFilterItem = new sap.m.ViewSettingsFilterItem({
					text: aCampos[i].text,
					key: aCampos[i].key,
					multiSelect:false
				});
				
				viewSettingsFilterItem.setModel(oModel,"mTables");
				viewSettingsFilterItem.bindAggregation("items","mTables>"+oPath,itemTemplate);
				
				aVSFItems.push(viewSettingsFilterItem);
			}
			
			var viewSettings = new sap.m.ViewSettingsDialog({
				title: oCnt_FHelps.f_readTranslate("ViewSettings.Dialog.Title"),
				filterSearchOperator:"Contains",
				confirm: function(oEvent){
					var mParams = oEvent.getParameters(),
						oBinding = oTable.getBinding("items"),
						sPath,
						bDescending,
						aSorters = [],
						aFilters = [];

					sPath = mParams.sortItem.getKey();
					bDescending = mParams.sortDescending;
					aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));

					// apply the selected sort and group settings
					oBinding.sort(aSorters);
					
					//Para filtros locales
					
					mParams.filterItems.forEach(function(oItem) {
						var oValue = oItem.getKey(),
							oKey = oItem.getParent().getKey(),
							oFilter = new Filter(oKey, "EQ", oValue);
						aFilters.push(oFilter);
					});

					// apply filter settings
					oBinding.filter(aFilters);
					
					oCountTable.setText("("+oBinding.aIndices.length+")");
					//oCtrl_Datos_Maestros.byId("idCountTableClientes").setText("("+oBinding.aIndices.length+")");
				},
				sortItems: [
					new sap.m.ViewSettingsItem({text: oCnt_FHelps.f_readTranslate("LtaComprobaciones.Monitor.Table.Column.1"), key:"TipoCompra", selected:true}),
					new sap.m.ViewSettingsItem({text: oCnt_FHelps.f_readTranslate("LtaComprobaciones.Monitor.Table.Column.2"), key:"TipoDocumento"}),
					new sap.m.ViewSettingsItem({text: oCnt_FHelps.f_readTranslate("LtaComprobaciones.Monitor.Table.Column.3"), key:"FechadeSolicitud"}),
				],
				
				filterItems:[
					aVSFItems
				]
			});
			
			viewSettings.open();
		},

		onPressEnviar: function(oEvt){

			var oTable = oCtrl_LtaComprobaciones.byId("idTableLtaComprobaciones");
		    var length = oTable.getSelectedItems().length;
		   
		    if(length==0){
		    	var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
				oCnt_FHelps.f_showMessage("WARNING", oText);
			}
        	else if(length >= 1){
        		var idx = oTable.indexOfItem(oTable.getSelectedItem()); // getSelectedItems
        		var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
	   			var oModel = oCore.getModel( oNameModel );
	   			var oPath = oTable.getBindingInfo("items").path;
	   			
	   			var oObject = oModel.getProperty(oPath+"/"+ idx);
	   			/*
	   			 * AQUI VIENE
	   			 */
			
				var _timeout;
				
				var oBusyDialog_c = new sap.m.BusyDialog({
					title	: oCnt_FHelps.f_readTranslate("Wait.title"),
				    text	: oCnt_FHelps.f_readTranslate("EnviandoSolicitud.text"),
					close : function(oEvt) {
						jQuery.sap.clearDelayedCall(_timeout);
						
						oCnt_FHelps.f_showMessage("INFORMATION", oCnt_FHelps.f_readTranslate("Aprobacion.Exito.text"), undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
					}
				});
				
				// open dialog
				oBusyDialog_c.open();
	
				// simulate end of operation
				_timeout = jQuery.sap.delayedCall(1000, this, function () {
					oBusyDialog_c.close();
				});
        	}
		},
		
		onPressEdit: function(oEvt){
			var that = this;
			
			var oTable = oView.byId("idTableLtaComprobaciones");
		    var length = oTable.getSelectedItems().length;
		   
		    if(length!=1){
		    	var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
				oCnt_FHelps.f_showMessage("WARNING", oText);
			}
        	else {
        		var idx = oTable.indexOfItem(oTable.getSelectedItem()); // getSelectedItems
        		var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
	   			var oModel = oCore.getModel( oNameModel );
	   			var oPath = oTable.getBindingInfo("items").path;
	   			
	   			var oObject = oModel.getProperty(oPath+"/"+ idx);
	   			oCore.getModel("mEditComprobacion").setProperty("/", oObject);
	   			/*
	   			 * AQUI VIENE
	   			 */
				var oDialog = new sap.m.Dialog({
					id:"idDialogComprobacion",
					contentWidth: "100%",
					title:"{i18n>EditComprobacion.Popup.title}",
					content:[
						oCtrl_Main_CG._formFragments.Edit
					],
					buttons:[
						new sap.m.Button({
							text: "{i18n>Popup.Button.Opciones}",
							press: function(oEvt){
								var oButton = oEvt.getSource();

								// create action sheet only once
								if (!that._actionSheet) {
									that._actionSheet = that._formFragments.ActionSheet;
									//that.getView().addDependent(that._actionSheet);
								}

								that._actionSheet.openBy(oButton);
							}
						}),
						new sap.m.Button({
							text: "{i18n>Popup.Button.Cancelar}",
							press: function(oEvt){
								oDialog.close();
							}
						})
					],
					beforeOpen: function(oEvt){
						oCore.byId("idBtnAgregarL").setVisible(true);
						oCore.byId("idBtnEditarL").setVisible(true);
						oCore.byId("idBtnBorrarL").setVisible(true);
						oCore.byId("idBtnDistCecos").setVisible(true);
						oCore.byId("idBtnDtosContabl").setVisible(true);
						oCore.byId("idBtnDoc").setVisible(true);
					},
					beforeClose: function(oEvt){
						oDialog.removeAllButtons();
						oDialog.removeAllContent();
					},
					afterClose: function(oEvt){
						oDialog.destroy();
					}
				});
				oDialog.open();
			}
		},

		onPressBuscarCeco : function (oEvt) {
			
			var oCentroCoste = new sap.m.Input({ value: "" });
			var oDescripcion = new sap.m.Input({ value: "" });
			
			function f_Buscar(){

				var sQuery1 = oCentroCoste.getValue();
				var sQuery2 = oDescripcion.getValue();
				var aFilters = [];
				
				if (sQuery1) {
					aFilters.push(new Filter("CentroCosto", FilterOperator.Contains, sQuery1));
				}
				if (sQuery2) {
					aFilters.push(new Filter("Descripcion", FilterOperator.Contains, sQuery2));
				}
				
      			// update list binding
      			var list = that.BuscarCeco;
      			var binding = list.getBinding("items");
      			binding.filter(aFilters);
			};
			
		if(that.BuscarCeco == undefined)
			that.BuscarCeco =new sap.m.Table("idTableBuscarCeco",{
				mode: "SingleSelectLeft",
				includeItemInSelection: true,
				growing: true,
				growingThreshold: 5,
				growingScrollToLoad : true,
				selectionChange : function(e) {
					//sap.m.MessageToast.show("selection is changed");
				},
				itemPress : function(e) {
					//sap.m.MessageToast.show("item is pressed");
				},
				headerToolbar: new sap.m.Toolbar({
					content : [
						new sap.m.ToolbarSpacer(),
						new sap.m.Button({
							icon: "sap-icon://table-column",
							press: function(oEvt){
								var oTable = oEvt.getSource().getParent().getParent();
								oCtrl_Main_CG.onPersoPress(oEvt, oTable);
							}
						})
					]
				}),
				columns :  [
					new sap.m.Column("idCol1",{
						width:"",
						header : new sap.m.Label({
							text : "{i18n>BuscarCeco.Popup.Table.Column.1}"
						})
					}),
					new sap.m.Column("idCol2",{
						header : new sap.m.Label({
							text : "{i18n>BuscarCeco.Popup.Table.Column.2}"
						})
					}),
					new sap.m.Column("idCol3",{
						header : new sap.m.Label({
							text : "{i18n>BuscarCeco.Popup.Table.Column.3}"
						})
					})
				]
			}).bindItems({
				path: "mTables>/LISTACECOS",
				template : 
					new sap.m.ColumnListItem({
						vAlign: "Middle",
						detailPress: function() {
							setTimeout(function() {
								sap.m.MessageToast.show("detail is pressed");
							}, 10);
						},
						cells : [
							new sap.m.Text({
								text : "{mTables>Id}"
							}),
							new sap.m.Text({
								text : "{mTables>CentroCosto}"
							}),
							new sap.m.Text({
								text : "{mTables>Descripcion}"
							})
						]
					})
			});
			
			var oDialog = new sap.m.Dialog({
				contentWidth: "100%",
				customHeader: new sap.m.Bar({
					contentMiddle: new sap.m.Label({
						text: "{i18n>BuscarCeco.Popup.title}"
					}),
					contentRight: new sap.m.Button({
						icon: "sap-icon://decline",
						press: function() {
							oDialog.close();
						}
					})
				}),
				content:[
					new sap.ui.layout.form.Form({
						editable: true,
						layout: new sap.ui.layout.form.ResponsiveGridLayout({
							labelSpanXL:3,labelSpanL:3,labelSpanM:3,labelSpanS:12,
							adjustLabelSpan:false,
							emptySpanXL:4,emptySpanL:4,emptySpanM:4,emptySpanS:0,
							columnsXL:1,columnsL:1,columnsM:1,
							singleContainerFullSize:false,
						}),
						formContainers: [
							new sap.ui.layout.form.FormContainer({
								formElements: [
									 new sap.ui.layout.form.FormElement({
										 label: "{i18n>BuscarCeco.Popup.Form.Label.1}",
										 fields: [
											 oCentroCoste
										 ]
									}),
									new sap.ui.layout.form.FormElement({
										 label: "{i18n>BuscarCeco.Popup.Form.Label.2}",
										 fields: [
											 oDescripcion,
											 new sap.m.Button({
												 icon: "sap-icon://search",
												 press: function(){
													 f_Buscar();
												 },
												 
												 layoutData:
													 new sap.ui.layout.GridData({
														 span: "XL1 L1 M1 S2"
													 })
											 }),
										 ]
									})
								]
							})
						]
					}),
					new sap.m.Toolbar({
						content : [
							new sap.m.ToolbarSpacer(),
							new sap.m.Button({
								text : "{i18n>BuscarCeco.Popup.Button.1}",
								press: function(){
									var oTable = that.BuscarCeco;
								    var length = oTable.getSelectedItems().length;
								    
								    if(length==0){
								    	var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
										oCnt_FHelps.f_showMessage("WARNING", oText);
									}
						        	else if(length >= 1){
						        		var idx = oTable.indexOfItem(oTable.getSelectedItem()); // getSelectedItems
						        		var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
							   			var oModel = oCore.getModel( oNameModel );
							   			var oPath = oTable.getBindingInfo("items").path;
							   			var oObject = oModel.getProperty(oPath+"/"+ idx);
							   			
							   			//INSERCION
							   			oCore.byId("idICentroCoste").setValue( oObject.CentroCosto );
							   			
						        	}
									oDialog.close();
								}
							}),
							new sap.m.Button({ text : "{i18n>BuscarCeco.Popup.Button.2}", press: function(){ oDialog.close(); } }),
							new sap.m.ToolbarSpacer()
						]
					}),
					that.BuscarCeco
				],
				beforeOpen: function(oEvt){

					if(oCtrl_Main_CG._oTPC_Core["idTableBuscarCeco"] == undefined){
						var oTableID = oCore.byId("idTableBuscarCeco");
			   			// Hidden/view Columns
			   			DemoPersoService.setMyPersData( oTableID );
			   			
			   			// init and activate controller
			   			oCtrl_Main_CG._oTPC_Core["idTableBuscarCeco"] = new TablePersoController({
							table: oTableID,
							//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
							componentName: "demoApp",
							persoService: DemoPersoService,
						}).activate();
					}
				},
				beforeClose: function(oEvt){
					oDialog.removeAllContent();
				},
				afterClose: function(oEvt){
					oDialog.destroy();
				}
			});
			oDialog.open();
		},

		onPressAgregarL: function(oEvt){
			var that = this;
			
			function Show_Hide_Form(id_tipo_doc) {
				switch(id_tipo_doc){
					case "1":
						aFormElements["DocumentoXML"].setVisible(true);
						aFormElements["RFCTercero"].setVisible(false);
						aFormElements["Importe"].setVisible(false);
						aFormElements["I.V.A."].setVisible(false);
						break;
					case "2":
						aFormElements["ClaseGastos"].setVisible(true);
						aFormElements["DocumentoXML"].setVisible(false);
						//aFormElements["DocumentoPDF"].setVisible(true);
						aFormElements["Cantidad"].setVisible(true);
						aFormElements["MetodoPago"].setVisible(true);
						aFormElements["RFCTercero"].setVisible(true);
						aFormElements["Importe"].setVisible(true);
						aFormElements["I.V.A."].setVisible(true);
						break;
					case "3":
						
						aFormElements["ClaseGastos"].setVisible(true);
						aFormElements["DocumentoXML"].setVisible(false);
						//aFormElements["DocumentoPDF"].setVisible(true);
						aFormElements["Cantidad"].setVisible(true);
						aFormElements["MetodoPago"].setVisible(true);
						aFormElements["RFCTercero"].setVisible(true);
						aFormElements["Importe"].setVisible(true);
						aFormElements["I.V.A."].setVisible(true);
						break;
				}
			}
			
			var aFormElements= {
				"TipoDocumento": new sap.ui.layout.form.FormElement({
					label: "{i18n>EditComprobacion.AgregarL.Popup.Form.Label.1}",
					fields: [
						new sap.m.Select({
							forceSelection : false,
							//selectedKey: "",
							change: function(oEvt){

								var oKey = oEvt.getSource().getSelectedKey();
								Show_Hide_Form(oKey);
							},
							items: [
								new sap.ui.core.Item({
									key: "1",
									text: "CFDI"
								}),
								new sap.ui.core.Item({
									key: "2",
									text: "No CFDI"
								}),
								new sap.ui.core.Item({
									key: "3",
									text: "Extranjero"
								})
							]
						})
					]
				}),
				"ClaseGastos": new sap.ui.layout.form.FormElement({
					label: "{i18n>EditComprobacion.AgregarL.Popup.Form.Label.2}",
					fields: [
						new sap.m.Select({
							forceSelection : false,
							items: {
								path: "mCombos>/CLASEGASTOS",
								template:  new sap.ui.core.Item({ key:"{mCombos>id}", text:"{mCombos>text}"})
							}
						})
					]
				}),
				"DocumentoXML": new sap.ui.layout.form.FormElement({
					label: "{i18n>EditComprobacion.AgregarL.Popup.Form.Label.3}",
					fields: [
						  new sap.ui.unified.FileUploader({
								name: "testxml",
								//uploadUrl: "../../../../upload/",
								value: "",
								//width: "400px",
								tooltip: "Upload your file to the local server.",
								placeholder: "Choose a file for uploading...",
								fileType: ["xml"],
								maximumFileSize: 2,
								uploadOnChange: false,
								multiple: false,
								buttonText: "Browse...",
								//additionalData: "abc=123&test=456",
								fileSizeExceed: function (oEvent) {
									var fileSize = oEvent.getParameter("fileSize"),
										fileName = oEvent.getParameter("fileName");
									oCnt_FHelps.f_showMessage("WARNING", "The chosen file '" + fileName + "' is " + fileSize + " MB big, this exceeds the maximum filesize of " + oEvent.getSource().getMaximumFileSize() + " MB.");
								}
							})
					]
				}),
				"DocumentoPDF": new sap.ui.layout.form.FormElement({
					label: "{i18n>EditComprobacion.AgregarL.Popup.Form.Label.4}",
					fields: [
						  new sap.ui.unified.FileUploader({
								name: "testpdf",
								//uploadUrl: "../../../../upload/",
								value: "",
								//width: "400px",
								tooltip: "Upload your file to the local server.",
								placeholder: "Choose a file for uploading...",
								fileType: ["pdf"],
								maximumFileSize: 2,
								uploadOnChange: false,
								multiple: false,
								buttonText: "Browse...",
								//additionalData: "abc=123&test=456",
								fileSizeExceed: function (oEvent) {
									var fileSize = oEvent.getParameter("fileSize"),
										fileName = oEvent.getParameter("fileName");
									oCnt_FHelps.f_showMessage("WARNING", "The chosen file '" + fileName + "' is " + fileSize + " MB big, this exceeds the maximum filesize of " + oEvent.getSource().getMaximumFileSize() + " MB.");
								}
							})
					]
				}),
				"Cantidad": new sap.ui.layout.form.FormElement({
					label: "{i18n>EditComprobacion.AgregarL.Popup.Form.Label.5}",
					fields: [
						new sap.m.Input({
							value: "1"
						})
					]
				}),
				"Moneda": new sap.ui.layout.form.FormElement({
					label: "{i18n>EditComprobacion.AgregarL.Popup.Form.Label.10}",
					fields: [
						new sap.m.Select({
							forceSelection : false,
							items: {
								path: "mCombos>/MONEDA",
								template:  new sap.ui.core.Item({ key:"{mCombos>id}", text:"{mCombos>text}"})
							}
						})
					]
				}),
				"MetodoPago": new sap.ui.layout.form.FormElement({
					label: "{i18n>EditComprobacion.AgregarL.Popup.Form.Label.6}",
					fields: [
						new sap.m.Select({
							forceSelection : false,
							//selectedKey: "",
							items: [
								new sap.ui.core.Item({
									key: "1",
									text: "Efectivo"
								}),
								new sap.ui.core.Item({
									key: "1",
									text: "Amex"
								}),
								new sap.ui.core.Item({
									key: "1",
									text: "Tarjeta Personal"
								})
							]
						})
					]
				}),
				"RFCTercero": new sap.ui.layout.form.FormElement({
					label: "{i18n>EditComprobacion.AgregarL.Popup.Form.Label.7}",
					fields: [
						new sap.m.Input({
							value: "XEXX0101010000",
							enabled: false,
							customData: new sap.ui.core.CustomData({key:"NO_ME_VALIDES"})
						}),
					]
				}),
				"Importe": new sap.ui.layout.form.FormElement({
					label: "{i18n>EditComprobacion.AgregarL.Popup.Form.Label.8}",
					fields: [
						new sap.m.Input({
							value: ""
						}),
					]
				}),
				"I.V.A.": new sap.ui.layout.form.FormElement({
					label: "{i18n>EditComprobacion.AgregarL.Popup.Form.Label.9}",
					fields: [
						new sap.m.Select({
							forceSelection : false,
							//selectedKey: "",
							items: [
								new sap.ui.core.Item({
									key: "1",
									text: "0.0"
								}),
								new sap.ui.core.Item({
									key: "2",
									text: "16.0"
								})
							]
						})
					]
				}),
				
			};
			
			function Add_Linea(){
				var oTable = oCore.byId("idTableFLtaComprobaciones");
				oTable.bindItems({
			        path: "mTables>/FCOMPROBACIONES",
			        template: oTable.getBindingInfo("items").template
			    });
			};
			
			var oDialog = new sap.m.Dialog({
				customHeader: new sap.m.Bar({
					contentMiddle: new sap.m.Label({
						text: "{i18n>EditComprobacion.Popup.title}"
					}),
					contentRight: new sap.m.Button({
						icon: "sap-icon://decline",
						press: function() {
							oDialog.close();
						}
					})
				}),
				content:[
					new sap.ui.layout.form.Form({
						editable: true,
						layout: new sap.ui.layout.form.ResponsiveGridLayout(),
						formContainers: [
							new sap.ui.layout.form.FormContainer({
								formElements: [
									aFormElements["TipoDocumento"],
									aFormElements["ClaseGastos"],
									aFormElements["DocumentoXML"],
									aFormElements["DocumentoPDF"],
									aFormElements["Cantidad"],
									aFormElements["Moneda"],
									aFormElements["MetodoPago"],
									aFormElements["RFCTercero"],
									aFormElements["Importe"],
									aFormElements["I.V.A."]
								]
							})
						]
					})
				],
				buttons:[
					new sap.m.Button({
						text: "{i18n>Popup.Button.Agregar}",
						press: function(oEvt){
							var oForm = oDialog.getContent()[0]; // Form
							//if(oCnt_FHelps.f_Inputs_Form(oForm) == false){
							if(oCnt_FHelps.f_Inputs_Form(oForm) == false){
								return;
							}
							
							var _timeout;
							
							var oBusyDialog_c = new sap.m.BusyDialog({
								title	: oCnt_FHelps.f_readTranslate("Wait.title"),
							    text	: oCnt_FHelps.f_readTranslate("GuardandoComprobacion.text"),
								close : function(oEvt) {
									oDialog.close();
									jQuery.sap.clearDelayedCall(_timeout);
									
									oCnt_FHelps.f_showMessage("INFORMATION", oCnt_FHelps.f_readTranslate("Comprobacion.Exito.text"), Add_Linea, oCnt_FHelps.f_readTranslate("Mensaje.title") );
								}
							});
							
							// open dialog
							oBusyDialog_c.open();

							// simulate end of operation
							_timeout = jQuery.sap.delayedCall(1000, this, function () {
								oBusyDialog_c.close();
							});
						}
					})
				],
				beforeClose: function(oEvt){
					var oContent = oDialog.removeAllContent();
					for(var i=0; i<oContent.length; i++)
						oContent[i].destroy();
				},
				afterClose: function(oEvt){
					oDialog.destroy();
				}
			});
			oDialog.open();
		},
		
		onPressEditarL: function(oEvt){
			
		},
		
		onPressBorrarL: function(oEvt){
			
		},
		
		onPressDistCecos: function(oEvt){
			var that = this;
			
			var oTable = sap.ui.getCore().byId("idTableFLtaComprobaciones");
		    var length = oTable.getSelectedItems().length;
		    
		    if(length!=1){
		    	var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
				oCnt_FHelps.f_showMessage("WARNING", oText);
			}
        	else if(length >= 1){
        		var idx = oTable.indexOfItem(oTable.getSelectedItem()); // getSelectedItems
        		var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
	   			var oModel = oCore.getModel( oNameModel );
	   			var oPath = oTable.getBindingInfo("items").path;
	   			
	   			var oObject = oModel.getProperty(oPath+"/"+ idx);
	   			oCore.getModel("mDetalleCecos").setProperty("/", oObject);
	   			/*
	   			 * AQUI VIENE
	   			 */
	   			this.f_PopUp_DistCecos();
        	}
		},
		
		f_PopUp_DistCecos: function() {
			var that = this;
			
			var oDialog = new sap.m.Dialog({
				contentWidth: "100%",
				customHeader: new sap.m.Bar({
					contentMiddle: new sap.m.Label({
						text: "{i18n>CeCo.Popup.title}"
					}),
					contentRight: new sap.m.Button({
						icon: "sap-icon://decline",
						press: function() {
							oDialog.close();
						}
					})
				}),
				content:[
					that._formFragments.DetalleCecos
				],
				buttons:[
					new sap.m.Button({
						text: "{i18n>Popup.Button.Opciones}",
						press: function(oEvt){
							var oButton = oEvt.getSource();
							
							if(that._actsheet == undefined)
								that._actsheet = new sap.m.ActionSheet({
									placement:"Auto",
									buttons:[
											new sap.m.Button({
												text: "{i18n>EditCecos.Button.1}"}), // Guardar
											new sap.m.Button({
												text: "{i18n>EditCecos.Button.2}", // Cancelar
												press: function(oEvt){
													oDialog.close();
												}
											}),
											new sap.m.Button({
												text: "{i18n>EditCecos.Button.3}", // Agregar
												press: function(oEvt){
													//that.f_PopUp_Ceco("C");
												}
											}),
											new sap.m.Button({
												text: "{i18n>EditCecos.Button.4}", // Editar
												press: function(oEvt){
													
													var oTable = oCore.byId("idTableDetalleCecos");
												    var length = oTable.getSelectedItems().length;
												    
												    if(length!=1){
												    	var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
														oCnt_FHelps.f_showMessage("WARNING", oText);
													}
										        	else if(length >= 1){
										        		var idx = oTable.indexOfItem(oTable.getSelectedItem()); // getSelectedItems
										        		var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
											   			var oModel = oCore.getModel( oNameModel );
											   			var oPath = oTable.getBindingInfo("items").path;
											   			
											   			var oObject = oModel.getProperty(oPath+"/"+ idx);
											   			oCore.getModel("mEditCecos").setProperty("/", oObject);
											   			/*
											   			 * AQUI VIENE
											   			 */
											   			that.f_PopUp_Ceco("U", oModel, oPath+"/"+ idx);
										        	}
												}
											}),
											new sap.m.Button({
												text: "{i18n>EditCecos.Button.5}"}), // Borrar
											new sap.m.Button({
												text: "{i18n>EditCecos.Button.6}"})  // % Iguales
									]
								});

							that._actsheet.openBy(oButton);
						}
					})
				],
				beforeClose: function(oEvt){
					oDialog.removeAllContent();
				},
				afterClose: function(oEvt){
					oDialog.destroy();
				}
			});
			oDialog.open();
		},
		
		onPressDtosContabl: function(oEvt){
			var that = this;
			
		if(that.Table_DtosContabl == undefined)
			that.Table_DtosContabl = new sap.m.Table("idTableDtosContabl",{
				growing: true,
				growingThreshold: 5,
				growingScrollToLoad : true,
				selectionChange : function(e) {
					//sap.m.MessageToast.show("selection is changed");
				},
				itemPress : function(e) {
					//sap.m.MessageToast.show("item is pressed");
				},
				headerToolbar: new sap.m.Toolbar({
					content : [
						new sap.m.ToolbarSpacer(),
						new sap.m.Button({
							icon: "sap-icon://table-column",
							press: function(oEvt){
								var oTable = oEvt.getSource().getParent().getParent();
								oCtrl_Main_CG.onPersoPress(oEvt, oTable);
							}
						})
					]
				}),
				columns :  [
					new sap.m.Column("idCol31",{
						header : new sap.m.Label({
							text : "{i18n>EditComprobacion.DatosContables.Popup.Table.Column.1}"
						})
					}),
					new sap.m.Column("idCol32",{
						width: "5rem",
						header : new sap.m.Label({
							text : "{i18n>EditComprobacion.DatosContables.Popup.Table.Column.2}"
						})
					}),
					new sap.m.Column("idCol33",{
						width: "4rem",
						minScreenWidth: "Tablet",
						demandPopin: true,
						header : new sap.m.Label({
							text : "{i18n>EditComprobacion.DatosContables.Popup.Table.Column.3}"
						})
					}),
					new sap.m.Column("idCol34",{
						header : new sap.m.Label({
							text : "{i18n>EditComprobacion.DatosContables.Popup.Table.Column.4}"
						})
					}),
					new sap.m.Column("idCol35",{
						header : new sap.m.Label({
							text : "{i18n>EditComprobacion.DatosContables.Popup.Table.Column.5}"
						})
					})
				]
			}).bindItems({
				path: "mTables>/DATOS_CONTABLES",
				template : 
					new sap.m.ColumnListItem({
						vAlign: "Middle",
						detailPress: function() {
							setTimeout(function() {
								sap.m.MessageToast.show("detail is pressed");
							}, 10);
						},
						cells : [
							new sap.m.Text({
								text : "{mTables>Libro_Mayor}"
							}),
							new sap.m.Text({
								text : "{mTables>Importe}"
							}),
							new sap.m.Text({
								text : "{mTables>Iva}"
							}),
							new sap.m.Text({
								text : "{mTables>Importe_Impuesto}"
							}),
							new sap.m.Text({
								text : "{mTables>Texto}"
							})
						]
					})
			});
			
			var oDialog = new sap.m.Dialog({
				customHeader: new sap.m.Bar({
					contentMiddle: new sap.m.Label({
						text: "{i18n>EditComprobacion.DatosContables.Popup.title}"
					}),
					contentRight: new sap.m.Button({
						icon: "sap-icon://decline",
						press: function() {
							oDialog.close();
						}
					})
				}),
				content:[
					new sap.ui.layout.form.Form({
						editable: true,
						layout: new sap.ui.layout.form.ResponsiveGridLayout(),
						formContainers: [
							new sap.ui.layout.form.FormContainer({
								formElements: [
									new sap.ui.layout.form.FormElement({
										label: "{i18n>EditComprobacion.DatosContables.Popup.Form.Label.1}",
										fields: [
											new sap.m.Input({
												value: "0000000000509",
												enabled: false
											})
										]
									}),
									new sap.ui.layout.form.FormElement({
										label: "{i18n>EditComprobacion.DatosContables.Popup.Form.Label.2}",
										fields: [
											new sap.m.Input({
												value: "0001",
												enabled: false
											})
										]
									}),
									new sap.ui.layout.form.FormElement({
										label: "{i18n>EditComprobacion.DatosContables.Popup.Form.Label.3}",
										fields: [
											new sap.m.Input({
												value: "Alimentos...",
												enabled: false
											})
										]
									}),
									new sap.ui.layout.form.FormElement({
										label: "{i18n>EditComprobacion.DatosContables.Popup.Form.Label.4}",
										fields: [
											new sap.m.Input({
												value: "2046.00",
												enabled: false
											})
										]
									}),
									new sap.ui.layout.form.FormElement({
										label: "{i18n>EditComprobacion.DatosContables.Popup.Form.Label.5}",
										fields: [
											new sap.m.Input({
												value: "MXN",
												enabled: false
											})
										]
									})
								]
							})
						]
					}),
					that.Table_DtosContabl
					
				],
				beforeOpen: function(oEvt){

					if(oCtrl_Main_CG._oTPC_Core["idTableDtosContabl"] == undefined){
						var oTableID = oCore.byId("idTableDtosContabl");
			   			// Hidden/view Columns
			   			DemoPersoService.setMyPersData( oTableID );
			   			
			   			// init and activate controller
			   			oCtrl_Main_CG._oTPC_Core["idTableDtosContabl"] = new TablePersoController({
							table: oTableID,
							//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
							componentName: "demoApp",
							persoService: DemoPersoService,
						}).activate();
					}
				},
				beforeClose: function(oEvt){
					var oContent = oDialog.removeAllContent();
				},
				afterClose: function(oEvt){
					oDialog.destroy();
				}
			});
			oDialog.open();
		},
		
		onPressDoc: function(oEvt){
			var that = this;
			
		if(that.Table_Doc == undefined)
			that.Table_Doc = new sap.m.Table("idTableDoc",{
				growing: true,
				growingThreshold: 5,
				growingScrollToLoad : true,
				selectionChange : function(e) {
					//sap.m.MessageToast.show("selection is changed");
				},
				itemPress : function(e) {
					//sap.m.MessageToast.show("item is pressed");
				},
				headerToolbar: new sap.m.Toolbar({
					content : [
						new sap.m.ToolbarSpacer(),
						new sap.m.Button({
							icon: "sap-icon://table-column",
							press: function(oEvt){
								var oTable = oEvt.getSource().getParent().getParent();
								oCtrl_Main_CG.onPersoPress(oEvt, oTable);
							}
						})
					]
				}),
				columns :  [
					new sap.m.Column("idCol41",{
						header : new sap.m.Label({
							text : "{i18n>EditComprobacion.Documentos.Popup.Table.Column.1}"
						})
					}),
					new sap.m.Column("idCol42",{
						header : new sap.m.Label({
							text : "{i18n>EditComprobacion.Documentos.Popup.Table.Column.2}"
						})
					}),
					new sap.m.Column("idCol43",{
						header : new sap.m.Label({
							text : "{i18n>EditComprobacion.Documentos.Popup.Table.Column.3}"
						})
					})
				]
			}).bindItems({
				path: "mTables>/DOCUMENTOS",
				template : 
					new sap.m.ColumnListItem({
						vAlign: "Middle",
						detailPress: function() {
							setTimeout(function() {
								sap.m.MessageToast.show("detail is pressed");
							}, 10);
						},
						cells : [
							new sap.m.Text({
								text : "{mTables>Linea}"
							}),
							new sap.m.Text({
								text : "{mTables>Nombre}"
							}),
							new sap.m.Image({
								src : "./wisemobile/Public/Img/pdf.png",
								decorative: false,
								press: function() {
									sap.m.MessageToast.show("Waiting for download... noup");
								}
							})
						]
					})
			});
			
			var oDialog = new sap.m.Dialog({
				customHeader: new sap.m.Bar({
					contentMiddle: new sap.m.Label({
						text: "{i18n>EditComprobacion.Documentos.Popup.title}"
					}),
					contentRight: new sap.m.Button({
						icon: "sap-icon://decline",
						press: function() {
							oDialog.close();
						}
					})
				}),
				content:[
					new sap.ui.layout.form.Form({
						editable: true,
						layout: new sap.ui.layout.form.ResponsiveGridLayout(),
						formContainers: [
							new sap.ui.layout.form.FormContainer({
								formElements: [
									new sap.ui.layout.form.FormElement({
										label: "{i18n>EditComprobacion.Documentos.Popup.Form.Label.1}",
										fields: [
											new sap.m.Input({
												value: "0000000000509",
												enabled: false
											})
										]
									}),
									new sap.ui.layout.form.FormElement({
										label: "{i18n>EditComprobacion.Documentos.Popup.Form.Label.2}",
										fields: [
											new sap.m.Input({
												value: "0001",
												enabled: false
											})
										]
									})
								]
							})
						]
					}),
					that.Table_Doc
					
				],
				beforeOpen: function(oEvt){

					if(oCtrl_Main_CG._oTPC_Core["idTableDoc"] == undefined){
						var oTableID = oCore.byId("idTableDoc");
			   			// Hidden/view Columns
			   			DemoPersoService.setMyPersData( oTableID );
			   			
			   			// init and activate controller
			   			oCtrl_Main_CG._oTPC_Core["idTableDoc"] = new TablePersoController({
							table: oTableID,
							//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
							componentName: "demoApp",
							persoService: DemoPersoService,
						}).activate();
					}
				},
				beforeClose: function(oEvt){
					oDialog.removeAllContent();
				},
				afterClose: function(oEvt){
					oDialog.destroy();
				}
			});
			oDialog.open();
		},
		
		f_PopUp_Ceco : function (pModo, pModel, pPath) { // C R U D
			var that = this;
			
			/******************/
			switch(pModo){
			case "C":
				oCore.byId("idILinea").setEnabled(true);
				oCore.byId("idICentroCoste").setEnabled(true);
				oCore.byId("idIDescripcion").setEnabled(true);
				oCore.byId("idIDistr").setEnabled(true);
				oCore.byId("idIImporte").setEnabled(true);
				break;
			case "U":
				oCore.byId("idILinea").setEnabled(false);
				oCore.byId("idICentroCoste").setEnabled(true);
				oCore.byId("idIDescripcion").setEnabled(false);
				oCore.byId("idIDistr").setEnabled(true);
				oCore.byId("idIImporte").setEnabled(false);
				break;
			}
			/******************/
			
			var oDialog = new sap.m.Dialog({
				contentWidth: "100%",
				customHeader: new sap.m.Bar({
					contentMiddle: new sap.m.Label({
						text: "{i18n>CeCo.Popup.title}"
					}),
					contentRight: new sap.m.Button({
						icon: "sap-icon://decline",
						press: function() {
							oDialog.close();
						}
					})
				}),
				content:[
					that._formFragments.EditCecos
				],
				buttons:[
					new sap.m.Button({
						text: (pModo == "C")? "{i18n>EditCecos.Button.1}" : "{i18n>EditCecos.Button.7}",
						press: function(oEvt){
							
							var oObject = oCore.getModel("mEditCecos").getProperty("/");
							
							if(pModel && pPath){ // UPDATE
								pModel.setProperty(pPath, oObject );
							}
							// CREATE
							else{
								var separadoSpath= sPath.split('/');
								var oColeccion = separadoSpath[1];
								pModel.getData()[ oColeccion ].push(oObject);
								pModel.refresh();
							}
							
							var _timeout;
							
							var oBusyDialog_c = new sap.m.BusyDialog({
								title	: oCnt_FHelps.f_readTranslate("Wait.title"),
							    text	: oCnt_FHelps.f_readTranslate("GuardandoComprobacion.text"),
								close : function(oEvt) {
									oDialog.close();
									jQuery.sap.clearDelayedCall(_timeout);
								}
							});
							
							// open dialog
							oBusyDialog_c.open();

							// simulate end of operation
							_timeout = jQuery.sap.delayedCall(1000, this, function () {
								oBusyDialog_c.close();
							});
						}
					}),
					new sap.m.Button({
						text: "{i18n>EditCecos.Button.2}",
						press: function(oEvt){
							oDialog.close();
						}
					})
				],
				beforeClose: function(oEvt){
					oDialog.removeAllContent();
				},
				afterClose: function(oEvt){
					oDialog.destroy();
				}
			});
			oDialog.open();
		}
		
	});

});