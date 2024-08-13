var oCtrl_FacturasWF;
var FacturasWF_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.FacturasWFPorAutorizar", {

		onInit : function() {
			oCtrl_FacturasWF = this;
   			oView = this.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.FacturasWFPorAutorizar");
			
			this.f_createAllFiltersPanel();
	        
			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("OrdnCompraXFacturar" === sRoute) {
	        		
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
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.OrdnCompraXFacturar');
		},
		
		f_createAllFiltersPanel: function(oEvt){
			//oC_Modulo_WiseMobile.f_createFilterPanel("REQUISICIONES", oCtrl_Requisiciones, "idPage", 4);
		},
		
		onAfterRendering: function(oEvt) {
			oCtrl_FacturasWF.oServ_FacturasWFXAutorizar();
			// LIMPIAR MONITOR DE BUSQUEDA (EN CASO LO HALLA)
			oCnt_FHelps.f_LimpiarMonitorBusq(this);
			if(FacturasWF_flag == true)
				return;
			
			FacturasWF_flag = true;
				
			var oTableID = oView.byId("idTableFacturasWF");
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
  			this._oTPC.openDialog();
		},
		
		onPressAprobar: function(oEvt){
			var oTable = oView.byId("idTableFacturasWF");
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
	   			//oObject.I_ACTION="A";
	   			this.f_PopUp_Aprobar(oObject);
        	}
		},
		
		
		f_PopUp_Aprobar: function(oObject) {
			var that = this;
			var title="";
//			if(oObject.I_ACTION=="A"){
				title="{i18n>FacturasWF.Popup.title}";
//			}else{
//				title="{i18n>FacturasWF.Popup.title.1}";
//			}
//			var aInputs = [
//				
//				new sap.m.TextArea({
//					  editable: true,
//					  wrapping: sap.ui.core.Wrapping.Soft
//					})
//			];
			
			var oDialog = new sap.m.Dialog({
				customHeader: new sap.m.Bar({
					contentMiddle: new sap.m.Label({
						text: title
					}),
					contentRight: new sap.m.Button({
						icon: "sap-icon://decline",
						press: function() {
							oDialog.close();
						}
					})
				}),
				
				content:[
					new sap.m.VBox({
						items:[
							new sap.ui.layout.form.SimpleForm({
								editable:true,
								layout:"ResponsiveGridLayout",
								labelSpanXL:3, labelSpanL:3, labelSpanM:3, labelSpanS:12,
								adjustLabelSpan:false,
								emptySpanXL:4, emptySpanL:4, emptySpanM:4, emptySpanS:0,
								columnsXL:1, columnsL:1, columnsM:1,
								singleContainerFullSize:false,
								content:[
									new sap.m.Label({ text : "{i18n>FacturasWF.Popup.Form.1}" }),
									aInputs[0],
								]
							})
						]
					})
				],
				beforeClose: function(oEvt){
					oDialog.removeAllContent();
				},
				afterClose:function(){
					oDialog.destroy();
				},
				buttons:[
					new sap.m.Button({
						text: "{i18n>FacturasWF.Popup.Form.Button.1}",
						press:function(){
//							oObject.I_RTEXT=aInputs[0].getValue();
//							oObject.I_USER=oUsuario_login;
							
							function oFunction(oData){
								oDialog.close();
								sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
					            sap.ui.getCore().getModel("mMessages").refresh();
					            
					            var oObjeto=sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:Zw18FmWsApproveInvResponse/ImReturn/item");
					            oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.MESSAGE, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
					            oCtrl_FacturasWF.oServ_FacturasWFXAutorizar();
								 
							}
							oCtrl_FacturasWF.oServ_AprobarFacturaWF(oObject,oFunction);
							
						}
					})
				]
			});
			
			oDialog.open();
		},
		
		onPressRechazar: function(oEvt) {
			var oTable = oView.byId("idTableFacturasWF");
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
	   			//oObject.I_ACTION="R";
				this.f_PopUp_Rechazar(oObject);
        	}
		},
		
		f_PopUp_Rechazar: function(oObject) {
			var that = this;
			var title="";
//			if(oObject.I_ACTION=="A"){
//				title="{i18n>FacturasWF.Popup.title}";
//			}else{
				title="{i18n>FacturasWF.Popup.title.1}";
//			}
			var aInputs = [
				
				new sap.m.TextArea({
					  editable: true,
					  wrapping: sap.ui.core.Wrapping.Soft
					})
			];
			
			var oDialog = new sap.m.Dialog({
				customHeader: new sap.m.Bar({
					contentMiddle: new sap.m.Label({
						text: title
					}),
					contentRight: new sap.m.Button({
						icon: "sap-icon://decline",
						press: function() {
							oDialog.close();
						}
					})
				}),
				
				content:[
					new sap.m.VBox({
						items:[
							new sap.ui.layout.form.SimpleForm({
								editable:true,
								layout:"ResponsiveGridLayout",
								labelSpanXL:3, labelSpanL:3, labelSpanM:3, labelSpanS:12,
								adjustLabelSpan:false,
								emptySpanXL:4, emptySpanL:4, emptySpanM:4, emptySpanS:0,
								columnsXL:1, columnsL:1, columnsM:1,
								singleContainerFullSize:false,
								content:[
									new sap.m.Label({ text : "{i18n>FacturasWF.Popup.Form.1}" }),
									aInputs[0],
								]
							})
						]
					})
				],
				beforeClose: function(oEvt){
					oDialog.removeAllContent();
				},
				afterClose:function(){
					oDialog.destroy();
				},
				buttons:[
					new sap.m.Button({
						text: "{i18n>FacturasWF.Popup.Form.Button.1}",
						press:function(){
							oObject.TextReject=aInputs[0].getValue();
//							oObject.I_USER=oUsuario_login;
							
							function oFunction(oData){
								oDialog.close();
								sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
					            sap.ui.getCore().getModel("mMessages").refresh();
					            
					            var oObjeto=sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:Zw18FmWsRejectInvResponse/ImReturn/item");
					            oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.MESSAGE, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
					            oCtrl_FacturasWF.oServ_FacturasWFXAutorizar();
								 
							}
							oCtrl_FacturasWF.oServ_RechazarFacturaWF(oObject,oFunction);
							
						}
					})
				]
			});
			
			oDialog.open();
		},
		
		onPressDistribuirCecos: function(oEvt) {
			var that = this;
			
			var oTable = oView.byId("idTableFacturasWF");
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
	   		if(that.Table_DistribuirCecos == undefined)
	   			that.Table_DistribuirCecos =new sap.m.Table("idTableDistribuirCecos", {
	   				mode: "MultiSelect",
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
								text : "{i18n>FacturasWF.DistribuirCecos.Popup.Table.Toolbar.Button.1}",
								press: function(oEvt){
									
									var oTable = oEvt.getSource().getParent().getParent();
								    var length = oTable.getSelectedItems().length;
								   
								    if(length!=1){
								    	var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
										oCnt_FHelps.f_showMessage("WARNING", oText);
									}
						        	else{
						        		var idx = oTable.indexOfItem(oTable.getSelectedItem()); // getSelectedItems
						        		var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
							   			var oModel = oCore.getModel( oNameModel );
							   			var oPath = oTable.getBindingInfo("items").path;
							   			
							   			var oObject = oModel.getProperty(oPath+"/"+ idx);
							   			oCore.getModel("mDocumento").setProperty("/", oObject);
							   			/*
							   			 * AQUI VIENE
							   			 */
							   			oCtrl_FacturasWF.f_PopUp_AgregarCeco(oObject);
						        	}
								}
							}),
							new sap.m.Button({
								text : "{i18n>FacturasWF.DistribuirCecos.Popup.Table.Toolbar.Button.2}",
								press: function(oEvt){
									
									var oTable = oEvt.getSource().getParent().getParent();
								    var length = oTable.getSelectedItems().length;
								   
								    if(length!=1){
								    	var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
										oCnt_FHelps.f_showMessage("WARNING", oText);
									}
						        	else{
						        		var idx = oTable.indexOfItem(oTable.getSelectedItem()); // getSelectedItems
						        		var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
							   			var oModel = oCore.getModel( oNameModel );
							   			var oPath = oTable.getBindingInfo("items").path;
							   			
							   			var oObject = oModel.getProperty(oPath+"/"+ idx);
							   			oCore.getModel("mDocumento").setProperty("/", oObject);
							   			/*
							   			 * AQUI VIENE
							   			 */
							   			oCtrl_FacturasWF.f_PopUp_EditarCeco(oObject);
						        	}
								}
							}),
							new sap.m.Button({
								text : "{i18n>FacturasWF.DistribuirCecos.Popup.Table.Toolbar.Button.3}",
								press: function(oEvt){
									
									var oTable = oEvt.getSource().getParent().getParent();
								    var length = oTable.getSelectedItems().length;
								   
								    if(length!=1){
								    	var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
										oCnt_FHelps.f_showMessage("WARNING", oText);
									}
						        	else{
						        		var idx = oTable.indexOfItem(oTable.getSelectedItem()); // getSelectedItems
						        		var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
							   			var oModel = oCore.getModel( oNameModel );
							   			var oPath = oTable.getBindingInfo("items").path;
							   			
							   			var oObject = oModel.getProperty(oPath+"/"+ idx);
							   			oCore.getModel("mDocumento").setProperty("/", oObject);
							   			/*
							   			 * AQUI VIENE
							   			 */
							   			oCtrl_FacturasWF.f_PopUp_BorrarCeco(oObject);
						        	}
								}
							}),
							new sap.m.Button({
								text : "{i18n>FacturasWF.DistribuirCecos.Popup.Table.Toolbar.Button.4}",
								press: function(oEvt){
									
									var oTable = oEvt.getSource().getParent().getParent();
								    var length = oTable.getSelectedItems().length;
								   
								    if(length!=1){
								    	var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
										oCnt_FHelps.f_showMessage("WARNING", oText);
									}
						        	else{
						        		var idx = oTable.indexOfItem(oTable.getSelectedItem()); // getSelectedItems
						        		var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
							   			var oModel = oCore.getModel( oNameModel );
							   			var oPath = oTable.getBindingInfo("items").path;
							   			
							   			var oObject = oModel.getProperty(oPath+"/"+ idx);
							   			oCore.getModel("mDocumento").setProperty("/", oObject);
							   			/*
							   			 * AQUI VIENE
							   			 */
							   			oCtrl_FacturasWF.f_PorcentajesIguales(oObject);
						        	}
								}
							}),
							new sap.m.Button({
								icon: "sap-icon://table-column",
								press: function(oEvt){
									var oTable = oEvt.getSource().getParent().getParent();
									oCtrl_Main_P2P.onPersoPress(oEvt, oTable);
								}
							})
						]
					}),
					columns :  [
						new sap.m.Column("idCol154",{
							header : new sap.m.Label({
								text : "{i18n>FacturasWF.DistribuirCecos.Popup.Table.Column.1}"
							})
						}),
						new sap.m.Column("idCol155",{
							header : new sap.m.Label({
								text : "{i18n>FacturasWF.DistribuirCecos.Popup.Table.Column.2}"
							})
						}),
						new sap.m.Column("idCol156",{
							hAlign: "Center",
							minScreenWidth: "Tablet",
							demandPopin: true,
							header : new sap.m.Label({
								text : "{i18n>FacturasWF.DistribuirCecos.Popup.Table.Column.3}"
							})
						}),
						new sap.m.Column("idCol157",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							header : new sap.m.Label({
								text : "{i18n>FacturasWF.DistribuirCecos.Popup.Table.Column.4}"
							})
						}),
						new sap.m.Column("idCol158",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							hAlign: "Center",
							header : new sap.m.Label({
								text : "{i18n>FacturasWF.DistribuirCecos.Popup.Table.Column.5}"
							})
						}),
						new sap.m.Column("idCol159",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							header : new sap.m.Label({
								text : "{i18n>FacturasWF.DistribuirCecos.Popup.Table.Column.6}"
							})
						}),
						new sap.m.Column("idCol160",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							hAlign: "Center",
							header : new sap.m.Label({
								text : "{i18n>FacturasWF.DistribuirCecos.Popup.Table.Column.7}"
							})
						})
					]
				}).bindItems({
					path: "mTables>/DIST_CECOS",
					template : 
						new sap.m.ColumnListItem({
							vAlign: "Middle",
							detailPress: function() {
								setTimeout(function() {
									sap.m.MessageToast.show("detail is pressed");
								}, 10);
							},
							cells : [
								new sap.m.Text({ text : "{mTables>Item}" }),
								new sap.m.Text({ text : "{Cuenta_GL}" }),
								new sap.m.Text({ text : "{mTables>Descripcion_GL}" }),
								new sap.m.Text({ text : "{mTables>Centro_Costo}" }),
								new sap.m.Text({ text : "{mTables>Descripcion_Ceco}" }),
								new sap.m.Text({ text : "{mTables>Distribucion}" }),
								new sap.m.Text({ text : "{mTables>Importe}" })
							]
						})
				});
	   			
		   		var oDialog = new sap.m.Dialog({
					contentWidth: "100%",
					customHeader: new sap.m.Bar({
						contentMiddle: new sap.m.Label({
							text: "{i18n>FacturasWF.DistribuirCecos.Popup.title}"
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
											label: "{i18n>FacturasWF.DistribuirCecos.Popup.Form.Label.1}",
											fields: [
												new sap.m.Input({value:"{mDocumento>/Bukrs}",enabled:false})
											]
										}),
										new sap.ui.layout.form.FormElement({
											label: "{i18n>FacturasWF.DistribuirCecos.Popup.Form.Label.2}",
											fields: [
												new sap.m.Input({value:"{mDocumento>/Belnr}",enabled:false})
											]
										}),
										new sap.ui.layout.form.FormElement({
											label: "{i18n>FacturasWF.DistribuirCecos.Popup.Form.Label.3}",
											fields: [
												new sap.m.Input({value:"{mDocumento>/Gjahr}",enabled:false})
											]
										}),
										new sap.ui.layout.form.FormElement({
											label: "{i18n>FacturasWF.DistribuirCecos.Popup.Form.Label.4}",
											fields: [
												new sap.m.Input({value:"{mDocumento>/Paymeans}",enabled:false})
											]
										}),
										new sap.ui.layout.form.FormElement({
											label: "{i18n>FacturasWF.DistribuirCecos.Popup.Form.Label.5}",
											fields: [
												new sap.m.Input({value:"{mDocumento>/Payamtdoc}",enabled:false})
											]
										}),
										new sap.ui.layout.form.FormElement({
											 //label: "{i18n>Filters.tipo_recepcion}",
											 label: new sap.m.Label({
												 text : "{i18n>Filters.tipo_distribucion}",
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
										})
									]
								})
							]
						}),
						that.Table_DistribuirCecos
					],
					buttons:[
						new sap.m.Button({
							text: "{i18n>Popup.Button.Cancelar}",
							press: function(oEvt){
								oDialog.close();
							}
						})
					],
					beforeOpen: function(oEvt){

						if(oCtrl_Main_P2P._oTPC_Core["idTableDistribuirCecos"] == undefined){
							var oTableID = oCore.byId("idTableDistribuirCecos");
				   			// Hidden/view Columns
				   			DemoPersoService.setMyPersData( oTableID );
				   			
				   			// init and activate controller
				   			oCtrl_Main_P2P._oTPC_Core["idTableDistribuirCecos"] = new TablePersoController({
								table: oTableID,
								//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
								componentName: "demoApp",
								persoService: DemoPersoService,
							}).activate();
						}
					},
					beforeClose: function(oEvt){
						oCore.getModel( oNameModel ).setProperty("/DIST_CECOS",  [ oObject ] );
						oDialog.removeAllContent();
					},
					afterClose: function(oEvt){
						oDialog.destroy();
					}
				});
				oDialog.open();
        	}
		},
		
		onDetallePdf: function(oEvt) {
			var that = this;
			
		if(that.Table_Pdf == undefined)
		   	that.Table_Pdf =new sap.m.Table("idTablePdf",{
				mode: "None",
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
								oCtrl_Main_P2P.onPersoPress(oEvt, oTable);
							}
						})
					]
				}),
				columns :  [
					new sap.m.Column("idCol141",{
						header : new sap.m.Label({
							text : "{i18n>OrdenesCompra.DetallePdf.Popup.Table.Column.1}"
						})
					}),
					new sap.m.Column("idCol142",{
						header : new sap.m.Label({
							text : "{i18n>OrdenesCompra.DetallePdf.Popup.Table.Column.2}"
						})
					}),
					new sap.m.Column("idCol143",{
						hAlign: "Center",
						minScreenWidth: "Tablet",
						demandPopin: true,
						header : new sap.m.Label({
							text : "{i18n>OrdenesCompra.DetallePdf.Popup.Table.Column.3}"
						})
					})
				]
			}).bindItems({
				path: "mTables>/DET_PDF",
				template : 
					new sap.m.ColumnListItem({
						vAlign: "Middle",
						detailPress: function() {
							setTimeout(function() {
								sap.m.MessageToast.show("detail is pressed");
							}, 10);
						},
						cells : [
							new sap.m.Text({ text : "{mTables>OrdenCompra}" }),
							new sap.m.Text({ text : "{mTables>Nombre_Archivo}" }),
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
						text: "{i18n>OrdenesCompra.Detalle.Popup.title.1}"
					}),
					contentRight: new sap.m.Button({
						icon: "sap-icon://decline",
						press: function() {
							oDialog.close();
						}
					})
				}),
				content:[
					that.Table_Pdf
				],
				buttons:[
					new sap.m.Button({
						text: "{i18n>Popup.Button.Cancelar}",
						press: function(oEvt){
							oDialog.close();
						}
					})
				],
				beforeOpen: function(oEvt){

					if(oCtrl_Main_P2P._oTPC_Core["idTablePdf"] == undefined){
						var oTableID = oCore.byId("idTablePdf");
			   			// Hidden/view Columns
			   			DemoPersoService.setMyPersData( oTableID );
			   			
			   			// init and activate controller
			   			oCtrl_Main_P2P._oTPC_Core["idTablePdf"] = new TablePersoController({
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
		
		f_PopUp_AgregarCeco: function(oObject) {

		},
		
		f_PopUp_EditarCeco: function(oObject) {

		},
		
		f_PopUp_BorrarCeco: function(oObject) {

		},
		
		f_PorcentajesIguales: function(oObject) {

		},

		onPressOpciones: function(oEvt){
			var that = this;
			var oButton = oEvt.getSource();
			
			if(this._actsheet == undefined)
				this._actsheet = new sap.m.ActionSheet({
					placement:"Auto",
					buttons:[
							new sap.m.Button({
								text: "{i18n>FacturasWF.Monitor.Aprobar.Button}",
								press: function(oEvt){
									that.onPressAprobar(oEvt);
								}
							}),
							new sap.m.Button({
								text: "{i18n>FacturasWF.Monitor.Rechazar.Button}",
								press: function(oEvt){
									that.onPressRechazar(oEvt);
								}
							}),
							new sap.m.Button({
								text: "{i18n>FacturasWF.Monitor.DistribuirCecos.Button}",
								press: function(oEvt){
									that.onPressDistribuirCecos(oEvt);
								}
							})
					]
				});

			this._actsheet.openBy(oButton);
		},
		
		oServ_FacturasWFXAutorizar : function() {
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:_-WI18_-FM_WS_INVOILIST_FOR_USER>';
				soapMessage=soapMessage+'<EX_USERNAME>DCOINDREAUG</EX_USERNAME>';
				soapMessage=soapMessage+'</urn:_-WI18_-FM_WS_INVOILIST_FOR_USER>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';
		     
			oBusyDialog.open();
			//Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZW18_2,
	            type: "POST",
	            cache: false,
	            data: soapMessage,
	            contentType: "application/soap+xml; charset=utf-8",
	            headers:{
	            	"Authorization": "Basic " + btoa( oUsuario+":"+oPassword),
	            	"accept-language": oLenguaje
	            },
	            success: OnSuccess,
	            error: OnError
	        });
	        
	        function OnSuccess(data, status)
	        {
	        	var json=xml2json(data);	   
	        	var mModel=sap.ui.getCore().getModel("mTablesFacturasWF");
	            
	            mModel.setData(json);//revisar datos
	            mModel.refresh();
	            
	            var Type=mModel.getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-FM_WS_INVOILIST_FOR_USER.Response/ET_RETURN").item.Type;
	            var Message=mModel.getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-FM_WS_INVOILIST_FOR_USER.Response/ET_RETURN").item.Message;
	            
	            var mData=mModel.getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-FM_WS_INVOILIST_FOR_USER.Response/IM_INCINV_LIST/item");
	            
	            if(Type=="S"){
	            	var length=mData.length;
		            
		            if(length==undefined){    	
		            	mModel.setData({FACTURASWF:[mData]});//revisar datos		            	
		            	oCtrl_FacturasWF.byId("idCountTableCotizaciones").setText("(1)");
		            }else{
		            	mModel.setData({FACTURASWF:mData});//revisar datos		            	
		            	oCtrl_FacturasWF.byId("idCountTableCotizaciones").setText("("+length+")");
		            }
		            
		            
		            
		            
	            }else{
	            	oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
	            	oCtrl_FacturasWF.byId("idCountTableCotizaciones").setText("(0)");
	            }
	            
	            oBusyDialog.close();
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	        }
		},
		
		
		oServ_AprobarFacturaWF : function(oObject,callback) {
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:_-WI18_-FM_WS_APPROVE_INV>';
				soapMessage=soapMessage+'<EX_INV_APRROVE_IN>';
				soapMessage=soapMessage+'<USERWEB>'+oObject.Username+'</USERWEB>';
				soapMessage=soapMessage+'<WI_ID>'+oObject.WiId+'</WI_ID>';
				soapMessage=soapMessage+'<INV_DOC_NO>'+oObject.InvDocNo+'</INV_DOC_NO>';
				soapMessage=soapMessage+'<FISC_YEAR>'+oObject.FiscYear+'</FISC_YEAR>';
				soapMessage=soapMessage+'</EX_INV_APRROVE_IN>';
				soapMessage=soapMessage+'</urn:_-WI18_-FM_WS_APPROVE_INV>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';
				
				oBusyDialog_d.setText(oCnt_FHelps.f_readTranslate("EnviandoSolicitud.text"));
				oBusyDialog_d.open();
	     
	        //Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZW18_2,
	            type: "POST",
	            cache: false,
	            data: soapMessage,
	            contentType: "application/soap+xml; charset=utf-8",
	            headers:{
	            	"Authorization": "Basic " + btoa( oUsuario+":"+oPassword),
	            	"accept-language": oLenguaje
	            },
	            success: OnSuccess,
	            error: OnError
	        });
	        
	        function OnSuccess(data, status)
	        {
	        	var json=xml2json(data);
	            oBusyDialog_d.close();
	        	callback(json);
	        	
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	            oBusyDialog_d.close();
	        }
		},
		
		
		oServ_RechazarFacturaWF : function(oObject,callback) {
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:_-WI18_-FM_WS_REJECT_INV>';
				soapMessage=soapMessage+'<EX_INV_REJECT_IN>';
				soapMessage=soapMessage+'<USERWEB>'+oObject.Username+'</USERWEB>';
				soapMessage=soapMessage+'<WI_ID>'+oObject.WiId+'</WI_ID>';
				soapMessage=soapMessage+'<INV_DOC_NO>'+oObject.InvDocNo+'</INV_DOC_NO>';
				soapMessage=soapMessage+'<FISC_YEAR>'+oObject.FiscYear+'</FISC_YEAR>';
				soapMessage=soapMessage+'<TEXT_REJECT>'+oObject.FiscYear+'</TEXT_REJECT>';
				soapMessage=soapMessage+'</EX_INV_REJECT_IN>';
				soapMessage=soapMessage+'</urn:_-WI18_-FM_WS_REJECT_INV>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';
				
				oBusyDialog_d.setText(oCnt_FHelps.f_readTranslate("EnviandoSolicitud.text"));
				oBusyDialog_d.open();
	     
	        //Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZW18_2,
	            type: "POST",
	            cache: false,
	            data: soapMessage,
	            contentType: "application/soap+xml; charset=utf-8",
	            headers:{
	            	"Authorization": "Basic " + btoa( oUsuario+":"+oPassword),
	            	"accept-language": oLenguaje
	            },
	            success: OnSuccess,
	            error: OnError
	        });
	        
	        function OnSuccess(data, status)
	        {
	        	var json=xml2json(data);
	            oBusyDialog_d.close();
	        	callback(json);
	        	
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	            oBusyDialog_d.close();
	        }
		}
		
	});

});