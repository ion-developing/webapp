var oCtrl_OrdenesCompra;
var OrdenesCompra_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController",'sap/m/MessageToast'], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController,MessageToast) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.OrdenesCompraPorAutorizar", {

		onInit : function() {
			oCtrl_OrdenesCompra = this;
   			oView = this.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.OrdenesCompraPorAutorizar");
			
			this.f_createAllFiltersPanel();
	        
			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("OrdenesdeCompraporAutorizar" === sRoute) {
	        		
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
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.OrdenesCompraPorAutorizar');
		},
		
		f_createAllFiltersPanel: function(oEvt){
			oC_Modulo_WiseMobile.f_createFilterPanel("ORDENESDECOMPRAPORAUTORIZAR", oCtrl_OrdenesCompra, "idPage", 1);
		},
		
		onAfterRendering: function(oEvt) {
			//oCtrl_OrdenesCompra.oServ_OrdenesCompraXAutorizar();
			//oCnt_FHelps.f_LimpiarMonitorBusq(this);
			if(OrdenesCompra_flag == true)
				return;
			
			OrdenesCompra_flag = true;
				
			var oTableID = oView.byId("idTableOrdenesCompra");
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
			var oTable = oView.byId("idTableOrdenesCompra");
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
	   			oObject.I_ACTION="A";
				this.f_PopUp_AprobarRechazar(oObject);
        	}
		},
		
		
		f_PopUp_AprobarRechazar: function(oObject) {
			var that = this;
			var title="";
			if(oObject.I_ACTION=="A"){
				title="{i18n>Requisiciones.Popup.title}";
			}else{
				title="{i18n>Requisiciones.Popup.title.1}";
			}
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
									new sap.m.Label({ text : "{i18n>Requisiciones.Popup.Form.1}" }),
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
						text: "{i18n>Requisiciones.Popup.Form.Button.1}",
						press:function(){
							oObject.I_RTEXT=aInputs[0].getValue();
							oObject.I_USER=oUsuario_login;
							
							function oFunction(oData){
								oDialog.close();
								sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
					            sap.ui.getCore().getModel("mMessages").refresh();
					            
					            var oObjeto=sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:ZMM_FM_AUTHORIZE_POResponse/E_RETURN/item");
					            
					            function oFunction1(oData){
					            	setTimeout(function() {
					            		//oCtrl_OrdenesCompra.oServ_OrdenesCompraXAutorizar();
									}, 500);
					            	
					            }
					            oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.MESSAGE, oFunction1, oCnt_FHelps.f_readTranslate("Mensaje.title") );
					            
								 
							}
							oCtrl_OrdenesCompra.oServ_AprobarRechazarOC(oObject,oFunction);
							
						}
					})
				]
			});
			
			oDialog.open();
		},
		
		onPressRechazar: function(oEvt) {
			var oTable = oView.byId("idTableOrdenesCompra");
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
	   			oObject.I_ACTION="R";
				this.f_PopUp_AprobarRechazar(oObject);
        	}
		},
		
		onPressDetalle: function(oEvt) {
			var that = this;
			
			var oTable = oView.byId("idTableOrdenesCompra");
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
	   		if(that.Table_DetalleOrdenesCompra == undefined)
	   			that.Table_DetalleOrdenesCompra =new sap.m.Table("idTableDetalleOrdenesCompra", {
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
						new sap.m.Column("idCol121",{
							header : new sap.m.Label({
								text : "{i18n>OrdenesCompra.Detalle.Popup.Table.Column.1}"
							})
						}),
						new sap.m.Column("idCol122",{
							header : new sap.m.Label({
								text : "{i18n>OrdenesCompra.Detalle.Popup.Table.Column.2}"
							})
						}),
						new sap.m.Column("idCol123",{
							hAlign: "Center",
							minScreenWidth: "Tablet",
							demandPopin: true,
							header : new sap.m.Label({
								text : "{i18n>OrdenesCompra.Detalle.Popup.Table.Column.3}"
							})
						}),
						new sap.m.Column("idCol124",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							header : new sap.m.Label({
								text : "{i18n>OrdenesCompra.Detalle.Popup.Table.Column.4}"
							})
						}),
						new sap.m.Column("idCol125",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							hAlign: "Center",
							header : new sap.m.Label({
								text : "{i18n>OrdenesCompra.Detalle.Popup.Table.Column.5}"
							})
						}),
						new sap.m.Column("idCol126",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							header : new sap.m.Label({
								text : "{i18n>OrdenesCompra.Detalle.Popup.Table.Column.6}"
							})
						}),
						new sap.m.Column("idCol127",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							hAlign: "Center",
							header : new sap.m.Label({
								text : "{i18n>OrdenesCompra.Detalle.Popup.Table.Column.7}"
							})
						}),
						new sap.m.Column("idCol128",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							header : new sap.m.Label({
								text : "{i18n>OrdenesCompra.Detalle.Popup.Table.Column.8}"
							})
						}),
						new sap.m.Column("idCol129",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							hAlign: "Center",
							header : new sap.m.Label({
								text : "{i18n>OrdenesCompra.Detalle.Popup.Table.Column.9}"
							})
						}),
						new sap.m.Column("idCol130",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							header : new sap.m.Label({
								text : "{i18n>OrdenesCompra.Detalle.Popup.Table.Column.10}"
							})
						}),
						new sap.m.Column("idCol131",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							hAlign: "Center",
							header : new sap.m.Label({
								text : "{i18n>OrdenesCompra.Detalle.Popup.Table.Column.11}"
							})
						}),
						new sap.m.Column("idCol132",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							header : new sap.m.Label({
								text : "{i18n>OrdenesCompra.Detalle.Popup.Table.Column.12}"
							})
						})
					]
				}).bindItems({
					path: "mTablesDetalleOC>/DETALLEOC",
					template : 
						new sap.m.ColumnListItem({
							vAlign: "Middle",
							detailPress: function() {
								setTimeout(function() {
									sap.m.MessageToast.show("detail is pressed");
								}, 10);
							},
							cells : [
								new sap.m.Text({ text : "{mTablesDetalleOC>EBELN}" }),
								new sap.m.Text({ text : "{mTablesDetalleOC>MATNR}" }),
								new sap.m.Text({ text : "{mTablesDetalleOC>SHORT_TEXT}" }),
								new sap.m.Text({ text : "{mTablesDetalleOC>MENGE}" }),
								new sap.m.Text({ text : "{mTablesDetalleOC>MEINS}" }),
								new sap.m.Text({ text : "{mTablesDetalleOC>NETWR}" }),
								new sap.m.Text({ text : "{mTablesDetalleOC>WAERS}" }),
								new sap.m.Text({ text : "{mTablesDetalleOC>SLFDT}" }),
								new sap.m.Text({ text : "{mTablesDetalleOC>SAKNR}" }),
								new sap.m.Text({ text : "{mTablesDetalleOC>KOSTL}" }),
								new sap.m.Text({ text : "{mTablesDetalleOC>AUFNR}" }),
								new sap.m.Text({ text : "{mTablesDetalleOC>ASSNR}" })
							]
						})
				});
	   			
		   		var oDialog = new sap.m.Dialog({
					contentWidth: "100%",
					customHeader: new sap.m.Bar({
						contentMiddle: new sap.m.Label({
							text: "{i18n>OrdenesCompra.Detalle.Popup.title}"
						}),
						contentRight: new sap.m.Button({
							icon: "sap-icon://decline",
							press: function() {
								oDialog.close();
							}
						})
					}),
					content:[
						that.Table_DetalleOrdenesCompra
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

						if(oCtrl_Main_P2P._oTPC_Core["idTableDetalleOrdenesCompra"] == undefined){
							var oTableID = oCore.byId("idTableDetalleOrdenesCompra");
				   			// Hidden/view Columns
				   			DemoPersoService.setMyPersData( oTableID );
				   			
				   			// init and activate controller
				   			oCtrl_Main_P2P._oTPC_Core["idTableDetalleOrdenesCompra"] = new TablePersoController({
								table: oTableID,
								//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
								componentName: "demoApp",
								persoService: DemoPersoService,
							}).activate();
						}
					},
					beforeClose: function(oEvt){
						oCore.getModel( oNameModel ).setProperty("/DET_COMPRAS",  [ oObject ] );
						oDialog.removeAllContent();
					},
					afterClose: function(oEvt){
						oDialog.destroy();
					}
				});
		   		var mModel=sap.ui.getCore().getModel("mTablesDetalleOC");
				mModel.setData({});
				oDialog.open();
				oCtrl_OrdenesCompra.oServ_Detalle(oObject);				
        	}
		},
		
		/*onDetallePdf: function(oEvt) {
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
		},*/
		
		onDetalleAdjunto: function(oEvt) {
			var that = this;
			var sPath=oEvt.oSource.oPropagatedProperties.oBindingContexts.mTablesOrdenesCompra.sPath;
			var oObject=sap.ui.getCore().getModel("mTablesOrdenesCompra").getProperty(sPath);
						
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
							text : "{i18n>OrdenesCompra.DetallePdf.Popup.Table.Column.4}"
						})
					})
				]
			}).bindItems({
				path: "mTablesAdjunto>/DETALLE_ADJUNTO",
				template : 
					new sap.m.ColumnListItem({
						vAlign: "Middle",
						detailPress: function() {
							setTimeout(function() {
								sap.m.MessageToast.show("detail is pressed");
							}, 10);
						},
						cells : [
							new sap.m.Text({ text : "{mTablesAdjunto>OBJKEY}" }),
							new sap.m.Text({ text : "{mTablesAdjunto>DESCRIPT}" }),
							new sap.m.Image({
								src : "./wisemobile/Public/Img/pdf.png",
								decorative: false,
								press: function(oEvt) {
									var sPath=oEvt.oSource.oPropagatedProperties.oBindingContexts.mTablesAdjunto.sPath;
									var oObject=sap.ui.getCore().getModel("mTablesAdjunto").getProperty(sPath);
									oCtrl_OrdenesCompra.onDownload(oObject);
								}
							})
						]
					})
			});
			
			var oDialog = new sap.m.Dialog({
				customHeader: new sap.m.Bar({
					contentMiddle: new sap.m.Label({
						text: "{i18n>OrdenesCompra.Detalle.Popup.title.2}"
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
			var mModel=sap.ui.getCore().getModel("mTablesAdjunto");
			mModel.setData({});
			oDialog.open();
			oCtrl_OrdenesCompra.oServ_VisulizarAdjuntos(oObject);
		},
		
		
		onDetalleOC: function(oEvt) {
			var that = this;
			var sPath=oEvt.oSource.oPropagatedProperties.oBindingContexts.mTablesOrdenesCompra.sPath;
			var oObject=sap.ui.getCore().getModel("mTablesOrdenesCompra").getProperty(sPath);
						
			if(that.Table_Pdf1 == undefined)
		   		that.Table_Pdf1 =new sap.m.Table("idTablePdf1",{
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
					new sap.m.Column("idCol144",{
						header : new sap.m.Label({
							text : "{i18n>OrdenesCompra.DetallePdf.Popup.Table.Column.1}"
						})
					}),
					new sap.m.Column("idCol145",{
						header : new sap.m.Label({
							text : "{i18n>OrdenesCompra.DetallePdf.Popup.Table.Column.2}"
						})
					}),
					new sap.m.Column("idCol146",{
						hAlign: "Center",
						minScreenWidth: "Tablet",
						demandPopin: true,
						header : new sap.m.Label({
							text : "{i18n>OrdenesCompra.DetallePdf.Popup.Table.Column.3}"
						})
					})
				]
			}).bindItems({
				path: "mTablesOC>/DETALLE_OC",
				template : 
					new sap.m.ColumnListItem({
						vAlign: "Middle",
						detailPress: function() {
							setTimeout(function() {
								sap.m.MessageToast.show("detail is pressed");
							}, 10);
						},
						cells : [
							new sap.m.Text({ text : "{mTablesOC>OBJKEY}" }),
							new sap.m.Text({ text : "{mTablesOC>DESCRIPT}" }),
							new sap.m.Image({
								src : "./wisemobile/Public/Img/pdf.png",
								decorative: false,
								press: function(oEvt) {
									var sPath=oEvt.oSource.oPropagatedProperties.oBindingContexts.mTablesOC.sPath;
									var oObject=sap.ui.getCore().getModel("mTablesOC").getProperty(sPath);
									oCtrl_OrdenesCompra.onDownload(oObject);
								}
							})
						]
					})
			});
			
			var oDialog = new sap.m.Dialog({
				customHeader: new sap.m.Bar({
					contentMiddle: new sap.m.Label({
						text: "{i18n>OrdenesCompra.Detalle.Popup.title.4}"
					}),
					contentRight: new sap.m.Button({
						icon: "sap-icon://decline",
						press: function() {
							oDialog.close();
						}
					})
				}),
				content:[
					that.Table_Pdf1
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
			var mModel=sap.ui.getCore().getModel("mTablesOC");
			mModel.setData({});
			oDialog.open();
			oCtrl_OrdenesCompra.oServ_VisulizarOC(oObject);
		},
		
		onDetalleTabla: function(oEvt) {
			var that = this;
			var sPath=oEvt.oSource.oPropagatedProperties.oBindingContexts.mTablesOrdenesCompra.sPath;
			var oObject=sap.ui.getCore().getModel("mTablesOrdenesCompra").getProperty(sPath);
			
			/*var html1 = new sap.ui.core.HTML({
				content:"<html dir='ltr'><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'><title>Report output</title><style>table.list { border-collapse: collapse; }</style> </head> <!script!> <body bgcolor='#E8EAD8'> <blockquote> <p align=left><font size=+2><b> </b></font></p> <p align=left> <font style='font-family:monospaced'> <table class='list' border=1 cellspacing=0 cellpadding=1 rules=groups borderColor=black ><colgroup><colgroup><colgroup><colgroup><colgroup> <tbody><tr><td style= background:#9accee ><font face='courier new' size='2'><nobr id=l0002003>Material&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#5dcbfd ><font face='courier new' size='2'><nobr id=l0002026>Quot.:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#aee5fb ><font face='courier new' size='2'><nobr id=l0002039>6000022118&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#aee5fb ><font face='courier new' size='2'><nobr id=l0002057>6000022120&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#aee5fb ><font face='courier new' size='2'><nobr id=l0002075>6000022119&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> </tr> <tr><td style= background:#9accee ><font face='courier new' size='2'><nobr id=l0003003>Sh.&nbsp;Text&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#5dcbfd ><font face='courier new' size='2'><nobr id=l0003026>Bidder:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#aee5fb ><font face='courier new' size='2'><nobr id=l0003039>6500002460&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#aee5fb ><font face='courier new' size='2'><nobr id=l0003057>6500000662&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#aee5fb ><font face='courier new' size='2'><nobr id=l0003075>6500000832&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> </tr> <tr><td style= background:#9accee ><font face='courier new' size='2'><nobr id=l0004003>Qty.&nbsp;in&nbsp;Base&nbsp;Unit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#5dcbfd ><font face='courier new' size='2'><nobr id=l0004026>Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#aee5fb ><font face='courier new' size='2'><nobr id=l0004039>INDUSTRIAS&nbsp;LICONT</nobr></font></td> <td style= background:#aee5fb ><font face='courier new' size='2'><nobr id=l0004057>Industrias&nbsp;Herrvi</nobr></font></td> <td style= background:#aee5fb ><font face='courier new' size='2'><nobr id=l0004075>TECNICA&nbsp;INDUSTRIA</nobr></font></td> </tr> <tbody><tr><td style= background:#aacfcf ><font face='courier new' size='2'><nobr id=l0006003>7122489&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#aacfcf ><font face='courier new' size='2'><nobr id=l0006026>Val.:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#eef9ff ><font face='courier new' size='2'><nobr id=l0006039>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;58,900.00&nbsp;</nobr></font></td> <td style= background:#eef9ff ><font face='courier new' size='2'><nobr id=l0006057>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;165,900.00&nbsp;</nobr></font></td> <td style= background:#eef9ff ><font face='courier new' size='2'><nobr id=l0006075>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;296,695.00&nbsp;</nobr></font></td> </tr> <tr><td style= background:#aacfcf ><font face='courier new' size='2'><nobr id=l0007003>Fabricacion&nbsp;de&nbsp;brida&nbsp;y</nobr></font></td> <td style= background:#aacfcf ><font face='courier new' size='2'><nobr id=l0007026>Price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#eef9ff ><font face='courier new' size='2'><nobr id=l0007039>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;58,900.00&nbsp;</nobr></font></td> <td style= background:#eef9ff ><font face='courier new' size='2'><nobr id=l0007057>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;165,900.00&nbsp;</nobr></font></td> <td style= background:#eef9ff ><font face='courier new' size='2'><nobr id=l0007075>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;296,695.00&nbsp;</nobr></font></td> </tr> <tr><td style= background:#aacfcf ><font face='courier new' size='2'><nobr id=l0008003>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;PZA&nbsp;</nobr></font></td> <td style= background:#aacfcf ><font face='courier new' size='2'><nobr id=l0008026>Rank:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#eef9ff ><font face='courier new' size='2'><nobr id=l0008039>&nbsp;&nbsp;</nobr></font><font face='courier new' size='2'><nobr style= background:#79c666 id=l0008041>&nbsp;&nbsp;1</nobr></font><font face='courier new' size='2'><nobr style= background:#eef9ff id=l0008044>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;34&nbsp;&nbsp;%&nbsp;</nobr></font></td> <td style= background:#eef9ff ><font face='courier new' size='2'><nobr id=l0008057>&nbsp;&nbsp;</nobr></font><font face='courier new' size='2'><nobr style= background:#9accee id=l0008059>&nbsp;&nbsp;2</nobr></font><font face='courier new' size='2'><nobr style= background:#eef9ff id=l0008062>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;95&nbsp;&nbsp;%&nbsp;</nobr></font></td> <td style= background:#eef9ff ><font face='courier new' size='2'><nobr id=l0008075>&nbsp;&nbsp;</nobr></font><font face='courier new' size='2'><nobr style= background:#9accee id=l0008077>&nbsp;&nbsp;3</nobr></font><font face='courier new' size='2'><nobr style= background:#eef9ff id=l0008080>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;171&nbsp;&nbsp;%&nbsp;</nobr></font></td> </tr> <tbody><tr><td style= background:#f0f008 ><font face='courier new' size='2'><nobr id=l0010003>Total&nbsp;Quot.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#f0f008 ><font face='courier new' size='2'><nobr id=l0010026>Val.:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#f0f008 ><font face='courier new' size='2'><nobr id=l0010039>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;58,900.00&nbsp;</nobr></font></td> <td style= background:#f0f008 ><font face='courier new' size='2'><nobr id=l0010057>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;165,900.00&nbsp;</nobr></font></td> <td style= background:#f0f008 ><font face='courier new' size='2'><nobr id=l0010075>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;296,695.00&nbsp;</nobr></font></td> </tr> <tr><td style= background:#f0f008 ><font face='courier new' size='2'><nobr id=l0011003>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#f0f008 ><font face='courier new' size='2'><nobr id=l0011026>Rank:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr></font></td> <td style= background:#f0f008 ><font face='courier new' size='2'><nobr id=l0011039>&nbsp;&nbsp;</nobr></font><font face='courier new' size='2'><nobr style= background:#79c666 id=l0011041>&nbsp;&nbsp;1</nobr></font><font face='courier new' size='2'><nobr style= background:#f0f008 id=l0011044>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;34&nbsp;&nbsp;%&nbsp;</nobr></font></td> <td style= background:#f0f008 ><font face='courier new' size='2'><nobr id=l0011057>&nbsp;&nbsp;</nobr></font><font face='courier new' size='2'><nobr style= background:#9accee id=l0011059>&nbsp;&nbsp;2</nobr></font><font face='courier new' size='2'><nobr style= background:#f0f008 id=l0011062>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;95&nbsp;&nbsp;%&nbsp;</nobr></font></td> <td style= background:#f0f008 ><font face='courier new' size='2'><nobr id=l0011075>&nbsp;&nbsp;</nobr></font><font face='courier new' size='2'><nobr style= background:#9accee id=l0011077>&nbsp;&nbsp;3</nobr></font><font face='courier new' size='2'><nobr style= background:#f0f008 id=l0011080>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;171&nbsp;&nbsp;%&nbsp;</nobr></font></td> </tr> <tbody></tbody></table> </p> </blockquote> </body> </html>",
				preferDOM : false,
				afterRendering : function(e) {
					
				}
			});*/
			
			function oFunction(oData){
				
				sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
	            sap.ui.getCore().getModel("mMessages").refresh();
	            
	            var oObjeto=sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:ZMM_FM_COMP_TABLE_POResponse");
	            var variableBase64=oObjeto.E_CTSTR;
	            var type=oObjeto.E_TYPE;
	            var message=oObjeto.E_MSG;
				//var variableBase64="PGh0bWwgZGlyPSJsdHIiPjxoZWFkPjxtZXRhIGh0dHAtZXF1aXY9IkNvbnRlbnQtVHlwZSIgY29udGVudD0idGV4dC9odG1sOyBjaGFyc2V0PXV0Zi04Ij48dGl0bGU+UmVwb3J0IG91dHB1dDwvdGl0bGU+IDxzdHlsZT50YWJsZS5saXN0IHsgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTsgfTwvc3R5bGU+IDwvaGVhZD4gPCFzY3JpcHQhPiA8Ym9keSBiZ2NvbG9yPSIjRThFQUQ4Ij4gPGJsb2NrcXVvdGU+IDxwIGFsaWduPWxlZnQ+PGZvbnQgc2l6ZT0rMj48Yj4gPC9iPjwvZm9udD48L3A+IDxwIGFsaWduPWxlZnQ+IDxmb250IHN0eWxlPSJmb250LWZhbWlseTptb25vc3BhY2VkIj4gPHRhYmxlIGNsYXNzPSJsaXN0IiBib3JkZXI9MSBjZWxsc3BhY2luZz0wIGNlbGxwYWRkaW5nPTEgcnVsZXM9Z3JvdXBzIGJvcmRlckNvbG9yPWJsYWNrID48Y29sZ3JvdXA+PGNvbGdyb3VwPjxjb2xncm91cD48Y29sZ3JvdXA+PGNvbGdyb3VwPiA8dGJvZHk+PHRyPjx0ZCBzdHlsZT0gYmFja2dyb3VuZDojOWFjY2VlID48Zm9udCBmYWNlPSJjb3VyaWVyIG5ldyIgc2l6ZT0iMiI+PG5vYnIgaWQ9bDAwMDIwMDM+TWF0ZXJpYWwmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDs8L25vYnI+PC9mb250PjwvdGQ+IDx0ZCBzdHlsZT0gYmFja2dyb3VuZDojNWRjYmZkID48Zm9udCBmYWNlPSJjb3VyaWVyIG5ldyIgc2l6ZT0iMiI+PG5vYnIgaWQ9bDAwMDIwMjY+UXVvdC46Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7PC9ub2JyPjwvZm9udD48L3RkPiA8dGQgc3R5bGU9IGJhY2tncm91bmQ6I2FlZTVmYiA+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIGlkPWwwMDAyMDM5PjYwMDAwMjIxMTgmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDs8L25vYnI+PC9mb250PjwvdGQ+IDx0ZCBzdHlsZT0gYmFja2dyb3VuZDojYWVlNWZiID48Zm9udCBmYWNlPSJjb3VyaWVyIG5ldyIgc2l6ZT0iMiI+PG5vYnIgaWQ9bDAwMDIwNTc+NjAwMDAyMjEyMCZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOzwvbm9icj48L2ZvbnQ+PC90ZD4gPHRkIHN0eWxlPSBiYWNrZ3JvdW5kOiNhZWU1ZmIgPjxmb250IGZhY2U9ImNvdXJpZXIgbmV3IiBzaXplPSIyIj48bm9iciBpZD1sMDAwMjA3NT42MDAwMDIyMTE5Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7PC9ub2JyPjwvZm9udD48L3RkPiA8L3RyPiA8dHI+PHRkIHN0eWxlPSBiYWNrZ3JvdW5kOiM5YWNjZWUgPjxmb250IGZhY2U9ImNvdXJpZXIgbmV3IiBzaXplPSIyIj48bm9iciBpZD1sMDAwMzAwMz5TaC4mbmJzcDtUZXh0Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7PC9ub2JyPjwvZm9udD48L3RkPiA8dGQgc3R5bGU9IGJhY2tncm91bmQ6IzVkY2JmZCA+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIGlkPWwwMDAzMDI2PkJpZGRlcjombmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDs8L25vYnI+PC9mb250PjwvdGQ+IDx0ZCBzdHlsZT0gYmFja2dyb3VuZDojYWVlNWZiID48Zm9udCBmYWNlPSJjb3VyaWVyIG5ldyIgc2l6ZT0iMiI+PG5vYnIgaWQ9bDAwMDMwMzk+NjUwMDAwMjQ2MCZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOzwvbm9icj48L2ZvbnQ+PC90ZD4gPHRkIHN0eWxlPSBiYWNrZ3JvdW5kOiNhZWU1ZmIgPjxmb250IGZhY2U9ImNvdXJpZXIgbmV3IiBzaXplPSIyIj48bm9iciBpZD1sMDAwMzA1Nz42NTAwMDAwNjYyJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7PC9ub2JyPjwvZm9udD48L3RkPiA8dGQgc3R5bGU9IGJhY2tncm91bmQ6I2FlZTVmYiA+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIGlkPWwwMDAzMDc1PjY1MDAwMDA4MzImbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDs8L25vYnI+PC9mb250PjwvdGQ+IDwvdHI+IDx0cj48dGQgc3R5bGU9IGJhY2tncm91bmQ6IzlhY2NlZSA+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIGlkPWwwMDA0MDAzPlF0eS4mbmJzcDtpbiZuYnNwO0Jhc2UmbmJzcDtVbml0Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7PC9ub2JyPjwvZm9udD48L3RkPiA8dGQgc3R5bGU9IGJhY2tncm91bmQ6IzVkY2JmZCA+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIGlkPWwwMDA0MDI2Pk5hbWU6Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7PC9ub2JyPjwvZm9udD48L3RkPiA8dGQgc3R5bGU9IGJhY2tncm91bmQ6I2FlZTVmYiA+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIGlkPWwwMDA0MDM5PklORFVTVFJJQVMmbmJzcDtMSUNPTlQ8L25vYnI+PC9mb250PjwvdGQ+IDx0ZCBzdHlsZT0gYmFja2dyb3VuZDojYWVlNWZiID48Zm9udCBmYWNlPSJjb3VyaWVyIG5ldyIgc2l6ZT0iMiI+PG5vYnIgaWQ9bDAwMDQwNTc+SW5kdXN0cmlhcyZuYnNwO0hlcnJ2aTwvbm9icj48L2ZvbnQ+PC90ZD4gPHRkIHN0eWxlPSBiYWNrZ3JvdW5kOiNhZWU1ZmIgPjxmb250IGZhY2U9ImNvdXJpZXIgbmV3IiBzaXplPSIyIj48bm9iciBpZD1sMDAwNDA3NT5URUNOSUNBJm5ic3A7SU5EVVNUUklBPC9ub2JyPjwvZm9udD48L3RkPiA8L3RyPiA8dGJvZHk+PHRyPjx0ZCBzdHlsZT0gYmFja2dyb3VuZDojYWFjZmNmID48Zm9udCBmYWNlPSJjb3VyaWVyIG5ldyIgc2l6ZT0iMiI+PG5vYnIgaWQ9bDAwMDYwMDM+NzEyMjQ4OSZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOzwvbm9icj48L2ZvbnQ+PC90ZD4gPHRkIHN0eWxlPSBiYWNrZ3JvdW5kOiNhYWNmY2YgPjxmb250IGZhY2U9ImNvdXJpZXIgbmV3IiBzaXplPSIyIj48bm9iciBpZD1sMDAwNjAyNj5WYWwuOiZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOzwvbm9icj48L2ZvbnQ+PC90ZD4gPHRkIHN0eWxlPSBiYWNrZ3JvdW5kOiNlZWY5ZmYgPjxmb250IGZhY2U9ImNvdXJpZXIgbmV3IiBzaXplPSIyIj48bm9iciBpZD1sMDAwNjAzOT4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDs1OCw5MDAuMDAmbmJzcDs8L25vYnI+PC9mb250PjwvdGQ+IDx0ZCBzdHlsZT0gYmFja2dyb3VuZDojZWVmOWZmID48Zm9udCBmYWNlPSJjb3VyaWVyIG5ldyIgc2l6ZT0iMiI+PG5vYnIgaWQ9bDAwMDYwNTc+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7MTY1LDkwMC4wMCZuYnNwOzwvbm9icj48L2ZvbnQ+PC90ZD4gPHRkIHN0eWxlPSBiYWNrZ3JvdW5kOiNlZWY5ZmYgPjxmb250IGZhY2U9ImNvdXJpZXIgbmV3IiBzaXplPSIyIj48bm9iciBpZD1sMDAwNjA3NT4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsyOTYsNjk1LjAwJm5ic3A7PC9ub2JyPjwvZm9udD48L3RkPiA8L3RyPiA8dHI+PHRkIHN0eWxlPSBiYWNrZ3JvdW5kOiNhYWNmY2YgPjxmb250IGZhY2U9ImNvdXJpZXIgbmV3IiBzaXplPSIyIj48bm9iciBpZD1sMDAwNzAwMz5GYWJyaWNhY2lvbiZuYnNwO2RlJm5ic3A7YnJpZGEmbmJzcDt5PC9ub2JyPjwvZm9udD48L3RkPiA8dGQgc3R5bGU9IGJhY2tncm91bmQ6I2FhY2ZjZiA+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIGlkPWwwMDA3MDI2PlByaWNlOiZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOzwvbm9icj48L2ZvbnQ+PC90ZD4gPHRkIHN0eWxlPSBiYWNrZ3JvdW5kOiNlZWY5ZmYgPjxmb250IGZhY2U9ImNvdXJpZXIgbmV3IiBzaXplPSIyIj48bm9iciBpZD1sMDAwNzAzOT4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDs1OCw5MDAuMDAmbmJzcDs8L25vYnI+PC9mb250PjwvdGQ+IDx0ZCBzdHlsZT0gYmFja2dyb3VuZDojZWVmOWZmID48Zm9udCBmYWNlPSJjb3VyaWVyIG5ldyIgc2l6ZT0iMiI+PG5vYnIgaWQ9bDAwMDcwNTc+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7MTY1LDkwMC4wMCZuYnNwOzwvbm9icj48L2ZvbnQ+PC90ZD4gPHRkIHN0eWxlPSBiYWNrZ3JvdW5kOiNlZWY5ZmYgPjxmb250IGZhY2U9ImNvdXJpZXIgbmV3IiBzaXplPSIyIj48bm9iciBpZD1sMDAwNzA3NT4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsyOTYsNjk1LjAwJm5ic3A7PC9ub2JyPjwvZm9udD48L3RkPiA8L3RyPiA8dHI+PHRkIHN0eWxlPSBiYWNrZ3JvdW5kOiNhYWNmY2YgPjxmb250IGZhY2U9ImNvdXJpZXIgbmV3IiBzaXplPSIyIj48bm9iciBpZD1sMDAwODAwMz4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsxJm5ic3A7Jm5ic3A7UFpBJm5ic3A7PC9ub2JyPjwvZm9udD48L3RkPiA8dGQgc3R5bGU9IGJhY2tncm91bmQ6I2FhY2ZjZiA+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIGlkPWwwMDA4MDI2PlJhbms6Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7PC9ub2JyPjwvZm9udD48L3RkPiA8dGQgc3R5bGU9IGJhY2tncm91bmQ6I2VlZjlmZiA+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIGlkPWwwMDA4MDM5PiZuYnNwOyZuYnNwOzwvbm9icj48L2ZvbnQ+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIHN0eWxlPSBiYWNrZ3JvdW5kOiM3OWM2NjYgaWQ9bDAwMDgwNDE+Jm5ic3A7Jm5ic3A7MTwvbm9icj48L2ZvbnQ+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIHN0eWxlPSBiYWNrZ3JvdW5kOiNlZWY5ZmYgaWQ9bDAwMDgwNDQ+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7MzQmbmJzcDsmbmJzcDslJm5ic3A7PC9ub2JyPjwvZm9udD48L3RkPiA8dGQgc3R5bGU9IGJhY2tncm91bmQ6I2VlZjlmZiA+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIGlkPWwwMDA4MDU3PiZuYnNwOyZuYnNwOzwvbm9icj48L2ZvbnQ+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIHN0eWxlPSBiYWNrZ3JvdW5kOiM5YWNjZWUgaWQ9bDAwMDgwNTk+Jm5ic3A7Jm5ic3A7Mjwvbm9icj48L2ZvbnQ+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIHN0eWxlPSBiYWNrZ3JvdW5kOiNlZWY5ZmYgaWQ9bDAwMDgwNjI+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7OTUmbmJzcDsmbmJzcDslJm5ic3A7PC9ub2JyPjwvZm9udD48L3RkPiA8dGQgc3R5bGU9IGJhY2tncm91bmQ6I2VlZjlmZiA+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIGlkPWwwMDA4MDc1PiZuYnNwOyZuYnNwOzwvbm9icj48L2ZvbnQ+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIHN0eWxlPSBiYWNrZ3JvdW5kOiM5YWNjZWUgaWQ9bDAwMDgwNzc+Jm5ic3A7Jm5ic3A7Mzwvbm9icj48L2ZvbnQ+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIHN0eWxlPSBiYWNrZ3JvdW5kOiNlZWY5ZmYgaWQ9bDAwMDgwODA+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7MTcxJm5ic3A7Jm5ic3A7JSZuYnNwOzwvbm9icj48L2ZvbnQ+PC90ZD4gPC90cj4gPHRib2R5Pjx0cj48dGQgc3R5bGU9IGJhY2tncm91bmQ6I2YwZjAwOCA+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIGlkPWwwMDEwMDAzPlRvdGFsJm5ic3A7UXVvdC4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDs8L25vYnI+PC9mb250PjwvdGQ+IDx0ZCBzdHlsZT0gYmFja2dyb3VuZDojZjBmMDA4ID48Zm9udCBmYWNlPSJjb3VyaWVyIG5ldyIgc2l6ZT0iMiI+PG5vYnIgaWQ9bDAwMTAwMjY+VmFsLjombmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDs8L25vYnI+PC9mb250PjwvdGQ+IDx0ZCBzdHlsZT0gYmFja2dyb3VuZDojZjBmMDA4ID48Zm9udCBmYWNlPSJjb3VyaWVyIG5ldyIgc2l6ZT0iMiI+PG5vYnIgaWQ9bDAwMTAwMzk+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7NTgsOTAwLjAwJm5ic3A7PC9ub2JyPjwvZm9udD48L3RkPiA8dGQgc3R5bGU9IGJhY2tncm91bmQ6I2YwZjAwOCA+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIGlkPWwwMDEwMDU3PiZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOzE2NSw5MDAuMDAmbmJzcDs8L25vYnI+PC9mb250PjwvdGQ+IDx0ZCBzdHlsZT0gYmFja2dyb3VuZDojZjBmMDA4ID48Zm9udCBmYWNlPSJjb3VyaWVyIG5ldyIgc2l6ZT0iMiI+PG5vYnIgaWQ9bDAwMTAwNzU+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Mjk2LDY5NS4wMCZuYnNwOzwvbm9icj48L2ZvbnQ+PC90ZD4gPC90cj4gPHRyPjx0ZCBzdHlsZT0gYmFja2dyb3VuZDojZjBmMDA4ID48Zm9udCBmYWNlPSJjb3VyaWVyIG5ldyIgc2l6ZT0iMiI+PG5vYnIgaWQ9bDAwMTEwMDM+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7PC9ub2JyPjwvZm9udD48L3RkPiA8dGQgc3R5bGU9IGJhY2tncm91bmQ6I2YwZjAwOCA+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIGlkPWwwMDExMDI2PlJhbms6Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7PC9ub2JyPjwvZm9udD48L3RkPiA8dGQgc3R5bGU9IGJhY2tncm91bmQ6I2YwZjAwOCA+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIGlkPWwwMDExMDM5PiZuYnNwOyZuYnNwOzwvbm9icj48L2ZvbnQ+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIHN0eWxlPSBiYWNrZ3JvdW5kOiM3OWM2NjYgaWQ9bDAwMTEwNDE+Jm5ic3A7Jm5ic3A7MTwvbm9icj48L2ZvbnQ+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIHN0eWxlPSBiYWNrZ3JvdW5kOiNmMGYwMDggaWQ9bDAwMTEwNDQ+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7MzQmbmJzcDsmbmJzcDslJm5ic3A7PC9ub2JyPjwvZm9udD48L3RkPiA8dGQgc3R5bGU9IGJhY2tncm91bmQ6I2YwZjAwOCA+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIGlkPWwwMDExMDU3PiZuYnNwOyZuYnNwOzwvbm9icj48L2ZvbnQ+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIHN0eWxlPSBiYWNrZ3JvdW5kOiM5YWNjZWUgaWQ9bDAwMTEwNTk+Jm5ic3A7Jm5ic3A7Mjwvbm9icj48L2ZvbnQ+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIHN0eWxlPSBiYWNrZ3JvdW5kOiNmMGYwMDggaWQ9bDAwMTEwNjI+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7OTUmbmJzcDsmbmJzcDslJm5ic3A7PC9ub2JyPjwvZm9udD48L3RkPiA8dGQgc3R5bGU9IGJhY2tncm91bmQ6I2YwZjAwOCA+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIGlkPWwwMDExMDc1PiZuYnNwOyZuYnNwOzwvbm9icj48L2ZvbnQ+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIHN0eWxlPSBiYWNrZ3JvdW5kOiM5YWNjZWUgaWQ9bDAwMTEwNzc+Jm5ic3A7Jm5ic3A7Mzwvbm9icj48L2ZvbnQ+PGZvbnQgZmFjZT0iY291cmllciBuZXciIHNpemU9IjIiPjxub2JyIHN0eWxlPSBiYWNrZ3JvdW5kOiNmMGYwMDggaWQ9bDAwMTEwODA+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7MTcxJm5ic3A7Jm5ic3A7JSZuYnNwOzwvbm9icj48L2ZvbnQ+PC90ZD4gPC90cj4gPHRib2R5PjwvdGJvZHk+PC90YWJsZT4gPC9wPiA8L2Jsb2NrcXVvdGU+IDwvYm9keT4gPC9odG1sPg==";
				
	            
	            if(type=="S"){
	            	var variable=Base64.decode(variableBase64);
					
					var separado1= variable.split('<body');
					var separado2= separado1[1].split('</html>');

					var html1 = new sap.ui.core.HTML({
						content:"<body"+separado2[0],
						preferDOM : false,
						afterRendering : function(e) {
							
						}
					});
					
					var oDialog = new sap.m.Dialog({
						customHeader: new sap.m.Bar({
							contentMiddle: new sap.m.Label({
								text: "{i18n>OrdenesCompra.Detalle.Popup.title.3}"
							}),
							contentRight: new sap.m.Button({
								icon: "sap-icon://decline",
								press: function() {
									oDialog.close();
								}
							})
						}),
						content:[
							html1
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

							 		
						},
						beforeClose: function(oEvt){
							oDialog.removeAllContent();
						},
						afterClose: function(oEvt){
							oDialog.destroy();
						}
					});
					oDialog.open();
	            }else{
	            	oCnt_FHelps.f_showMessage("INFORMATION", message);
	            }
	            
				 
			}
			
			oCtrl_OrdenesCompra.oServ_VisulizarTabla(oObject,oFunction);
			//oDialog.addContent(html1);
		},
		
		onDownload: function(oObject) {
			MessageToast.show(" Descargando..");
		    var pdf=oObject.CONTENTS64;
            //oCnt_FHelps.f_showMessage("INFORMATION", oObject.MESSAGE );
            var blob = oCnt_FHelps.converBase64toBlob(pdf, 'application/pdf');
            //window.open("data:application/pdf;base64," + Base64.encode(pdf));
            var blobURL = URL.createObjectURL(blob);
            window.open(blobURL);
		},
		
		onPressFlujo: function(oEvt) {
			var that = this;
			
			var oTable = oView.byId("idTableOrdenesCompra");
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
			
				if(that.Table_Flujo == undefined)
					that.Table_Flujo =new sap.m.Table("idTableFlujo",{
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
							new sap.m.Column("idCol151",{
								hAlign: "Center",
								header : new sap.m.Label({
									text : "{i18n>OrdenesCompra.Flujo.Popup.Table.Column.3}"
								})
							}),
							new sap.m.Column("idCol152",{
								hAlign: "Center",
								minScreenWidth: "Tablet",
								demandPopin: true,
								header : new sap.m.Label({
									text : "{i18n>OrdenesCompra.Flujo.Popup.Table.Column.2}"
								})
							}),
							new sap.m.Column("idCol153",{
								hAlign: "Center",
								minScreenWidth: "Tablet",
								demandPopin: true,
								header : new sap.m.Label({
									text : "{i18n>OrdenesCompra.Flujo.Popup.Table.Column.1}"
								})
							})
						]
					}).bindItems({
						path: "mTablesFlujoAutorizacion>/DATA_FA",
						template : 
							new sap.m.ColumnListItem({
								vAlign: "Middle",
								cells : [
									new sap.m.Text({ text : "{mTablesFlujoAutorizacion>OBJID}" }),
									new sap.m.Text({ text : "{mTablesFlujoAutorizacion>FRGCO}" }),
									new sap.m.Text({ text : "{mTablesFlujoAutorizacion>APPROVED}" })
								]
							})
					});
					
					var oDialog = new sap.m.Dialog({
						contentWidth: "100%",
						customHeader: new sap.m.Bar({
							contentMiddle: new sap.m.Label({
								text: "{i18n>OrdenesCompra.Flujo.Popup.title.1}"
							}),
							contentRight: new sap.m.Button({
								icon: "sap-icon://decline",
								press: function() {
									oDialog.close();
								}
							})
						}),
						content:[
							that.Table_Flujo
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
							if(oCtrl_Main_P2P._oTPC_Core["idTableFlujo"] == undefined){
								var oTableID = oCore.byId("idTableFlujo");
					   			// Hidden/view Columns
					   			DemoPersoService.setMyPersData( oTableID );
					   			
					   			// init and activate controller
					   			oCtrl_Main_P2P._oTPC_Core["idTableFlujo"] = new TablePersoController({
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
					var mModel=sap.ui.getCore().getModel("mTablesFlujoAutorizacion");
					mModel.setData({});
					oDialog.open();
					oCtrl_OrdenesCompra.oServ_FlujoAutorizacion(oObject);
        	}
		},
		
		onPressOpcionesOrdenes: function(oEvt) {
			var that = this;
			var oButton = oEvt.getSource();
			
			if(this._actsheet == undefined)
				this._actsheet = new sap.m.ActionSheet({
					placement:"Auto",
					buttons:[
							new sap.m.Button({
								text: "{i18n>OrdenesCompra.Monitor.Aprobar.Button}",
								press: function(oEvt){
									that.onPressAprobar(oEvt);
								}
							}),
							new sap.m.Button({
								text: "{i18n>OrdenesCompra.Monitor.Rechazar.Button}",
								press: function(oEvt){
									that.onPressRechazar(oEvt);
								}
							}),
							new sap.m.Button({
								text: "{i18n>OrdenesCompra.Monitor.Detalle.Button}",
								press: function(oEvt){
									that.onPressDetalle(oEvt);
								}
							}),
							new sap.m.Button({
								text: "{i18n>OrdenesCompra.Monitor.Flujo.Button}",
								press: function(oEvt){
									that.onPressFlujo(oEvt);
								}
							})
					]
				});

			this._actsheet.openBy(oButton);
		},
		
//		oServ_OrdenesCompraXAutorizar : function() {
//			
//			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
//				soapMessage=soapMessage+'<soap:Header/>';
//				soapMessage=soapMessage+'<soap:Body>';
//				soapMessage=soapMessage+'<urn:ZMM_FM_LIST_AUTH_PO>';
//				soapMessage=soapMessage+'<I_USER>'+Bname+'</I_USER>';
//				soapMessage=soapMessage+'</urn:ZMM_FM_LIST_AUTH_PO>';
//				soapMessage=soapMessage+'</soap:Body>';
//				soapMessage=soapMessage+'</soap:Envelope>';
//		     
//			oBusyDialog.open();
//			//Llamamos a la función AJAX de JQuery
//	        $.ajax({
//	            url: webServiceURL_ZW04,
//	            type: "POST",
//	            cache: false,
//	            data: soapMessage,
//	            contentType: "application/soap+xml; charset=utf-8",
//	            headers:{
//	            	"Authorization": "Basic " + btoa( oUsuario+":"+oPassword),
//	            	"accept-language": oLenguaje
//	            },
//	            success: OnSuccess,
//	            error: OnError
//	        });
//	        
//	        function OnSuccess(data, status)
//	        {
//	        	var json=xml2json(data);	   
//	        	var mModel=sap.ui.getCore().getModel("mTablesOrdenesCompra");
//	        	mModel.setData({});
//	        	mModel.refresh();
//	            mModel.setData(json);//revisar datos
//	            mModel.refresh();
//	            
//	            var Type=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_AUTH_POResponse").E_TYPE;
//	            var Message=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_AUTH_POResponse").E_MSG;
//	            
//	            var mData=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_AUTH_POResponse/E_POLIST/item");
//	            
//	            if(Type=="S"){
//	            	var length=mData.length;
//		            
//		            if(length==undefined){
//		            	//mData.LONG_TEXT_AUX=LONG_TEXT.substr(0,15);
//		            	mModel.setData({ORDENES_COMPRA:[mData]});//revisar datos	
//		            	oCtrl_OrdenesCompra.byId("idCountTableOrdenesCompra").setText("(1)");
//		            }else{
//		            	mModel.setData({ORDENES_COMPRA:mData});//revisar datos
//		            	oCtrl_OrdenesCompra.byId("idCountTableOrdenesCompra").setText("("+length+")");
//		            	/*for(i=0;i<mData.length;i++){
//		            		if(mData[i].LONG_TEXT!=null && (mData[i].LONG_TEXT).length >20){
//		            			mData[i].LONG_TEXT_AUX=(mData[i].LONG_TEXT).substr(0,20)+"...";
//		            		}		            		
//		            	}*/
//		            }
//		            
//		            sap.ui.getCore().getModel("mTablesOrdenesCompra").refresh();
//		            
//		            
//		            
//	            }else{
//	            	oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Error.title") );
//	            	oCtrl_OrdenesCompra.byId("idCountTableOrdenesCompra").setText("(0)");
//	            }
//	            
//	            oBusyDialog.close();
//	        }
//	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
//	        {
//	            oCnt_FHelps.f_showMessage("ERROR", error);
//	            oBusyDialog.close();
//	        }
//		},
		
		oServ_VisulizarAdjuntos : function(oObject) {
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:ZMM_FM_LIST_ATTACH_PO>';
				soapMessage=soapMessage+'<I_EBELN>'+oObject.EBELN+'</I_EBELN>';
				soapMessage=soapMessage+'</urn:ZMM_FM_LIST_ATTACH_PO>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';
		     
			oBusyDialog.open();
			//Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZW04,
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
	        	var mModel=sap.ui.getCore().getModel("mTablesAdjunto");
	            
	            mModel.setData(json);//revisar datos
	            mModel.refresh();
	            
	            var Type=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_ATTACH_POResponse").E_TYPE;
	            var Message=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_ATTACH_POResponse").E_MSG;
	            
	            var mData=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_ATTACH_POResponse/E_ATTACHLIST/item");
	            
	            if(Type=="S"){
	            	var length=mData.length;
		            
		            if(length==undefined){    	
		            	mModel.setData({DETALLE_ADJUNTO:[mData]});//revisar datos		            	
		            }else{
		            	mModel.setData({DETALLE_ADJUNTO:mData});//revisar datos		            	
		            }
		            
		            
	            }else{
	            	oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Error.title") );
	            }
	            
	            oBusyDialog.close();
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	        }
		},
		
		oServ_VisulizarTabla : function(oObject,callback) {
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:ZMM_FM_COMP_TABLE_PO>';
				soapMessage=soapMessage+'<I_EBELN>'+oObject.EBELN+'</I_EBELN>';
				soapMessage=soapMessage+'<I_USR>'+Bname+'</I_USR>';
				soapMessage=soapMessage+'</urn:ZMM_FM_COMP_TABLE_PO>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';
		     
			oBusyDialog.open();
			//Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZW04,
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
	        	oBusyDialog.close();
	        	callback(json);
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	        }
		},
		
		oServ_VisulizarOC : function(oObject) {
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:ZW04_USER_FILE_PDF_V2>';
				soapMessage=soapMessage+'<P_EBELN>'+oObject.EBELN+'</P_EBELN>';
				soapMessage=soapMessage+'</urn:ZW04_USER_FILE_PDF_V2>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';
		     
			oBusyDialog.open();
			//Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZW04,
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
	        	var mModel=sap.ui.getCore().getModel("mTablesOC");
	            
	            mModel.setData(json);//revisar datos
	            mModel.refresh();
	            
	            var Type=mModel.getProperty("/env:Envelope/env:Body/n0:ZW04_USER_FILE_PDF_V2Response/ET_MESSAGE/item").TYPE;
	            var Message=mModel.getProperty("/env:Envelope/env:Body/n0:ZW04_USER_FILE_PDF_V2Response/ET_MESSAGE/item").MESSAGE;
	            
	            var mData=mModel.getProperty("/env:Envelope/env:Body/n0:ZW04_USER_FILE_PDF_V2Response/E_ATTACHLIST/item");
	            
	            if(Type=="S"){
	            	var length=mData.length;
		            
		            if(length==undefined){    	
		            	mModel.setData({DETALLE_OC:[mData]});//revisar datos		            	
		            }else{
		            	mModel.setData({DETALLE_OC:mData});//revisar datos		            	
		            }
		            
		            
	            }else{
	            	oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Error.title") );
	            }
	            
	            oBusyDialog.close();
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	        }
		},
		
		oServ_AprobarRechazarOC : function(oObject,callback) {
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:ZMM_FM_AUTHORIZE_PO>';
				soapMessage=soapMessage+'<I_ACTION>'+oObject.I_ACTION+'</I_ACTION>';
				soapMessage=soapMessage+'<I_PODATA>';
				soapMessage=soapMessage+'<EBELN>'+oObject.EBELN+'</EBELN>';
				soapMessage=soapMessage+'<ERNAM>'+oObject.ERNAM+'</ERNAM>';
				soapMessage=soapMessage+'<AEDAT>'+oObject.AEDAT+'</AEDAT>';
				soapMessage=soapMessage+'<TOTAMT>'+oObject.TOTAMT+'</TOTAMT>';
				soapMessage=soapMessage+'<WAERS>'+oObject.WAERS+'</WAERS>';
				soapMessage=soapMessage+'<LONG_TEXT>'+oObject.LONG_TEXT+'</LONG_TEXT>';
				soapMessage=soapMessage+'<LIFNR>'+oObject.LIFNR+'</LIFNR>';
				soapMessage=soapMessage+'<LIFNAM>'+oObject.LIFNAM+'</LIFNAM>';
				soapMessage=soapMessage+'<ZTERM>'+oObject.ZTERM+'</ZTERM>';
				soapMessage=soapMessage+'<ZTERM_TXT>'+oObject.ZTERM_TXT+'</ZTERM_TXT>';
				soapMessage=soapMessage+'<RELCODE>'+oObject.RELCODE+'</RELCODE>';
				soapMessage=soapMessage+'<EKOTX>'+oObject.EKOTX+'</EKOTX>';
				soapMessage=soapMessage+'<RTEXT>'+oObject.RTEXT+'</RTEXT>';
				soapMessage=soapMessage+'</I_PODATA>';
				soapMessage=soapMessage+'<I_RTEXT>'+oObject.I_RTEXT+'</I_RTEXT>';
				soapMessage=soapMessage+'<I_USER>'+Bname+'</I_USER>';
				soapMessage=soapMessage+'</urn:ZMM_FM_AUTHORIZE_PO>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';
				
				oBusyDialog_d.setText(oCnt_FHelps.f_readTranslate("EnviandoSolicitud.text"));
				oBusyDialog_d.open();
	     
	        //Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZW04,
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
		
		oServ_Detalle : function(oObject) {
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:ZMM_FM_LIST_AUTH_PO_DETAIL>';
				soapMessage=soapMessage+'<I_EBELN>'+oObject.EBELN+'</I_EBELN>';
				soapMessage=soapMessage+'<I_USER>'+Bname+'</I_USER>';
				soapMessage=soapMessage+'</urn:ZMM_FM_LIST_AUTH_PO_DETAIL>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';
		     
			oBusyDialog.open();
			//Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZW04,
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
	        	var mModel=sap.ui.getCore().getModel("mTablesDetalleOC");
	            
	            mModel.setData(json);//revisar datos
	            mModel.refresh();
	            
	            var Type=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_AUTH_PO_DETAILResponse").E_TYPE;
	            var Message=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_AUTH_PO_DETAILResponse").E_MSG;
	            
	            var mData=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_AUTH_PO_DETAILResponse/E_PODETLIST/item");
	            
	            if(Type=="S"){
	            	var length=mData.length;
		            
		            if(length==undefined){    	
		            	mModel.setData({DETALLEOC:[mData]});//revisar datos		            	
		            }else{
		            	mModel.setData({DETALLEOC:mData});//revisar datos		            	
		            }
		            
	            }else{
	            	oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Error.title") );
	            }
	            
	            oBusyDialog.close();
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	        }
		},
		
		oServ_FlujoAutorizacion : function(oObject) {
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:ZMM_FM_LIST_FLOW_AUTH_PO>';
				soapMessage=soapMessage+'<IV_EBELN>'+oObject.EBELN+'</IV_EBELN>';
				soapMessage=soapMessage+'</urn:ZMM_FM_LIST_FLOW_AUTH_PO>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';
		     
			oBusyDialog.open();
			//Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZW04,
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
	        	var mModel=sap.ui.getCore().getModel("mTablesFlujoAutorizacion");
	            
	            mModel.setData(json);//revisar datos
	            mModel.refresh();
	            var Type="S"
	            //var Type=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_FLOW_AUTH_POResponse/ET_RETURN/item").TYPE;
	            //var Message=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_FLOW_AUTH_POResponse/ET_RETURN/item").MESSAGE;

	            var mData=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_FLOW_AUTH_POResponse/ET_RESPONSIBLES/item");
	            
	            if(Type=="S"){
	            	var length=mData.length;
		            
		            if(length==undefined){    	
		            	mModel.setData({DATA_FA:[mData]});//revisar datos		            	
		            }else{
		            	mModel.setData({DATA_FA:mData});//revisar datos		            	
		            }
		            
	            }else{
	            	oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Error.title") );
	            }
	            
	            oBusyDialog.close();
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	        }
		},
		handleLinkPress: function(oEvt) {
			var that = this;
			var sPath=oEvt.oSource.oPropagatedProperties.oBindingContexts.mTablesOrdenesCompra.sPath;
			var oObject=sap.ui.getCore().getModel("mTablesOrdenesCompra").getProperty(sPath);
   			oCnt_FHelps.f_showMessage("INFORMATION", oObject.LONG_TEXT, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
		},
		
		handleLinkPress1: function(oEvt) {
			var that = this;
			var sPath=oEvt.oSource.oPropagatedProperties.oBindingContexts.mTablesOrdenesCompra.sPath;
			var oObject=sap.ui.getCore().getModel("mTablesOrdenesCompra").getProperty(sPath);
   			oCnt_FHelps.f_showMessage("INFORMATION", oObject.RTEXT, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
		},
		
	});

});