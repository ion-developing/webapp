var oCtrl_Aprobaciones;
var Aprobaciones_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobil.ComprobacionGastos.controller.Aprobaciones", {
		_formFragments: {},
		
		onInit : function() {
			oCtrl_Aprobaciones = this;
   			oView = this.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobil.ComprobacionGastos.controller.Aprobaciones");

			this.f_createAllFiltersPanel();
			this._formFragments.OpcionesAnticipos 		= sap.ui.xmlfragment("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.view.fragments.OpcionesAnticipos", this);
			this._formFragments.OpcionesComprobaciones 	= sap.ui.xmlfragment("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.view.fragments.OpcionesComprobaciones", this);
			
	        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("Aprobaciones" === sRoute) {
	        		
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
			if(Aprobaciones_flag == true)
				return;
			
			Aprobaciones_flag = true;
			
   			var oTableID_1 = oView.byId("idTableAprobacionesAnt");
   			// Hidden/view Columns
   			DemoPersoService.setMyPersData( oTableID_1 );
   			
   			// init and activate controller
			this._oTPC_1 = new TablePersoController({
				table: oTableID_1,
				//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
				componentName: "demoApp",
				persoService: DemoPersoService,
			}).activate();
			

   			var oTableID_2 =  oView.byId("idTableAprobacionesComprob");
   			// Hidden/view Columns
   			DemoPersoService.setMyPersData( oTableID_2 );
   			
   			// init and activate controller
			this._oTPC_2 = new TablePersoController({
				table: oTableID_2,
				//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
				componentName: "demoApp",
				persoService: DemoPersoService,
			}).activate();
   		},
   		
   		onPersoPress: function(oEvt) {
   			var that = this;
   			var oTable = oEvt.getSource().getParent().getParent();
   			var oViewId = oView.getId();
   			var oTableId = oTable.getId().replace(oViewId+"--", "");
   			
   			switch(oTableId){
	   			case "idTableAprobacionesAnt":
	   	   			that._oTPC_1.openDialog();
	   				break;
	   			case "idTableAprobacionesComprob":
	   	   			that._oTPC_2.openDialog();
	   				break;
   			}
		},
   		
		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobil.ComprobacionGastos.controller.Aprobaciones');
		},
		
		f_createAllFiltersPanel: function(oEvt){
			oC_Modulo_WiseMobile.f_createFilterPanel("APROBACIONES", oCtrl_Aprobaciones, "idPage", 5);
			//
			var oModel = "mTables";
			//
			var oWorkTo = "AprobacionesAnt";
			oView.byId("idCountTable" + oWorkTo).setText("(0)");
			var oTable = oView.byId("idTable" + oWorkTo);
			oTable.setGrowingThreshold(5);
			oTable.bindItems({
		        path: "mTables>/XXX",
		        template: oTable.getBindingInfo("items").template
		    });
			//
			oWorkTo = "AprobacionesComprob";
			oView.byId("idCountTable" + oWorkTo).setText("(0)");
			var oTable = oView.byId("idTable" + oWorkTo);
			oTable.setGrowingThreshold(5);
			oTable.bindItems({
		        path: "mTables>/XXX",
		        template: oTable.getBindingInfo("items").template
		    });
			return true;
		},
		
		f_bindTable: function(oEvt){
			var oWorkTo = "AprobacionesAnt";
			var oCount = oCore.getModel("mTables").getProperty("/APROBACIONES").length;
			oView.byId("idCountTable" + oWorkTo).setText("("+oCount+")");
			var oTable = oView.byId("idTable" + oWorkTo);
			oTable.setGrowingThreshold(5);
			oTable.bindItems({
		        path: "mTables>/APROBACIONES",
		        template: oTable.getBindingInfo("items").template
		    });
			//
			oWorkTo = "AprobacionesComprob";
			var oCount = oCore.getModel("mTables").getProperty("/APROBACIONES").length;
			oView.byId("idCountTable" + oWorkTo).setText("("+oCount+")");
			var oTable = oView.byId("idTable" + oWorkTo);
			oTable.setGrowingThreshold(5);
			oTable.bindItems({
		        path: "mTables>/APROBACIONES",
		        template: oTable.getBindingInfo("items").template
		    });
			
			return true;
		},
		
		f_Show_Hide_AntComprob: function(pKey){
			// Mostrar u ocultar la tabla de aprobaciones de anticipos o Comprobaciones
			
			var oTableAnt = oView.byId("idTableAprobacionesAnt");
			var oTableComprob = oView.byId("idTableAprobacionesComprob");
			var oTitle = oView.byId("idAprobacionesTitle");
			var oButtonOpc1 = oView.byId("idOpciones1");
			var oButtonOpc2 = oView.byId("idOpciones2");
			
			var oFlagAnt = true;
			
			switch(pKey){
				case "1":
					oFlagAnt = true;
					oTitle.bindProperty("text", "i18n>Aprobaciones.Ant.title" );
					break;
				case "2":
					oFlagAnt = false;
					oTitle.bindProperty("text", "i18n>Aprobaciones.Comprob.title" );
					break;
			}
			/*oButtonOpc1.setVisible(oFlagAnt);
			oButtonOpc2.setVisible(!oFlagAnt);*/
			
			oTableAnt.setVisible(oFlagAnt);
			oTableComprob.setVisible(!oFlagAnt);
		},
		
		onPressAprobarAntc: function(oEvt){

			var oTable = oCtrl_Aprobaciones.byId("idTableAprobacionesAnt");
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
	   			
	   			oCnt_FHelps.f_showMessage("INFORMATION", oCnt_FHelps.f_readTranslate("AprobacionAnticipo.Exito.text"), undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
        	}
			
		},
		
		onPressRechazarAntc: function(oEvt){
			oCnt_FHelps.f_showMessage("INFORMATION", oCnt_FHelps.f_readTranslate("RechazarAnticipo.Exito.text"), undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
		},
		

		onPressConsultar: function(oEvt){
			var that = this;
			
			var oTable = oCtrl_Aprobaciones.byId("idTableAprobacionesComprob");
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
	   			oCore.getModel("mEditComprobacion").setProperty("/", oObject);
	   			/*
	   			 * AQUI VIENE
	   			 */
				var oDialog = new sap.m.Dialog({
					contentWidth: "100%",
					title:"{i18n>EditComprobacion.Consultar.Popup.title}",
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
									that._actionSheet = oCtrl_LtaComprobaciones._formFragments.ActionSheet;
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
						oCore.byId("idBtnAgregarL").setVisible(false);
						oCore.byId("idBtnEditarL").setVisible(false);
						oCore.byId("idBtnBorrarL").setVisible(false);
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
		
		onPressAprobar: function(oEvt){
			var oTable = oCtrl_Aprobaciones.byId("idTableAprobacionesComprob");
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
				    text	: oCnt_FHelps.f_readTranslate("Solicitud.Exito.text"),
					close : function(oEvt) {
						jQuery.sap.clearDelayedCall(_timeout);
						
						oCnt_FHelps.f_showMessage("INFORMATION", oCnt_FHelps.f_readTranslate("Aprobacion.Exito.text"), undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
					}
				});
				
				// open dialog
				oBusyDialog_c.open();
	
				// simulate end of operation
				_timeout = jQuery.sap.delayedCall(2000, this, function () {
					oBusyDialog_c.close();
				});
        	}
		},
		
		onPressRechazar: function(oEvt){
			var oTable = oView.byId("idTableAprobacionesComprob");
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
	   			oCnt_FHelps.f_showMessage("INFORMATION", oCnt_FHelps.f_readTranslate("Aprobacion.Exito.text"), undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
        	}
		},
		
		onSettingsTable: function(oEvt){
			var oTable = oEvt.getSource().getParent().getParent();
			var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
			var oModel = oCore.getModel( oNameModel );
			var oPath = oTable.getBindingInfo("items").path;
			var oPosCountT = oTable.getHeaderToolbar().getContent().length-1;
			var oCountTable = oTable.getHeaderToolbar().getContent()[oPosCountT];
			
			var aCampos = [ 
				{key : "Importe",   text : oCnt_FHelps.f_readTranslate("EstadoCuenta.Monitor.Table.1.Column.7")}, 
				{key : "Moneda", text : oCnt_FHelps.f_readTranslate("EstadoCuenta.Monitor.Table.1.Column.8")}, 
				{key : "DocCompensacion", text : oCnt_FHelps.f_readTranslate("EstadoCuenta.Monitor.Table.1.Column.9")}, 
				{key : "FechaCompensacion", text : oCnt_FHelps.f_readTranslate("EstadoCuenta.Monitor.Table.1.Column.10")}
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
					new sap.m.ViewSettingsItem({text: oCnt_FHelps.f_readTranslate("EstadoCuenta.Monitor.Table.1.Column.1"), key:"NoDocumento", selected:true}),
					new sap.m.ViewSettingsItem({text: oCnt_FHelps.f_readTranslate("EstadoCuenta.Monitor.Table.1.Column.2"), key:"AnioFiscal"}),
					new sap.m.ViewSettingsItem({text: oCnt_FHelps.f_readTranslate("EstadoCuenta.Monitor.Table.1.Column.3"), key:"ClaseDocumento"}),
				],
				
				filterItems:[
					aVSFItems
				]
			});
			
			viewSettings.open();
		},
		
		onPressOpcionesAntc: function(oEvt){
			var that = this;
			var oButton = oEvt.getSource();

			// create action sheet only once
			if (!that._actionSheet2) {
				that._actionSheet2 = that._formFragments.OpcionesAnticipos;
				that.getView().addDependent(that._actionSheet2);
			}

			that._actionSheet2.openBy(oButton);
		},
		
		onPressOpcionesComprob: function(oEvt){
			var that = this;
			var oButton = oEvt.getSource();

			// create action sheet only once
			if (!that._actionSheet3) {
				that._actionSheet3 = that._formFragments.OpcionesComprobaciones;
				that.getView().addDependent(that._actionSheet3);
			}

			that._actionSheet3.openBy(oButton);
		},
		
	});

});