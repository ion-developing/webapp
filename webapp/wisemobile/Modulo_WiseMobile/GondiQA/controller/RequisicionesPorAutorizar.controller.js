var oCtrl_Requisiciones;
var Requisiciones_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.RequisicionesPorAutorizar", {

		onInit : function() {
			oCtrl_Requisiciones = this;
   			oView = this.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.RequisicionesPorAutorizar");
			
			this.f_createAllFiltersPanel();
	        
			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("RequisicionesporAutorizar" === sRoute) {
	        		
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
			oC_Modulo_WiseMobile.f_createFilterPanel("REQUISICIONESPORAUTORIZAR", oCtrl_Requisiciones, "idPage", 1);
		},
		
		onAfterRendering: function(oEvt) {
			//oCtrl_Requisiciones.oServ_RequisicionesXAutorizar();
			// LIMPIAR MONITOR DE BUSQUEDA (EN CASO LO HALLA)
			//oCnt_FHelps.f_LimpiarMonitorBusq(this);
			if(Requisiciones_flag == true)
				return;
			
			Requisiciones_flag = true;
				
			var oTableID = oView.byId("idTableRequisiciones");
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
			var oTable = oView.byId("idTableRequisiciones");
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
					            
					            var oObjeto=sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:ZMM_FM_AUTHORIZE_PRResponse/E_RETURN/item");
					            
					            function oFunction1(oData){
					            	setTimeout(function() {
					            		//oCtrl_Requisiciones.oServ_RequisicionesXAutorizar();
									}, 500);
					            	
					            }
					            oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.MESSAGE, oFunction1, oCnt_FHelps.f_readTranslate("Mensaje.title") );
					            
								 
							}
							oCtrl_Requisiciones.oServ_AprobarRechazarRQ(oObject,oFunction);
							
						}
					})
				]
			});
			
			oDialog.open();
		},
		
		onPressRechazar: function(oEvt) {
			var oTable = oView.byId("idTableRequisiciones");
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

		onPressOpciones: function(oEvt){
			var that = this;
			var oButton = oEvt.getSource();
			
			if(this._actsheet == undefined)
				this._actsheet = new sap.m.ActionSheet({
					placement:"Auto",
					buttons:[
							new sap.m.Button({
								text: "{i18n>Requisiciones.Monitor.Aprobar.Button}",
								press: function(oEvt){
									that.onPressAprobar(oEvt);
								}
							}),
							new sap.m.Button({
								text: "{i18n>Requisiciones.Monitor.Rechazar.Button}",
								press: function(oEvt){
									that.onPressRechazar(oEvt);
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
		
//		oServ_RequisicionesXAutorizar : function() {
//			var coleccion_fecha_lic="";
//			
//			if(Parameters[i].keyField == "f_licitacion" && Parameters[i].value1!=""){
//				if(Parameters[i].operation=="EQ"){
//					coleccion_fecha=coleccion_fecha+'<item><SIGN>I</SIGN><OPTION>'+Parameters[i].operation+'</OPTION><LOW>'+Parameters[i].value1+'</LOW><HIGH>'+Parameters[i].value1+'</HIGH></item>'
//				}else{
//					coleccion_fecha=coleccion_fecha+'<item><SIGN>I</SIGN><OPTION>'+Parameters[i].operation+'</OPTION><LOW>'+Parameters[i].value1+'</LOW><HIGH>'+Parameters[i].value2+'</HIGH></item>'
//				}
//				
//			}
//			
//			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
//				soapMessage=soapMessage+'<soap:Header/>';
//				soapMessage=soapMessage+'<soap:Body>';
//				soapMessage=soapMessage+'<urn:ZMM_FM_LIST_AUTH_PR>';
//				soapMessage=soapMessage+'<I_BLDAT>'+coleccion_fecha+'</I_BLDAT>';
//				soapMessage=soapMessage+'<I_USER>'+Bname+'</I_USER>';
//				soapMessage=soapMessage+'</urn:ZMM_FM_LIST_AUTH_PR>';
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
//	        	var mModel=sap.ui.getCore().getModel("mTablesRequisiciones");
//	        	mModel.setData({});
//	        	mModel.refresh();
//	            mModel.setData(json);//revisar datos
//	            mModel.refresh();
//	            
//	            var Type=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_AUTH_PRResponse").E_TYPE;
//	            var Message=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_AUTH_PRResponse").E_MSG;
//	            
//	            var mData=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_AUTH_PRResponse/E_PRLIST/item");
//	            
//	            if(Type=="S"){
//	            	var length=mData.length;
//		            
//		            if(length==undefined){    	
//		            	mModel.setData({REQUISICIONES:[mData]});//revisar datos		            	
//		            	oCtrl_Requisiciones.byId("idCountTableCotizaciones").setText("(1)");
//		            }else{
//		            	mModel.setData({REQUISICIONES:mData});//revisar datos		            	
//		            	oCtrl_Requisiciones.byId("idCountTableCotizaciones").setText("("+length+")");
//		            }
//		            
//		            sap.ui.getCore().getModel("mTablesRequisiciones").refresh();
//		            
//		            
//	            }else{
//	            	oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Error.title") );
//	            	oCtrl_Requisiciones.byId("idCountTableCotizaciones").setText("(0)");
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
		
		
		oServ_AprobarRechazarRQ : function(oObject,callback) {
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:ZMM_FM_AUTHORIZE_PR>';
				soapMessage=soapMessage+'<I_ACTION>'+oObject.I_ACTION+'</I_ACTION>';
				soapMessage=soapMessage+'<I_PRDATA>';
				soapMessage=soapMessage+'<PREQ_NO>'+oObject.PREQ_NO+'</PREQ_NO>';
				soapMessage=soapMessage+'<PREQ_ITEM>'+oObject.PREQ_ITEM+'</PREQ_ITEM>';
				soapMessage=soapMessage+'<MATERIAL>'+oObject.MATERIAL+'</MATERIAL>';
				soapMessage=soapMessage+'<PUR_MAT>'+oObject.PUR_MAT+'</PUR_MAT>';
				soapMessage=soapMessage+'<SHORT_TEXT>'+oObject.SHORT_TEXT+'</SHORT_TEXT>';
				soapMessage=soapMessage+'<LONG_TEXT>'+oObject.LONG_TEXT+'</LONG_TEXT>';
				soapMessage=soapMessage+'<QUANTITY>'+oObject.QUANTITY+'</QUANTITY>';
				soapMessage=soapMessage+'<UNIT>'+oObject.UNIT+'</UNIT>';
				soapMessage=soapMessage+'<CREATED_BY>'+oObject.CREATED_BY+'</CREATED_BY>';
				soapMessage=soapMessage+'<PREQ_NAME>'+oObject.PREQ_NAME+'</PREQ_NAME>';
				soapMessage=soapMessage+'<RELCODE>'+oObject.RELCODE+'</RELCODE>';
				soapMessage=soapMessage+'<WI_ID>'+oObject.WI_ID+'</WI_ID>';
				soapMessage=soapMessage+'<EKOTX>'+oObject.EKOTX+'</EKOTX>';
				soapMessage=soapMessage+'</I_PRDATA>';
				soapMessage=soapMessage+'<I_RTEXT>'+oObject.I_RTEXT+'</I_RTEXT>';
				soapMessage=soapMessage+'<I_USER>'+Bname+'</I_USER>';
				soapMessage=soapMessage+'</urn:ZMM_FM_AUTHORIZE_PR>';
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
		
		onPressFlujo: function(oEvt) {
			var that = this;
			
			var oTable = oView.byId("idTableRequisiciones");
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
							new sap.m.Column("idCol154",{
								hAlign: "Center",
								header : new sap.m.Label({
									text : "{i18n>OrdenesCompra.Flujo.Popup.Table.Column.3}"
								})
							}),
							new sap.m.Column("idCol155",{
								hAlign: "Center",
								minScreenWidth: "Tablet",
								demandPopin: true,
								header : new sap.m.Label({
									text : "{i18n>OrdenesCompra.Flujo.Popup.Table.Column.2}"
								})
							}),
							new sap.m.Column("idCol156",{
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
					oCtrl_Requisiciones.oServ_FlujoAutorizacion(oObject);
        	}
		},
		
		
		oServ_FlujoAutorizacion : function(oObject) {
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:ZMM_FM_LIST_FLOW_AUTH_PR>';
				soapMessage=soapMessage+'<IV_PREQITEM>'+oObject.PREQ_ITEM+'</IV_PREQITEM>';
				soapMessage=soapMessage+'<IV_PREQNO>'+oObject.PREQ_NO+'</IV_PREQNO>';
				soapMessage=soapMessage+'</urn:ZMM_FM_LIST_FLOW_AUTH_PR>';
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
	            
	            var Type=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_FLOW_AUTH_PRResponse/ET_RETURN/item").TYPE;
	            var Message=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_FLOW_AUTH_PRResponse/ET_RETURN/item").MESSAGE;
	            
	            var mData=mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_FLOW_AUTH_PRResponse/ET_RESPONSIBLES/item");
	            
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
	            oBusyDialog.close();
	        }
		},
		
		handleLinkPress: function(oEvt) {
			var that = this;
			var sPath=oEvt.oSource.oPropagatedProperties.oBindingContexts.mTablesRequisiciones.sPath;
			var oObject=sap.ui.getCore().getModel("mTablesRequisiciones").getProperty(sPath);
   			oCnt_FHelps.f_showMessage("INFORMATION", oObject.SHORT_TEXT, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
		},
		
		handleLinkPress1: function(oEvt) {
			var that = this;
			var sPath=oEvt.oSource.oPropagatedProperties.oBindingContexts.mTablesRequisiciones.sPath;
			var oObject=sap.ui.getCore().getModel("mTablesRequisiciones").getProperty(sPath);
   			oCnt_FHelps.f_showMessage("INFORMATION", oObject.LONG_TEXT, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
		},
		
	});

});