var oCtrl_Menu;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox"],
	function (jQuery, Controller, MessageBox) {

		var oView;

		return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Main.controller.Menu", {

			_formFragments: {},

			onInit: function () {
				// ORR
				var toolbarText = sap.ui.getCore().byId("__title0");
				toolbarText.setText("Launchpad");
				//

				oCtrl_Menu = this;

				console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login");

				sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function (oEvent) {
					var sRoute = oEvent.getParameter("name");

					if ("Menu" === sRoute) {

					}
				});

				this._formFragments.Avisos = sap.ui.xmlfragment("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.view.fragments.Avisos", this);
				this.onGetFiltersXTable();
				this.onGetCombosLocales();

				if (Lifnr != null) {
					oCtrl_Menu.oServ_Sociedades_ZW18();
				}
				oCtrl_Menu.oServ_Sociedades_ZW12();
				oCtrl_Menu.oServ_Estatus_ZW12();
				oCtrl_Menu.oServ_Monedas_ZW18();

				//Este es el mensaje SOAP, dentro de las etiquetas <CI>'+ $('#ci').val() +'</CI> hacemos uso de una función JQuery para obtener valor que está en el campo de texto
			},

			onAfterRendering: function (oEvt) {
				/*
				if(Lifnr!=null){
					oC_Modulo_WiseMobile.oServ_ListadoAvisosPopUp();	
				}	
				*/
			},

			/*		oServ_Sociedades_ZW18 : function() {
						
						var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
							soapMessage=soapMessage+'<soap:Header/>';
							soapMessage=soapMessage+'<soap:Body>';
							soapMessage=soapMessage+'<urn:ZW18_COMPANY_CODE_LIST>';
							soapMessage=soapMessage+'<IV_LIFNR>3500000612</IV_LIFNR>';
							soapMessage=soapMessage+'</urn:ZW18_COMPANY_CODE_LIST>';
							soapMessage=soapMessage+'</soap:Body>';
							soapMessage=soapMessage+'</soap:Envelope>';
						 
						//Llamamos a la función AJAX de JQuery
						$.ajax({
							url: webServiceURL_ZW18,
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
					    
						var oParameters = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">'
						+'<soap:Header/>'
						+'<soap:Body>'
						+'<urn:ZW18_COMPANY_CODE_LIST>'
						+'<IV_LIFNR>3500000612</IV_LIFNR>'
						+'</urn:ZW18_COMPANY_CODE_LIST>'
						+'</soap:Body>'
						+'</soap:Envelope>';
					    
						oModelService.loadDataNew(webServiceURL_ZW18, handleSuccess, handleError, oParameters, true, 'POST');
						
						function handleSuccess(oData) {
							alert("OK");
						}
						
						function handleError(e) {
							// Display message
							alert("Error");
						}
					},
			*/
			xmlToJson: function (xml) {

				// Create the return object
				var obj = {};

				if (xml.nodeType == 1) { // element
					// do attributes
					if (xml.attributes.length > 0) {
						obj["@attributes"] = {};
						for (var j = 0; j < xml.attributes.length; j++) {
							var attribute = xml.attributes.item(j);
							obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
						}
					}
				} else if (xml.nodeType == 3) { // text
					obj = xml.nodeValue;
				}

				// do children
				if (xml.hasChildNodes()) {
					for (var i = 0; i < xml.childNodes.length; i++) {
						var item = xml.childNodes.item(i);
						var nodeName = item.nodeName;
						if (typeof (obj[nodeName]) == "undefined") {
							obj[nodeName] = oCtrl_Menu.xmlToJson(item);
						} else {
							if (typeof (obj[nodeName].push) == "undefined") {
								var old = obj[nodeName];
								obj[nodeName] = [];
								obj[nodeName].push(old);
							}
							obj[nodeName].push(oCtrl_Menu.xmlToJson(item));
						}
					}
				}
				return obj;
			},


			createContent: function () {
				console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login');
			},

			back: function (evt) {
				window.history.go(-1);
			},
			/*
			onPress: function (oEvt) {
				var that = this;
				oBusyDialog.open();

				var oKey = oEvt.getSource().getCustomData()[0].getKey();

				setTimeout(function () {

					var oRouter = sap.ui.core.UIComponent.getRouterFor(that);

					switch (oKey) {

						case "app":
							oRouter.navTo("Aplicaciones", {}, false);
							break;
						case "colores":
							oRouter.navTo("Color", {}, false);
							break;
						case "usuarios":
							oRouter.navTo("Usuarios", {}, false);
							break;
						case "grupos":
							oRouter.navTo("Grupos", {}, false);
							break;
						case "roles":
							oRouter.navTo("Roles", {}, false);
							break;

						case "mod1":
							oRouter.navTo("Main_PCG", {}, false);
							break

						case "mod2":
							oRouter.navTo("Main_PG", {}, false);

							if (Lifnr != null) {

								var oDialog = new sap.m.Dialog({
									title: "{i18n>Popup.Avisos.Title}",
									contentWidth: "100%",
									content: [
										oCtrl_Menu._formFragments.Avisos
									],
									buttons: [
										new sap.m.Button({
											text: "{i18n>Popup.Avisos.Button.Cancelar}",
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

							}
							break;

						default:
							var oText = oCnt_FHelps.f_readTranslate("No-View");
							oCnt_FHelps.f_showMessage("WARNING", oText);
							oBusyDialog.close();
					}

				}, 500);
			},
			*/
			// ORR Se cambia el método por el de Brenda
			onPress: function (oEvt) {
				var that = this;
				oBusyDialog.open();

				var oKey = oEvt.getSource().getCustomData()[0].getKey();

				setTimeout(function () {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
					var Type = ""; // accede a  OnSuccess
					var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
					soapMessage += '<soap:Header/>';
					soapMessage += '<soap:Body>';
					soapMessage += '<urn:_-WI18_-OBTAIN_NOTICES>';
					soapMessage += '<IS_OBTAIN_NOT_IN>';
					soapMessage += '<BUKRS></BUKRS>';
					soapMessage += '<LIFNR>' + Lifnr + '</LIFNR>';
					soapMessage += '<IDIOMA>' + oLenguaje + '</IDIOMA>';
					soapMessage += '<TIPO_AVISO>2</TIPO_AVISO>';
					soapMessage += '</IS_OBTAIN_NOT_IN>';
					soapMessage += '</urn:_-WI18_-OBTAIN_NOTICES>';
					soapMessage += '</soap:Body>';
					soapMessage += '</soap:Envelope>';

					// Función que se ejecuta después de obtener los datos
					function OnSuccess(data, status) {
						var json = xml2json(data);
						var mModel = sap.ui.getCore().getModel("mTablesAvisosPopUp");
						mModel.setData(json);
						mModel.refresh();

						Type = mModel.getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-OBTAIN_NOTICES.Response/ES_RETURN").TYPE;

						switch (oKey) {
							case "app":
								oRouter.navTo("Aplicaciones", {}, false);
								break;
							case "colores":
								oRouter.navTo("Color", {}, false);
								break;
							case "usuarios":
								oRouter.navTo("Usuarios", {}, false);
								break;
							case "grupos":
								oRouter.navTo("Grupos", {}, false);
								break;
							case "roles":
								oRouter.navTo("Roles", {}, false);
								break;
							case "mod1":
								oRouter.navTo("Main_PCG", {}, false);
								break;
							case "mod2":
								if (Type === "S") {
									oRouter.navTo("Main_PG", {}, false);

									var oDialog = new sap.m.Dialog({
										title: "{i18n>Popup.Avisos.Title}",
										contentWidth: "100%",
										content: [
											oCtrl_Menu._formFragments.Avisos
										],
										buttons: [
											new sap.m.Button({
												text: "{i18n>Popup.Avisos.Button.Cancelar}",
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
									// modelo mModel
									var mData = mModel.getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-OBTAIN_NOTICES.Response/ES_OBTAIN_NOT_OUT/LISTAPROV/item");
									var length = mData.length;

									if (length === undefined) {
										mModel.setData({ DOC_AVISOS: [mData] }); //revisar datos
									} else {
										mModel.setData({ DOC_AVISOS: mData }); //revisar datos
									}
								} else {
									oRouter.navTo("Main_PG", {}, false);
									console.log("El tipo no es 'S', no se muestra el popup.");
								}
								break;
							default:
								var oText = oCnt_FHelps.f_readTranslate("No-View");
								oCnt_FHelps.f_showMessage("WARNING", oText);
						}

						oBusyDialog.close();
					}

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
						error: function () {
							oBusyDialog.close();
						}
					});

				}, 500);
			},

			onGetFiltersXTable: function () {

				var data = oFilters.returnData();
				moFiltros.setData(data);
				moFiltros.refresh();
			},

			onGetCombosLocales: function () {
				// RECUERDA QUE EL MODELO DEBE ESTAR INICIALIZADO COMO: {}
				var data = oCombos.returnData();
				var oModelCombos = sap.ui.getCore().getModel("mCombos");
				Object.assign(oModelCombos.getData(), data);
				oModelCombos.refresh();
			},

			oServ_Sociedades_ZW12: function () {
				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI12_-FM_WS_GET_COMPANY_LIST>';
				soapMessage = soapMessage + '<IV_LIFNR>' + Lifnr + '</IV_LIFNR>';
				soapMessage = soapMessage + '</urn:_-WI12_-FM_WS_GET_COMPANY_LIST>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';

				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW12,
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

					sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW12", json);//revisar datos

					var length = sap.ui.getCore().getModel("mCombos").getProperty("/SOCIEDADES_ZW12/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_COMPANY_LIST.Response/IM_OUT_COMPANY_LIST/item").length;
					var mData = sap.ui.getCore().getModel("mCombos").getProperty("/SOCIEDADES_ZW12/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_COMPANY_LIST.Response/IM_OUT_COMPANY_LIST/item");

					if (length == undefined) {
						sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW12", [mData]);//revisar datos

					} else {
						sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW12", mData);//revisar datos

					}
				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					oCnt_FHelps.f_showMessage("ERROR", error);
				}
			},

			oServ_Estatus_ZW12: function () {
				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions"><soap:Header/><soap:Body><urn:_-WI12_-FM_WS_GET_STATUS_LIST/></soap:Body></soap:Envelope>';

				//Llamamos a la función AJAX de JQuery
				$.ajax({
					url: webServiceURL_ZW12,
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

					sap.ui.getCore().getModel("mCombos").setProperty("/ESTATUS_ZW12", json);//revisar datos

					var length = sap.ui.getCore().getModel("mCombos").getProperty("/ESTATUS_ZW12/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_STATUS_LIST.Response/IM_OUT_STATUS_LIST/item").length;
					var mData = sap.ui.getCore().getModel("mCombos").getProperty("/ESTATUS_ZW12/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_STATUS_LIST.Response/IM_OUT_STATUS_LIST/item");

					if (length == undefined) {
						sap.ui.getCore().getModel("mCombos").setProperty("/ESTATUS_ZW12", [mData]);//revisar datos

					} else {
						sap.ui.getCore().getModel("mCombos").setProperty("/ESTATUS_ZW12", mData);//revisar datos

					}
				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					oCnt_FHelps.f_showMessage("ERROR", error);
				}
			},


			oServ_Monedas_ZW18: function () {
				//Obtener modelo mConfiguracionUsuario
				var mModel = sap.ui.getCore().getModel("mConfiguracionUsuario");
				//Obtener la Sociedad
				var Bukrs = mModel.getProperty("/Sociedad");
				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI18_-GET_CURR_LIST>';
				soapMessage = soapMessage + '<IV_BUKRS>' + Bukrs + '</IV_BUKRS>'; //Se cambio de sociedad 5510 a 1018
				if (oLenguaje == "ES") {
					soapMessage = soapMessage + '<IV_LANGUAGE>S</IV_LANGUAGE>';
				}
				if (oLenguaje == "EN") {
					soapMessage = soapMessage + '<IV_LANGUAGE>E</IV_LANGUAGE>';
				}

				soapMessage = soapMessage + '</urn:_-WI18_-GET_CURR_LIST>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';

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

					sap.ui.getCore().getModel("mCombos").setProperty("/MONEDAS_ZW18", json);//revisar datos
					sap.ui.getCore().getModel("mCombos").refresh();


					var length = sap.ui.getCore().getModel("mCombos").getProperty("/MONEDAS_ZW18/SOAP:Envelope/SOAP:Body/n0:_-WI18_-GET_CURR_LIST.Response/ET_CURRENCY/item").length;

					if (length == undefined) {

						var mData = sap.ui.getCore().getModel("mCombos").getProperty("/MONEDAS_ZW18/SOAP:Envelope/SOAP:Body/n0:_-WI18_-GET_CURR_LIST.Response/ET_CURRENCY/item");

						sap.ui.getCore().getModel("mCombos").setProperty("/MONEDAS_ZW18", [mData]);//revisar datos
						sap.ui.getCore().getModel("mCombos").refresh();
					} else {
						var mData = sap.ui.getCore().getModel("mCombos").getProperty("/MONEDAS_ZW18/SOAP:Envelope/SOAP:Body/n0:_-WI18_-GET_CURR_LIST.Response/ET_CURRENCY/item");

						sap.ui.getCore().getModel("mCombos").setProperty("/MONEDAS_ZW18", mData);//revisar datos
						sap.ui.getCore().getModel("mCombos").refresh();
					}
				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					oCnt_FHelps.f_showMessage("ERROR", error);
				}
			},

			oServ_Sociedades_ZW18: function () {
				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<urn:_-WI18_-COMPANY_CODE_LIST>';
				soapMessage = soapMessage + '<IV_LIFNR>' + Lifnr + '</IV_LIFNR>';
				soapMessage = soapMessage + '</urn:_-WI18_-COMPANY_CODE_LIST>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';

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

					sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW18", json);//revisar datos

					var length = sap.ui.getCore().getModel("mCombos").getProperty("/SOCIEDADES_ZW18/SOAP:Envelope/SOAP:Body/n0:_-WI18_-COMPANY_CODE_LIST.Response/ET_BUKRSLIST/item").length;
					var mData = sap.ui.getCore().getModel("mCombos").getProperty("/SOCIEDADES_ZW18/SOAP:Envelope/SOAP:Body/n0:_-WI18_-COMPANY_CODE_LIST.Response/ET_BUKRSLIST/item");

					if (length == undefined) {
						sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW18", [mData]);//revisar datos

					} else {
						sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW18", mData);//revisar datos

					}
				}
				function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
				{
					oCnt_FHelps.f_showMessage("ERROR", error);
				}
			},

			onPressExternalPortal: function () {

				let lRfc = oC_Modulo_WiseMobile.onGetlRfc();
				var lClaveB64 = "";

				if (lRfc == null || lRfc == "") {
					MessageBox.warning("No se ha encontrado el RFC del proveedor");
					return;
				}

				if (lRfc === "XEX010101000") { 
					MessageBox.warning("Favor de reportarse con su contacto en el Depto de Compras para que proceda a dar autorización de acceso a esta opción");
					return;
				}

				// ORR Portal Externo

				// Servicio para obtener ClaveB64
				let today = new Date();
				let year = today.getFullYear();
				let month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript empiezan en 0
				let day = String(today.getDate()).padStart(2, '0');
				let hour = String(today.getHours()).padStart(2, '0');

				let lClaveFija = "CYDSA_NASA" + year + month + day + hour;
				console.log(lClaveFija);

				var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">';
				soapMessage = soapMessage + '<soap:Header/>';
				soapMessage = soapMessage + '<soap:Body>';
				soapMessage = soapMessage + '<tem:EncryptB64>';
				soapMessage = soapMessage + '<tem:data>' + lClaveFija + '</tem:data>';
				soapMessage = soapMessage + '</tem:EncryptB64>';
				soapMessage = soapMessage + '</soap:Body>';
				soapMessage = soapMessage + '</soap:Envelope>';

				$.ajax({
					url: portalExterno,
					type: 'POST',
					cache: false,
					data: soapMessage,
					contentType: 'text/xml; charset=utf-8',
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
						'Access-Control-Allow-Headers': 'Content-Type'
					},

					success: function (response) {
						// La llamada fue exitosa, puedes procesar la respuesta aquí
						//console.log(response);
						var json = xml2json(response);
						lClaveB64 = json["soap:Envelope"]["soap:Body"]["EncryptB64Response"]["EncryptB64Result"];

						oCtrl_Menu.onOpenExternalPortal(lRfc, lClaveB64);

					},
					error: function (response) {
						// Hubo un error, puedes manejarlo aquí
						console.log(response);
					}
				});




			},

			onOpenExternalPortal: function (lRfc, lClaveB64) {
				// Servicio para obtener ClaveAcc
				var lClaveAcc = "";
				console.log(lRfc);
				console.log(lClaveB64);

				var soapMessageClaveAcceso = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">';
				soapMessageClaveAcceso = soapMessageClaveAcceso + '<soap:Header/>';
				soapMessageClaveAcceso = soapMessageClaveAcceso + '<soap:Body>';
				soapMessageClaveAcceso = soapMessageClaveAcceso + '<tem:EncryptAES>';
				soapMessageClaveAcceso = soapMessageClaveAcceso + '<tem:data>' + lRfc + '</tem:data>';
				soapMessageClaveAcceso = soapMessageClaveAcceso + '<tem:password>' + lClaveB64 + '</tem:password>';
				soapMessageClaveAcceso = soapMessageClaveAcceso + '</tem:EncryptAES>';
				soapMessageClaveAcceso = soapMessageClaveAcceso + '</soap:Body>';
				soapMessageClaveAcceso = soapMessageClaveAcceso + '</soap:Envelope>';

				$.ajax({
					url: portalExterno,
					type: 'POST',
					cache: false,
					data: soapMessageClaveAcceso,
					contentType: 'text/xml; charset=utf-8',
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
						'Access-Control-Allow-Headers': 'Content-Type'
					},

					success: function (response) {
						// La llamada fue exitosa, puedes procesar la respuesta aquí
						//console.log(response);
						var json = xml2json(response);
						lClaveAcc = json["soap:Envelope"]["soap:Body"]["EncryptAESResponse"]["EncryptAESResult"];
						let lLigaURL = 'https://expedienteproveedores.cydsa.com:4443/Views/Index?vU=' + lClaveAcc + String.fromCharCode(13);
						console.log(lLigaURL);
						window.open(lLigaURL, "_blank");

					},
					error: function (response) {
						// Hubo un error, puedes manejarlo aquí
						console.log(response);
					}
				});

			},

			onPressPortalRepse: function () {
				let lLigaURL = 'https://portal.genius.ey.com/genyus/app/bienvenido';
				console.log(lLigaURL);
				window.open(lLigaURL, "_blank");
			}


		});

	});