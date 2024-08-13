var oC_Modulo_WiseMobile;
var pathGlobal;

var pathProtocol;
var serverSICF = "189.236.45.63"; //"localhost";
var portSICF = "1510";// "33772";
var servicioSICF = "/odata";
var pathSICF;
var webServiceURL;
var webServiceURL_ZW18;
var webServiceURL_ZW18_2;
var webServiceURL_ZWS;
var webServiceURL_ZW20;
var webServiceURL_ZW04;

var oBusyDialog;
var oCore;
var oModel;


var Lifnr;
var Bname;
var Name;
var sesion;

//var exite_permisoVen=false;

var oModelService;
//var webServiceURL		= 'proxy/http/sty-qro-r3dev.polioles.com.mx:51080/sap/bc/srt/rfc/sap/zw12_ws_methods_payment_vendor/500/zw12_ws_methods_payment_vendor/zw12_ws_methods_payment_vendor';
//var webServiceURL_ZW18	= 'proxy/http/sty-qro-r3dev.polioles.com.mx:51080/sap/bc/srt/rfc/sap/zw18_ws_methd_incinv_po/500/zw18_ws_methd_incinv_po/zw18_ws_methd_incinv_po';

//var webServiceURL = 'http://sty-qro-r3dev.polioles.com.mx:51080/sap/bc/srt/rfc/sap/zw12_ws_methods_payment_vendor/500/zw12_ws_methods_payment_vendor/zw12_ws_methods_payment_vendor';

//http://STY-QRO-R3DEV.polioles.com.mx:51080/sap/bc/srt/rfc/sap/zws_portal_vendor_methos/500/zws_portal_vendor_methos/zws_portal_vendor_methos
var oPath_enfa_ini = "/sap/bc/srt/rfc/sap/zw18_ws_methd_incinv_po/";
var oPath_enfa_fin = "/zw18_ws_methd_incinv_po/zw18_ws_methd_incinv_po";

var oPath_aprob_ini = "/sap/bc/srt/rfc/sap/zw04_ws_methd_pr_po/";
var oPath_aprob_fin = "/zw04_ws_methd_pr_po/zw04_ws_methd_pr_po";

// ORR Se cambian a QAS
// DEV
//var oPath_login_ini="/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PROVEEDORES&receiverParty=&receiverService=&interface=SI_WI20WEBMETHSLOGIN_OB&interfaceNamespace=http://cydsa.com/PortalProveedores/sndRecepcionFacturaPago";				
// QAS 520
var oPath_login_ini = "/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PROVEEDORES&receiverParty=&receiverService=&interface=SI_WI20WEBMETHSLOGIN_OB&interfaceNamespace=http://cydsa.com/PortalProveedores/sndRecepcionFacturaPago";				  
var oPath_login_fin = "";
//var oPath_login_ini="/sap/bc/srt/rfc/sap/zw20_ws_methods_login/";
//var oPath_login_fin="/zw20_ws_methods_login/zw20_ws_methods_login";

// DEV
//var oPath_copa_ini="/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PROVEEDORES&receiverParty=&receiverService=&interface=SI_WI12METHODSPAYMEN_OB&interfaceNamespace=http://cydsa.com/PortalProveedores/sndRecepcionFacturaPago";				   
//QAS 520
var oPath_copa_ini = "/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PROVEEDORES&receiverParty=&receiverService=&interface=SI_WI12METHODSPAYMEN_OB&interfaceNamespace=http://cydsa.com/PortalProveedores/sndRecepcionFacturaPago";			 
var oPath_copa_fin = ""
// var oPath_copa_ini="/sap/bc/srt/rfc/sap/zw12_ws_methods_payment_vendor/";
// var oPath_copa_fin="/zw12_ws_methods_payment_vendor/zw12_ws_methods_payment_vendor";
//INICIO CONF LOCAL

// DEV
//var oPath_coti_ini="/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PROVEEDORES&receiverParty=&receiverService=&interface=SI_WI18METHSINVOIPO_OB&interfaceNamespace=http://cydsa.com/PortalProveedores/sndRecepcionFacturaPago";			   
// QAS 520
var oPath_coti_ini = "/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PROVEEDORES&receiverParty=&receiverService=&interface=SI_WI18METHSINVOIPO_OB&interfaceNamespace=http://cydsa.com/PortalProveedores/sndRecepcionFacturaPago";      	 
var oPath_coti_fin = ""
// var oPath_coti_ini="/sap/bc/srt/rfc/sap/zw18_ws_methd_quote/";
// var oPath_coti_fin="/zw18_ws_methd_quote/zw18_ws_methd_quote";

// DEV
//var oPath_enfa_ini_2="/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PROVEEDORES&receiverParty=&receiverService=&interface=SI_WI18METHSINCINV_OB&interfaceNamespace=http://cydsa.com/PortalProveedores/sndRecepcionFacturaPago";				 
// QAS 520
var oPath_enfa_ini_2 = "/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PROVEEDORES&receiverParty=&receiverService=&interface=SI_WI18METHSINCINV_OB&interfaceNamespace=http://cydsa.com/PortalProveedores/sndRecepcionFacturaPago";           
var oPath_enfa_fin_2 = ""

var oPath_cotizaciones= "/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PROVEEDORES&receiverParty=&receiverService=&interface=SI_WI18FGWEBMETHSQUOTE_OB&interfaceNamespace=http://cydsa.com/PortalProveedores/sndFuncionalidadCotizaciones"
// var oPath_enfa_ini_2="/sap/bc/srt/rfc/sap/zw18_ws_methd_incinv_wo_po/";
// var oPath_enfa_fin_2="/zw18_ws_methd_incinv_wo_po/zw18_ws_methd_incinv_wo_po";
/*
var ip_apache = 'proxy/http/POL-QRO-R3DEV.polioles.com.mx'; //'proxy/http/sty-qro-r3dev.polioles.com.mx'
var ip_apache_dev = ip_apache + ':8000'; //51080
var ip_apache_qas = ip_apache + ':8000'; //51080
var ip_apache_prd = ip_apache + ':8000'; //51080
*/
// var ip_apache	  = ''
// var ip_apache_dev = ip_apache 
// var ip_apache_qas = ip_apache 
// var ip_apache_prd = ip_apache
var destination = ''//'/wise_dest' //limpiar para probar en SAP BAS
// ORR Validacion PAC
var url="/ws/Validacion/DocumentValidationService.svc"
// ORR Portal Externo 
var urlPe = "/wscydsaNasaSecurity.com.mx/NasaSecurity.asmx";
//FIN CONF LOCAL



//INICIO CONF PLESK


//var url_proxy = "http://cors-anywhere.herokuapp.com/";
//CONF STYROPEK
//var url_proxy = "http://172.31.30.234/";
//var ip_apache = url_proxy;
//var ip_apache_dev = ip_apache + '/sap_dev';
//var ip_apache_qas = ip_apache + '/sap_qas';
//var ip_apache_prd = ip_apache + '/sap_prd';

//FIN CONF PLESK

//CONF CYDSA
var url_proxy = window.location.origin;
var ip_apache = url_proxy;
// ORR Setear dependiendo del ambiente únicamente ip_apache_dev
var ip_apache_dev = ip_apache + '/sap_qas520';
var ip_apache_qas = ip_apache + '/sap_qas';
var ip_apache_prd = ip_apache + '/sap_prd';
// ORR Validacion PAC
var ip_apache_pac = ip_apache + '/api';
// ORR Portal Externo
var ip_apache_pe = ip_apache + '/apiExternal';

console.log(ip_apache_pac);
console.log(ip_apache_pe);

//FIN CONF PLESK

var oMandante;
var oUsuario = "S_PORPROV";
var oPassword = "Temporal.01"; //Diciembre-2023
var oUsuario1 = "portal.rfe";
var oPassword1 = "May2019*";

var oUsuario_login;
var oPassword_login;

var oLenguaje;

// ORR Parámetro global para tipo de recepción
var paramsTipoRecepcion = "";

// ORR Parámetros para portal externo
var lRfc = "";

sap.ui.define([
	'sap/ui/core/UIComponent', "sap/ui/model/Filter", "sap/ui/model/FilterOperator"
], function (UIComponent, Filter, FilterOperator) {

	return UIComponent.extend("com.axiomasoluciones.wisemobile.Component", {
		metadata: {
			manifest: "json"
		},

		createContent: function () {
			console.log('CreateContent called - com.axiomasoluciones.wisemobile.Component');

			return new sap.m.App("Modulos_wisemobile_Hom_Page", {});
		},

		onAfterRendering: function () {
			//console.log('onAfterRendering called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Component');
			//I18N
			this.setModel(oCore.getModel("i18n"), "i18n");

			onTapView();
		},

		init: function () {
			console.log('init called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Component');
			sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
			oC_Modulo_WiseMobile = this;
			oCore = sap.ui.getCore();


			//http://sty-qro-r3dev.polioles.com.mx:51080/sap/bc/srt/rfc/sap/zw12_ws_methods_payment_vendor/500/zw12_ws_methods_payment_vendor/zw12_ws_methods_payment_vendor

			//URL CONEXION COMPLETO DE PAGO	
			/*var oDataUrl = "proxy/http/sty-qro-r3dev.polioles.com.mx:51080/sap/bc/srt/rfc/sap/zw12_ws_methods_payment_vendor/500/zw12_ws_methods_payment_vendor/";
			
			var oDataUsr = "ABAP.WISE";
			var oDataPwd = "WiseDev2019$.";
			
			oModel = new sap.ui.model.odata.ODataModel(oDataUrl, true, oDataUsr, oDataPwd);
			
			oModel.setDefaultCountMode(sap.ui.model.odata.CountMode.None);
			sap.ui.getCore().setModel(oModel,'complementoPG');
			this.setModel(oModel,'complementoPG');	*/


			/*
			 * https://openui5.hana.ondemand.com/#/api/sap.ui.core.Configuration/methods/setLanguage
			 * 
			 * El marco no garantiza que los objetos que ya se han creado y que dependen del idioma,
			 * se actualizarán con esta llamada. Por lo tanto, sigue siendo la mejor práctica para las
			 * aplicaciones cambiar el idioma temprano, p. antes de que se creen objetos dependientes
			 * del lenguaje. Las aplicaciones que necesitan admitir cambios más dinámicos del lenguaje
			 * deben escuchar el evento localizationChanged y adaptar todos los objetos dependientes
			 * del idioma que utilizan (por ejemplo, mediante la reconstrucción de su UI).
			 */
			sap.ui.getCore().attachLocalizationChanged(function (oEvent) {
				var oChanges = oEvent.getParameter("changes");
				if (oChanges && oChanges.language) {
					this._bundle = sap.ui.getCore().getLibraryResourceBundle("sap.m", oChanges.language);
					//oCtrl_Participantes.byId("idProductsTable").rerender();
					var oViews = oC_Modulo_WiseMobile.getRouter().getViews()._oViews;
					for (var oPath in oViews) {
						oViews[oPath].rerender();
					}
				}
			}.bind(this));

			oBusyDialog = new sap.m.BusyDialog({
				//title: "Please Wait",
				//text:  "Buscando informaci\u00f3n..."
			});

			LogOut();
			/************** Path url global****************/

			if (sap.ui.Device.system.desktop === true) { //Desktop
				pathProtocol = "proxy/https/";
			}
			else { //Mobile
				pathProtocol = "https://";
			}

			if (sap.ui.Device.system.phone === true) {
				oCore.byId("idBtnUser").bindProperty("text", "i18n>ToolPage.Header.TooHeader.UserButton.Text");
			}

			pathGlobal = pathProtocol + serverSICF + ":" + portSICF + servicioSICF;
			/************* END *************/
			// crear modelos json

			var moUser = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moUser, "mUser");
			this.setModel(moUser, "mUser");

			var moCambio = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moCambio, "mCambio");
			this.setModel(moCambio, "mCambio");

			var moEditComprobacion = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moEditComprobacion, "mEditComprobacion");
			this.setModel(moEditComprobacion, "mEditComprobacion");

			var moComplemento = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moComplemento, "mComplemento");
			this.setModel(moComplemento, "mComplemento");

			var moOferta = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moOferta, "mOferta");
			this.setModel(moOferta, "mOferta");

			var moDocumento = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moDocumento, "mDocumento");
			this.setModel(moDocumento, "mDocumento");

			var moEditCecos = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moEditCecos, "mEditCecos");
			this.setModel(moEditCecos, "mEditCecos");

			var moDetalleCecoss = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moDetalleCecoss, "mDetalleCecos");
			this.setModel(moDetalleCecoss, "mDetalleCecos");


			var moCombos = new sap.ui.model.json.JSONModel({});
			sap.ui.getCore().setModel(moCombos, "mCombos");
			this.setModel(moCombos, "mCombos");

			var moComboSociedades = new sap.ui.model.json.JSONModel({});
			sap.ui.getCore().setModel(moComboSociedades, "mComboSociedades");
			this.setModel(moComboSociedades, "mComboSociedades");

			var moComboEstatus = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moComboEstatus, "mComboEstatus");
			this.setModel(moComboEstatus, "mComboEstatus");

			var moTables = new sap.ui.model.json.JSONModel("./wisemobile/Public/JsonTmp/tables.json");
			sap.ui.getCore().setModel(moTables, "mTables");
			this.setModel(moTables, "mTables");


			var moTablesListadoDocComp = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesListadoDocComp, "mTablesListadoDocComp");
			this.setModel(moTablesListadoDocComp, "mTablesListadoDocComp");

			var moTablesCotizaciones = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesCotizaciones, "mTablesCotizaciones");
			this.setModel(moTablesCotizaciones, "mTablesCotizaciones");

			var moTablesAvisos = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesAvisos, "mTablesAvisos");
			this.setModel(moTablesAvisos, "mTablesAvisos");

			var moTablesOrdenesCompraxFacturar = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesOrdenesCompraxFacturar, "mTablesOrdenesCompraxFacturar");
			this.setModel(moTablesOrdenesCompraxFacturar, "mTablesOrdenesCompraxFacturar");

			var moTablesEstatusRecepcion = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesEstatusRecepcion, "mTablesEstatusRecepcion");
			this.setModel(moTablesEstatusRecepcion, "mTablesEstatusRecepcion");

			var moTablesListadoFacturas = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesListadoFacturas, "mTablesListadoFacturas");
			this.setModel(moTablesListadoFacturas, "mTablesListadoFacturas");

			var moTablesPartidasAbiertas = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesPartidasAbiertas, "mTablesPartidasAbiertas");
			this.setModel(moTablesPartidasAbiertas, "mTablesPartidasAbiertas");

			var moTablesPartidasCompensadas = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesPartidasCompensadas, "mTablesPartidasCompensadas");
			this.setModel(moTablesPartidasCompensadas, "mTablesPartidasCompensadas");

			var moTablesAvisosPopUp = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesAvisosPopUp, "mTablesAvisosPopUp");
			this.setModel(moTablesAvisosPopUp, "mTablesAvisosPopUp");

			var moTablesEstCotizaciones = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesEstCotizaciones, "mTablesEstCotizaciones");
			this.setModel(moTablesEstCotizaciones, "mTablesEstCotizaciones");

			var moTablesError = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesError, "mTablesError");
			this.setModel(moTablesError, "mTablesError");

			var moTablesDetallePago = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesDetallePago, "mTablesDetallePago");
			this.setModel(moTablesDetallePago, "mTablesDetallePago");

			var moTablesDocumentosRelac = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesDocumentosRelac, "mTablesDocumentosRelac");
			this.setModel(moTablesDocumentosRelac, "mTablesDocumentosRelac");

			var moTablesOrdenesCompra = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesOrdenesCompra, "mTablesOrdenesCompra");
			this.setModel(moTablesOrdenesCompra, "mTablesOrdenesCompra");

			var moTablesDetalleOC = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesDetalleOC, "mTablesDetalleOC");
			this.setModel(moTablesDetalleOC, "mTablesDetalleOC");

			var moTablesFlujoAutorizacion = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesFlujoAutorizacion, "mTablesFlujoAutorizacion");
			this.setModel(moTablesFlujoAutorizacion, "mTablesFlujoAutorizacion");

			var moTablesAdjunto = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesAdjunto, "mTablesAdjunto");
			this.setModel(moTablesAdjunto, "mTablesAdjunto");

			var moTablesOC = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesOC, "mTablesOC");
			this.setModel(moTablesOC, "mTablesOC");

			var moTablesRequisiciones = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moTablesRequisiciones, "mTablesRequisiciones");
			this.setModel(moTablesRequisiciones, "mTablesRequisiciones");

			var moConfiguracion = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moConfiguracion, "mConfiguracion");
			this.setModel(moConfiguracion, "mConfiguracion");

			var moMonitorGrupos = new sap.ui.model.json.JSONModel("./wisemobile/Public/JsonTmp/Registro.json");
			sap.ui.getCore().setModel(moMonitorGrupos, "mMonitorGrupos");
			this.setModel(moMonitorGrupos, "mMonitorGrupos");

			var moMonitorUsuarios = new sap.ui.model.json.JSONModel("./wisemobile/Public/JsonTmp/Registro.json");
			sap.ui.getCore().setModel(moMonitorUsuarios, "mMonitorUsuarios");
			this.setModel(moMonitorUsuarios, "mMonitorUsuarios");

			var moMonitorAplicaciones = new sap.ui.model.json.JSONModel("./wisemobile/Public/JsonTmp/Registro.json");
			sap.ui.getCore().setModel(moMonitorAplicaciones, "mMonitorAplicaciones");
			this.setModel(moMonitorAplicaciones, "mMonitorAplicaciones");

			var moMonitorRoles = new sap.ui.model.json.JSONModel("./wisemobile/Public/JsonTmp/Registro.json");
			sap.ui.getCore().setModel(moMonitorRoles, "mMonitorRoles");
			this.setModel(moMonitorRoles, "mMonitorRoles");

			var moMessages = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moMessages, "mMessages");
			this.setModel(moMessages, "mMessages");


			var moSupler = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moSupler, "mSupler");
			this.setModel(moSupler, "mSupler");

			var moConfiguracionUsuario = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moConfiguracionUsuario, "mConfiguracionUsuario");
			this.setModel(moConfiguracionUsuario, "mConfiguracionUsuario")
			var oReturn = oConfiguracionUsuario.returnData();
			moConfiguracionUsuario.setProperty("/", oReturn);

			var moManageControls = new sap.ui.model.json.JSONModel();

			if (localStorage.getItem("ManageControls") != null) {
				var oData = JSON.parse(localStorage.getItem('ManageControls'));
				moManageControls.setData(oData);
			}
			else
				moManageControls.loadData("./wisemobile/Public/JsonTmp/ManageControls.json");

			sap.ui.getCore().setModel(moManageControls, "mManageControls");
			this.setModel(moManageControls, "mManageControls");
			this.attachModelEventHandlers(moManageControls);

			////COLORES//////
			var moColores = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moColores, "mColores");
			this.setModel(moColores, "mColores");

			var oDataFilters = oColors.returnData();
			moColores.setProperty("/", oDataFilters);
			//moColores.refresh();
			/////////////////
			var moCombinaciones = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(moCombinaciones, "mCombinaciones");
			this.setModel(moCombinaciones, "mCombinaciones");

			// inicializar controladores
			var router = this.getRouter();
			this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
			router.initialize();

			oModelService = new myJSONModel;
		},// fin init

		attachModelEventHandlers: function (oModel) {
			//oModel.attachPropertyChange(this.handlePropertyChanged, this);
			var binding = new sap.ui.model.PropertyBinding(oModel, "/", oModel.getContext("/"));
			binding.attachChange(this.handleDataChanged, this);
		},
		/*
		handlePropertyChanged: function(oEvent) {
			// Do whatever here... // SE EJECUTA TNATAS VECES COMO ELEMNTOS HAN SIDO MODIFICADOS
			alert("handlePropertyChanged");
		},
		*/
		handleDataChanged: function (oEvent) {
			// Do whatever here... // SE EJECUTA UNA SOLA VEZ POR TODOS LOS ELEMENTOS AFECTADOS
			var oData = oCore.getModel("mManageControls").getProperty("/");
			localStorage.setItem("ManageControls", JSON.stringify(oData));
		},

		destroy: function () {
			console.log('destroy called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Component');
			sap.ui.core.routing.Router.prototype.destroy.apply(this, arguments);
			this._oRouteMatchedHandler.destroy();
		},

		onBack: function (oEvt) {
			var pViewCurrent = oEvt.getSource().getCustomData()[0].getValue();
			pViewCurrent.getController().back();
		},

		getCurrentRoute: function () {
			var Obj_routes = this._oRouter._oRoutes;
			var pattern = sap.ui.core.UIComponent.getRouterFor(oCtrl_Login).oHashChanger.getHash();
			//var pattern = sap.ui.core.UIComponent.getRouterFor(oCtrl_KLogin)._oRouter._prevMatchedRequest
			var sName = pattern.split("/")[0];

			var keys = Object.keys(Obj_routes);
			var Current = undefined;

			if (sName != "")
				for (var i = 0; i < keys.length; i++) {
					if (keys[i] == sName) {
						Current = Obj_routes[sName]._oConfig.viewId;
						break;
					}
				}
			else
				Current = "idRKLogin";

			return Current;
		},

		f_createFilterPanel: function (oKeyFilter, oController, oContainer, oMaxIncludes) {
			var oIdFilterPanel = oController.getView().getId() + "--FilterPanel";

			if (oCore.byId(oIdFilterPanel) != undefined)
				oCore.byId(oIdFilterPanel).destroy();

			var oFilterPanel = new controls.P13nFilterPanelVRD(oIdFilterPanel, {
				maxIncludes: (oMaxIncludes == undefined) ? -1 : oMaxIncludes,
				maxExcludes: -1,
				layoutMode: ""
			});

			oFilterPanel.bindItems("mFilt>/" + oKeyFilter, new sap.m.P13nItem({
				columnKey: "{mFilt>zcolumnKey}",
				text: "{mFilt>ztext}",
				tooltip: "{mFilt>ztooltip}",
				type: "{mFilt>ztype}",
				maxLength: "{mFilt>zmaxLength}",
				precision: "{mFilt>zprecision}",
				scale: "{mFilt>zscale}",
				isDefault: "{mFilt>zisDefault}",
				values: "{mFilt>zvalues}",
				customData: [
					new sap.ui.core.CustomData({ key: "bindingPath", value: "{mFilt>zbindingPath}" }) // combo
				]
			}));

			oFilterPanel.bindFilterItems("mFiltItems>/" + oKeyFilter, new sap.m.P13nFilterItem({
				key: "{mFiltItems>zzkey}",
				exclude: "{mFiltItems>zexclude}",
				columnKey: "{mFiltItems>zcolumnKey}",
				operation: "{mFiltItems>zoperation}",
				value1: "{mFiltItems>zvalue1}",
				value2: "{mFiltItems>zvalue2}",
				customData: [
					new sap.ui.core.CustomData({ key: "zvisible", value: "{mFilt>zvisible}" }) // combo
				]
			}));

			// ASVRAMIREZ Filtros Personalizados manualmente
			oFilterPanel.setIncludeOperations([sap.m.P13nConditionOperation.EQ,
			sap.m.P13nConditionOperation.Contains], "string");

			oFilterPanel.setIncludeOperations([sap.m.P13nConditionOperation.EQ,
			sap.m.P13nConditionOperation.BT], "date");

			var moFilt = new sap.ui.model.json.JSONModel();
			moFilt.setData(jQuery.extend(true, {}, oCore.getModel("mFilt").getData()));
			var moFiltItems = new sap.ui.model.json.JSONModel();
			moFiltItems.setData(jQuery.extend(true, {}, oCore.getModel("mFiltItems").getData()));

			oFilterPanel.setModel(moFilt, "mFilt");
			oFilterPanel.setModel(moFiltItems, "mFiltItems");

			var btn1 = new sap.m.Button({
				text: oCnt_FHelps.f_readTranslate("FilterPanel.Button.1"),
				press: function (oEvt) {
					oC_Modulo_WiseMobile.onSearch(oEvt, oController, oFilterPanel, oKeyFilter);
				}
			}).bindProperty("text", "i18n>FilterPanel.Button.1");

			var btn2 = new sap.m.Button({
				//				type: "Reject",
				text: oCnt_FHelps.f_readTranslate("FilterPanel.Button.2"),
				press: function (oEvt) {
					oC_Modulo_WiseMobile.onReset(oEvt, oController);
				}
			}).bindProperty("text", "i18n>FilterPanel.Button.2");

			// Buscar // Reset
			//oFilterPanel.setButtonsToolbar(btn1, btn2);

			var oPanel = new sap.m.Panel({
				headerToolbar: new sap.m.Toolbar({
					content: [
						new sap.m.Title({ text: oCnt_FHelps.f_readTranslate("FilterPanel.Title") }).bindProperty("text", "i18n>FilterPanel.Title"),
						new sap.m.ToolbarSpacer(),
						btn1,
						btn2
					]
				}),
				expandable: true,
				expanded: true,
				content: oFilterPanel
			});

			if (oController.getView().byId(oContainer) != undefined)
				oController.getView().byId(oContainer).insertContent(oPanel, 0);
			else
				oCore.byId(oContainer).insertContent(oPanel, 0);
		},
		
		onSearch: function (oEvt, oController, oFilterPanel, oKeyFilter) {

			var Parameters = oFilterPanel.getConditions();
		
			console.log(Parameters);
			console.log(oFilterPanel);
			console.log(oKeyFilter);
			

			//ORR Se guarda en la variable global, los parámetros del filtrado
			paramsTipoRecepcion = Parameters;

			var oConds = {};
			//var oFilters = [];

			for (var i = 0; i < Parameters.length; i++) {

				if (Parameters[i].value1 != "") {/*
					oFilters.push({
						campo: Parameters[i].keyField,
						operador: Parameters[i].operation,
						valor1: Parameters[i].value1,
						valor2: Parameters[i].value2,
						tipo: Parameters[i].typeField,
						//rows: oFilterPanel.getLimitRows()
					})*/
				}
			}



			//var json = oFilters
			/*
			oFilters = { "value" : JSON.stringify([ { "filters": oFilters, "cantidad_max" : oFilterPanel.getLimitRows(), "idioma":  oCore.User.Language.toUpperCase() }] )};
			oController.oServ_Cabeceras(oFilters);*/
			if (oController.f_bindTable != undefined) {
				oController.f_bindTable(Parameters, oKeyFilter);
			}
			else {
				oBusyDialog.open();
				var oWorkTo = oController.getView().getId().replace("idV", "");
				oWorkTo = oWorkTo.replace("idR", "");
				var oPath = oWorkTo.toUpperCase();
				var oNameModel = "mTables";

				if (oWorkTo == "ComplementosPago") {
					oC_Modulo_WiseMobile.oServ_ListadoDocumentosComp(oController, Parameters);
				}
				if (oWorkTo == "Cotizaciones") {
					oC_Modulo_WiseMobile.oServ_ListadoCotizaciones(oController, Parameters);
				}
				if (oWorkTo == "EstatusCotizaciones") {
					oC_Modulo_WiseMobile.oServ_ListadoEstatusCotizaciones(oController, Parameters);
				}
				if (oWorkTo == "Avisos") {
					oC_Modulo_WiseMobile.oServ_ListadoAvisos(oController, Parameters);
				}
				if (oWorkTo == "OrdnCompraXFacturar") {
					oC_Modulo_WiseMobile.oServ_ListadoOrdenesCompraxFacturar(oController, Parameters);
				}
				if(oWorkTo=="DocumentoConsignacionXFacturar"){
					oC_Modulo_WiseMobile.oServ_ListadoDocumentosConsignacionxFacturar(oController,Parameters);
				}
				if (oWorkTo == "EstatusRecepcion") {
					oC_Modulo_WiseMobile.oServ_ListadoEstatusRecepcion(oController, Parameters);
				}
				if (oWorkTo == "ListadoFacturas") {
					oC_Modulo_WiseMobile.oServ_ListadoFacturas(oController, Parameters);
				}
				if (oWorkTo == "EstadoCuenta") {
					oC_Modulo_WiseMobile.oServ_ListadoEstadoCuenta(oController, Parameters);
				}
				if (oWorkTo == "OrdenesdeCompraporAutorizar") {
					oC_Modulo_WiseMobile.oServ_ListadoOrdenesCompraPorAutorizar(oController, Parameters);
				}
				if (oWorkTo == "RequisicionesporAutorizar") {
					oC_Modulo_WiseMobile.oServ_ListadoRequisicionesPorAutorizar(oController, Parameters);
				}



				//				var oTable = oController.getView().byId("idPage").getContent()[1];
				/*var oTable = oController.getView().byId("idTable"+oWorkTo);
				
				if(oCore.getModel( oNameModel ).getProperty("/"+oPath) == undefined){
					
					oNameModel = "m"+oWorkTo;
					oPath = oWorkTo.replace("Monitor","");
							
					oTable.bindItems({
						path: oNameModel+">/"+oPath,
						template: oTable.getBindingInfo("items").template
					});
					
				}
				else{
					oTable.bindItems({
						path: "mTables>/"+oPath,
						template: oTable.getBindingInfo("items").template
					});
				}
				
				var oCount = oCore.getModel( oNameModel ).getProperty("/"+oPath).length;
				oController.getView().byId("idCountTable"+oWorkTo).setText("("+oCount+")");*/
			}
		},

		onSearchNewFilter: function (oEvt, oController, oFilterPanel, oKeyFilter) {

			// ORR Se recibe el objeto json y se asigna a la variable Parameters
			var Parameters = oFilterPanel;
			
			console.log(Parameters);
			console.log(oFilterPanel);
			console.log(oKeyFilter);
			//

			//ORR Se guarda en la variable global, los parámetros del filtrado
			paramsTipoRecepcion = Parameters;

			var oConds = {};
			//var oFilters = [];

			for (var i = 0; i < Parameters.length; i++) {

				if (Parameters[i].value1 != "") {/*
					oFilters.push({
						campo: Parameters[i].keyField,
						operador: Parameters[i].operation,
						valor1: Parameters[i].value1,
						valor2: Parameters[i].value2,
						tipo: Parameters[i].typeField,
						//rows: oFilterPanel.getLimitRows()
					})*/
				}
			}



			//var json = oFilters
			/*
			oFilters = { "value" : JSON.stringify([ { "filters": oFilters, "cantidad_max" : oFilterPanel.getLimitRows(), "idioma":  oCore.User.Language.toUpperCase() }] )};
			oController.oServ_Cabeceras(oFilters);*/
			if (oController.f_bindTable != undefined) {
				oController.f_bindTable(Parameters, oKeyFilter);
			}
			else {
				oBusyDialog.open();
				var oWorkTo = oController.getView().getId().replace("idV", "");
				oWorkTo = oWorkTo.replace("idR", "");
				var oPath = oWorkTo.toUpperCase();
				var oNameModel = "mTables";

				if (oWorkTo == "ComplementosPago") {
					oC_Modulo_WiseMobile.oServ_ListadoDocumentosComp(oController, Parameters);
				}
				if (oWorkTo == "Cotizaciones") {
					oC_Modulo_WiseMobile.oServ_ListadoCotizaciones(oController, Parameters);
				}
				if (oWorkTo == "EstatusCotizaciones") {
					oC_Modulo_WiseMobile.oServ_ListadoEstatusCotizaciones(oController, Parameters);
				}
				if (oWorkTo == "Avisos") {
					oC_Modulo_WiseMobile.oServ_ListadoAvisos(oController, Parameters);
				}
				if (oWorkTo == "OrdnCompraXFacturar") {
					oC_Modulo_WiseMobile.oServ_ListadoOrdenesCompraxFacturar(oController, Parameters);
				}
				if(oWorkTo=="DocumentoConsignacionXFacturar"){
					oC_Modulo_WiseMobile.oServ_ListadoDocumentosConsignacionxFacturar(oController,Parameters);
				}
				if (oWorkTo == "EstatusRecepcion") {
					oC_Modulo_WiseMobile.oServ_ListadoEstatusRecepcion(oController, Parameters);
				}
				if (oWorkTo == "ListadoFacturas") {
					oC_Modulo_WiseMobile.oServ_ListadoFacturas(oController, Parameters);
				}
				if (oWorkTo == "EstadoCuenta") {
					oC_Modulo_WiseMobile.oServ_ListadoEstadoCuenta(oController, Parameters);
				}
				if (oWorkTo == "OrdenesdeCompraporAutorizar") {
					oC_Modulo_WiseMobile.oServ_ListadoOrdenesCompraPorAutorizar(oController, Parameters);
				}
				if (oWorkTo == "RequisicionesporAutorizar") {
					oC_Modulo_WiseMobile.oServ_ListadoRequisicionesPorAutorizar(oController, Parameters);
				}



				//				var oTable = oController.getView().byId("idPage").getContent()[1];
				/*var oTable = oController.getView().byId("idTable"+oWorkTo);
				
				if(oCore.getModel( oNameModel ).getProperty("/"+oPath) == undefined){
					
					oNameModel = "m"+oWorkTo;
					oPath = oWorkTo.replace("Monitor","");
							
					oTable.bindItems({
						path: oNameModel+">/"+oPath,
						template: oTable.getBindingInfo("items").template
					});
					
				}
				else{
					oTable.bindItems({
						path: "mTables>/"+oPath,
						template: oTable.getBindingInfo("items").template
					});
				}
				
				var oCount = oCore.getModel( oNameModel ).getProperty("/"+oPath).length;
				oController.getView().byId("idCountTable"+oWorkTo).setText("("+oCount+")");*/
			}
		},

		onReset: function (oEvt, oController, oWorkTo) {
			oBusyDialog.open();

			var oAmbito = oController.getView().getId().replace("idR", "");

			if (oAmbito == "OtraVistaNComtemplada") {
				/*
				var oControl = oController.getView().byId("idIconTabBarTickets").removeContent(0);
				oC_Modulo_WiseMobile.f_createFilterPanel("TICKETS", oCtrl_MonitorTickets, "idIconTabBarTickets");
				oController.getView().byId("idCountTableTicketsCab").setText("(0)");
				oController.getView().byId("idIconTabBarTickets").setCount("");
				oController.getView().byId("idTMonitorTickets").setGrowingThreshold(5);
				
				var oModel = "mTicketsCab";
				oCore.getModel(oModel).setProperty("/TICKETSCAB", []);*/
			} else {
				if (oWorkTo == undefined) {
					//oWorkTo = oController.getView().byId("idPage").getCustomData()[0].getKey();
					oWorkTo = oController.getView().getId().replace("idV", "");
					oWorkTo = oWorkTo.replace("idR", "");
				}
				var oPath = oWorkTo.toUpperCase();
				var oControl;

				if (oWorkTo == "EnvioFacturas") {
					oControl = sap.ui.getCore().byId("idPageDialog").removeContent(0)
					sap.ui.getCore().getModel("mTables").setProperty("/ORDENCOMPRA_CFACTURA", []);
					sap.ui.getCore().getModel("mTables").setProperty("/CONSIGNACION_CFACTURA", []);
					sap.ui.getCore().byId("idTableDocumentos").setFooterText("Total: $0.00");
					sap.ui.getCore().byId("idTableDocumentos").removeSelections();
				} else if (oWorkTo == "EstadoCuenta") {
					oControl = oController.getView().byId("idPage").removeContent(0);
					oController.getView().byId("idCountTablePartidasAbiertas").setText("(0)");
					oController.getView().byId("idCountTablePartidasCompensadas").setText("(0)");
				} else {
					oControl = oController.getView().byId("idPage").removeContent(0);
					oController.getView().byId("idCountTable" + oWorkTo).setText("(0)");
				}
				//


				if (oController.f_createAllFiltersPanel() != true) {
					if (oWorkTo == "EstadoCuenta") {
						var oTable_1 = oController.getView().byId("idTablePartidasAbiertas");
						var oTable_2 = oController.getView().byId("idTablePartidasCompensadas");
						oTable_1.removeSelections();
						oTable_2.removeSelections();
						oTable_1.setGrowingThreshold(5);
						oTable_2.setGrowingThreshold(5);
					} else {
						var oTable = oController.getView().byId("idTable" + oWorkTo);
						oTable.removeSelections();
						oTable.setGrowingThreshold(5);
					}

					if (oWorkTo == "ComplementosPago") {
						sap.ui.getCore().getModel("mTablesListadoDocComp").setData({ DOC_COMPENSADOS: [] });//revisar datos
						sap.ui.getCore().getModel("mTablesListadoDocComp").refresh();
					}
					if (oWorkTo == "Cotizaciones") {
						sap.ui.getCore().getModel("mTablesCotizaciones").setData({ DOC_COTIZACIONES: [] });//revisar datos
						sap.ui.getCore().getModel("mTablesCotizaciones").refresh();
					}
					if (oWorkTo == "EstatusCotizaciones") {
						sap.ui.getCore().getModel("mTablesEstCotizaciones").setData({ DOC_ESTCOTIZACIONES: [] });//revisar datos
						sap.ui.getCore().getModel("mTablesEstCotizaciones").refresh();
					}
					if (oWorkTo == "Avisos") {
						sap.ui.getCore().getModel("mTablesAvisos").setData({ DOC_AVISOS: [] });//revisar datos
						sap.ui.getCore().getModel("mTablesAvisos").refresh();
					}
					if (oWorkTo == "OrdnCompraXFacturar") {
						sap.ui.getCore().getModel("mTablesOrdenesCompraxFacturar").setData({ DOC_ORDENESCOMPRAXFACTURAR: [] });//revisar datos
						sap.ui.getCore().getModel("mTablesOrdenesCompraxFacturar").refresh();
					}
					if(oWorkTo=="DocumentoConsignacionXFacturar"){
						sap.ui.getCore().getModel("mTablesDocumentosConsignacionxFacturar").setData({DOC_DOCUMENTOSCONSIGNACIONXFACTURAR:[]});//revisar datos
			            sap.ui.getCore().getModel("mTablesDocumentosConsignacionxFacturar").refresh();
					}
					if (oWorkTo == "EstatusRecepcion") {
						sap.ui.getCore().getModel("mTablesEstatusRecepcion").setData({ DOC_ESTATUSRECEPCION: [] });//revisar datos
						sap.ui.getCore().getModel("mTablesEstatusRecepcion").refresh();
					}
					if (oWorkTo == "ListadoFacturas") {
						sap.ui.getCore().getModel("mTablesListadoFacturas").setData({ DOC_LISTADOFACTURAS: [] });//revisar datos
						sap.ui.getCore().getModel("mTablesListadoFacturas").refresh();
					}
					if (oWorkTo == "EstadoCuenta") {
						sap.ui.getCore().getModel("mTablesPartidasAbiertas").setData({ DOC_PARTIDASABIERTAS: [] });//revisar datos
						sap.ui.getCore().getModel("mTablesPartidasCompensadas").setData({ DOC_PARTIDASCOMPENSADAS: [] });//revisar datos
						sap.ui.getCore().getModel("mTablesPartidasAbiertas").refresh();
						sap.ui.getCore().getModel("mTablesPartidasCompensadas").refresh();
					}
					if (oWorkTo == "OrdenesdeCompraporAutorizar") {
						sap.ui.getCore().getModel("mTablesOrdenesCompra").setData({ ORDENES_COMPRA: [] });//revisar datos
						sap.ui.getCore().getModel("mTablesOrdenesCompra").refresh();
					}
					if (oWorkTo == "RequisicionesporAutorizar") {
						sap.ui.getCore().getModel("mTablesRequisiciones").setData({ REQUISICIONES: [] });//revisar datos
						sap.ui.getCore().getModel("mTablesRequisiciones").refresh();
					}

				}
			}

			oBusyDialog.close();
			// Destruimos el antiguo Filter Panel
			setTimeout(function () {
				oControl.destroy();
			}, 250);
		},

		ExportToExcel: function (oController, idtable, sheetName) {
			// agregar cabecera de tabla para
			// exportar
			var columns = oController.byId(idtable).getColumns();
			for (var i = 0; i < columns.length; i++) {
				var id = "#" + oController.byId(idtable) + "_col" + i;
				$(id).text(columns[i].getHeader().getText())
			}
			// exportar tabla
			tableToExcel("idRMonitorRoles--" + idtable, sheetName);
			// quitar cabecera
			for (var i = 0; i < columns.length; i++) {
				var id = "#" + oController.byId(idtable) + "_col" + i;
				$(id).text("")
			}
		},

		oServ_ListadoDocumentosComp: function (oController, Parameters) {
			var cadena_sociedad = "";
			var cadena_estado = "";
			var cadena_fpago = "";
			for (var i = 0; i < Parameters.length; i++) {

				if (Parameters[i].keyField == "sociedad") {
					cadena_sociedad = cadena_sociedad + '<BUKRS>' + Parameters[i].value1 + '</BUKRS>'
				}
				if (Parameters[i].keyField == "estado") {
					cadena_estado = cadena_estado + '<STATUS>' + Parameters[i].value1 + '</STATUS>'
				}
				if (Parameters[i].keyField == "f_pago" && Parameters[i].value1 != "") {
					//var fecha1= (Parameters[i].value1).split('/');
					//Parameters[i].value1=fecha1[2]+"-"+fecha1[1]+"-"+fecha1[0];

					cadena_fpago = cadena_fpago + '<item><SIGN>I</SIGN><OPTION>BT</OPTION><LOW>' + Parameters[i].value1 + '</LOW>';

					if (Parameters[i].value2 != "" && Parameters[i].value2 != null) {
						//var fecha2= (Parameters[i].value2).split('/');
						//Parameters[i].value2=fecha2[2]+"-"+fecha2[1]+"-"+fecha2[0];
						cadena_fpago = cadena_fpago + '<HIGH>' + Parameters[i].value2 + '</HIGH></item>'
					} else {
						cadena_fpago = cadena_fpago + '<HIGH>' + Parameters[i].value1 + '</HIGH></item>'
					}

				}
			}

			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
			soapMessage = soapMessage + '<soap:Header/>';
			soapMessage = soapMessage + '<soap:Body>';
			soapMessage = soapMessage + '<urn:_-WI12_-FM_WS_GET_CLEARED_DATA>';
			soapMessage = soapMessage + '<EX_IN_CLEARED_DOCS>';
			soapMessage = soapMessage + cadena_sociedad;

			soapMessage = soapMessage + '<LIFNR>';
			soapMessage = soapMessage + '<item>';
			soapMessage = soapMessage + '<SIGN>I</SIGN>';
			soapMessage = soapMessage + '<OPTION>EQ</OPTION>';
			soapMessage = soapMessage + '<LOW>' + Lifnr + '</LOW>';
			soapMessage = soapMessage + '<HIGH>' + Lifnr + '</HIGH>';
			soapMessage = soapMessage + '</item>';
			soapMessage = soapMessage + '</LIFNR>';
			soapMessage = soapMessage + '<BUDAT>';

			soapMessage = soapMessage + cadena_fpago;
			soapMessage = soapMessage + '</BUDAT>';
			soapMessage = soapMessage + cadena_estado;
			soapMessage = soapMessage + '<FLG_MONITOR></FLG_MONITOR>';
			soapMessage = soapMessage + '<GJAHR>';

			soapMessage = soapMessage + '<item>';
			soapMessage = soapMessage + '<SIGN></SIGN>';
			soapMessage = soapMessage + '<OPTION></OPTION>';
			soapMessage = soapMessage + '<LOW></LOW>';
			soapMessage = soapMessage + '<HIGH></HIGH>';
			soapMessage = soapMessage + '</item>';
			soapMessage = soapMessage + '</GJAHR>';
			soapMessage = soapMessage + '<ERDAT>';

			soapMessage = soapMessage + '<item>';
			soapMessage = soapMessage + '<SIGN></SIGN>';
			soapMessage = soapMessage + '<OPTION></OPTION>';
			soapMessage = soapMessage + '<LOW></LOW>';
			soapMessage = soapMessage + '<HIGH></HIGH>';
			soapMessage = soapMessage + '</item>';
			soapMessage = soapMessage + '</ERDAT>';
			soapMessage = soapMessage + '<FLGERR></FLGERR>';
			soapMessage = soapMessage + '<GJAHR>';

			soapMessage = soapMessage + '<item>';
			soapMessage = soapMessage + '<SIGN></SIGN>';
			soapMessage = soapMessage + '<OPTION></OPTION>';
			soapMessage = soapMessage + '<LOW></LOW>';
			soapMessage = soapMessage + '<HIGH></HIGH>';
			soapMessage = soapMessage + '</item>';
			soapMessage = soapMessage + '</GJAHR>';
			soapMessage = soapMessage + '</EX_IN_CLEARED_DOCS>';
			soapMessage = soapMessage + '</urn:_-WI12_-FM_WS_GET_CLEARED_DATA>';
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

				var mModel = sap.ui.getCore().getModel("mTablesListadoDocComp");
				mModel.setData({});
				mModel.setData(json);//revisar datos
				mModel.refresh();

				var Type = sap.ui.getCore().getModel("mTablesListadoDocComp").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_CLEARED_DATA.Response/ET_RETURN").item.TYPE;
				var Message = sap.ui.getCore().getModel("mTablesListadoDocComp").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_CLEARED_DATA.Response/ET_RETURN").item.MESSAGE;

				if (Type == "S") {
					var length = sap.ui.getCore().getModel("mTablesListadoDocComp").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_CLEARED_DATA.Response/IM_OUT_CLEARED_DOCS/item").length;

					if (length == undefined) {

						var mData = sap.ui.getCore().getModel("mTablesListadoDocComp").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_CLEARED_DATA.Response/IM_OUT_CLEARED_DOCS/item");
						mData.No = 1;
						sap.ui.getCore().getModel("mTablesListadoDocComp").setData({ DOC_COMPENSADOS: [mData] });//revisar datos
						oController.byId("idCountTableComplementosPago").setText("(1)");

					} else {
						var mData = sap.ui.getCore().getModel("mTablesListadoDocComp").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI12_-FM_WS_GET_CLEARED_DATA.Response/IM_OUT_CLEARED_DOCS/item");

						for (i = 0; i < mData.length; i++) {
							mData[i].No = i + 1;
						}

						sap.ui.getCore().getModel("mTablesListadoDocComp").setData({ DOC_COMPENSADOS: mData });//revisar datos
						oController.byId("idCountTableComplementosPago").setText("(" + length + ")");
					}
				} else {
					oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title"));
					oController.byId("idCountTableComplementosPago").setText("(0)");
				}

				oBusyDialog.close();


			}
			function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
			{
				oCnt_FHelps.f_showMessage("ERROR", error);
			}
		},

		oServ_ListadoCotizaciones: function (oController, Parameters) {
			var coleccion_sociedad = "";
			var coleccion_peticion = "";
			var coleccion_fecha_lic = "";

			for (var i = 0; i < Parameters.length; i++) {

				if (Parameters[i].keyField == "BUKRS" && Parameters[i].value1 != "") {
					coleccion_sociedad = coleccion_sociedad + '<item><SIGN>I</SIGN><OPTION>' + Parameters[i].operation + '</OPTION><LOW>' + Parameters[i].value1 + '</LOW><HIGH>' + Parameters[i].value1 + '</HIGH></item>'
				}
				if (Parameters[i].keyField == "peticion_oferta" && Parameters[i].value1 != "") {
					coleccion_peticion = coleccion_peticion + '<item><SIGN>I</SIGN><OPTION>' + Parameters[i].operation + '</OPTION><LOW>' + Parameters[i].value1 + '</LOW><HIGH>' + Parameters[i].value1 + '</HIGH></item>'
				}
				if (Parameters[i].keyField == "f_licitacion" && Parameters[i].value1 != "") {
					if (Parameters[i].operation == "EQ") {
						coleccion_fecha_lic = coleccion_fecha_lic + '<item><SIGN>I</SIGN><OPTION>' + Parameters[i].operation + '</OPTION><LOW>' + Parameters[i].value1 + '</LOW><HIGH>' + Parameters[i].value1 + '</HIGH></item>'
					} else {
						coleccion_fecha_lic = coleccion_fecha_lic + '<item><SIGN>I</SIGN><OPTION>' + Parameters[i].operation + '</OPTION><LOW>' + Parameters[i].value1 + '</LOW><HIGH>' + Parameters[i].value2 + '</HIGH></item>'
					}

				}
			}

			var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
			soapMessage = soapMessage + '<soapenv:Header/>';
			soapMessage = soapMessage + '<soapenv:Body>';
			soapMessage = soapMessage + '<urn:_-WI18_-GET_ACT_QUOTE_LIST>';
			soapMessage = soapMessage + '<IS_GET_ACT_QUOTE_LIST>';
			soapMessage = soapMessage + '<LIFNR>' + Lifnr + '</LIFNR>';
			soapMessage = soapMessage + '<BUKRS_RAN>' + coleccion_sociedad + '</BUKRS_RAN>';
			soapMessage = soapMessage + '<EBELN_RAN>' + coleccion_peticion + '</EBELN_RAN>';
			soapMessage = soapMessage + '<BEDAT_RAN>' + coleccion_fecha_lic + '</BEDAT_RAN>';
			soapMessage = soapMessage + '</IS_GET_ACT_QUOTE_LIST>';
			soapMessage = soapMessage + '</urn:_-WI18_-GET_ACT_QUOTE_LIST>';
			soapMessage = soapMessage + '</soapenv:Body>';
			soapMessage = soapMessage + '</soapenv:Envelope>';

			//Llamamos a la función AJAX de JQuery
			$.ajax({
				url: webServiceURL_Cotizaciones,
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
				console.log(json);
				var mModel = sap.ui.getCore().getModel("mTablesCotizaciones");
				mModel.setData({});
				mModel.setData(json);//revisar datos
				mModel.refresh();

				var Type = sap.ui.getCore().getModel("mTablesCotizaciones").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-GET_ACT_QUOTE_LIST.Response/ES_RETURN").TYPE;
				console.log(Type);
				var Message = sap.ui.getCore().getModel("mTablesCotizaciones").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-GET_ACT_QUOTE_LIST.Response/ES_RETURN").MESSAGE;

				var mData = sap.ui.getCore().getModel("mTablesCotizaciones").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-GET_ACT_QUOTE_LIST.Response/ET_ACTIVE_RFQS/item");

				if (Type == "S") {
					var length = sap.ui.getCore().getModel("mTablesCotizaciones").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-GET_ACT_QUOTE_LIST.Response/ET_ACTIVE_RFQS/item").length;

					if (length == undefined) {
						mData.No = 1;
						sap.ui.getCore().getModel("mTablesCotizaciones").setData({ DOC_COTIZACIONES: [mData] });//revisar datos
						oController.byId("idCountTableCotizaciones").setText("(1)");

					} else {
						for (i = 0; i < mData.length; i++) {
							mData[i].No = i + 1;
						}

						sap.ui.getCore().getModel("mTablesCotizaciones").setData({ DOC_COTIZACIONES: mData });//revisar datos
						oController.byId("idCountTableCotizaciones").setText("(" + length + ")");
					}
				} else {
					oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title"));
					oController.byId("idCountTableCotizaciones").setText("(0)");
				}
				oBusyDialog.close();


			}
			function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
			{
				oCnt_FHelps.f_showMessage("ERROR", error);
			}
		},

		oServ_ListadoEstatusCotizaciones: function (oController, Parameters) {
			var coleccion_sociedad = "";
			var coleccion_peticion = "";
			var coleccion_fecha_lic = "";
			var coleccion_estado = "";

			for (var i = 0; i < Parameters.length; i++) {

				if (Parameters[i].keyField == "BUKRS" && Parameters[i].value1 != "") {
					coleccion_sociedad = coleccion_sociedad + '<item><SIGN>I</SIGN><OPTION>' + Parameters[i].operation + '</OPTION><LOW>' + Parameters[i].value1 + '</LOW><HIGH>' + Parameters[i].value1 + '</HIGH></item>'
				}
				if (Parameters[i].keyField == "peticion_oferta" && Parameters[i].value1 != "") {
					coleccion_peticion = coleccion_peticion + '<item><SIGN>I</SIGN><OPTION>' + Parameters[i].operation + '</OPTION><LOW>' + Parameters[i].value1 + '</LOW><HIGH>' + Parameters[i].value1 + '</HIGH></item>'
				}
				if (Parameters[i].keyField == "f_licitacion" && Parameters[i].value1 != "") {
					if (Parameters[i].operation == "EQ") {
						coleccion_fecha_lic = coleccion_fecha_lic + '<item><SIGN>I</SIGN><OPTION>' + Parameters[i].operation + '</OPTION><LOW>' + Parameters[i].value1 + '</LOW><HIGH>' + Parameters[i].value1 + '</HIGH></item>'
					} else {
						coleccion_fecha_lic = coleccion_fecha_lic + '<item><SIGN>I</SIGN><OPTION>' + Parameters[i].operation + '</OPTION><LOW>' + Parameters[i].value1 + '</LOW><HIGH>' + Parameters[i].value2 + '</HIGH></item>'
					}

				}
				if (Parameters[i].keyField == "estado" && Parameters[i].value1 != "") {
					coleccion_estado = coleccion_estado + '<item><SIGN>I</SIGN><OPTION>' + Parameters[i].operation + '</OPTION><LOW>' + Parameters[i].value1 + '</LOW><HIGH>' + Parameters[i].value1 + '</HIGH></item>'
				}
			}

			var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
			soapMessage = soapMessage + '<soapenv:Header/>';
			soapMessage = soapMessage + '<soapenv:Body>';
			soapMessage = soapMessage + '<urn:_-WI18_-GET_RFQ_STAT_REP>';
			soapMessage = soapMessage + '<IS_RFQ_STAT_REP_LIST_IN>';
			soapMessage = soapMessage + '<LIFNR>' + Lifnr + '</LIFNR>';
			soapMessage = soapMessage + '<BUKRS_RAN>' + coleccion_sociedad + '</BUKRS_RAN>';
			soapMessage = soapMessage + '<EBELN_RAN>' + coleccion_peticion + '</EBELN_RAN>';
			soapMessage = soapMessage + '<BEDAT_RAN>' + coleccion_fecha_lic + '</BEDAT_RAN>';
			soapMessage = soapMessage + '<STATUS_RAN>' + coleccion_estado + '</STATUS_RAN>';
			soapMessage = soapMessage + '</IS_RFQ_STAT_REP_LIST_IN>';
			soapMessage = soapMessage + '</urn:_-WI18_-GET_RFQ_STAT_REP>';
			soapMessage = soapMessage + '</soapenv:Body>';
			soapMessage = soapMessage + '</soapenv:Envelope>';

			//Llamamos a la función AJAX de JQuery
			$.ajax({
				url: webServiceURL_Cotizaciones,
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

				console.log(json);
				sap.ui.getCore().getModel("mTablesEstCotizaciones").setData(json);//revisar datos
				sap.ui.getCore().getModel("mTablesEstCotizaciones").refresh();

				var Type = sap.ui.getCore().getModel("mTablesEstCotizaciones").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-GET_RFQ_STAT_REP.Response/ES_RETURN").TYPE;
				var Message = sap.ui.getCore().getModel("mTablesEstCotizaciones").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-GET_RFQ_STAT_REP.Response/ES_RETURN").MESSAGE;

				var mData = sap.ui.getCore().getModel("mTablesEstCotizaciones").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-GET_RFQ_STAT_REP.Response/ET_STAT_RFQ_REPORT/item");

				if (Type == "S") {
					var length = mData.length;

					if (length == undefined) {
						sap.ui.getCore().getModel("mTablesEstCotizaciones").setData({ DOC_ESTCOTIZACIONES: [mData] });//revisar datos
						oController.byId("idCountTableEstatusCotizaciones").setText("(1)");

					} else {
						sap.ui.getCore().getModel("mTablesEstCotizaciones").setData({ DOC_ESTCOTIZACIONES: mData });//revisar datos
						oController.byId("idCountTableEstatusCotizaciones").setText("(" + length + ")");
					}
				} else {
					oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title"));
					oController.byId("idCountTableEstatusCotizaciones").setText("(0)");
				}

				oBusyDialog.close();
			}
			function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
			{
				oCnt_FHelps.f_showMessage("ERROR", error);
			}
		},


		oServ_ListadoAvisos: function (oController, Parameters) {

			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
			soapMessage = soapMessage + '<soap:Header/>';
			soapMessage = soapMessage + '<soap:Body>';
			soapMessage = soapMessage + '<urn:_-WI18_-OBTAIN_NOTICES>';
			soapMessage = soapMessage + '<IS_OBTAIN_NOT_IN>';
			soapMessage = soapMessage + '<BUKRS>' + Parameters[0].value1 + '</BUKRS>';
			soapMessage = soapMessage + '<LIFNR>' + Lifnr + '</LIFNR>';
			soapMessage = soapMessage + '<IDIOMA>' + oLenguaje + '</IDIOMA>';
			soapMessage = soapMessage + '<TIPO_AVISO>1</TIPO_AVISO>';
			soapMessage = soapMessage + '</IS_OBTAIN_NOT_IN>';
			soapMessage = soapMessage + '</urn:_-WI18_-OBTAIN_NOTICES>';
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
				var mModel = sap.ui.getCore().getModel("mTablesAvisos");

				mModel.setData(json);//revisar datos
				mModel.refresh();

				var Type = mModel.getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-OBTAIN_NOTICES.Response/ES_RETURN").TYPE;
				// ORR Se csmbia para traer la propieda de mensaje
				//var Message = mModel.getProperty("/env:Envelope/env:Body/n0:_-WI18_-OBTAIN_NOTICES.Response/ES_RETURN").MESSAGE;
				var Message = mModel.getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-OBTAIN_NOTICES.Response/ES_RETURN").MESSAGE;

				var mData = mModel.getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-OBTAIN_NOTICES.Response/ES_OBTAIN_NOT_OUT/LISTAPROV/item");

				if (Type == "S") {
					var length = mData.length;

					if (length == undefined) {
						if (mData.ESTATUSLECTURA == "0") {
							mData.ESTATUSLECTURA = true;
						} else {
							mData.ESTATUSLECTURA = false;
						}
						mModel.setData({ DOC_AVISOS: [mData] });//revisar datos
						oController.byId("idCountTableAvisos").setText("(1)");

					} else {
						for (i = 0; i < mData.length; i++) {
							if (mData[i].ESTATUSLECTURA == "0") {
								mData[i].ESTATUSLECTURA = true;
							} else {
								mData[i].ESTATUSLECTURA = false;
							}
						}
						mModel.setData({ DOC_AVISOS: mData });//revisar datos
						oController.byId("idCountTableAvisos").setText("(" + length + ")");
					}


				} else {
					oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title"));
					oController.byId("idCountTableAvisos").setText("(0)");
				}

				oBusyDialog.close();
			}
			function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
			{
				oCnt_FHelps.f_showMessage("ERROR", error);
			}
		},


		oServ_ListadoOrdenesCompraxFacturar: function (oController, Parameters) {
			var cadena_sociedad = "";
			var cadena_trecepcion = "";
			var cadena_fordencompra = "";
			// ORR
			var cadena_moneda = "";

			for (var i = 0; i < Parameters.length; i++) {

				if (Parameters[i].keyField == "BUKRS") {
					cadena_sociedad = cadena_sociedad + '<BUKRS>' + Parameters[i].value1 + '</BUKRS>'
				}
				if (Parameters[i].keyField == "tipo_recepcion") {
					cadena_trecepcion = cadena_trecepcion + '<TIPO>' + Parameters[i].value1 + '</TIPO>'
				}
				if (Parameters[i].keyField == "f_orden_Compra" && Parameters[i].value1 != "") {
					//var fecha1= (Parameters[i].value1).split('/');
					//Parameters[i].value1=fecha1[2]+"-"+fecha1[1]+"-"+fecha1[0];

					cadena_fordencompra = cadena_fordencompra + '<SIGN>I</SIGN><OPTION>BT</OPTION><LOW>' + Parameters[i].value1 + '</LOW>';

					if (Parameters[i].value2 != "" && Parameters[i].value2 != null) {
						//var fecha2= (Parameters[i].value2).split('/');
						//Parameters[i].value2=fecha2[2]+"-"+fecha2[1]+"-"+fecha2[0];
						cadena_fordencompra = cadena_fordencompra + '<HIGH>' + Parameters[i].value2 + '</HIGH>'
					} else {
						cadena_fordencompra = cadena_fordencompra + '<HIGH>' + Parameters[i].value1 + '</HIGH>'
					}

				}

				// ORR
				if (Parameters[i].keyField == "WAERS") {
					cadena_moneda = cadena_moneda + '<WAERS>' + Parameters[i].value1 + '</WAERS>'

				}
			}

			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
			soapMessage = soapMessage + '<soap:Header/>';
			soapMessage = soapMessage + '<soap:Body>';
			soapMessage = soapMessage + '<urn:_-WI18_-PO_PENDING_INV>';
			soapMessage = soapMessage + '<IS_PO_PENDI_INV_IN>';
			soapMessage = soapMessage + cadena_sociedad;
			soapMessage = soapMessage + '<EKORG/>';
			soapMessage = soapMessage + '<LIFNR>' + Lifnr + '</LIFNR>';
			soapMessage = soapMessage + '<EBELN/>';
			soapMessage = soapMessage + '<AEDAT>' + cadena_fordencompra + '</AEDAT>';
			soapMessage = soapMessage + '<FLAG/>';
			soapMessage = soapMessage + '<FOLIO></FOLIO>';
			soapMessage = soapMessage + cadena_trecepcion;
			// ORR
			//soapMessage=soapMessage+'<WAERS/>';
			soapMessage = soapMessage + cadena_moneda;
			soapMessage = soapMessage + '<IDIOMA>' + oLenguaje + '</IDIOMA>';
			soapMessage = soapMessage + '<LISTEBELN>';
			soapMessage = soapMessage + '<item>';
			soapMessage = soapMessage + '<EBELN></EBELN>';
			soapMessage = soapMessage + '</item>';
			soapMessage = soapMessage + '</LISTEBELN>';
			soapMessage = soapMessage + '</IS_PO_PENDI_INV_IN>';
			soapMessage = soapMessage + '</urn:_-WI18_-PO_PENDING_INV>';
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

				console.log("JSON:",json);
				sap.ui.getCore().getModel("mTablesOrdenesCompraxFacturar").setData(json);//revisar datos
				sap.ui.getCore().getModel("mTablesOrdenesCompraxFacturar").refresh();

				var Type = sap.ui.getCore().getModel("mTablesOrdenesCompraxFacturar").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-PO_PENDING_INV.Response/ES_RETURN").TYPE;
				var Message = sap.ui.getCore().getModel("mTablesOrdenesCompraxFacturar").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-PO_PENDING_INV.Response/ES_RETURN").MESSAGE;

				var mData = sap.ui.getCore().getModel("mTablesOrdenesCompraxFacturar").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-PO_PENDING_INV.Response/ET_PO/item");

				if (Type == "S") {
					var length = mData.length;

					if (length == undefined) {
						sap.ui.getCore().getModel("mTablesOrdenesCompraxFacturar").setData({ DOC_ORDENESCOMPRAXFACTURAR: [mData] });//revisar datos
						oController.byId("idCountTableOrdnCompraXFacturar").setText("(1)");

					} else {
						sap.ui.getCore().getModel("mTablesOrdenesCompraxFacturar").setData({ DOC_ORDENESCOMPRAXFACTURAR: mData });//revisar datos
						oController.byId("idCountTableOrdnCompraXFacturar").setText("(" + length + ")");
					}
				} else {
					oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title"));
					oController.byId("idCountTableOrdnCompraXFacturar").setText("(0)");
				}

				oBusyDialog.close();
			}
			function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
			{
				oCnt_FHelps.f_showMessage("ERROR", error);
			}
		},

		oServ_ListadoDocumentosConsignacionxFacturar: function(oController,Parameters) {
			var cadena_sociedad="";
			var cadena_fordencompra="";

			for(var i=0; i<Parameters.length; i++){
				
				if(Parameters[i].keyField == "BUKRS"){
					cadena_sociedad=cadena_sociedad+'<BUKRS>'+Parameters[i].value1+'</BUKRS>'
				}
				if(Parameters[i].keyField == "f_orden_Compra" && Parameters[i].value1!=""){
					//var fecha1= (Parameters[i].value1).split('/');
					//Parameters[i].value1=fecha1[2]+"-"+fecha1[1]+"-"+fecha1[0];
					
					cadena_fordencompra=cadena_fordencompra+'<SIGN>I</SIGN><OPTION>BT</OPTION><LOW>'+Parameters[i].value1+'</LOW>';
					
					if(Parameters[i].value2!="" && Parameters[i].value2!=null){
						//var fecha2= (Parameters[i].value2).split('/');
						//Parameters[i].value2=fecha2[2]+"-"+fecha2[1]+"-"+fecha2[0];
						cadena_fordencompra=cadena_fordencompra+'<HIGH>'+Parameters[i].value2+'</HIGH>'
					}else{
						cadena_fordencompra=cadena_fordencompra+'<HIGH>'+Parameters[i].value1+'</HIGH>'
					}
					
				}

			}
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:_-WI18_-PO_PENDING_INV>';
				soapMessage=soapMessage+'<IS_PO_PENDI_INV_IN>';
				soapMessage=soapMessage+cadena_sociedad;
				soapMessage=soapMessage+'<EKORG/>';
				soapMessage=soapMessage+'<LIFNR>'+Lifnr+'</LIFNR>';
				soapMessage=soapMessage+'<EBELN/>';
				soapMessage=soapMessage+'<AEDAT>'+cadena_fordencompra+'</AEDAT>';
				soapMessage=soapMessage+'<FLAG/>';
				soapMessage=soapMessage+'<FOLIO></FOLIO>';
				soapMessage=soapMessage+cadena_trecepcion;
				// ORR
				//soapMessage=soapMessage+'<WAERS/>';
				soapMessage=soapMessage+cadena_moneda;
				soapMessage=soapMessage+'<IDIOMA>'+oLenguaje+'</IDIOMA>';
				soapMessage=soapMessage+'<LISTEBELN>';
				soapMessage=soapMessage+'<item>';
				soapMessage=soapMessage+'<EBELN></EBELN>';
				soapMessage=soapMessage+'</item>';
				soapMessage=soapMessage+'</LISTEBELN>';
				soapMessage=soapMessage+'</IS_PO_PENDI_INV_IN>';
				soapMessage=soapMessage+'</urn:_-WI18_-PO_PENDING_INV>';
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
	        
	        function OnSuccess(data, status)
	        {
	        	var json=xml2json(data);	        	
	        	
	            
	            sap.ui.getCore().getModel("mTablesOrdenesCompraxFacturar").setData(json);//revisar datos
	            sap.ui.getCore().getModel("mTablesOrdenesCompraxFacturar").refresh();
	            
	            var Type=sap.ui.getCore().getModel("mTablesOrdenesCompraxFacturar").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-PO_PENDING_INV.Response/ES_RETURN").TYPE;
	            var Message=sap.ui.getCore().getModel("mTablesOrdenesCompraxFacturar").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-PO_PENDING_INV.Response/ES_RETURN").MESSAGE;
	            
	            var mData=sap.ui.getCore().getModel("mTablesOrdenesCompraxFacturar").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-PO_PENDING_INV.Response/ET_PO/item");
	            
	            if(Type=="S"){
	            	var length=mData.length;
		            
		            if(length==undefined){    	
		            	sap.ui.getCore().getModel("mTablesOrdenesCompraxFacturar").setData({DOC_ORDENESCOMPRAXFACTURAR:[mData]});//revisar datos
		            	oController.byId("idCountTableOrdnCompraXFacturar").setText("(1)");
			            
		            }else{
		            	sap.ui.getCore().getModel("mTablesOrdenesCompraxFacturar").setData({DOC_ORDENESCOMPRAXFACTURAR:mData});//revisar datos
		            	oController.byId("idCountTableOrdnCompraXFacturar").setText("("+length+")");
		            }
	            }else{
	            	oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title") );
	            	oController.byId("idCountTableOrdnCompraXFacturar").setText("(0)");
	            }
	            
	            oBusyDialog.close();
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	        }
		},
		
		oServ_ListadoEstatusRecepcion: function (oController, Parameters) {
			var cadena_sociedad = "";
			var cadena_ffactura = "";
			for (var i = 0; i < Parameters.length; i++) {

				if (Parameters[i].keyField == "BUKRS") {
					cadena_sociedad = cadena_sociedad + '<BUKRS>' + Parameters[i].value1 + '</BUKRS>'
				}
				if (Parameters[i].keyField == "f_Factura" && Parameters[i].value1 != "") {
					//var fecha1= (Parameters[i].value1).split('/');
					//Parameters[i].value1=fecha1[2]+"-"+fecha1[1]+"-"+fecha1[0];

					cadena_ffactura = cadena_ffactura + '<SIGN>I</SIGN><OPTION>BT</OPTION><LOW>' + Parameters[i].value1 + '</LOW>';

					if (Parameters[i].value2 != "" && Parameters[i].value2 != null) {
						//var fecha2= (Parameters[i].value2).split('/');
						//Parameters[i].value2=fecha2[2]+"-"+fecha2[1]+"-"+fecha2[0];
						cadena_ffactura = cadena_ffactura + '<HIGH>' + Parameters[i].value2 + '</HIGH>'
					} else {
						cadena_ffactura = cadena_ffactura + '<HIGH>' + Parameters[i].value1 + '</HIGH>'
					}

				}
			}

			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
			soapMessage = soapMessage + '<soap:Header/>';
			soapMessage = soapMessage + '<soap:Body>';
			soapMessage = soapMessage + '<urn:_-WI18_-PORTAL_STATUS>';
			soapMessage = soapMessage + '<IS_PORTAL_STATUS_IN>';
			soapMessage = soapMessage + cadena_sociedad;
			soapMessage = soapMessage + '<EKORG/>';
			soapMessage = soapMessage + '<LIFNR>' + Lifnr + '</LIFNR>';
			soapMessage = soapMessage + '<BLDAT>' + cadena_ffactura + '</BLDAT>';
			soapMessage = soapMessage + '<IDIOMA>' + oLenguaje + '</IDIOMA>';
			soapMessage = soapMessage + '</IS_PORTAL_STATUS_IN>';
			soapMessage = soapMessage + '</urn:_-WI18_-PORTAL_STATUS>';
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


				sap.ui.getCore().getModel("mTablesEstatusRecepcion").setData(json);//revisar datos
				sap.ui.getCore().getModel("mTablesEstatusRecepcion").refresh();

				var Type = sap.ui.getCore().getModel("mTablesEstatusRecepcion").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-PORTAL_STATUS.Response/ES_RETURN").TYPE;
				var Message = sap.ui.getCore().getModel("mTablesEstatusRecepcion").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-PORTAL_STATUS.Response/ES_RETURN").MESSAGE;

				var mData = sap.ui.getCore().getModel("mTablesEstatusRecepcion").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-PORTAL_STATUS.Response/ET_INVOICE_LIST/item");

				if (Type == "S") {
					var length = mData.length;

					if (length == undefined) {
						sap.ui.getCore().getModel("mTablesEstatusRecepcion").setData({ DOC_ESTATUSRECEPCION: [mData] });//revisar datos
						oController.byId("idCountTableEstatusRecepcion").setText("(1)");

					} else {
						//Ini: Reemplaza caracter especial "&gt;" por ">" en elementos tipo string del array mData - DG 29.04.2024
						mData.forEach((e) => {
							for (let k in e)
							(e[k] && typeof e[k] == 'string') && (e[k] = e[k].replace(/&gt;/g, '>'));
						});
						//Fin: Reemplaza caracter especial "&gt;" por ">" en elementos tipo string del array mData - DG 29.04.2024
						sap.ui.getCore().getModel("mTablesEstatusRecepcion").setData({ DOC_ESTATUSRECEPCION: mData });//revisar datos
						oController.byId("idCountTableEstatusRecepcion").setText("(" + length + ")");
					}
				} else {
					oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title"));
					oController.byId("idCountTableEstatusRecepcion").setText("(0)");
				}

				oBusyDialog.close();
			}
			function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
			{
				oCnt_FHelps.f_showMessage("ERROR", error);
			}
		},


		oServ_ListadoFacturas: function (oController, Parameters) {
			console.log("Se ejecuta oServ_ListadoFacturas");
			var cadena_sociedad = "";
			var cadena_estado = "";
			var cadena_ffactura = "";
			for (var i = 0; i < Parameters.length; i++) {

				if (Parameters[i].keyField == "BUKRS") {
					cadena_sociedad = cadena_sociedad + '<BUKRS>' + Parameters[i].value1 + '</BUKRS>'
				}
				if (Parameters[i].keyField == "estado") {
					cadena_estado = cadena_estado + '<ESTATUS>' + Parameters[i].value1 + '</ESTATUS>'
				}
				if (Parameters[i].keyField == "f_Factura" && Parameters[i].value1 != "") {
					//var fecha1= (Parameters[i].value1).split('/');
					//Parameters[i].value1=fecha1[2]+"-"+fecha1[1]+"-"+fecha1[0];

					cadena_ffactura = cadena_ffactura + '<SIGN>I</SIGN><OPTION>BT</OPTION><LOW>' + Parameters[i].value1 + '</LOW>';

					if (Parameters[i].value2 != "" && Parameters[i].value2 != null) {
						//var fecha2= (Parameters[i].value2).split('/');
						//Parameters[i].value2=fecha2[2]+"-"+fecha2[1]+"-"+fecha2[0];
						cadena_ffactura = cadena_ffactura + '<HIGH>' + Parameters[i].value2 + '</HIGH>'
					} else {
						cadena_ffactura = cadena_ffactura + '<HIGH>' + Parameters[i].value1 + '</HIGH>'
					}

				}
			}

			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
			soapMessage = soapMessage + '<soap:Header/>';
			soapMessage = soapMessage + '<soap:Body>';
			soapMessage = soapMessage + '<urn:_-WI18_-INVOICE_LIST>';
			soapMessage = soapMessage + '<IS_INVOICE_LIST_IN>';
			soapMessage = soapMessage + cadena_sociedad;
			soapMessage = soapMessage + '<EKORG/>';
			soapMessage = soapMessage + '<LIFNR>' + Lifnr + '</LIFNR>';
			soapMessage = soapMessage + '<BLDAT>' + cadena_ffactura + '</BLDAT>';
			soapMessage = soapMessage + cadena_estado;
			soapMessage = soapMessage + '<IDIOMA>' + oLenguaje + '</IDIOMA>';
			soapMessage = soapMessage + '</IS_INVOICE_LIST_IN>';
			soapMessage = soapMessage + '</urn:_-WI18_-INVOICE_LIST>';
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


				sap.ui.getCore().getModel("mTablesListadoFacturas").setData(json);//revisar datos
				sap.ui.getCore().getModel("mTablesListadoFacturas").refresh();

				var Type = sap.ui.getCore().getModel("mTablesListadoFacturas").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-INVOICE_LIST.Response/ES_RETURN").TYPE;
				var Message = sap.ui.getCore().getModel("mTablesListadoFacturas").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-INVOICE_LIST.Response/ES_RETURN").MESSAGE;

				var mData = sap.ui.getCore().getModel("mTablesListadoFacturas").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-INVOICE_LIST.Response/ET_INVOICE_LIST/item");

				if (Type == "S") {
					var length = mData.length;

					if (length == undefined) {
						sap.ui.getCore().getModel("mTablesListadoFacturas").setData({ DOC_LISTADOFACTURAS: [mData] });//revisar datos
						oController.byId("idCountTableListadoFacturas").setText("(1)");

					} else {
						sap.ui.getCore().getModel("mTablesListadoFacturas").setData({ DOC_LISTADOFACTURAS: mData });//revisar datos
						oController.byId("idCountTableListadoFacturas").setText("(" + length + ")");
					}
				} else {
					oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title"));
					oController.byId("idCountTableListadoFacturas").setText("(0)");
				}

				oBusyDialog.close();
			}
			function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
			{
				oCnt_FHelps.f_showMessage("ERROR", error);
			}
		},


		oServ_ListadoEstadoCuenta: function (oController, Parameters) {
			var cadena_sociedad = "";
			var cadena_fdocumento = "";

			for (var i = 0; i < Parameters.length; i++) {

				if (Parameters[i].keyField == "BUKRS") {
					cadena_sociedad = cadena_sociedad + '<BUKRS>' + Parameters[i].value1 + '</BUKRS>'
				}

				if (Parameters[i].keyField == "f_Documento" && Parameters[i].value1 != "") {

					cadena_fdocumento = cadena_fdocumento + '<SIGN>I</SIGN><OPTION>BT</OPTION><LOW>' + Parameters[i].value1 + '</LOW>';

					if (Parameters[i].value2 != "" && Parameters[i].value2 != null) {
						cadena_fdocumento = cadena_fdocumento + '<HIGH>' + Parameters[i].value2 + '</HIGH>'
					} else {
						cadena_fdocumento = cadena_fdocumento + '<HIGH>' + Parameters[i].value1 + '</HIGH>'
					}

				}
			}

			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
			soapMessage = soapMessage + '<soap:Header/>';
			soapMessage = soapMessage + '<soap:Body>';
			soapMessage = soapMessage + '<urn:_-WI18_-ACCOUNT_STATUS>';
			soapMessage = soapMessage + '<IS_ACCOUNT_STATUS_IN>';
			soapMessage = soapMessage + cadena_sociedad;
			soapMessage = soapMessage + '<LIFNR>' + Lifnr + '</LIFNR>';
			soapMessage = soapMessage + '<IDIOMA>' + oLenguaje + '</IDIOMA>';
			soapMessage = soapMessage + '<BLDAT>' + cadena_fdocumento + '</BLDAT>';
			soapMessage = soapMessage + '</IS_ACCOUNT_STATUS_IN>';
			soapMessage = soapMessage + '</urn:_-WI18_-ACCOUNT_STATUS>';
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


				sap.ui.getCore().getModel("mTablesPartidasAbiertas").setData(json);//revisar datos
				sap.ui.getCore().getModel("mTablesPartidasCompensadas").setData(json);//revisar datos
				sap.ui.getCore().getModel("mTablesPartidasAbiertas").refresh();
				sap.ui.getCore().getModel("mTablesPartidasCompensadas").refresh();

				var Type = sap.ui.getCore().getModel("mTablesPartidasAbiertas").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-ACCOUNT_STATUS.Response/ES_RETURN").TYPE;
				var Message = sap.ui.getCore().getModel("mTablesPartidasAbiertas").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-ACCOUNT_STATUS.Response/ES_RETURN").MESSAGE;

				var mData_1 = sap.ui.getCore().getModel("mTablesPartidasAbiertas").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-ACCOUNT_STATUS.Response/ES_ACCOUNT_STATUS_OUT/LISTA_P_ABIERTA/item");
				var mData_2 = sap.ui.getCore().getModel("mTablesPartidasCompensadas").getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-ACCOUNT_STATUS.Response/ES_ACCOUNT_STATUS_OUT/LISTA_P_COMPENSADA/item");

				if (Type == "S") {
					if (mData_1 == null) {

						sap.ui.getCore().getModel("mTablesPartidasAbiertas").setData({ DOC_PARTIDASABIERTAS: [mData_1] });//revisar datos
						oController.byId("idCountTablePartidasAbiertas").setText("(0)");
					} else {
						var length_1 = mData_1.length;
						sap.ui.getCore().getModel("mTablesPartidasAbiertas").setData({ DOC_PARTIDASABIERTAS: mData_1 });//revisar datos
						oController.byId("idCountTablePartidasAbiertas").setText("(" + length_1 + ")");
					}

					if (mData_2 == null) {

						sap.ui.getCore().getModel("mTablesPartidasCompensadas").setData({ DOC_PARTIDASCOMPENSADAS: mData_2 });//revisar datos
						oController.byId("idCountTablePartidasCompensadas").setText("(0)");
					} else {
						var length_2 = mData_2.length;
						sap.ui.getCore().getModel("mTablesPartidasCompensadas").setData({ DOC_PARTIDASCOMPENSADAS: mData_2 });//revisar datos
						oController.byId("idCountTablePartidasCompensadas").setText("(" + length_2 + ")");
					}
				} else {
					oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title"));
					oController.byId("idCountTablePartidasAbiertas").setText("(0)");
					oController.byId("idCountTablePartidasCompensadas").setText("(0)");
				}

				oBusyDialog.close();
			}
			function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
			{
				oCnt_FHelps.f_showMessage("ERROR", error);
			}
		},


		oServ_ListadoAvisosPopUp: function () {

			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
			soapMessage = soapMessage + '<soap:Header/>';
			soapMessage = soapMessage + '<soap:Body>';
			soapMessage = soapMessage + '<urn:_-WI18_-OBTAIN_NOTICES>';
			soapMessage = soapMessage + '<IS_OBTAIN_NOT_IN>';
			soapMessage = soapMessage + '<BUKRS></BUKRS>';
			soapMessage = soapMessage + '<LIFNR>' + Lifnr + '</LIFNR>';
			soapMessage = soapMessage + '<IDIOMA>' + oLenguaje + '</IDIOMA>';
			soapMessage = soapMessage + '<TIPO_AVISO>2</TIPO_AVISO>';
			soapMessage = soapMessage + '</IS_OBTAIN_NOT_IN>';
			soapMessage = soapMessage + '</urn:_-WI18_-OBTAIN_NOTICES>';
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
				var mModel = sap.ui.getCore().getModel("mTablesAvisosPopUp");

				mModel.setData(json);//revisar datos
				mModel.refresh();

				var Type = mModel.getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-OBTAIN_NOTICES.Response/ES_RETURN").TYPE;
				var Message = mModel.getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-OBTAIN_NOTICES.Response/ES_RETURN").MESSAGE;

				var mData = mModel.getProperty("/SOAP:Envelope/SOAP:Body/n0:_-WI18_-OBTAIN_NOTICES.Response/ES_OBTAIN_NOT_OUT/LISTAPROV/item");

				if (Type == "S") {
					var length = mData.length;

					if (length == undefined) {
						mModel.setData({ DOC_AVISOS: [mData] });//revisar datos		            	
					} else {
						mModel.setData({ DOC_AVISOS: mData });//revisar datos		            	
					}


				} else {
					oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Mensaje.title"));
				}

				oBusyDialog.close();
			}
			function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
			{
				oCnt_FHelps.f_showMessage("ERROR", error);
			}
		},

		/*
		oServ_CambioPass: function(oObject,callback) {
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:_-WI20_-FM_WS_PASS_CHANGE>';
				soapMessage=soapMessage+'<ExInPassChange>';
				soapMessage=soapMessage+'<User>'+oObject.Usuario+'</User>';
				soapMessage=soapMessage+'<Pwd>'+oObject.Password+'</Pwd>';
				soapMessage=soapMessage+'<NewPwd>'+oObject.PasswordNuevo+'</NewPwd>';
				
				if(oLenguaje=="ES"){
					soapMessage=soapMessage+'<Language>S</Language>';
				}
				if(oLenguaje=="EN"){
					soapMessage=soapMessage+'<Language>E</Language>';
				}
				
				soapMessage=soapMessage+'</ExInPassChange>';
				soapMessage=soapMessage+'</urn:_-WI20_-FM_WS_PASS_CHANGE>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';
			
			oBusyDialog.open();
			//Llamamos a la función AJAX de JQuery
			$.ajax({
				url: webServiceURL_ZW20,
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
				oBusyDialog.close();
			    
			}
			function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
			{
				var oText = oCnt_FHelps.f_readTranslate("Login-error");
				oCnt_FHelps.f_showMessage("ERROR", oText);
				oBusyDialog.close();
			}
		},
		*/
		// ORR Método para cambio de contraseña ya logueado el usuario
		oServ_CambioPass: function (oObject, callback) {
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
			soapMessage = soapMessage + '<soap:Header/>';
			soapMessage = soapMessage + '<soap:Body>';
			soapMessage = soapMessage + '<urn:_-WI20_-FM_WS_PASS_CHANGE>';
			soapMessage = soapMessage + '<EX_IN_PASS_CHANGE>';
			soapMessage = soapMessage + '<USER>' + oObject.Usuario + '</USER>';
			soapMessage = soapMessage + '<PWD>' + oObject.Password + '</PWD>';
			soapMessage = soapMessage + '<NEW_PWD>' + oObject.PasswordNuevo + '</NEW_PWD>';

			if (oLenguaje == "ES") {
				soapMessage = soapMessage + '<LANGUAGE>S</LANGUAGE>';
			}
			if (oLenguaje == "EN") {
				soapMessage = soapMessage + '<LANGUAGE>E</LANGUAGE>';
			}

			soapMessage = soapMessage + '</EX_IN_PASS_CHANGE>';
			soapMessage = soapMessage + '</urn:_-WI20_-FM_WS_PASS_CHANGE>';
			soapMessage = soapMessage + '</soap:Body>';
			soapMessage = soapMessage + '</soap:Envelope>';

			console.log(webServiceURL_ZW20);

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

		oServ_ListadoOrdenesCompraPorAutorizar: function (oController, Parameters) {
			var coleccion_fecha = "";
			for (var i = 0; i < Parameters.length; i++) {

				if (Parameters[i].keyField == "f_orden_compra" && Parameters[i].value1 != "") {
					//var fecha1= (Parameters[i].value1).split('/');
					//Parameters[i].value1=fecha1[2]+"-"+fecha1[1]+"-"+fecha1[0];

					coleccion_fecha = coleccion_fecha + '<SIGN>I</SIGN><OPTION>BT</OPTION><LOW>' + Parameters[i].value1 + '</LOW>';

					if (Parameters[i].value2 != "" && Parameters[i].value2 != null) {
						//var fecha2= (Parameters[i].value2).split('/');
						//Parameters[i].value2=fecha2[2]+"-"+fecha2[1]+"-"+fecha2[0];
						coleccion_fecha = coleccion_fecha + '<HIGH>' + Parameters[i].value2 + '</HIGH>'
					} else {
						coleccion_fecha = coleccion_fecha + '<HIGH>' + Parameters[i].value1 + '</HIGH>'
					}

				}
			}

			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
			soapMessage = soapMessage + '<soap:Header/>';
			soapMessage = soapMessage + '<soap:Body>';
			soapMessage = soapMessage + '<urn:ZMM_FM_LIST_AUTH_PO>';
			soapMessage = soapMessage + '<I_BLDAT>' + coleccion_fecha + '</I_BLDAT>';
			soapMessage = soapMessage + '<I_USER>' + Bname + '</I_USER>';
			soapMessage = soapMessage + '</urn:ZMM_FM_LIST_AUTH_PO>';
			soapMessage = soapMessage + '</soap:Body>';
			soapMessage = soapMessage + '</soap:Envelope>';

			//Llamamos a la función AJAX de JQuery
			$.ajax({
				url: webServiceURL_ZW04,
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
				var mModel = sap.ui.getCore().getModel("mTablesOrdenesCompra");
				mModel.setData({});
				mModel.refresh();
				mModel.setData(json);//revisar datos
				mModel.refresh();

				var Type = mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_AUTH_POResponse").E_TYPE;
				var Message = mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_AUTH_POResponse").E_MSG;

				var mData = mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_AUTH_POResponse/E_POLIST/item");

				if (Type == "S") {
					var length = mData.length;

					if (length == undefined) {
						//mData.LONG_TEXT_AUX=LONG_TEXT.substr(0,15);
						mModel.setData({ ORDENES_COMPRA: [mData] });//revisar datos	
						oCtrl_OrdenesCompra.byId("idCountTableOrdenesCompra").setText("(1)");
					} else {
						mModel.setData({ ORDENES_COMPRA: mData });//revisar datos
						oCtrl_OrdenesCompra.byId("idCountTableOrdenesCompra").setText("(" + length + ")");
						/*for(i=0;i<mData.length;i++){
							if(mData[i].LONG_TEXT!=null && (mData[i].LONG_TEXT).length >20){
								mData[i].LONG_TEXT_AUX=(mData[i].LONG_TEXT).substr(0,20)+"...";
							}		            		
						}*/
					}

					sap.ui.getCore().getModel("mTablesOrdenesCompra").refresh();



				} else {
					oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Error.title"));
					oCtrl_OrdenesCompra.byId("idCountTableOrdenesCompra").setText("(0)");
				}

				oBusyDialog.close();
			}
			function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
			{
				oCnt_FHelps.f_showMessage("ERROR", error);
				oBusyDialog.close();
			}
		},
		oServ_ListadoRequisicionesPorAutorizar: function (oController, Parameters) {
			var coleccion_fecha = "";
			for (var i = 0; i < Parameters.length; i++) {

				if (Parameters[i].keyField == "f_requisiciones" && Parameters[i].value1 != "") {
					//var fecha1= (Parameters[i].value1).split('/');
					//Parameters[i].value1=fecha1[2]+"-"+fecha1[1]+"-"+fecha1[0];

					coleccion_fecha = coleccion_fecha + '<SIGN>I</SIGN><OPTION>BT</OPTION><LOW>' + Parameters[i].value1 + '</LOW>';

					if (Parameters[i].value2 != "" && Parameters[i].value2 != null) {
						//var fecha2= (Parameters[i].value2).split('/');
						//Parameters[i].value2=fecha2[2]+"-"+fecha2[1]+"-"+fecha2[0];
						coleccion_fecha = coleccion_fecha + '<HIGH>' + Parameters[i].value2 + '</HIGH>'
					} else {
						coleccion_fecha = coleccion_fecha + '<HIGH>' + Parameters[i].value1 + '</HIGH>'
					}

				}
			}

			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
			soapMessage = soapMessage + '<soap:Header/>';
			soapMessage = soapMessage + '<soap:Body>';
			soapMessage = soapMessage + '<urn:ZMM_FM_LIST_AUTH_PR>';
			soapMessage = soapMessage + '<I_BLDAT>' + coleccion_fecha + '</I_BLDAT>';
			soapMessage = soapMessage + '<I_USER>' + Bname + '</I_USER>';
			soapMessage = soapMessage + '</urn:ZMM_FM_LIST_AUTH_PR>';
			soapMessage = soapMessage + '</soap:Body>';
			soapMessage = soapMessage + '</soap:Envelope>';

			//Llamamos a la función AJAX de JQuery
			$.ajax({
				url: webServiceURL_ZW04,
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
				var mModel = sap.ui.getCore().getModel("mTablesRequisiciones");
				mModel.setData({});
				mModel.refresh();
				mModel.setData(json);//revisar datos
				mModel.refresh();

				var Type = mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_AUTH_PRResponse").E_TYPE;
				var Message = mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_AUTH_PRResponse").E_MSG;

				var mData = mModel.getProperty("/env:Envelope/env:Body/n0:ZMM_FM_LIST_AUTH_PRResponse/E_PRLIST/item");

				if (Type == "S") {
					var length = mData.length;

					if (length == undefined) {
						mModel.setData({ REQUISICIONES: [mData] });//revisar datos		            	
						oCtrl_Requisiciones.byId("idCountTableCotizaciones").setText("(1)");
					} else {
						mModel.setData({ REQUISICIONES: mData });//revisar datos		            	
						oCtrl_Requisiciones.byId("idCountTableCotizaciones").setText("(" + length + ")");
					}

					sap.ui.getCore().getModel("mTablesRequisiciones").refresh();


				} else {
					oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Error.title"));
					oCtrl_Requisiciones.byId("idCountTableCotizaciones").setText("(0)");
				}

				oBusyDialog.close();
			}
			function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
			{
				oCnt_FHelps.f_showMessage("ERROR", error);
				oBusyDialog.close();
			}
		},

		onTipoRecepción: function (Parameters) {
			console.log("Se manda a llamar desde compnente");
			return paramsTipoRecepcion[2].value1;
			//return parameters;
		},

		onSetlRfc: function (Params) {
			lRfc = Params;
		},

		onGetlRfc: function () {
			return lRfc;
		}


	});// fin return

});//fin sap.ui.define