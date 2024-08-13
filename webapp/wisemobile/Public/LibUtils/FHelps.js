jQuery.sap.declare("wisemobile.Public.LibUtils.FHelps");

oCnt_FHelps = {
		
		f_LimpiarMonitorBusq: function(oController){
			try{
				var oFilterPanel = oController.getView().byId("FilterPanel");
				oFilterPanel.Reset();
			}
			catch(e){
				console.log("Wise FHelps Error: "+e);
			}
		},
		
		f_validarDataServ : function(pData, pNum){
			
		},
		
		f_json2xml : function(o, tab){
		    var toXml = function(v, name, ind) {
	            var xml = "";
	            if (v instanceof Array) {
	                for (var i = 0, n = v.length; i < n; i++)
	                    xml += ind + toXml(v[i], name, ind + "\t") + "\n";
	            } else if (typeof(v) == "object") {
	                var hasChild = false;
	                xml += ind + "<" + name;
	                for (var m in v) {
	                    if (m.charAt(0) == "@")
	                        xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
	                    else
	                        hasChild = true;
	                }
	                xml += hasChild ? ">" : "/>";
	                if (hasChild) {
	                    for (var m in v) {
	                        if (m == "#text")
	                            xml += v[m];
	                        else if (m == "#cdata")
	                            xml += "<![CDATA[" + v[m] + "]]>";
	                        else if (m.charAt(0) != "@")
	                            xml += toXml(v[m], m, ind + "\t");
	                    }
	                    xml += (xml.charAt(xml.length - 1) == "\n" ? ind : "") + "</" + name + ">";
	                }
	            } else {
	                xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
	            }
	            return xml;
	        },
	        xml = "";
		    for (var m in o)
		        xml += toXml(o[m], m, "");
		    return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
		},
		f_ToBase64Binary: function ( selectedFile, callback ){
			/*
			// Select the very first file from list
            var fileToLoad = selectedFile;
            // FileReader function for read the file.
            var fileReader = new FileReader();
            var base64;
            // Onload of file read the file content
            fileReader.onload = function(fileLoadedEvent) {
                base64 = fileLoadedEvent.target.result;
                callback(base64);
                // Print data in console
                console.log(base64);
            };
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);
			*/
			function getBase64(file) {
				   var reader = new FileReader();
				   reader.readAsDataURL(file);
				   reader.onload = function () {
					   console.log(reader.result);
					   callback(reader.result);
				   };
				   reader.onerror = function (error) {
					   console.log('Error: ', error);
				   };
			}

			var file = selectedFile;
			getBase64(file);
		},
		
		f_StyleString: function ( oString, oOpcion, oColor ) {
			$('head').append("<style data-style='user' data-opc='"+ oOpcion +"' data-color='"+ oColor +"'>"+ oString +"</style>");
		},
		
		oServ_getToken: function(Filters, Callback) {

			if(Filters == undefined)
				Filters = { "username" : oCore.User.User, "password" : oCore.User.Password };
			
			var oParameters = JSON.stringify(Filters);
			
			oBusyDialog.open();
			$.ajax({
				type     : "POST",
				contentType	: "application/json",
				url  	 : pathProtocol + "l2i7nka8nd.execute-api.us-west-2.amazonaws.com/Desarrollo/wise-cloud/rp/autorizaciones",
				dataType : "json",
				data	 : oParameters,
				success : function(data, status, xhr) {
					
					if(data.errorMessage != undefined)
						oCnt_FHelps.f_showMessage("ERROR", data.errorType+" - "+data.errorMessage );
					else
					{
						if(data.status == "success"){
							oCore.User.Token = data.id_token;

							if(Callback)
								Callback();
						}
						else
							oCnt_FHelps.f_showMessage("ERROR", data.msg );
					}
					
				    oBusyDialog.close();
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					oBusyDialog.close();
					oCnt_FHelps.f_showMessage("ERROR", oCnt_FHelps.f_readTranslate("No-Rpta-Server") );
				}
			});
		},
		
		oServ_CombinacXUser : function(Type, Filters, Callback) {
			
			if(Filters == undefined)
				Filters = { "id_usuario" : oCore.User.User };
			
			var oParameters = JSON.stringify(Filters);
			Type = (Type == undefined)? "POST" : Type;
			
			oBusyDialog.open();
			$.ajax({
				type     : Type,
				headers: {
			        'Content-Type'	: 'application/json',
					 Authorization	:  oCore.User.Token,
				},
				//contentType	: "application/json",
				url  	 : pathProtocol + "l2i7nka8nd.execute-api.us-west-2.amazonaws.com/Desarrollo/wise-cloud/rp/usuarios/combinaciones",
				dataType : "json",
				data	 : oParameters,
				success : function(data, status, xhr) {
					
					if(data != undefined){
						
						if(data.mensaje != undefined){
							
							switch(Type){
								case "POST":
									oCnt_FHelps.f_showMessage("ERROR", data.mensaje);
									break;
								case "PATCH":
									oCnt_FHelps.f_showMessage("SUCCESS", data.mensaje, Callback);
									break;
							}
							
						}
						else{
							oCore.getModel("mCombinaciones").setProperty("/COMBINACIONES", data.Item);
							
							// AVERIGUAR LA COMBINACION COLOR ACTIVA
							var oComb = oCore.getModel("mCombinaciones").getProperty("/COMBINACIONES/combinaciones")
							if(oComb != undefined){
								for(var i=0; i<oComb.length; i++){
									if(oComb[i].activo == "X"){
										oCore.User.ColorActivo = i;
										break;
									}
								}
							}
							
							if(Callback)
								Callback();
						}
						//var oText = oCnt_FHelps.f_readTranslate("Login-noexiste");
						//oCnt_FHelps.f_showMessage("ERROR", oText);
					}
					
				    oBusyDialog.close();
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					oBusyDialog.close();
					if(errorThrown == "Unauthorized") oCnt_FHelps.f_showMessage("WARNING", errorThrown );
					else oCnt_FHelps.f_showMessage("ERROR", oCnt_FHelps.f_readTranslate("No-Rpta-Server") );
				}
			});
		},
		
		f_Convert_RGBtoHEX: function(rgbString){
			//var rgbString = "rgb(0, 70, 255)"; // get this in whatever way.

			var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			// parts now should be ["rgb(0, 70, 255", "0", "70", "255"]

			delete (parts[0]);
			for (var i = 1; i <= 3; ++i) {
			    parts[i] = parseInt(parts[i]).toString(16);
			    if (parts[i].length == 1) parts[i] = '0' + parts[i];
			} 
			var hexString ='#'+parts.join('').toUpperCase(); // "#0070FF"
			return hexString; 
		},
		f_ExportarXLSX: function(oTableId, oView) {
			
			var oTable = oView.byId( oTableId );
			var oViewId = oView.getId();
			var oColumns = oTable.getColumns().length;
			var oDOM = oViewId +"--"+oTableId+"-listUl";
			var oI18n = oViewId.replace("idV","");
			
    		var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
   			var oModel = oCore.getModel( oNameModel );
   			var oPath = oTable.getBindingInfo("items").path;
   			
			var datos = oModel.getProperty(oPath);
			
			if(datos == undefined) {
				oCnt_FHelps.f_showMessage("WARNING", oCnt_FHelps.f_readTranslate("Table-NoDataText"));
				return;
			}
			if(datos.length == 0) {
				oCnt_FHelps.f_showMessage("WARNING", oCnt_FHelps.f_readTranslate("Table-NoDataText"));
				return;
			}
			
			var oKeys =	Object.keys(datos[0]);
			///
			var oColumnT = oI18n+".Monitor.Table.Column.";
			
			if(oCnt_FHelps.f_readTranslate(oColumnT + "1") == oColumnT + "1")
				oColumnT = oI18n+".Monitor.Table.1.Column.";
			///
			var d = '<tr>';
			for(var i=1; i<=oColumns;i++){
				d = d + '<th>'+oCnt_FHelps.f_readTranslate(oColumnT+i)+'</th>';
			}
			d = d + '</tr>';

			for (var i = 1; i < datos.length; i++) {
				
				d+= '<tr>';
				for(var j = 0; j < oKeys.length; j++){
					d+= '<td>'+datos[i][oKeys[j]]+'</td>';
				}
				d+= '</tr>';
			}
			
			$(oDOM).append(d);
			tableToExcel(oDOM, "Hoja 1");
		},
		
		f_replaceMayus : function(oString) {
			
			oString = oString.replace("á","a");
			oString = oString.replace("é","e");
			oString = oString.replace("í","i");
			oString = oString.replace("ó","o");
			oString = oString.replace("ú","u");
			oString = oString.replace("Á","A");
			oString = oString.replace("É","E");
			oString = oString.replace("Í","I");
			oString = oString.replace("Ó","O");
			oString = oString.replace("Ú","U");
			
			return oString;
		},
		// CONSUMIR SERVICIOS ENTITY
		oServ_Cabeceras : function(filters, callback) {
			
			if(filters == undefined)
				filters = { "id_usuario" : oCore.User.User };
			
			var oParameters = JSON.stringify(filters);
			
			oBusyDialog.open();
			$.ajax({
				type     : "POST",
				contentType: "application/json",
				url  	 : pathGlobal +"/Agenda",
				dataType : "json",
				data	 : oParameters,
				success : function(data, status, xhr) {
						
					data.value = JSON.parse(data.value);
					
					if(data.value != undefined){
						var mData = [];
						mData = data.value;
						
						oCore.getModel("mAgenda").setProperty("/AGENDA", data.value);
						
						// Pintar data en control mobiscroll
		    			var aData = oCore.getModel("mAgenda").getProperty("/AGENDA");
		    			var aEvents = [];
		    			
		    			for(var i=0; i<aData.length; i++){
		    				aEvents.push(
		    				{
		    					id_actividad	: aData[i].id_actividad,
					        	start			: new Date(aData[i].f_inicio),
					            end				: new Date(aData[i].f_fin),
					            text			: aData[i].descripcion, 
					            color			: util.Formatter.Prioridad(aData[i].prioridad)
		    				});
		    			}
		    			mGrafic_Agenda.setEvents(aEvents);
					}
	 
					if(callback)
						callback();
					
				    oBusyDialog.close();
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					oBusyDialog.close();
					oCnt_FHelps.f_showMessage("ERROR", oCnt_FHelps.f_readTranslate("No-Rpta-Server") );
				}
			});
		},
		
		oServ_Login: function( pUser, callback) {
			var data;
			
			if(pUser != undefined)
				data = {
					"usuario"	: pUser.usuario,
					"password"	: pUser.password
				};
			else
				data = {
					"usuario"	: oCore.User.User,
					"password"	: oCore.User.Password
				};
			
			data = JSON.stringify(data);

		    oBusyDialog.open();
			$.ajax({
				type     : "POST",
				contentType: "application/json",
				url  	 : pathGlobal +"/Usuario/gestion.Login",
				dataType : "json",
				data	 : data,
				success : function(data, status, xhr) {
					data.value = JSON.parse(data.value);
					
					if(data.value.cod_result == 1){
						// set data user to object
						oCore.User.User	= data.value.user.usuario;
						oCore.User.Nombre = data.value.user.nombre;
						oCore.User.Apellido	= data.value.user.apellido;
						oCore.User.TipoUsuario = data.value.user.id_tipo_usuario;
						//oCore.User.Correo	= data.value.correo;
						oCore.User.Sesion = true;

						// set object user to model
						var aData = oCore.getModel("mUser").getData();
						aData.User = oCore.User;
						oCore.getModel("mUser").refresh();
						
						oCore.byId("idBtnUser").setIcon("sap-icon://log");
						oCore.byId("idBtnUser").bindProperty("text", "mUser>/User/User" );
						
						if(callback)
							callback();
					    

					}else{
						oCnt_FHelps.f_showMessage("ERROR",data.value.msg);
					}
					
					oBusyDialog.close();
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					oBusyDialog.close();
					oCnt_FHelps.f_showMessage("ERROR", XMLHttpRequest.statusText );
				},
				fail : function(x, y, z) {
					alert("fail");
				}
			});
		},
		f_readTranslate: function(oText) {
			return sap.ui.getCore().getModel("i18n").getProperty(oText);
			//return sap.ui.getCore().getModel("i18n").getProperty("/"+oText);
		},
		f_Clean_Form: function(oForm){
			var oControls = [];
			
			var oFContainers = oForm.getFormContainers();
			
			for(var i=0; i< oFContainers.length; i++){
				
				var oFElements = oFContainers[i].getFormElements();
				for(var j=0; j< oFElements.length; j++){
					
					var oFFields = oFElements[j].getFields();
					for(var k=0; k< oFFields.length; k++)
						oControls.push( oFFields[k] );
				}
			}
			oCnt_FHelps.f_Clean(oControls);
		},
		f_Inputs_Form: function(oForm){
			var oControls = [];

			var oFContainers = oForm.getFormContainers();
			/*
			 * ATENCION: NO SE DEBEN TOMAR LOS ELEMENTOS OCULTOS DEL FORM
			 */
			jQuery.each(oFContainers, function(i, oFContainer) {
				if(!oFContainer.getVisible()){ // ES OCULTO?
					return true;
				}
				
				var oFElements = oFContainer.getFormElements();
				jQuery.each(oFElements, function(i, oFElement) {
					if(!oFElement.getVisible()){ // ES OCULTO?
						return true;
					}
					
					var oFFields = oFElement.getFields();
					jQuery.each(oFFields, function(i, oFField) {
						if(!oFField.getVisible()){ // ES OCULTO?
							return true;
						}
						
						oControls.push( oFField );
					});
					//
				});
				//
			});
			
			return oCnt_FHelps.f_Inputs(oControls);
		},
		f_Inputs: function(inputs){
			if(inputs==undefined)
				return true;
			
			jQuery.each(inputs,function(i,input){
				input.setValueState("None");
			});
			jQuery.each(inputs, function(i, input) {
				
				if(input.getCustomData().length >= 1){ // quiere decir que no debe validarse y ppor lo tanto saltarse la iteracion
					return true;
				}
				
				var sType = input.getMetadata().getName();
				switch (sType) {
					case "sap.m.Select":
						if (input.getSelectedKey() == "") {
							input.setValueState("Error");
						}
						break;
					case "sap.m.Input":
						if (input.getType()=="Email"){
							// Validamos el Email.
							if (input.getValue() == "") {
								input.setValueState("Error");
							}
							else {
								var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
					    		if(!mailregex.test(input.getValue())) {
									oCnt_FHelps.f_showMessage("WARNING", oCnt_FHelps.f_readTranslate("Invalid-Email") );
					    			input.setValueState("Error");
					    		}
					    		else input.setValueState("None");
							}
						}
						else if (input.getValue() == "")
							input.setValueState("Error");
						
						break;
					case "sap.ui.unified.FileUploader":
						if (input.getValue() == "")
							input.setValueState("Error");
						break;
					default:
						if (!input.getValue()) {
							input.setValueState("Error");
						}
						break;
				}
				
			});
			// verificar estado de entradas
			var canContinue = true;
			jQuery.each(inputs, function(i, input) {
				if ("Error" === input.getValueState()) {
					canContinue = false;
				}
			});
			//resultados de salidas
			if (canContinue) {
				return true;
				
			}
			else {
				oCnt_FHelps.f_showMessage("WARNING", oCnt_FHelps.f_readTranslate("Required-fields") );
				return false;
				
			}
		},
		
		f_InputsWithEmail: function(inputs){//ingresos
			if(inputs==undefined)
				return true;
			
			jQuery.each(inputs,function(i,input){
				input.setValueState("None");
			});
			jQuery.each(inputs, function(i, input) {
				
				var sValue = input.getValue();
				if(!oCnt_FHelps.f_validateEmail(sValue)){
					input.setValueState("Error");
				}
				
			});
			// verificar estado de entradas
			var canContinue = true;
			jQuery.each(inputs, function(i, input) {
				if ("Error" === input.getValueState()) {
					canContinue = false;
				}
			});
			//resultados de salidas
			if (canContinue) {
				return true;
				
			}
			else {
				oCnt_FHelps.f_showMessage("WARNING", oCnt_FHelps.f_readTranslate("Invalid-Email") );
				return false;
				
			}
		},
		f_InputsWithTelefono: function(inputs){//ingresos
			if(inputs==undefined)
				return true;
			
			jQuery.each(inputs,function(i,input){
				input.setValueState("None");
			});
			jQuery.each(inputs, function(i, input) {
				
				var sValue = input.getValue();
				if(!oCnt_FHelps.f_validateTelefono(sValue)){
					input.setValueState("Error");
				}
				
			});
			// verificar estado de entradas
			var canContinue = true;
			jQuery.each(inputs, function(i, input) {
				if ("Error" === input.getValueState()) {
					canContinue = false;
				}
			});
			//resultados de salidas
			if (canContinue) {
				return true;
				
			}
			else {
				oCnt_FHelps.f_showMessage("WARNING", oCnt_FHelps.f_readTranslate("Invalid-Tel") );
				return false;
				
			}
		},
		f_validateEmail: function(sEmail){
			var bool = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(sEmail);
			return bool;
		},
		f_validateTelefono: function(sTelefono){
			var bool = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(sTelefono) ;
			return bool;
		},
		f_showMessage: function(oIcon,oMessage,callback,oTitle,oDetails){
			
			sap.m.MessageBox.show(
					oMessage,{
						icon: oIcon,
						styleClass: "ResponsiveDialog",
						details: oDetails,
						title: ( oTitle != undefined)? oTitle : (oIcon=="ERROR")? "Error": oCnt_FHelps.f_readTranslate("view.messagedialog.title2"),
						actions: [sap.m.MessageBox.Action.OK],
						onClose: function(oAction){
							if(oAction=="OK"){
								if(callback) callback();
							}
						}
					}	
			);
		},
		f_showMessage_YesNo :  function(oIcon, oMessage, callback, oDetails) {
			sap.m.MessageBox.show(
					oMessage, {
						icon: oIcon,
						styleClass: "ResponsiveDialog",
						details: oDetails,
						title: "{i18n>view.messagedialog.title2}",
						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose: function(oAction) {
							if(oAction=="YES"){
								if(callback) callback();
							}
	    		        }
					}
			);
		},
		f_Clean: function(inputs){
			jQuery.each(inputs,function(i,input){
				
				var sType = input.getMetadata().getName();
				switch (sType) {
					case "sap.m.Select":
						input.setSelectedKey("");
						break;
					default:
						input.setValue("");
				}
				input.setValueState("None");
			});
		},
		
		f_EliminarObjetosDuplicados: function(arr, prop) {
		     var nuevoArray = [];
		     var lookup  = {};
		 
		     for (var i in arr) {
		         lookup[arr[i][prop]] = arr[i];
		     }
		 
		     for (i in lookup) {
		         nuevoArray.push(lookup[i]);
		     }
		 
		     return nuevoArray;
		},

		f_GenerarJsonRolesDeUsuario: function(aData){
			if(aData.length > 0){
				var auxToEval = aData[0].aux;
				if(auxToEval != undefined){
					var aDistinct = [];
					for(var i in aData){
						var query = aData.filter(function (item) {
							return item.id_tipo_usuario == aData[i].id_tipo_usuario &&
							       item.id_rol_user == aData[i].id_rol_user &&
							       item.id_role_key == aData[i].id_role_key &&
							       item.id_crud == aData[i].id_crud 
							;
						});
						
						if(query.length > 1){
							if(aData[i].aux){
								var queryTemp = aDistinct.filter(function (item) {
									return item.id_tipo_usuario == aData[i].id_tipo_usuario &&
									       item.id_rol_user == aData[i].id_rol_user &&
									       item.id_role_key == aData[i].id_role_key &&
									       item.id_crud == aData[i].id_crud &&
									       item.aux == true
									;
								});
								if(queryTemp.length == 0){
									aDistinct.push(aData[i]);
								}
								
							}
						}
						
						if(query.length == 1){
							aDistinct.push(aData[i]);
						}
					}
					
					aData =  aDistinct;
				}
			}
			
			
			var aJsonTree = [];
			//identificar distintos roles
			var aRoles = oCnt_FHelps.f_EliminarObjetosDuplicados(aData, "id_rol_user");
			
			//formando aJsonTree con propiedad text y nodos vacios
			for (var i in aRoles) {
				aJsonTree.push({id : aRoles[i].id_rol_user, text: aRoles[i].rol_user_desc, nodes: [],
					//checked: "Unchecked"
					checked_selected: false,
					checked_partiallySelected: false,
				});
		    }
			
			//agregar id_role_key
			for (var i in aJsonTree) {
				for (var j in aData) {
					if(aData[j].id_rol_user == aJsonTree[i].id){
						//si los nodos estan vacios agregamos por primera vez
						if(aJsonTree[i].nodes.length == 0){
							aJsonTree[i].nodes.push({
								id: aData[j].id_role_key,
								text: aData[j].role_key_desc, 
								nodes: [],
								//checked: "Unchecked"
								checked_selected: false,
								checked_partiallySelected: false,
							});
						}else{
							//caso contrario recorrermos los nodos para no agregar duplicados
							for(var cn in aJsonTree[i].nodes){
								var query = aJsonTree[i].nodes.filter(function (item) {
									return item.id == aData[j].id_role_key
							    });
								if(query.length == 0){
									aJsonTree[i].nodes.push({
										id: aData[j].id_role_key,
										text: aData[j].role_key_desc,
										nodes: [],
										//checked: "Unchecked"
										checked_selected: false,
										checked_partiallySelected: false,
									});
							    }
								/*
								if(aJsonTree[i].nodes[cn].id != aData[j].id_role_key){
									aJsonTree[i].nodes.push({
										id: aData[j].id_role_key,
										text: aData[j].role_key_desc,
										nodes: [],
										//checked: "Unchecked"
										checked_selected: false,
										checked_partiallySelected: false,
									});
								}*/
							}
						}	
					}
				}
		    }
			
			//agregar nodos a los id_role_key
			for (var i in aJsonTree) {
				for (var j in aData) {
					if(aData[j].id_rol_user == aJsonTree[i].id){
						for(var cn in aJsonTree[i].nodes){
							if(aJsonTree[i].nodes[cn].id == aData[j].id_role_key){
								aJsonTree[i].nodes[cn].nodes.push({
									id: aData[j].id_crud,
									text: aData[j].crud_desc,
									objeto: JSON.stringify(aData[j]),
									aux : aData[j].aux,
									//objeto: aData[j],
									//checked: "Unchecked"
									checked_selected: false,
									checked_partiallySelected: false,
								});
							}
						}
					}
				}
			}
			
			return aJsonTree;
		},
		
		languageChange : function(ovalor, callback) {
			var that = this;
			
			if (ovalor == "au") {
				oI18nModel = new sap.ui.model.resource.ResourceModel({
					bundleName : "wisemobile/Public/i18N/i18n",
					bundleLocale : this.Locale
				});
			} else {
				oI18nModel = new sap.ui.model.resource.ResourceModel({
					bundleName : "wisemobile/Public/i18N/i18n",
					bundleLocale : ovalor
				});
			}
			
			sap.ui.getCore().User.Language = ovalor;
			sap.ui.getCore().setModel(oI18nModel, "i18n");
			// COnfigurar idioma de Core UI5, atento a la funcion: attachLocalizationChanged en el Component.js
			sap.ui.getCore().getConfiguration().setLanguage( ovalor );
			
			//this.setModel(oCore.getModel("i18n"), "i18n");
			oC_Modulo_WiseMobile.onAfterRendering();
			// Go to select the back.
			if(callback)
				callback();
		},
		
		converBase64toBlob : function(content, contentType) {
			  contentType = contentType || '';
			  var sliceSize = 512;
			  var byteCharacters = window.atob(content); //method which converts base64 to binary
			  var byteArrays = [
			  ];
			  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			    var slice = byteCharacters.slice(offset, offset + sliceSize);
			    var byteNumbers = new Array(slice.length);
			    for (var i = 0; i < slice.length; i++) {
			      byteNumbers[i] = slice.charCodeAt(i);
			    }
			    var byteArray = new Uint8Array(byteNumbers);
			    byteArrays.push(byteArray);
			  }
			  var blob = new Blob(byteArrays, {
			    type: contentType
			  }); //statement which creates the blob
			  return blob;
			},
};