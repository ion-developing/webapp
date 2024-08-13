var oCtrl_EstatusCotizaciones;
var EstatusCotizaciones_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController",'sap/m/MessageToast',"com/axiomasoluciones/wisemobile/Modulo_WiseMobile/Utils/formatter"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController,MessageToast,formatter) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.EstatusCotizaciones", {
		formatter:formatter,
		onInit : function() {
			oCtrl_EstatusCotizaciones = this;
   			oView = this.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.EstatusCotizaciones");
			
			// ORR Se comenta para no crear el filtro
			//this.f_createAllFiltersPanel();
	        
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

		onBeforeRendering: function() {
			var oComboRazonSocial = this.getView().byId("comboRazonSocial");
			var oinputPeticionOferta = this.getView().byId("inputPeticionOferta");
			var odatePickerFrom = this.getView().byId("datePickerFrom");
			var odatePickerTo = this.getView().byId("datePickerTo");
			var ocomboEstado = this.getView().byId("comboEstado");

			if (oComboRazonSocial || oinputPeticionOferta || odatePickerFrom || odatePickerTo || ocomboEstado) {
				oComboRazonSocial.setSelectedKey(""); 
				oinputPeticionOferta.setValue(""); 
				odatePickerFrom.setValue("");
				odatePickerTo.setValue("");
				ocomboEstado.setSelectedKey("");
			}

			sap.ui.getCore().getModel("mTablesEstCotizaciones").setData(""); 
		},


		onPressFiltrar: function (oEvt) {
			//console.log(sap.ui.getCore().getModel("mCombos"));
			var oController = oView.getController();
			var oKeyFilter = "ESTATUS_COTIZACIONES";

			var condition_0 = this.getView().byId("comboRazonSocial").getSelectedKey();
			console.log(condition_0);
			
			var condition_1 = this.getView().byId("inputPeticionOferta").getValue();
			console.log(condition_1);

			var condition_2_ini = this.getView().byId("datePickerFrom").getValue();
			var condition_2_fin = this.getView().byId("datePickerTo").getValue();
			console.log(condition_2_ini);
			console.log(condition_2_fin)

			var condition_3 = this.getView().byId("comboEstado").getSelectedKey();
			console.log(condition_3);

			if(condition_0 === "" || condition_2_ini === "" || condition_2_fin === "" || condition_3 === ""){ 
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
						"text": "Peticion de Oferta #: =" + condition_1,
						"exclude": false,
						"operation": "EQ",
						"keyField": "peticion_oferta",
						"value1": condition_1,
						"value2": "",
						"showIfGrouped": false,
						"typeField": "text",
						"zstr": "<peticion_oferta>" + condition_1 + "</peticion_oferta>"
					},
					{
						"key": "condition_2",
						"text": "Fecha de Licitación: " + condition_2_ini + "..." + condition_2_fin,
						"exclude": false,
						"operation": "BT",
						"keyField": "f_licitacion",
						"value1": condition_2_ini,
						"value2": condition_2_fin,
						"showIfGrouped": false,
						"typeField": "date",
						"zstr": "<f_licitacion><SIGN>I</SIGN><OPTION>BT</OPTION><LOW>" + condition_2_ini + "</LOW><HIGH>" + condition_2_fin + "</HIGH></f_licitacion>"
					},
					{
						"key": "condition_3",
						"text": "Estado: =" + condition_3,
						"exclude": false,
						"operation": "EQ",
						"keyField": "estado",
						"value1": condition_3,
						"value2": "",
						"showIfGrouped": false,
						"typeField": "combo",
						"zstr": "<estado>" + condition_3 + "</estado>"
					}
				];
	
				oC_Modulo_WiseMobile.onSearchNewFilter(oEvt, oController, oFilterPanel, oKeyFilter);
			}

		},

		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.OrdnCompraXFacturar');
		},
		
		f_createAllFiltersPanel: function(oEvt){
			oC_Modulo_WiseMobile.f_createFilterPanel("ESTATUS_COTIZACIONES", oCtrl_EstatusCotizaciones, "idPage", 4);
		},
		
		onAfterRendering: function(oEvt) {
			
			oCnt_FHelps.f_LimpiarMonitorBusq(this);
			sap.ui.getCore().getModel("mTablesEstCotizaciones").setData({DOC_ESTCOTIZACIONES:[]});//revisar datos
			oCtrl_EstatusCotizaciones.byId("idCountTableEstatusCotizaciones").setText("(0)");
			if(EstatusCotizaciones_flag == true)
				return;
			
			EstatusCotizaciones_flag = true;
				
			var oTableID = oView.byId("idTableEstatusCotizaciones");
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
		
		onDownload: function(oEvt) {
			MessageToast.show(" Descargando..");
			
			var sPath=oEvt.getSource().mAggregations.customData[0].oPropagatedProperties.oBindingContexts.mTablesEstCotizaciones.sPath;
			var oObject=sap.ui.getCore().getModel("mTablesEstCotizaciones").getProperty(sPath);
			
			function oFunction(oData){
				
				sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
	            sap.ui.getCore().getModel("mMessages").refresh();
	            
	            var pdf=sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:ZW18_GET_PO_FORMResponse/ES_PDF");
	            //oCnt_FHelps.f_showMessage("INFORMATION", oObject.MESSAGE );
	            var blob = oCnt_FHelps.converBase64toBlob(pdf, 'application/pdf');
	            //window.open("data:application/pdf;base64," + Base64.encode(pdf));
	            var blobURL = URL.createObjectURL(blob);
	            window.open(blobURL);
			}
			
			
			oCtrl_EstatusCotizaciones.oServ_DescargaPdf(oObject,oFunction);
		},
		
		
		
		oServ_DescargaPdf : function(oObject,callback) {
			
			var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage=soapMessage+'<soapenv:Header/>';
				soapMessage=soapMessage+'<soapenv:Body>';
				soapMessage=soapMessage+' <urn:_-WI18_-GET_PO_FORM>';
				soapMessage=soapMessage+'<IV_EBELN>'+oObject.EBELN+'</IV_EBELN>';
				soapMessage=soapMessage+'<IV_EBELP>'+oObject.EBELP+'</IV_EBELP>';
				soapMessage=soapMessage+' </urn:_-WI18_-GET_PO_FORM>';
				soapMessage=soapMessage+'</soapenv:Body>';
				soapMessage=soapMessage+'</soapenv:Envelope>';
		     
	        //Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_Cotizaciones,
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
	        	callback(json);
	            
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	        }
		}
		
		
		
	});

});