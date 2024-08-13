var oCtrl_Main_CG;
var oCtrl_Main_CG_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator,TablePersoController) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.controller.Main", {
		_formFragments: {},
		_oTPC_Core: {},
   		
		onInit : function() {
			oCtrl_Main_CG = this;
   			oView = this.getView();
   			
   			this.oViewBuffer={};
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.controller.Main");
			
	        this._formFragments.Edit = sap.ui.xmlfragment("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.view.fragments.EditComprobacion", this);
	        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("Main_PCG" === sRoute) {
	        		oBusyDialog.close();
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
			
			oView.addEventDelegate({
   				// not added the controller as delegate to avoid controller functions with similar names as the events
				onAfterShow : jQuery.proxy(function(oEvt) {
   					TntToolPage_Borde(true);

   					oCore.byId("idBtnMenu").setVisible(true);
   	   				toolPage.setSideContent(create_SideContent());
   	   				oCtrl_Main_CG.f_llamado("21");
   	   				
   					setTimeout(function() {
   						f_Show_Hide_TntToolPage_Items("oCtrl_Main_CG");
   						/*
   						setTimeout(function() {
   							toolPage.setSideExpanded(true);
   						}, 500);*/
					}, 100);
   					
   				}, this),
   				onBeforeHide : jQuery.proxy(function(oEvt) {
   					
   					oCore.byId("idBtnMenu").setVisible(false);
   					toolPage.setSideExpanded(false);
   					toolPage.destroySideContent();
   					
   					setTimeout(function() {
   						TntToolPage_Borde(false);
					}, 250);
   					
   				}, this)
   			});
	        
			this.oViewBuffer["21"] = sap.ui.view("idVCrearSolicitud",{ viewName: "com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.view.CrearSolicitud", type: "XML" });
			this.oViewBuffer["22"] = sap.ui.view("idVLtaAnticipos",{ viewName: "com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.view.LtaAnticipos", type: "XML" });
			this.oViewBuffer["23"] = sap.ui.view("idVLtaComprobaciones",{ viewName: "com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.view.LtaComprobaciones", type: "XML" });
			this.oViewBuffer["24"] = sap.ui.view("idVEstadoCuenta_CG",{ viewName: "com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.view.EstadoCuenta", type: "XML" });
			this.oViewBuffer["25"] = sap.ui.view("idVAprobaciones",{ viewName: "com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.view.Aprobaciones", type: "XML" });
		},
		
		onAfterRendering : function(oEvt) {
			if(oCtrl_Main_CG_flag == true)
				return;
			
			oCtrl_Main_CG_flag = true;
			/*
			 * 
			 */
   			var oTableID = oCore.byId("idTableFLtaComprobaciones");
   			// Hidden/view Columns
   			DemoPersoService.setMyPersData( oTableID );
   			
   			// init and activate controller
   			this._oTPC_Core["idTableFLtaComprobaciones"] = new TablePersoController({
				table: oTableID,
				//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
				componentName: "demoApp",
				persoService: DemoPersoService,
			}).activate();
			/*
			 * 
			 */
			oTableID = oCore.byId("idTableDetalleCecos");
   			// Hidden/view Columns
   			DemoPersoService.setMyPersData( oTableID );
   			
   			// init and activate controller
   			this._oTPC_Core["idTableDetalleCecos"] = new TablePersoController({
				table: oTableID,
				//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
				componentName: "demoApp",
				persoService: DemoPersoService,
			}).activate();
			/*
			 * 
			 *
			oTableID = oCore.byId("idTableDoc");
   			// Hidden/view Columns
   			DemoPersoService.setMyPersData( oTableID );
   			
   			// init and activate controller
   			this._oTPC_Core["idTableDoc"] = new TablePersoController({
				table: oTableID,
				//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
				componentName: "demoApp",
				persoService: DemoPersoService,
			}).activate();
   			*/
		},
		
		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.ComprobacionGastos.controller.Main');
		},
		
		onBeforeShow: function(oEvt){
//			oView.byId("idIconTabBarNoIcons").setSelectedKey("1");
		},

   		back : function(evt) {
			window.history.go(-1);
		},
		
		f_llamado: function(oKey){
			if(oKey == "0") return false;
			
			if(oKey == undefined) return false;
			
			var that = this;
			var oPage = oView.byId("idPage");
			
			if(oKey == "21")
				oView.byId("idVCrearSolicitud_Footer").setVisible(true);
			else
				oView.byId("idVCrearSolicitud_Footer").setVisible(false);
			
			if(oKey.indexOf("25") >= 0){
				var opc = oKey.split(".")[1];
				oCtrl_Aprobaciones.f_Show_Hide_AntComprob(opc);
				oKey = oKey.split(".")[0];
			}
			
			if(that.oViewBuffer[oKey] == undefined){
				var oText = oCnt_FHelps.f_readTranslate("No-View");
				oCnt_FHelps.f_showMessage("WARNING", oText );
				oPage.removeAllContent();
				return;
			}
			
			oPage.removeAllContent();
			oPage.addContent(that.oViewBuffer[oKey]);
		},
		
		onPressNuevaSolicitud: function(oEvt) {
			oCtrl_CrearSolicitud.onPressNuevaSolicitud();
		},

		handleIconTabBarSelect: function(oEvt){
			var key = oEvt.getParameter("key");
			
			switch (key) {
				case "5":
					var popoverT = new sap.m.Popover({
						contentHeight: "200px",
						placement: sap.m.PlacementType.Bottom,
						//contentWidth: "100%",
						showHeader : false,
						footer: new sap.m.Bar({ 
							//contentMiddle 
							contentRight: [
								new sap.m.Button({icon: "sap-icon://decline", text: "Cerrar",
									press : function(oEvent) {
										popoverT.close();
									}
								})
							]
						}),
						afterClose: function() {
							popoverT.destroy();
						},
						content: [/*
						          new sap.m.VBox({
						        	  items: [
						        		  new sap.m.Label({text: " - Aprobaciones Anticipos"}),
						        		  new sap.m.Label({text: " - Aprobaciones Comprobaciones"})
						        	  ]
						          }).addStyleClass("sapUiSmallMargin sapUiLargeMarginTop")*/
							new sap.m.List({
								inset : true,
								headerText : "{i18n>ComprobacionGastos.Main.Popover.title}",
								items : [
									new sap.m.StandardListItem({
										title : " - {i18n>ComprobacionGastos.Main.Popover.List.1}",
										type: "Navigation"
									}).addCustomData( new sap.ui.core.CustomData({key:"1"}) ),
									new sap.m.StandardListItem({
										title : " - {i18n>ComprobacionGastos.Main.Popover.List.2}",
										type: "Navigation"
									}).addCustomData( new sap.ui.core.CustomData({key:"2"}) ),
								],
								itemPress : function(oEvt) {
		 							
									var key = oEvt.getParameter("listItem").getCustomData()[0].getKey();
									oCtrl_Aprobaciones.f_Show_Hide_AntComprob(key);
									
									popoverT.close();
		 						},
							}).addStyleClass("sapUiSmallMarginTop")
						],
						initialFocus: "focusInput"
					});

					var pos = parseInt(key) - 1;
					popoverT.openBy(oEvt.getSource().getItems()[ pos ]);
					break;
					
				default:
					break;
			}
		},
		
		onPersoPress: function(oEvt, oTable) {
			
			if(oTable != undefined){
				var oTableId = oTable.getId();
				this._oTPC_Core[ oTableId ].openDialog();
			}
			else{
				var oTableId = oEvt.getSource().getParent().getParent().getId();
				this._oTPC_Core[ oTableId ].openDialog();
			}
		},
		
	});
});