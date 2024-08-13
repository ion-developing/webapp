var oCtrl_Main_P2P;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox"],
	function (jQuery, Controller, MessageBox) {

		var oView;

		return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.Main", {
			_oTPC_Core: {},

			onInit: function () {
				oCtrl_Main_P2P = this;
				oView = this.getView();

				this.oViewBuffer = {};

				console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.Main");

				sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function (oEvent) {
					var sRoute = oEvent.getParameter("name");

					if ("Main_PG" === sRoute) {
						oBusyDialog.close();
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

				oView.addEventDelegate({
					// not added the controller as delegate to avoid controller functions with similar names as the events
					onAfterShow: jQuery.proxy(function (oEvt) {
						TntToolPage_Borde(true);

						oCore.byId("idBtnMenu").setVisible(true);
						toolPage.setSideContent(create_SideContent());
						oCtrl_Main_P2P.f_llamado("1");

						setTimeout(function () {
							f_Show_Hide_TntToolPage_Items("oCtrl_Main_P2P");
							/*
							setTimeout(function() {
										toolPage.setSideExpanded(true);
							}, 500);*/
						}, 100);

					}, this),
					onBeforeHide: jQuery.proxy(function (oEvt) {

						oCore.byId("idBtnMenu").setVisible(false);
						toolPage.setSideExpanded(false);
						toolPage.destroySideContent();

						setTimeout(function () {
							TntToolPage_Borde(false);
						}, 250);

					}, this)
				});

				this.oViewBuffer["1"] = sap.ui.view("idVOrdnCompraXFacturar", { viewName: "com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.view.OrdnCompraXFacturar", type: "XML" });
				this.oViewBuffer["2"] = sap.ui.view("idVEnvioFacturas", { viewName: "com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.view.EnvioFacturas", type: "XML" });
				this.oViewBuffer["3"] = sap.ui.view("idVListadoFacturas", { viewName: "com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.view.ListadoFacturas", type: "XML" });
				this.oViewBuffer["4"] = sap.ui.view("idVEstatusRecepcion", { viewName: "com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.view.EstatusRecepcion", type: "XML" });
				this.oViewBuffer["5"] = sap.ui.view("idVComplementosPago", { viewName: "com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.view.ComplementosPago", type: "XML" });
				this.oViewBuffer["6"] = sap.ui.view("idVEstadoCuenta", { viewName: "com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.view.EstadoCuenta", type: "XML" });
				this.oViewBuffer["7"] = sap.ui.view("idVCotizaciones", { viewName: "com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.view.Cotizaciones", type: "XML" });
				this.oViewBuffer["8"] = sap.ui.view("idVEstatusCotizaciones", { viewName: "com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.view.EstatusCotizaciones", type: "XML" });
				this.oViewBuffer["9"] = sap.ui.view("idVRequisicionesporAutorizar", { viewName: "com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.view.RequisicionesPorAutorizar", type: "XML" });
				this.oViewBuffer["10"] = sap.ui.view("idVOrdenesdeCompraporAutorizar", { viewName: "com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.view.OrdenesCompraPorAutorizar", type: "XML" });
				this.oViewBuffer["11"] = sap.ui.view("idVAvisos", { viewName: "com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.view.Avisos", type: "XML" });
				this.oViewBuffer["12"] = sap.ui.view("idVFacturasWFporAutorizar", { viewName: "com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.view.FacturasWFPorAutorizar", type: "XML" });
			},

			f_llamado: function (oKey) {
				if (oKey == "0") return false;

				if (oKey == undefined) return false;

				var that = this;
				var oPage = oView.byId("idPage");

				// OPCIONES PARA EnvioFacturas
				if (oKey == "2") {

					function onItemPress(oEvt) {
						var key = oEvt.getParameter("listItem").getCustomData()[0].getKey();
						oCtrl_EnvioFacturas.f_Show_Hide_(key);

						oPage.removeAllContent();
						oPage.addContent(that.oViewBuffer["2"]);
						oView.byId("idVEnvioFacturas_Footer").setVisible(true);

						oDialog.close();
					};

					// ORR Validación para mostrar o no, subpestañas de Envio de Facturas
					var invwooccfdi = sap.ui.getCore().getModel("mConfiguracion").getProperty("/1/PERMISOSV/0").INV_WO_OC_CFDI
					var invwoocnormal = sap.ui.getCore().getModel("mConfiguracion").getProperty("/1/PERMISOSV/0").INV_WO_OC_NORMAL

					var invoccfdi = sap.ui.getCore().getModel("mConfiguracion").getProperty("/1/PERMISOSV/0").INV_OC_CFDI
					var invocnormal = sap.ui.getCore().getModel("mConfiguracion").getProperty("/1/PERMISOSV/0").INV_OC_NORMAL

					var invconigm = sap.ui.getCore().getModel("mConfiguracion").getProperty("/1/PERMISOSV/0").INV_CONSIGM

					var visibleSinOc = false;
					var visibleConOc = false;
					var visibleConsig = false;

					if (invwooccfdi || invwoocnormal) {
						visibleSinOc = true;
					};

					if (invoccfdi || invocnormal) {
						visibleConOc = true;
					};

					if (invconigm) {
						visibleConsig = true;
					}

					var oDialog = new sap.m.Dialog({
						showHeader: false,
						content: [
							new sap.m.List({
								visible: visibleConOc,
								inset: false,
								headerText: "{i18n>GondiQA.Main.Popover.1.title}",
								items: [
									new sap.m.StandardListItem({
										title: " - {i18n>GondiQA.Main.Popover.1.List.1}",
										type: "Navigation",
										visible: sap.ui.getCore().getModel("mConfiguracion").getProperty("/1/PERMISOSV/0").INV_OC_CFDI,
									}).addCustomData(new sap.ui.core.CustomData({ key: "1" })),
									new sap.m.StandardListItem({
										title: " - {i18n>GondiQA.Main.Popover.1.List.2}",
										type: "Navigation",
										visible: sap.ui.getCore().getModel("mConfiguracion").getProperty("/1/PERMISOSV/0").INV_OC_NORMAL,
									}).addCustomData(new sap.ui.core.CustomData({ key: "2" })),
								],
								itemPress: function (oEvt) {

									onItemPress(oEvt);
								},
							}),
							new sap.m.List({
								visible: visibleSinOc,
								inset: false,
								headerText: "{i18n>GondiQA.Main.Popover.2.title}",
								items: [
									new sap.m.StandardListItem({
										title: " - {i18n>GondiQA.Main.Popover.2.List.1}",
										type: "Navigation",
										visible: sap.ui.getCore().getModel("mConfiguracion").getProperty("/1/PERMISOSV/0").INV_WO_OC_CFDI,
									}).addCustomData(new sap.ui.core.CustomData({ key: "3" })),
									new sap.m.StandardListItem({
										title: " - {i18n>GondiQA.Main.Popover.2.List.2}",
										type: "Navigation",
										visible: sap.ui.getCore().getModel("mConfiguracion").getProperty("/1/PERMISOSV/0").INV_WO_OC_NORMAL,
									}).addCustomData(new sap.ui.core.CustomData({ key: "4" })),
								],
								itemPress: function (oEvt) {

									onItemPress(oEvt);
								},
							}),

							new sap.m.List({
								visible: visibleConsig,
								inset: false,
								headerText: "{i18n>GondiQA.Main.Popover.3.title}",
								items: [
									new sap.m.StandardListItem({
										title: " - {i18n>GondiQA.Main.Popover.3.List.1}",
										type: "Navigation",
										visible: sap.ui.getCore().getModel("mConfiguracion").getProperty("/1/PERMISOSV/0").INV_CONSIGM,
									}).addCustomData(new sap.ui.core.CustomData({ key: "5" })),
								],
								itemPress: function (oEvt) {

									onItemPress(oEvt);
								},
							})
						],
						buttons: new sap.m.Button({
							icon: "sap-icon://decline", text: "Cerrar",
							press: function (oEvent) {
								toolPage.setSideExpanded(true);
								oDialog.close();
							}
						}),
						beforeClose: function (oEvt) {
							oDialog.removeAllContent();
						},
						afterClose: function () {
							oDialog.destroy();
						}
					});
					oDialog.open();
					return true;
				}
				// ORR Buzón de facturas
				/*
				if (oKey == "3") {
					console.log("3");
					function onItemPress(oEvt) {
						var key = oEvt.getParameter("listItem").getCustomData()[0].getKey();
						oCtrl_EnvioFacturas.f_Show_Hide_(key);

						oPage.removeAllContent();
						oPage.addContent(that.oViewBuffer["2"]);
						oView.byId("idVEnvioFacturas_Footer").setVisible(true);

						oDialog.close();
					};

					var oDialog = new sap.m.Dialog({
						showHeader: false,
						content: [
							new sap.m.List({
								visible: visibleConOc,
								inset: false,
								headerText: "{i18n>GondiQA.Main.Popover.1.title}",
								items: [
									new sap.m.StandardListItem({
										title: " - {i18n>GondiQA.Main.Popover.1.List.1}",
										type: "Navigation",
										visible: sap.ui.getCore().getModel("mConfiguracion").getProperty("/1/PERMISOSV/0").INV_MAILBOX_W_CFDI,
									}).addCustomData(new sap.ui.core.CustomData({ key: "6" })),
									new sap.m.StandardListItem({
										title: " - {i18n>GondiQA.Main.Popover.1.List.2}",
										type: "Navigation",
										visible: sap.ui.getCore().getModel("mConfiguracion").getProperty("/1/PERMISOSV/0").INV_MAILBOX_WO_CFDI,
									}).addCustomData(new sap.ui.core.CustomData({ key: "7" })),
								],
								itemPress: function (oEvt) {

									onItemPress(oEvt);
								},
							}),
						],
						buttons: new sap.m.Button({
							icon: "sap-icon://decline", text: "Cerrar",
							press: function (oEvent) {
								toolPage.setSideExpanded(true);
								oDialog.close();
							}
						}),
						beforeClose: function (oEvt) {
							oDialog.removeAllContent();
						},
						afterClose: function () {
							oDialog.destroy();
						}
					});
					oDialog.open();
					return true;
				}
				*/
				/*
				if(oKey == "2.1"){
					var oDialog = new sap.m.Dialog({
						showHeader : false,
						content:
						new sap.m.List({
							inset : false,
							headerText : "{i18n>GondiQA.Main.Popover.1.title}",
							items : [
								new sap.m.StandardListItem({
									title : " - {i18n>GondiQA.Main.Popover.1.List.1}",
									type: "Navigation"
								}).addCustomData( new sap.ui.core.CustomData({key:"1"}) ),
								new sap.m.StandardListItem({
									title : " - {i18n>GondiQA.Main.Popover.1.List.2}",
									type: "Navigation"
								}).addCustomData( new sap.ui.core.CustomData({key:"2"}) ),
							],
							itemPress : function(oEvt) {
									
								var key = oEvt.getParameter("listItem").getCustomData()[0].getKey();
								oCtrl_EnvioFacturas.f_Show_Hide_(key);
	
								oPage.removeAllContent();
								oPage.addContent(that.oViewBuffer["2"]);
								oDialog.close();
								},
						}),
						buttons: new sap.m.Button({icon: "sap-icon://decline", text: "Cerrar",
							press : function(oEvent) {
								toolPage.setSideExpanded(true);
								oDialog.close();
							}
						}),
						beforeClose: function(oEvt){
							oDialog.removeAllContent();
						},
						afterClose: function() {
							oDialog.destroy();
						}
					});
					oDialog.open();
					return;
				}
				else if(oKey == "2.2"){
					var oDialog = new sap.m.Dialog({
						showHeader : false,
						content: new sap.m.List({
							inset : false,
							headerText : "{i18n>GondiQA.Main.Popover.2.title}",
							items : [
								new sap.m.StandardListItem({
									title : " - {i18n>GondiQA.Main.Popover.2.List.1}",
									type: "Navigation"
								}).addCustomData( new sap.ui.core.CustomData({key:"3"}) ),
								new sap.m.StandardListItem({
									title : " - {i18n>GondiQA.Main.Popover.2.List.2}",
									type: "Navigation"
								}).addCustomData( new sap.ui.core.CustomData({key:"4"}) ),
							],
							itemPress : function(oEvt) {
									
								var key = oEvt.getParameter("listItem").getCustomData()[0].getKey();
								oCtrl_EnvioFacturas.f_Show_Hide_(key);
	
								oPage.removeAllContent();
								oPage.addContent(that.oViewBuffer["2"]);
								oDialog.close();
								},
						}),
						buttons: new sap.m.Button({icon: "sap-icon://decline", text: "Cerrar",
							press : function(oEvent) {
								toolPage.setSideExpanded(true);
								oDialog.close();
							}
						}),
						beforeClose: function(oEvt){
							oDialog.removeAllContent();
						},
						afterClose: function() {
							oDialog.destroy();
						}
					});
					oDialog.open();
					return;
				}
				*/
				// FIN

				if (that.oViewBuffer[oKey] == undefined) {
					var oText = oCnt_FHelps.f_readTranslate("No-View");
					oCnt_FHelps.f_showMessage("WARNING", oText);
					oPage.removeAllContent();
					return true;
				}

				oPage.removeAllContent();
				oPage.addContent(that.oViewBuffer[oKey]);
				// OCULTAR FOOTER PRINCIPAL
				oView.byId("idVEnvioFacturas_Footer").setVisible(false);
			},

			createContent: function () {
				console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.Main');
			},

			back: function (evt) {
				window.history.go(-1);
			},

			onPressEnviar: function (oEvt) {
				oCtrl_EnvioFacturas.onPressEnviar(oEvt);
			},

			onPersoPress: function (oEvt, oTable) {

				if (oTable != undefined) {
					var oTableId = oTable.getId();
					this._oTPC_Core[oTableId].openDialog();
				}
				else {
					var oTableId = oEvt.getSource().getParent().getParent().getId();
					this._oTPC_Core[oTableId].openDialog();
				}
			}

		});

	});