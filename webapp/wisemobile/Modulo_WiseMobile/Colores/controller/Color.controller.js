var oCtrl_Color;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/ColorPalettePopover", "sap/ui/unified/ColorPickerPopover", "sap/m/MessageToast"],
		function(jQuery, Controller, MessageBox, ColorPalettePopover, ColorPickerPopover, MessageToast) {

	var oView;
   	var oColorPickerPopover = {};

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Colores.controller.Color", {
		
		onInit : function() {
			oCtrl_Color = this;
			oView = this.getView();
			
			//this.initColoresDefault(); // Pintar los buttons con los difernentes patrones de color
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Colores.controller.Color");

	        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvt) {
	        	var sRoute = oEvt.getParameter("name");
	        	
	        	if ("Color" === sRoute) {
	        		oBusyDialog.close();
	        	}
	        });
	        
	        oView.addEventDelegate({
   				// not added the controller as delegate to avoid controller functions with similar names as the events
	        	onAfterShow : jQuery.proxy(function(oEvt) {
   					this.onAfterShow(oEvt);
   				}, this)
   			});
		},
		
		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Colores.controller.Color');
		},
		
		onAfterShow: function(oEvt){
			var oComboColor = oView.byId("idCombinacion");
			
			oComboColor.setSelectedKey(oCore.User.ColorActivo);
			var oItem = { selectedItem : oComboColor.getSelectedItem() };
			oComboColor.fireChange(oItem); // onChangeCominacion
		},
		
   		back : function(evt) {
			window.history.go(-1);
		},
		
		handleChange: function (oEvt, oOpc) {
			var that = oCtrl_Color;
			removeStyleForHead( oOpc );

//			>=15 menu gradient
//			<14 contorles
			if( parseInt(oOpc) >=15 ) return;
			
			//var CoAntiguo = oEvt.getSource().getColorString();
			var CoNuevo = oEvt.getParameter("hex");
			
			var oData = jQuery.extend(true, [], oCore.getModel("mColores").getProperty("/"+oOpc) );
			
			for(var i=0; i< oData.length; i++){
				var css = oData[i].cssString.replace("XXX", CoNuevo);
				oCnt_FHelps.f_StyleString( css , oOpc, CoNuevo);
			}
		},
		
		oPressReset: function (oEvt, oOpcion) {
			removeStyleForHead(oOpcion, this.initColoresDefault);
		},
		
		oPressSave: function (oEvt) {
			var oId = parseInt( oView.byId("idCombinacion").getSelectedKey() );
			var oText_Color = oCtrl_Color.getView().byId("idCombinacion").getSelectedItem().getText()
			
			var oData = oCore.getModel("mCombinaciones").getProperty("/COMBINACIONES");
			
			// RESET EL ACTIVO DE COMBINACIONES
			for(var i=0; i<oData.combinaciones.length; i++){
				oData.combinaciones[i].activo = "0";
			}
			// OBTENEMOS LA COMBINACION DEL COMBO SELECCIONADO
			var oComb = oData.combinaciones[oId];
			
			// LE ASIGNAMOS COO NUEVO ACTIVO
			oComb.activo = "X";
			
			// Object.keys(oComb).length
			for(var i=1; i<=15; i++){
				oComb["c"+i] = getStyleForHead(i);
			}
			
			var oFunction = function(){
				MessageToast.show(oText_Color + ": " + oCnt_FHelps.f_readTranslate("Color.MessageBox.Cambio"));
				oCnt_FHelps.oServ_CombinacXUser();
			}
			oCnt_FHelps.oServ_CombinacXUser("PATCH", oData, oFunction);
		},
		
		onChangeCominacion: function (oEvt) {
			var that = this;
			var oId = oEvt.getSource().getSelectedKey();

			var oData = oCore.getModel("mCombinaciones").getProperty("/COMBINACIONES");
			// OBTENEMOS LA COMBINACION DEL COMBO SELECCIONADO
			var oComb = oData.combinaciones[oId];
			
			for(var j=1; j<=15; j++){
				
				var oOpc 	= j;
				removeStyleForHead( oOpc );
				var oDataC 	= jQuery.extend(true, [], oCore.getModel("mColores").getProperty("/"+oOpc) );
				
				if(j==15){
					var oCombinac = oComb["c"+j].split(",");
					var c1_CoNuevo = oCombinac[0];
					var c2_CoNuevo = oCombinac[1];
					var c3_CoNuevo = oCombinac[2];
					
					var c1_CoNuevo, c2_CoNuevo, c3_CoNuevo;
					
					for(i=0; i<=2; i++){
						removeStyleForHead( "C"+(j+i) );
						var oCDegradado = oCombinac[i];
						// CLASS COLOR BTN
						that.f_setClassBtn( (j+i), oCDegradado );
					}
					
					for(var i=0; i< oDataC.length; i++){
						var css = oDataC[i].cssString;
						
						re = new RegExp("XXX", 'g');
						css = css.replace(re,c1_CoNuevo);
						
						re = new RegExp("YYY", 'g');
						css = css.replace(re,c2_CoNuevo);
						
						re = new RegExp("ZZZ", 'g');
						css = css.replace(re,c3_CoNuevo);
	
						oCnt_FHelps.f_StyleString( css , oOpc , (c1_CoNuevo+","+c2_CoNuevo+","+c3_CoNuevo) );
					}
				}
				else{
					removeStyleForHead( "C"+j );
					var oColor = oComb["c"+j];
					// CLASS COLOR BTN
					that.f_setClassBtn( j, oColor );
					
					for(var i=0; i< oDataC.length; i++){
						var re = new RegExp("XXX", 'g');
						var css = oDataC[i].cssString.replace(re, oColor);
						oCnt_FHelps.f_StyleString( css , oOpc, oColor);
					}
					
				}
			}
		},
		
		f_setClassBtn: function(oNum, oColor){
			oCnt_FHelps.f_StyleString('.C'+oNum+' .sapMBtnInner, .C'+oNum+'.sapMBtnInner{background-color:'+oColor+' !important;}', "C"+oNum, oColor);
		},
		
		initColoresDefault: function(){
			var that = this;
			/*
			 * TRABAJO DE MANERA LOCAL
			var oColores= jQuery.extend(true, [], oCore.getModel("mColores").getProperty("/Colores/") );
			var oCant	= Object.keys(oColores).length;
			for(var i=1; i<=oCant; i++){
				var oColor = oColores[i];
				that.f_setClassBtn( i, oColor );
			}
			*/
			/*
			var oComb;
			
			for(var i=0; i<oData.length; i++){
				if(oData[i].activo == "X"){
					oComb = jQuery.extend({}, oData[i] );
					break;
				}
			}
			
			if(oComb == undefined) return;
			
			for(var i=1; i<=15; i++){
				var oColor = oComb["c"+i];
				that.f_setClassBtn( i, oColor );
			}
			*/
		},
		
		oPressOpc: function (oEvt) {
			var that = oCtrl_Color;
			var oButton = oEvt.getSource();
			var oKey = oButton.getCustomData()[0].getKey();
			var oColorBtn = $(".C"+oKey+" *").css("background-color"); // RGB
			
			if (oColorPickerPopover[oKey] == undefined) {
				
				oColorPickerPopover[oKey] = new ColorPickerPopover("idColorPickerPopover_"+oKey,{
//					colorString	: oCore.getModel("mColores").getProperty("/Colores/"+oKey),
//					colorString	: oCnt_FHelps.f_Convert_RGBtoHEX( oColorBtn ),
					mode		: sap.ui.unified.ColorPickerMode.HSL,
					change		: function(oEvent){
//						>=15 menu gradient
//						<14 contorles
//						if( parseInt(oKey) <= 14 )
						that.handleChange(oEvent, oKey);
						var CoNuevo = oEvent.getParameter("hex");
						that.f_setClassBtn( oKey, CoNuevo );
					}
				});
			}
			oColorPickerPopover[oKey].setColorString( oCnt_FHelps.f_Convert_RGBtoHEX( oColorBtn ) );
			oColorPickerPopover[oKey].openBy(oEvt.getSource());
		},
		
		oPressOpcMenu: function (oEvt) {
			var that = oCtrl_Color;
			var n1="15", n2="16", n3="17";
			var c1="", c2="", c3="";
			
			if(that.oDialogMenu == undefined)
				that.oDialogMenu = new sap.m.Dialog({
					customHeader: new sap.m.Bar({
						contentMiddle: new sap.m.Label({
							text: "{i18n>Color.2.HeaderText}"
						}),
						contentRight: new sap.m.Button({
							icon: "sap-icon://decline",
							press: function() {
								that.oDialogMenu.close();
							}
						})
					}),
					content:[
						new sap.m.Table({
							
							columns :  [
								new sap.m.Column({
									header : new sap.m.Label({
										text : "{i18n>Color.Table.Column.1}"
									})
								}),
								new sap.m.Column({
									header : new sap.m.Label({
										text : "{i18n>Color.Table.Column.2}"
									})
								})
							],
							items:[
								new sap.m.ColumnListItem({
									cells : [
										new sap.m.Label({
											text : "{i18n>Color.Table.Row.15}"
										}),  new sap.m.Button({
											press: that.oPressOpc,
											customData: new sap.ui.core.CustomData({key:"15"})
										}).addStyleClass("C15")
									]
								}),
								new sap.m.ColumnListItem({
									cells : [
										new sap.m.Label({
											text : "{i18n>Color.Table.Row.16}"
										}),  new sap.m.Button({
											press: that.oPressOpc,
											customData: new sap.ui.core.CustomData({key:"16"})
										}).addStyleClass("C16")
									]
								}),
								new sap.m.ColumnListItem({
									cells : [
										new sap.m.Label({
											text : "{i18n>Color.Table.Row.17}"
										}),  new sap.m.Button({
											press: that.oPressOpc,
											customData: new sap.ui.core.CustomData({key:"17"})
										}).addStyleClass("C17")
									]
								})
							]
						})
					],
					buttons:[
						new sap.m.Button({
							text: "{i18n>Popup.Button.Aceptar}",
							press: function(oEvt){
								var oOpc = ""+n1;
								var oData = jQuery.extend(true, [], oCore.getModel("mColores").getProperty("/"+oOpc) );
								
								// OBTENEMOS LOC CLORES
								// ANTIGUO: EL COLOR PREDT.
								// NUEVO: EL COLOR ELEGIDO POR EL USUARIO
								var CoAntiguo, CoNuevo;
								
								c1 = oColorPickerPopover[ n1 ];
								//c1_CoAntiguo = c1.getColorString();
								c1_CoNuevo	= c1._oLastChangeCPParams.hex;
								
								c2 = oColorPickerPopover[ n2 ];
								//c2_CoAntiguo = c2.getColorString();
								c2_CoNuevo	= c2._oLastChangeCPParams.hex;
								
								c3 = oColorPickerPopover[ n3 ];
								//c3_CoAntiguo = c3.getColorString();
								c3_CoNuevo	= c3._oLastChangeCPParams.hex;
								
								// SETEAMOS EL NUEVO COLOR COMO COLOR PREDT. DE CADA ColorPickerPopover
								c1.setColorString(c1_CoNuevo);
								c2.setColorString(c2_CoNuevo);
								c3.setColorString(c3_CoNuevo);
								
								for(var i=0; i< oData.length; i++){
									var css = oData[i].cssString;
									
									var re = new RegExp("XXX", 'g');
									css = css.replace(re,c1_CoNuevo);
	
									var re = new RegExp("YYY", 'g');
									css = css.replace(re,c2_CoNuevo);
	
									var re = new RegExp("ZZZ", 'g');
									css = css.replace(re,c3_CoNuevo);
									
									//css = css.replace(c1_CoAntiguo, c1_CoNuevo);
									//css = css.replace(c2_CoAntiguo, c2_CoNuevo);
									//css = css.replace(c3_CoAntiguo, c3_CoNuevo);
									// FINALLY
									oData[i].cssString = css;
									oCnt_FHelps.f_StyleString( css , oOpc , (c1_CoNuevo+","+c2_CoNuevo+","+c3_CoNuevo) );
								}
								
								that.oDialogMenu.close();
							}
						})
					],
					beforeClose: function(oEvt){
						//that.oDialogMenu.removeAllContent();
					},
					afterClose: function() {
						//that.oDialogMenu.destroy();
					}
				});
			
			that.oDialogMenu.open();
		}
		
	});
});