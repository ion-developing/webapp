var oCtrl_LtaAnticipos;
var LtaAnticipos_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.controller.LtaAnticipos", {

		onInit : function() {
			oCtrl_LtaAnticipos = this;
   			oView = this.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.controller.LtaAnticipos");
			
			this.f_createAllFiltersPanel();
	        
			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("LtaAnticipos" === sRoute) {
	        		
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
		
		onAfterRendering: function(oEvt) {
			if(LtaAnticipos_flag == true)
				return;
			
			LtaAnticipos_flag = true;
				
			var oTableID = oView.byId("idTableLtaAnticipos");
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
		
		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.controller.LtaAnticipos');
		},
		
		f_createAllFiltersPanel: function(oEvt){
			oC_Modulo_WiseMobile.f_createFilterPanel("LTAANTICIPOS", oCtrl_LtaAnticipos, "idPage", 4);
		},
		
		onPressCrearAnticipo: function(oEvt){
			
			var oTable = oView.byId("idTableLtaAnticipos");
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
	   			
	   			this.f_PopUp_CrearAnticipo(oObject);
        	}
		},

		f_PopUp_CrearAnticipo: function(oObject) {
			var that = this;
			var aInputs = [
				
				new sap.m.Input({ value: oObject.NoSolicitud }),
				new sap.m.Input(),
				new sap.m.DatePicker({ value:"2018-12-21", displayFormat: "yyyy-MM-dd" }),
				new sap.m.Select({
					forceSelection : false,
					items: {
						path: "mCombos>/MONEDA",
						template:  new sap.ui.core.Item({ key:"{mCombos>id}", text:"{mCombos>text}"})
					}
				}),
				new sap.m.Input(),
			];
			
			var oDialog = new sap.m.Dialog({
				customHeader: new sap.m.Bar({
					contentMiddle: new sap.m.Label({
						text: "{i18n>LtaAnticipos.Popup.title} "+ oObject.NoSolicitud
					}),
					contentRight: new sap.m.Button({
						icon: "sap-icon://decline",
						press: function() {
							oDialog.close();
						}
					})
				}),
				subHeader: new sap.m.Toolbar({
					design : "Info",
					content: new sap.m.Label({
						text: "{i18n>LtaAnticipos.Popup.title}"
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
									new sap.m.Label({ text : "{i18n>LtaAnticipos.Popup.Form.1}" }),
									aInputs[0],
									new sap.m.Label({ text : "{i18n>LtaAnticipos.Popup.Form.2}" }),
									aInputs[1],
									new sap.m.Label({ text : "{i18n>LtaAnticipos.Popup.Form.3}" }),
									aInputs[2],
									new sap.m.Label({ text : "{i18n>LtaAnticipos.Popup.Form.4}" }),
									aInputs[3],
									new sap.m.Label({ text : "{i18n>LtaAnticipos.Popup.Form.5}" }),
									aInputs[4],
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
						text: "{i18n>LtaAnticipos.Popup.Button.1}",
						press:function(){
							var _timeout;
							
							var oBusyDialog_c = new sap.m.BusyDialog({
								title	: oCnt_FHelps.f_readTranslate("Wait.title"),
							    text	: oCnt_FHelps.f_readTranslate("EnviandoSolicitud.text"),
								close : function(oEvt) {
									jQuery.sap.clearDelayedCall(_timeout);
									oDialog.close();
									
									oCnt_FHelps.f_showMessage("INFORMATION", oCnt_FHelps.f_readTranslate("Solicitud.Exito.text"), undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
									/*
									var oArray = oCore.getModel("mTables").LTAANTICIPOS;
									var oLength = oArray.length;
									var oReg = {
										"id": ( oArray[(oLength-1)] + 1 ),
										"NoSolicitud"		: aInputs[0].getValue(),
										"NoAnticipo"		: aInputs[1].getValue(),
										"FechadeSolicitud"	: aInputs[2].getValue(),
										"FechaContabiliza"	: aInputs[2].getValue(),
										"Importe"			: aInputs[4].getSelectedItem().getText(),
										"Moneda"			: aInputs[3].getSelectedItem().getText(),
										"Estado"			: "04-Posted",
										"Aprobadopor"		: "PORTAL_GV",
										"SolPago"			: "17012413",
										"Contabilizadopor"	: "ABAPWISE",
										"DocPago"			: "1000205504"
									};
									oArray.push(oReg);
									oCore.getModel("mTables").refresh();
									*/
								}
							});
							
							// open dialog
							oBusyDialog_c.open();

							// simulate end of operation
							_timeout = jQuery.sap.delayedCall(2000, this, function () {
								oBusyDialog_c.close();
							});
						}
					})
				]
			});
			
			oDialog.open();
		},
		
		onSettingsTable: function(oEvt){
			var oTable = oEvt.getSource().getParent().getParent();
			var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
			var oModel = oCore.getModel( oNameModel );
			var oPath = oTable.getBindingInfo("items").path;
			var oPosCountT = oTable.getHeaderToolbar().getContent().length-1;
			var oCountTable = oTable.getHeaderToolbar().getContent()[oPosCountT];
			
			var aCampos = [ 
				{key : "Estado",   text : oCnt_FHelps.f_readTranslate("LtaAnticipos.Monitor.Table.Column.7")}, 
				{key : "Aprobadopor", text : oCnt_FHelps.f_readTranslate("LtaAnticipos.Monitor.Table.Column.8")}, 
				{key : "SolPago", text : oCnt_FHelps.f_readTranslate("LtaAnticipos.Monitor.Table.Column.9")}, 
				{key : "Contabilizadopor", text : oCnt_FHelps.f_readTranslate("LtaAnticipos.Monitor.Table.Column.10")}
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
					new sap.m.ViewSettingsItem({text: oCnt_FHelps.f_readTranslate("LtaAnticipos.Monitor.Table.Column.1"), key:"NoSolicitud}", selected:true}),
					new sap.m.ViewSettingsItem({text: oCnt_FHelps.f_readTranslate("LtaAnticipos.Monitor.Table.Column.2"), key:"NoAnticipo"}),
					new sap.m.ViewSettingsItem({text: oCnt_FHelps.f_readTranslate("LtaAnticipos.Monitor.Table.Column.3"), key:"FechadeSolicitud"}),
				],
				
				filterItems:[
					aVSFItems
				]
			});
			
			viewSettings.open();
		}
		
	});

});