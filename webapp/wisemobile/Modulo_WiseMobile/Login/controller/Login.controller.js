var oCtrl_Login; oCtrl_Login

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox"],
	function (jQuery, Controller, MessageBox) {

		var oView;
		var oBusyDialog_a;

		return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login", {

			_formFragments: {},

			onInit: function () {
				// ORR
				var clienteId = "cydsa";

				//console.log(this.getView().byId("TntToolPage"));
				//console.log(sap.ui.getCore().byId("TntToolPage"));
				//console.log(sap.ui.getCore().byId("__image1"));
				//console.log(this.byId("loginViewImage"));
				//console.log(sap.ui.getCore().byId("__title0"))

				if (clienteId === "cydsa") {
					// Toolbar left image
					var imageToolbarLeft = sap.ui.getCore().byId("__image0");
					imageToolbarLeft.setSrc('wisemobile/Public/Img/Logo_Cydsa_New.png');
					imageToolbarLeft.setHeight("20px");
					imageToolbarLeft.setWidth("40px");

					// Toolbar Image
					/*
					var imageToolbar = sap.ui.getCore().byId("__image1");
					imageToolbar.setSrc('wisemobile/Public/Img/Logo_Cydsa_New.png');
					imageToolbar.setHeight("20px");
					imageToolbar.setWidth("40px");
					*/

					// Login Image
					var loginImage = this.byId("loginViewImage");
					loginImage.setSrc('wisemobile/Public/Img/Logo_Cydsa_New.png');
					loginImage.setHeight("150px");
					loginImage.setWidth("100%");

					//Toolbar Text
					var toolbarText = sap.ui.getCore().byId("__title0");
					toolbarText.setText("Portal Proveedores")

				} else if (clienteId === "wise") {
					// Toolbar left image
					var imageToolbarLeft = sap.ui.getCore().byId("__image0");
					imageToolbarLeft.setSrc('wisemobile/Public/Img/Logo_Wise.webp');
					imageToolbarLeft.setHeight("20px");
					imageToolbarLeft.setWidth("20px");

					// Toolbar Image
					/*
					var imageToolbar = sap.ui.getCore().byId("__image1");
					imageToolbar.setSrc('wisemobile/Public/Img/Logo_Wise.webp');
					imageToolbar.setHeight("20px");
					imageToolbar.setWidth("20px");
					*/

					// Login Image
					var loginImage = this.byId("loginViewImage");
					loginImage.setSrc('wisemobile/Public/Img/Logo_Wise.webp');
					loginImage.setHeight("150px");
					loginImage.setWidth("150px");

					//Toolbar Text
					var toolbarText = sap.ui.getCore().byId("__title0");
					toolbarText.setText("Portal Proveedores");
				}

				//

				oCtrl_Login = this;
				oView = this.getView();

				//oView.byId("idComboLangu").setSelectedKey(sLangu);
				console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login");

				sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function (oEvent) {
					var sRoute = oEvent.getParameter("name");

					if ("Login" === sRoute) {
						oCore.byId("idBtnBack_2").setVisible(false);
						oCore.byId("idBtnCambiarContra").setVisible(false);
					}
					else {
						oCore.byId("idBtnBack_2").setVisible(true);
						oCore.byId("idBtnCambiarContra").setVisible(true);
					}
					var oView_temp = oEvent.getParameter("view");
					oView_temp.bindElement({ path: "/Table", model: "mManageControls" });
				});
				//visualización de botón
				oCore.byId("idBtnCambiarContra").attachPress(function () {
					// Oculta el botón "idBtnBack_2"
					oCore.byId("idBtnBack_2").setVisible(false);
				});

				if (oBusyDialog_a == undefined)
					oBusyDialog_a = new sap.m.BusyDialog({
						title: oCnt_FHelps.f_readTranslate("Wait.title")
					});

				this._formFragments.Sociedades = sap.ui.xmlfragment("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.view.fragments.Sociedades", this);

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
						if (!oEvt.firstTime) TntToolPage_Borde(false);
						/*
						if(oEvt.firstTime) {
							setTimeout(function() {
								$('head').append('<style>.sapMSelectListItemBaseSelected{background: #f8d7d7; !important;}</style>');
								$('head').append('<style>.sapMBtnInner{color: #bc2423;}</style>');
							}, 2000);
						}
						*/
					}, this),

				});

			},

			createContent: function () {
				console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login');
			},
			/*
			onPasswordChange : function(oEvt) {
				console.log('onPasswordChange called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login');
				var oView = this.getView();
			},
			*/
			onPress: function (oEvt) {
				var that = this;
				/** ASVRAMIREZ
				 * INICIO DE SESION CON IMPLEMENTACION CON COLORES Y AMAZON WEB SERVICES
				 */
				/*
				var oUsuario= oView.byId('myUser').getValue();
				var oClave 	= oView.byId('myPassword').getValue();
				
				if(oCnt_FHelps.f_Inputs([oView.byId('myUser'), oView.byId('myPassword') ]) == true){
					//if(oUsuario=="VRAMIREZ" && oClave=="demoWise"){
						
						oCore.User.User = oUsuario;
						oCore.User.Password = oClave;
						
						var router = sap.ui.core.UIComponent.getRouterFor(this);
						
						var ofunction = function(){
							oCore.User.Sesion = true;
							router.navTo("Menu",{},false);
							// AQUI VIENEN LOS COLORES
							// INICIO
							var oData = oCore.getModel("mCombinaciones").getProperty("/COMBINACIONES/combinaciones");
							var oComb;
							
							for(var i=0; i<oData.length; i++){
								if(oData[i].activo == "X"){
									oComb = jQuery.extend({}, oData[i] );
									break;
								}
							}
							
							if(oComb == undefined) return;
	
							for(var j=1; j<=15; j++){
								//if(oComb["c"+i] != undefined)
								var oOpc 		= j;
								var oData 		= jQuery.extend(true, [], oCore.getModel("mColores").getProperty("/"+oOpc) );
								//var CoAntiguo = oCore.getModel("mColores").getProperty("/Colores/"+oOpc);
								var CoNuevo		= oComb["c"+j];
								
								for(var i=0; i< oData.length; i++){
									
									if(j==15){/*
										CoAntiguo = CoAntiguo.split(",");
										var c1_CoAntiguo = CoAntiguo[0];
										var c2_CoAntiguo = CoAntiguo[1];
										var c3_CoAntiguo = CoAntiguo[2];-/
										var re;
										
										CoNuevo = CoNuevo.split(",");
										var c1_CoNuevo = CoNuevo[0];
										var c2_CoNuevo = CoNuevo[1];
										var c3_CoNuevo = CoNuevo[2];
										
										var css = oData[i].cssString;
										
										re = new RegExp("XXX", 'g');
										css = css.replace(re,c1_CoNuevo);
										
										re = new RegExp("YYY", 'g');
										css = css.replace(re,c2_CoNuevo);
										
										re = new RegExp("ZZZ", 'g');
										css = css.replace(re,c3_CoNuevo);
	
										oCnt_FHelps.f_StyleString( css , oOpc , (c1_CoNuevo+","+c2_CoNuevo+","+c3_CoNuevo) );
									}
									else{
										var re = new RegExp("XXX", 'g');
										var css = oData[i].cssString.replace(re, CoNuevo);
										oCnt_FHelps.f_StyleString( css , oOpc, CoNuevo);
									}
									
								}
							}
							// FIN
						}
						
						var ofunctionS = function(){
							oCnt_FHelps.oServ_CombinacXUser(undefined, undefined, ofunction);
						};
						
						oCnt_FHelps.oServ_getToken(undefined, ofunctionS);
	//				
	//				}
	//				else{
	//			    	var oText = oCnt_FHelps.f_readTranslate("Login-error");
	//					oCnt_FHelps.f_showMessage("ERROR", oText);
	//				}
					
				}			
				*/
				/** ASVRAMIREZ
				 * FIN
				 */


				// EL SGTE ACCESO ES LA FORMA TRADICIONAL SIMPLE, LOGIN PASSWORD Y ACCESO A LA APLICACIÓN
				oUsuario_login = oView.byId('myUser').getValue();
				oPassword_login = oView.byId('myPassword').getValue();
				//oLenguaje = oView.byId('idComboLangu').getSelectedKey();
				//oMandante = oView.byId('idComboMandante').getSelectedKey();
				// ORR
				oMandante = "100";
				oLenguaje = "ES";



				switch (oMandante) {
					case "100":

						//ip_apache_dev = this._getAppModulePath();
						webServiceURL = ip_apache_dev + destination + oPath_copa_ini + oMandante + oPath_copa_fin;
						webServiceURL_ZW18 = ip_apache_dev + destination + oPath_enfa_ini + oMandante + oPath_enfa_fin;
						webServiceURL_ZW18_2 = ip_apache_dev + destination + oPath_enfa_ini_2 + oMandante + oPath_enfa_fin_2;
						webServiceURL_ZWS = ip_apache_dev + destination + oPath_coti_ini + oMandante + oPath_coti_fin;
						webServiceURL_ZW20 = ip_apache_dev + destination + oPath_login_ini + oMandante + oPath_login_fin;
						webServiceURL_ZW04 = ip_apache_dev + destination + oPath_aprob_ini + oMandante + oPath_aprob_fin;
						break;
					case "600":
						//ip_apache_qas = this._getAppModulePath();
						webServiceURL = ip_apache_qas + destination + oPath_copa_ini + oMandante + oPath_copa_fin;
						webServiceURL_ZW18 = ip_apache_qas + destination + oPath_enfa_ini + oMandante + oPath_enfa_fin;
						webServiceURL_ZW18_2 = ip_apache_qas + destination + oPath_enfa_ini_2 + oMandante + oPath_enfa_fin_2;
						webServiceURL_ZWS = ip_apache_qas + destination + oPath_coti_ini + oMandante + oPath_coti_fin;
						webServiceURL_ZW20 = ip_apache_qas + destination + oPath_login_ini + oMandante + oPath_login_fin;
						webServiceURL_ZW04 = ip_apache_qas + destination + oPath_aprob_ini + oMandante + oPath_aprob_fin;
						break;
					case "700":
						//ip_apache_prd = this._getAppModulePath();
						webServiceURL = ip_apache_prd + destination + oPath_copa_ini + oMandante + oPath_copa_fin;
						webServiceURL_ZW18 = ip_apache_prd + destination + oPath_enfa_ini + oMandante + oPath_enfa_fin;
						webServiceURL_ZW18_2 = ip_apache_prd + destination + oPath_enfa_ini_2 + oMandante + oPath_enfa_fin_2;
						webServiceURL_ZWS = ip_apache_prd + destination + oPath_coti_ini + oMandante + oPath_coti_fin;
						webServiceURL_ZW20 = ip_apache_prd + destination + oPath_login_ini + oMandante + oPath_login_fin;
						webServiceURL_ZW04 = ip_apache_prd + destination + oPath_aprob_ini + oMandante + oPath_aprob_fin;
						break;

					default:
						break;
				}

				webServiceURL_ZW20 = ip_apache_dev + oPath_login_ini;
				webServiceURL_ZW12 = ip_apache_dev + oPath_copa_ini;
				webServiceURL_ZW18 = ip_apache_dev + oPath_coti_ini;
				webServiceURL_ZW18_2 = ip_apache_dev + oPath_enfa_ini_2;
				webServiceURL_Cotizaciones = ip_apache_dev + oPath_cotizaciones;
				// ORR Validacion PAC
				validacionPAC = ip_apache_pac + url
				//console.log(validacionPAC);

				// ORR Portal Externo
				portalExterno = ip_apache_pe + urlPe
				//console.log(portalExterno);

				if (oCnt_FHelps.f_Inputs([oView.byId('myUser'), oView.byId('myPassword')]) == true) {

					function oFunction(oData) {

						sap.ui.getCore().getModel("mUser").setData(oData);
						sap.ui.getCore().getModel("mUser").refresh();

						var oObjeto = sap.ui.getCore().getModel("mUser").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI20_-FM_WS_LOGIN_USER.Response/IM_OUT_LOGIN");

						var Type = sap.ui.getCore().getModel("mUser").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI20_-FM_WS_LOGIN_USER.Response/IM_RETURN/item").TYPE;
						var Message = sap.ui.getCore().getModel("mUser").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI20_-FM_WS_LOGIN_USER.Response/IM_RETURN/item").MESSAGE;


						if (Type == "S") {
							// ORR Se setea campo lRfc para portal externo
							oC_Modulo_WiseMobile.onSetlRfc(oObjeto.STCD1);
							//

							var oDialog = new sap.m.Dialog({
								title: "{i18n>Popup.Sociedades.Title}",
								contentWidth: "30%",
								content: [
									oCtrl_Login._formFragments.Sociedades
								],
								buttons: [
									new sap.m.Button({
										text: "{i18n>Popup.Sociedades.Button.Cancelar}",
										press: function (oEvt) {
											oDialog.close();
										}
									})
								],
								beforeOpen: function (oEvt) {
								},
								beforeClose: function (oEvt) {
									oDialog.removeAllContent();
								},
								afterClose: function (oEvt) {
									oDialog.destroy();
								}
							});
							oDialog.open();
							oCtrl_Login.oServ_Sociedades_ZW20();
							/**/
						} else {
							oCnt_FHelps.f_showMessage("ERROR", Message, undefined, oCnt_FHelps.f_readTranslate("Error.title"));
						}
					}

					oCtrl_Login.oServ_Login(oFunction);

				}

				// ORR
				var userInput = this.getView().byId("myUser");
				userInput.setValue("");

				var userPassword = this.getView().byId("myPassword");
				userPassword.setValue("");
				//
			},

			oServ_Login: function (callback) {
				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI20_-FM_WS_LOGIN_USER>';
				soapMessage = soapMessage + '<EX_IN_CREDENTIALS>';
				soapMessage = soapMessage + '<USER>' + oUsuario_login + '</USER>';
				soapMessage = soapMessage + '<PWD>' + oPassword_login + '</PWD>';
				if (oLenguaje == "ES") {
					soapMessage = soapMessage + '<LANGUAGE>S</LANGUAGE>';
				}
				if (oLenguaje == "EN") {
					soapMessage = soapMessage + '<LANGUAGE>E</LANGUAGE>';
				}
				soapMessage = soapMessage + '</EX_IN_CREDENTIALS>';
				soapMessage = soapMessage + '</urn:_-WI20_-FM_WS_LOGIN_USER>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';

				oBusyDialog.open();
				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW20,
					crossDomain: true,
					type: "POST",
					cache: false,
					data: soapMessage,
					contentType: "application/soap+xml; charset=utf-8",
					headers: {
						"Authorization": "Basic " + btoa(oUsuario + ":" + oPassword),
						"accept-language": oLenguaje,
						"Access-Control-Allow-Origin": "*"
					},
					success: OnSuccess,
					error: OnError
				});

				function OnSuccess(data, status) {
					var json = xml2json(data);
					callback(json);
					oBusyDialog.close();

				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					var oText = oCnt_FHelps.f_readTranslate("Login-error");
					oCnt_FHelps.f_showMessage("ERROR", oText);
					oBusyDialog.close();
				}
			},

			oServ_Sociedades_ZW20: function () {
				console.log(oUsuario_login);

				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI20_-FM_WS_GET_COMPANY_LIST>';
				soapMessage = soapMessage + '<IV_USERWEB>' + oUsuario_login + '</IV_USERWEB>';
				soapMessage = soapMessage + '</urn:_-WI20_-FM_WS_GET_COMPANY_LIST>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';

				oBusyDialog.open();
				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW20,
					type: "POST",
					cache: false,
					data: soapMessage,
					contentType: "application/soap+xml; charset=utf-8",
					headers: {
						"Authorization": "Basic " + btoa(oUsuario + ":" + oPassword),
						"accept-language": oLenguaje
					},
					success: OnSuccess,
					error: OnError
				});

				function OnSuccess(data, status) {
					var json = xml2json(data);

					sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW20", json);//revisar datos

					var mData = sap.ui.getCore().getModel("mCombos").getProperty("/SOCIEDADES_ZW20/SOAP:Envelope/SOAP:Body/n0:_-WI20_-FM_WS_GET_COMPANY_LIST.Response/ET_BUKRS_LIST/item");
					var length = mData.length;


					if (length == undefined) {
						sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW20", [mData]);//revisar datos

					} else {
						sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW20", mData);//revisar datos

					}

					oBusyDialog.close();
				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					oCnt_FHelps.f_showMessage("ERROR", error);
				}
			},

			oServ_Configuracion: function (oObject, callback) {
				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI20_-FM_WS_GET_CONFIG>';
				soapMessage = soapMessage + '<EX_IN_GET_CONFIG>';
				soapMessage = soapMessage + '<BUKRS>' + oObject.BUKRS + '</BUKRS>';
				soapMessage = soapMessage + '<USERWEB>' + oUsuario_login + '</USERWEB>';
				if (oLenguaje == "ES") {
					soapMessage = soapMessage + '<LANGUAGE>S</LANGUAGE>';
				}
				if (oLenguaje == "EN") {
					soapMessage = soapMessage + '<LANGUAGE>E</LANGUAGE>';
				}
				soapMessage = soapMessage + '</EX_IN_GET_CONFIG>';
				soapMessage = soapMessage + '</urn:_-WI20_-FM_WS_GET_CONFIG>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';

				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW20,
					type: "POST",
					cache: false,
					data: soapMessage,
					contentType: "application/soap+xml; charset=utf-8",
					headers: {
						"Authorization": "Basic " + btoa(oUsuario + ":" + oPassword),
						"accept-language": oLenguaje
					},
					success: OnSuccess,
					error: OnError
				});

				function OnSuccess(data, status) {
					var json = xml2json(data);
					callback(json);


				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					var oText = oCnt_FHelps.f_readTranslate("Login-error");
					oCnt_FHelps.f_showMessage("ERROR", oText);
				}
			},

			oServ_SuplerData: function (oObject) {
				/*
				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI18_-SUPPLIER_DATA>';
				soapMessage = soapMessage + '<IV_BUKRS>' + oObject.BUKRS + '</IV_BUKRS>';
				soapMessage = soapMessage + '<IV_LIFNR>' + Lifnr + '</IV_LIFNR>';
				soapMessage = soapMessage + '</urn:_-WI18_-SUPPLIER_DATA>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';
				*/
				// ORR Servicio para obtener nombre de proveedor
				var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soapenv:Header/>';
				soapMessage = soapMessage + '<soapenv:Body>';
				soapMessage = soapMessage + '<urn:_-WI18_-SUPPLIER_DATA>';
				soapMessage = soapMessage + '<IV_BUKRS>' + oObject.BUKRS + '</IV_BUKRS>';
				soapMessage = soapMessage + '<IV_LIFNR>' + Lifnr + '</IV_LIFNR>';
				soapMessage = soapMessage + '</urn:_-WI18_-SUPPLIER_DATA>';
				soapMessage = soapMessage + '</soapenv:Body>';
				soapMessage = soapMessage + '</soapenv:Envelope>';

				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW18,
					type: "POST",
					cache: false,
					data: soapMessage,
					contentType: "application/soap+xml; charset=utf-8",
					headers: {
						"Authorization": "Basic " + btoa(oUsuario + ":" + oPassword),
						"accept-language": oLenguaje
					},
					success: OnSuccess,
					error: OnError
				});

				function OnSuccess(data, status) {
					var json = xml2json(data);
					var mModel = sap.ui.getCore().getModel("mSupler");

					mModel.setData(json);//revisar datos
					mModel.refresh();

					var mData = mModel.getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-SUPPLIER_DATA.Response/ES_SUPP_DATA_OUT");
					Name = mData.NAME1;

					// ORR Setear propiedad del nombre en el modelo 
					var mUserModel = sap.ui.getCore().getModel("mUser");
					mUserModel.setProperty("/Name", Name);

				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					var oText = oCnt_FHelps.f_readTranslate("Login-error");
					oCnt_FHelps.f_showMessage("ERROR", oText);
				}
			},

			onChangeSociedad: function (oEvt) {

				var sPath = oEvt.oSource._aSelectedPaths[0];
				var oObject = sap.ui.getCore().getModel("mCombos").getProperty(sPath);
				//*Cargar Sociedad seleccionada
				//Obtener modelo mConfiguracionUsuario
				var mModel = sap.ui.getCore().getModel("mConfiguracionUsuario");
				//Setear la Sociedad
				mModel.setProperty("/Sociedad", oObject.BUKRS);
				//Refrescar modelo
				mModel.refresh();

				function oFunction(oData) {

					var mModel = sap.ui.getCore().getModel("mConfiguracion");

					mModel.setData(oData);//revisar datos
					mModel.refresh();


					var mData = mModel.getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI20_-FM_WS_GET_CONFIG.Response/EX_OUT_MENUWEB_V");
					if (mData != undefined) {
						Bname = mData.Bname;
						var mDataV = mModel.getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI20_-FM_WS_GET_CONFIG.Response/EX_OUT_MENUWEB_V");

						Lifnr = mDataV.LIFNR;
						oCtrl_Login.oServ_SuplerData(oObject);

						// mData.AppPurreq = (mData.AppPurreq == "X") ? (true) : (false);
						// mData.AppPurord = (mData.AppPurord == "X") ? (true) : (false);
						// mData.AppInvwpo = (mData.AppInvwpo == "X") ? (true) : (false);
						// mData.AppTrareq = (mData.AppTrareq == "X") ? (true) : (false);
						// mData.AppTraexp = (mData.AppTraexp == "X") ? (true) : (false);
						// mData.AppInvdif = (mData.AppInvdif == "X") ? (true) : (false);

						mDataV.INV_OC_CFDI = (mDataV.INV_OC_CFDI == "X") ? (true) : (false);
						mDataV.INV_OC_NORMAL = (mDataV.INV_OC_NORMAL == "X") ? (true) : (false);
						mDataV.INV_WO_OC_CFDI = (mDataV.INV_WO_OC_CFDI == "X") ? (true) : (false);
						mDataV.INV_WO_OC_NORMAL = (mDataV.INV_WO_OC_NORMAL == "X") ? (true) : (false);
						mDataV.INV_LIST_STATUS = (mDataV.INV_LIST_STATUS == "X") ? (true) : (false);
						mDataV.INV_LIST_PO = (mDataV.INV_LIST_PO == "X") ? (true) : (false);
						mDataV.INV_ACC_STATUS = (mDataV.INV_ACC_STATUS == "X") ? (true) : (false);
						mDataV.INV_REC_STATUS = (mDataV.INV_REC_STATUS == "X") ? (true) : (false);
						mDataV.INV_RFQ_CREATE = (mDataV.INV_RFQ_CREATE == "X") ? (true) : (false);
						mDataV.INV_RFQ_LIST_STATUS = (mDataV.INV_RFQ_LIST_STATUS == "X") ? (true) : (false);
						mDataV.PAY_LIST_STATUS = (mDataV.PAY_LIST_STATUS == "X") ? (true) : (false);
						mDataV.INV_MESSAGE = (mDataV.INV_MESSAGE == "X") ? (true) : (false);
						mDataV.INV_MAILBOX_W_CFDI = (mDataV.INV_MAILBOX_W_CFDI == "X") ? (true) : (false);
						mDataV.INV_MAILBOX_WO_CFDI = (mDataV.INV_MAILBOX_WO_CFDI == "X") ? (true) : (false);
						mDataV.INV_GET_MAILBOX = (mDataV.INV_GET_MAILBOX == "X") ? (true) : (false);
						mDataV.INV_CHANGE_PASSWORD = (mDataV.INV_CHANGE_PASSWORD == "X") ? (true) : (false);
						mDataV.INV_BUSINESS_AREA_LIST = (mDataV.INV_BUSINESS_AREA_LIST == "X") ? (true) : (false);
						mDataV.INV_ADD_OTHER_PDF = (mDataV.INV_ADD_OTHER_PDF == "X") ? (true) : (false);
						mDataV.INV_WO_OC_CFDI_I = (mDataV.INV_WO_OC_CFDI_I == "X") ? (true) : (false);
						mDataV.INV_WO_OC_CFDI_I = (mDataV.INV_WO_OC_CFDI_I == "X") ? (true) : (false);
						mDataV.INV_QUOTATION = (mDataV.INV_QUOTATION == "X") ? (true) : (false);
						mDataV.INV_STATUS_QUOTATION = (mDataV.INV_STATUS_QUOTATION == "X") ? (true) : (false);
						mDataV.INV_CREDIT_MEMO = (mDataV.INV_CREDIT_MEMO == "X") ? (true) : (false);
						mDataV.INV_WO_CREDIT_MEMO = (mDataV.INV_WO_CREDIT_MEMO == "X") ? (true) : (false);
						mDataV.INV_CONSIGM = (mDataV.INV_CONSIGM == "X") ? (true) : (false);
						mDataV.PAC_VALIDATION = (mDataV.PAC_VALIDATION == "X") ? (true) : (false);

						/*if(mDataV.InvOcCfdi==true){exite_permisoVen=true;}
						if(mDataV.InvOcNormal==true){exite_permisoVen=true;}
						if(mDataV.InvWoOcCfdi==true){exite_permisoVen=true;}
						if(mDataV.InvWoOcNormal==true){exite_permisoVen=true;}
						if(mDataV.InvListStatus==true){exite_permisoVen=true;}	            
						if(mDataV.InvListPo==true){exite_permisoVen=true;}
						if(mDataV.InvAccStatus==true){exite_permisoVen=true;}	            
						if(mDataV.InvRecStatus==true){exite_permisoVen=true;}	            
						if(mDataV.InvRfqCreate==true){exite_permisoVen=true;}
						if(mDataV.InvRfqListStatus==true){exite_permisoVen=true;}
						if(mDataV.PayListStatus==true){exite_permisoVen=true;}
						if(mDataV.InvMessage==true){exite_permisoVen=true;}	            
						if(mDataV.InvMailboxWCfdi==true){exite_permisoVen=true;}
						if(mDataV.InvMailboxWoCfdi==true){exite_permisoVen=true;}
						if(mDataV.InvGetMailbox==true){exite_permisoVen=true;}
						if(mDataV.InvChangePassword==true){exite_permisoVen=true;}
						if(mDataV.InvBusinessAreaList==true){exite_permisoVen=true;}
						if(mDataV.InvAddOtherPdf==true){exite_permisoVen=true;}
						if(mDataV.InvWoOcCfdiIc==true){exite_permisoVen=true;}
						if(mDataV.InvWoOcNormalIc==true){exite_permisoVen=true;}
						if(mDataV.InvQuotation==true){exite_permisoVen=true;}
						if(mDataV.InvStatusQuotation==true){exite_permisoVen=true;}
						if(mDataV.InvCreditMemo==true){exite_permisoVen=true;}
						if(mDataV.InvWoCreditMemo==true){exite_permisoVen=true;}*/

						sesion = true;
						var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_Login);
						router.navTo("Menu", {}, false);

						var oText = oCnt_FHelps.f_readTranslate("Login-successful");
						sap.m.MessageToast.show(oText);

						// ORR
						// Permisos (No sirve para permisos de íconos laterales)
						mData = {
							"AppPurreq": false,
							"AppPurord": false,
							"AppInvwpo": true,
							"AppTrareq": true,
							"AppTraexp": true,
							"AppInvdif": true
						}
						// PermisosV (Test)
						/*
						mDataV = {
							"USERWEB": "5000155",
							"LIFNR": "0005000155",
							"PAC_VALIDATION": true,
							"INV_OC_CFDI": true, // Recepción facturas - Envío facturas
							"INV_OC_NORMAL": true, // No se usa, se revisa con Ángel
							"INV_WO_OC_CFDI": true, // Recepción facturas - Envío facturas
							"INV_WO_OC_NORMAL": true, // Recepción facturas . Envio facturas
							"INV_LIST_STATUS": true, // Consultas - Listado de facturas
							"INV_LIST_PO": true, // Consultas - Órden de compra por facturar
							"INV_ACC_STATUS": true, // Consultas - Estado de cuenta
							"INV_REC_STATUS": true, // Consultas - Estatus de recepción
							"INV_RFQ_CREATE": true, // Recepicón cotizaciones - Cotizaciones
							"INV_RFQ_LIST_STATUS": true, // Recepción cotizaciones - Estatus cotizaciones
							"PAY_LIST_STATUS": true, // Recepción complemento de pago - Complementos de pago 
							"INV_MESSAGE": true, // Avisos
							"INV_MAILBOX_W_CFDI": true, // No hace nada - Buzón con CFDI
							"INV_MAILBOX_WO_CFDI": true, // No hace nada - Buzón sin CFDI W120 
							"INV_GET_MAILBOX": true, // No hace nada - Buzón consultar
							"INV_CHANGE_PASSWORD": true, // No hace nada - Cambiar contraeña
							"INV_BUSINESS_AREA_LIST": true, // No se usa, se revisa con Ángel
							"INV_ADD_OTHER_PDF": true, // No hace nada - Agregar otro PDF
							"INV_WO_OC_CFDI_I": true, // No hace nada - Factura sin OC CFDICI
							"INV_QUOTATION": true, // No hace nada
							"INV_STATUS_QUOTATION": true, // No hace nada
							"INV_CREDIT_MEMO": true, // No hace nada - Orden de compra nota de crédito
							"INV_WO_CREDIT_MEMO": true, // No hace nada -Sin Orden de compra nota de crédito WI20
							"INV_CONSIGM": true // No hace nada Consignación
						};
						*/

						console.log(mData);
						console.log(mDataV);

						mModel.setData([{ PERMISOS: [mData] }, { PERMISOSV: [mDataV] }]);


						/*if(exite_permisoVen==true && LifnrVen==null){
							oCnt_FHelps.f_showMessage("INFORMATION", oCnt_FHelps.f_readTranslate("Popup.Message.1"), undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );					
						}*/

						/*if(Username==null){
							oCnt_FHelps.f_showMessage("INFORMATION", oCnt_FHelps.f_readTranslate("Popup.Message.2"), undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
						}*/
					} else {
						var oText = "No Existe Informacion";
						oCnt_FHelps.f_showMessage("ERROR", oText);
					}
				}


				oCtrl_Login.oServ_Configuracion(oObject, oFunction);

			},

			onSearchSociedades: function (oEvent) {
				// add filter for search
				var aFilters = [];
				var sQuery = oEvent.getSource().getValue();

				if (sQuery && sQuery.length > 0) {
					var filters = [new sap.ui.model.Filter("BUKRS", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("BUTXT", sap.ui.model.FilterOperator.Contains, sQuery)
					];
				}

				var oFilter = new sap.ui.model.Filter(filters, false);

				// update list binding
				//var oList = this.getView().byId("sociedadesList");
				var oList = sap.ui.getCore().byId("sociedadesList")
				console.log(oList);
				var oBinding = oList.getBinding("items");
				oBinding.filter(oFilter, "Application");
			},

			onSetLanguageSwitch: function () {

				var switchLamguage = sap.ui.getCore().byId("idCamniarLenguaje");
				var labelUser = this.getView().byId("myUserLabel");
				var labelPassword = this.getView().byId("myPasswordLabel");
				var language = "";
				var valueSwitchLanguage = switchLamguage.getState();

				if (valueSwitchLanguage === true) {
					language = "ES";
					labelUser.setText("Usuario");
					labelPassword.setText("Contraseña");
				} else {
					language = "EN";
					labelUser.setText("User");
					labelPassword.setText("Password");
				}

				this.onChangeIdioma(language);
			},

			onChangeIdioma: function (language) {
				// ORR 		function oEvt
				var that = this;

				//var oId = oView.byId('idComboLangu').getSelectedKey();
				var oId = language;

				oCnt_FHelps.languageChange(
					oId,
					function () {
						//	var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_Quiniela);
						//	router.navTo("Quiniela");
					}
				);


			},

			onPressCambiar: function (oEvt) {
				var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_Login);
				router.navTo("Cambio", {}, false);
			},

			onPressOlvidar: function (oEvt) {
				var aInputs = [

					new sap.m.Input({
						editable: true
					}),
					new sap.m.Input({
						editable: true
					})
				];

				var oDialog = new sap.m.Dialog({
					customHeader: new sap.m.Bar({
						contentMiddle: new sap.m.Label({
							text: "{i18n>OlvideContrasena.Title}"
						}),
						contentRight: new sap.m.Button({
							icon: "sap-icon://decline",
							press: function () {
								oDialog.close();
							}
						})
					}),

					content: [
						new sap.m.VBox({
							items: [
								new sap.ui.layout.form.SimpleForm({
									editable: true,
									layout: "ResponsiveGridLayout",
									labelSpanXL: 3, labelSpanL: 3, labelSpanM: 3, labelSpanS: 12,
									adjustLabelSpan: false,
									emptySpanXL: 4, emptySpanL: 4, emptySpanM: 4, emptySpanS: 0,
									columnsXL: 1, columnsL: 1, columnsM: 1,
									singleContainerFullSize: false,
									content: [
										new sap.m.Label({ text: "{i18n>OlvideContrasena.Label.1}" }),
										aInputs[0],
										// ORR Comentar para que ya no salga en la vista
										//new sap.m.Label({ text: "{i18n>OlvideContrasena.Label.2}" }),
										//aInputs[1],
									]
								})
							]
						})
					],
					beforeClose: function (oEvt) {
						oDialog.removeAllContent();
					},
					afterClose: function () {
						oDialog.destroy();
					},
					buttons: [
						new sap.m.Button({
							text: "{i18n>OlvideContrasena.Button.1}",
							press: function () {
								// ORR Quitar ", aInputs[1]" para que no lo valide
								if (oCnt_FHelps.f_Inputs([aInputs[0]]) == true) {

									var oObject = {
										Usuario: aInputs[0].getValue(),
										// ORR Mandar el correo vacío
										//Correo: aInputs[1].getValue()
										Correo: ""
									}

									function oFunction(oData) {
										oBusyDialog_a.close();
										sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
										sap.ui.getCore().getModel("mMessages").refresh();

										// ORR Validar que no haya más de este tipo en el código
										//var oObjeto = sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:Zw20FmWsSendTokenResponse/ExReturn");
										var oObjeto = sap.ui.getCore().getModel("mMessages").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI20_-FM_WS_SEND_TOKEN.Response/EX_RETURN");

										console.log(oObjeto);

										if (oObjeto.TYPE == "S") {
											var aInputs1 = [

												new sap.m.Input({
													editable: true
												}),
												new sap.m.Input({
													editable: true
												}),
												new sap.m.Input({
													editable: true
												}),
												new sap.m.Input({
													editable: true,
													type: "Password"
												}),
												new sap.m.Input({
													editable: true,
													type: "Password"
												})
											];

											var oDialog1 = new sap.m.Dialog({
												customHeader: new sap.m.Bar({
													contentMiddle: new sap.m.Label({
														text: "{i18n>OlvideContrasena.Title.2}"
													}),
													contentRight: new sap.m.Button({
														icon: "sap-icon://decline",
														press: function () {
															oDialog1.close();
														}
													})
												}),

												content: [
													new sap.m.VBox({
														items: [
															new sap.ui.layout.form.SimpleForm({
																editable: true,
																layout: "ResponsiveGridLayout",
																labelSpanXL: 3, labelSpanL: 3, labelSpanM: 3, labelSpanS: 12,
																adjustLabelSpan: false,
																emptySpanXL: 4, emptySpanL: 4, emptySpanM: 4, emptySpanS: 0,
																columnsXL: 1, columnsL: 1, columnsM: 1,
																singleContainerFullSize: false,
																content: [
																	new sap.m.Label({ text: "{i18n>OlvideContrasena.Label.1}" }),
																	aInputs1[0],
																	new sap.m.Label({ text: "{i18n>OlvideContrasena.Label.2}" }),
																	aInputs1[1],
																	new sap.m.Label({ text: "{i18n>OlvideContrasena.Label.3}" }),
																	aInputs1[2],
																	new sap.m.Label({ text: "{i18n>OlvideContrasena.Label.4}" }),
																	aInputs1[3],
																	new sap.m.Label({ text: "{i18n>OlvideContrasena.Label.5}" }),
																	aInputs1[4],
																]
															})
														]
													})
												],
												beforeClose: function (oEvt) {
													oDialog1.removeAllContent();
												},
												afterClose: function () {
													oDialog1.destroy();
												},
												buttons: [
													new sap.m.Button({
														text: "{i18n>OlvideContrasena.Button.3}",
														press: function () {

															if (oCnt_FHelps.f_Inputs([aInputs1[0], aInputs1[1], aInputs1[2], aInputs1[3], aInputs1[4]]) == true) {

																if (aInputs1[3].getValue() == aInputs1[4].getValue()) {
																	var oObject = {
																		Usuario: aInputs1[0].getValue(),
																		Correo: aInputs1[1].getValue(),
																		Codigo: aInputs1[2].getValue(),
																		Password: "",
																		PasswordNuevo: aInputs1[4].getValue()
																	}

																	function oFunction(oData) {
																		oBusyDialog.close();
																		sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
																		sap.ui.getCore().getModel("mMessages").refresh();

																		// ORR Validar que no haya más de este tipo en el código
																		//var oObjeto = sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:Zw20FmWsValidateTokenResponse/ExReturn");
																		var oObjeto = sap.ui.getCore().getModel("mMessages").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI20_-FM_WS_VALIDATE_TOKEN.Response/EX_RETURN");
																		console.log(oObjeto);

																		if (oObjeto.TYPE == "S") {

																			function oFunction1(oData) {

																				sap.ui.getCore().getModel("mCambio").setData(oData);
																				sap.ui.getCore().getModel("mCambio").refresh();

																				// ORR Validar que no haya más de este tipo en el código
																				//var oObjeto = sap.ui.getCore().getModel("mCambio").getProperty("/env:Envelope/env:Body/n0:Zw20FmWsPassChangeResponse/ExOutReturn/item");
																				var oObjeto = sap.ui.getCore().getModel("mCambio").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI20_-FM_WS_PASS_CHANGE.Response/EX_OUT_RETURN/item");
																				console.log(oObjeto);

																				var Type = oObjeto.TYPE;
																				// ORR Se pone un mensaje custom para el usuario
																				var Message = oObjeto.MESSAGE;
																				//var Message = "Se actualizó la contraseña de manera correcta";

																				console.log(Type);
																				console.log(Message);

																				oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title"));
																				oDialog.close();
																				oDialog1.close();

																			}
																			// ORR Se comenta porque no muestra ningún mensaje al usuario
																			//oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.Message, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title"));
																			oC_Modulo_WiseMobile.oServ_CambioPass(oObject, oFunction1);
																		} else {
																			oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.MESSAGE, undefined, oCnt_FHelps.f_readTranslate("Error.title"));
																		}
																	}

																	oCtrl_Login.oServ_ValidateToken(oObject, oFunction);
																} else {
																	oCnt_FHelps.f_showMessage("INFORMATION", oCnt_FHelps.f_readTranslate("OlvideContrasena.Message.2"), undefined, oCnt_FHelps.f_readTranslate("Error.title"));
																}


															}


														}
													}),
													new sap.m.Button({
														text: "{i18n>OlvideContrasena.Button.2}",
														press: function () {
															oDialog1.close();

														}
													})
												]
											});

											oDialog1.open();
											oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.MESSAGE, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title"));
										} else {
											// ORR Se añade validación para cuando los datos son incorrectos
											oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.MESSAGE, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title"));
										}
									}
									oCtrl_Login.oServ_EnvioToken(oObject, oFunction);
								}


							}
						}),
						new sap.m.Button({
							text: "{i18n>OlvideContrasena.Button.2}",
							press: function () {
								oDialog.close();

							}
						})
					]
				});

				oDialog.open();
			},
			/*
			oServ_EnvioToken: function (oObject, callback) {
				oMandante = oView.byId('idComboMandante').getSelectedKey();
				oLenguaje = oView.byId('idComboLangu').getSelectedKey();

				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI20_-FM_WS_SEND_TOKEN>';
				soapMessage = soapMessage + '<IM_CREDENTIALS>';
				soapMessage = soapMessage + '<USER>' + oObject.Usuario + '</USER>';
				soapMessage = soapMessage + '<MAIL>' + oObject.Correo + '</MAIL>';
				if (oLenguaje == "ES") {
					soapMessage = soapMessage + '<LANGUAGE>S</LANGUAGE>';
				}
				if (oLenguaje == "EN") {
					soapMessage = soapMessage + '<LANGUAGE>E</LANGUAGE>';
				}
				soapMessage = soapMessage + '</IM_CREDENTIALS>';
				soapMessage = soapMessage + '</urn:_-WI20_-FM_WS_SEND_TOKEN>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';

				webServiceURL_ZW20 = ip_apache_dev + oPath_login_ini + oMandante + oPath_login_fin;
				oBusyDialog_a.setText(oCnt_FHelps.f_readTranslate("OlvideContrasena.Message.1"));
				oBusyDialog_a.open();
				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW20,
					type: "POST",
					cache: false,
					data: soapMessage,
					contentType: "application/soap+xml; charset=utf-8",
					headers: {
						"Authorization": "Basic " + btoa(oUsuario + ":" + oPassword),
						"accept-language": oLenguaje
					},
					success: OnSuccess,
					error: OnError
				});

				function OnSuccess(data, status) {
					var json = xml2json(data);
					callback(json);
				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					var oText = oCnt_FHelps.f_readTranslate("Login-error");
					oCnt_FHelps.f_showMessage("ERROR", oText);
					oBusyDialog_a.close();
				}
			},
			*/

			// ORR Método para cambio de contraseña desde Loguin
			oServ_EnvioToken: function (oObject, callback) {
				var oMandante = "";
				var oLenguaje = "ES";

				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI20_-FM_WS_SEND_TOKEN>';
				soapMessage = soapMessage + '<IM_CREDENTIALS>';
				soapMessage = soapMessage + '<USER>' + oObject.Usuario + '</USER>';
				soapMessage = soapMessage + '<MAIL>' + oObject.Correo + '</MAIL>';

				if (oLenguaje == "ES") {
					soapMessage = soapMessage + '<LANGUAGE>S</LANGUAGE>';
				}
				if (oLenguaje == "EN") {
					soapMessage = soapMessage + '<LANGUAGE>E</LANGUAGE>';
				}

				soapMessage = soapMessage + '</IM_CREDENTIALS>';
				soapMessage = soapMessage + '</urn:_-WI20_-FM_WS_SEND_TOKEN>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';


				webServiceURL_ZW20 = ip_apache_dev + oPath_login_ini + oMandante + oPath_login_fin;
				console.log(oPath_login_fin);
				console.log(webServiceURL_ZW20);

				oBusyDialog_a.setText(oCnt_FHelps.f_readTranslate("OlvideContrasena.Message.1"));
				oBusyDialog.open();
				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW20,
					type: "POST",
					cache: false,
					data: soapMessage,
					contentType: "application/soap+xml; charset=utf-8",
					headers: {
						"Authorization": "Basic " + btoa(oUsuario + ":" + oPassword),
						"accept-language": oLenguaje
					},
					success: OnSuccess,
					error: OnError
				});

				function OnSuccess(data, status) {
					var json = xml2json(data);
					callback(json);
					oBusyDialog.close();

				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					var oText = oCnt_FHelps.f_readTranslate("Login-error");
					oCnt_FHelps.f_showMessage("ERROR", oText);
					oBusyDialog.close();
				}
			},
			/*
			oServ_ValidateToken: function (oObject, callback) {
				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI20_-FM_WS_VALIDATE_TOKEN>';
				soapMessage = soapMessage + '<IM_CREDENTIALS>';
				soapMessage = soapMessage + '<USER>' + oObject.Usuario + '</USER>';
				soapMessage = soapMessage + '<MAIL>' + oObject.Correo + '</MAIL>';
				soapMessage = soapMessage + '<TOKEN>' + oObject.Codigo + '</TOKEN>';
				if (oLenguaje == "ES") {
					soapMessage = soapMessage + '<LANGUAGE>S</LANGUAGE>';
				}
				if (oLenguaje == "EN") {
					soapMessage = soapMessage + '<LANGUAGE>E</LANGUAGE>';
				}
				soapMessage = soapMessage + '</IM_CREDENTIALS>';
				soapMessage = soapMessage + '</urn:_-WI20_-FM_WS_VALIDATE_TOKEN';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';

				oBusyDialog.open();
				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW20,
					type: "POST",
					cache: false,
					data: soapMessage,
					contentType: "application/soap+xml; charset=utf-8",
					headers: {
						"Authorization": "Basic " + btoa(oUsuario1 + ":" + oPassword1),
						"accept-language": oLenguaje
					},
					success: OnSuccess,
					error: OnError
				});

				function OnSuccess(data, status) {
					var json = xml2json(data);
					callback(json);
				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					var oText = oCnt_FHelps.f_readTranslate("Login-error");
					oCnt_FHelps.f_showMessage("ERROR", oText);
				}
			},
			*/

			// ORR Método para cambio de contraseña desde Loguin
			oServ_ValidateToken: function (oObject, callback) {
				var oMandante = "";
				var oLenguaje = "ES";

				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI20_-FM_WS_VALIDATE_TOKEN>';
				soapMessage = soapMessage + '<IM_CREDENTIALS>';
				soapMessage = soapMessage + '<USER>' + oObject.Usuario + '</USER>';
				soapMessage = soapMessage + '<MAIL>' + oObject.Correo + '</MAIL>';
				soapMessage = soapMessage + '<TOKEN>' + oObject.Codigo + '</TOKEN>';

				if (oLenguaje == "ES") {
					soapMessage = soapMessage + '<LANGUAGE>S</LANGUAGE>';
				}
				if (oLenguaje == "EN") {
					soapMessage = soapMessage + '<LANGUAGE>E</LANGUAGE>';
				}

				soapMessage = soapMessage + '</IM_CREDENTIALS>';
				soapMessage = soapMessage + '</urn:_-WI20_-FM_WS_VALIDATE_TOKEN>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';


				webServiceURL_ZW20 = ip_apache_dev + oPath_login_ini + oMandante + oPath_login_fin;

				oBusyDialog_a.setText(oCnt_FHelps.f_readTranslate("OlvideContrasena.Message.1"));
				oBusyDialog.open();
				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW20,
					type: "POST",
					cache: false,
					data: soapMessage,
					contentType: "application/soap+xml; charset=utf-8",
					headers: {
						"Authorization": "Basic " + btoa(oUsuario + ":" + oPassword),
						"accept-language": oLenguaje
					},
					success: OnSuccess,
					error: OnError
				});

				function OnSuccess(data, status) {
					var json = xml2json(data);
					callback(json);
					oBusyDialog.close();

				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					var oText = oCnt_FHelps.f_readTranslate("Login-error");
					oCnt_FHelps.f_showMessage("ERROR", oText);
					oBusyDialog.close();
				}
			},
			toChangePassword: function () {
				var oView = this.getView();
				var router = sap.ui.core.UIComponent.getRouterFor(this);
				router.navTo("cambiar-password", { Userweb: oView.byId('myUser').getValue() }, false);
			},
			_getAppModulePath: function () {
				let sAppId = '';
				let sAppPath = '';
				let sAppModulePath = '';

				sAppId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
				sAppPath = sAppId.replaceAll(".", "/");
				sAppModulePath = jQuery.sap.getModulePath(sAppPath);

				return sAppModulePath;
			},

			// ORR Método para mostrar / ocultar contraseña
			onShowPassword: function () {
				var passwordInput = this.getView().byId("myPassword");
				console.log(passwordInput);

				if (passwordInput.getType() === "Password") {
					passwordInput.setType("Text");
				} else {
					passwordInput.setType("Password");
				}

				console.log(passwordInput.getType());
			}
		});

	});