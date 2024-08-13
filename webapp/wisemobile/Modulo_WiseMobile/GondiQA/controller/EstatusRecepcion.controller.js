var oCtrl_EstatusRecepcion;
var EstatusRecepcion_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController) {

	var oView;
	
	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.EstatusRecepcion", {

		onInit : function() {
			oCtrl_EstatusRecepcion = this;
   			oView = this.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.EstatusRecepcion");
			
			// ORR Se comenta para no crear el filtro
			//this.f_createAllFiltersPanel();
	        
			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("EstatusRecepcion" === sRoute) {
	        		
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

		onBeforeRendering: function() {
			var oComboRazonSocial = this.getView().byId("comboRazonSocial");
			var odatePickerFrom = this.getView().byId("datePickerFrom");
			var odatePickerTo = this.getView().byId("datePickerTo");

			if (oComboRazonSocial || odatePickerFrom || odatePickerTo) {
				oComboRazonSocial.setSelectedKey(""); 
				odatePickerFrom.setValue("");
				odatePickerTo.setValue("");
			}

			sap.ui.getCore().getModel("mTablesEstatusRecepcion").setData(""); 
		},

		onPressFiltrar: function (oEvt) {
			//console.log(sap.ui.getCore().getModel("mCombos"));
			var oController = oView.getController();
			var oKeyFilter = "ESTATUSRECEPCION";

			var condition_0 = this.getView().byId("comboRazonSocial").getSelectedKey();
			console.log(condition_0);

			var condition_1_ini = this.getView().byId("datePickerFrom").getValue();
			var condition_1_fin = this.getView().byId("datePickerTo").getValue();
			console.log(condition_1_ini);
			console.log(condition_1_fin)

			if(condition_0 == "" || condition_1_ini == "" || condition_1_fin == ""){ 
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
					}
				]
	
				oC_Modulo_WiseMobile.onSearchNewFilter(oEvt, oController, oFilterPanel, oKeyFilter);
			}

		},

		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.EstatusRecepcion');
		},
		
		f_createAllFiltersPanel: function(oEvt){
			oC_Modulo_WiseMobile.f_createFilterPanel("ESTATUSRECEPCION", this, "idPage", 2);
		},
		
		onAfterRendering: function(oEvt) {
			
			// LIMPIAR MONITOR DE BUSQUEDA (EN CASO LO HALLA)
			oCnt_FHelps.f_LimpiarMonitorBusq(this);
			if(EstatusRecepcion_flag == true)
				return;
			
			EstatusRecepcion_flag = true;
				
			var oTableID = oView.byId("idTableEstatusRecepcion");
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
		
		onPressExportar: function(oEvt) {
			var oTableId = "idTableEstatusRecepcion";
			
			oCnt_FHelps.f_ExportarXLSX(oTableId, oView);
		}
		
	});

});