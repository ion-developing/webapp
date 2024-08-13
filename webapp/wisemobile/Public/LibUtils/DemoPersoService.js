jQuery.sap.declare("wisemobile.Public.LibUtils.DemoPersoService");

// Very simple page-context personalization
// persistence service, not for productive use!

var DemoPersoService = {
	
		oData : {
			_persoSchemaVersion: "1.0",
			aColumns : [/*
			            {
							id: "demoApp-idTabla-productCol",
							order: 0,
							text: "{i18n>oNameView.content.Table.Column.1.text}",
							visible: true
						},
						{
							id: "demoApp-idTabla-idCol2",
							order: 1,
							text: "{i18n>oNameView.content.Table.Column.2.text}",
							visible: true
						},
						{
							id: "demoApp-idTabla-idCol3",
							order: 2,
							text: "{i18n>oNameView.content.Table.Column.3.text}",
							visible: true
						},
						{
							id: "demoApp-idTabla-idCol4",
							order: 3,
							text: "{i18n>oNameView.content.Table.Column.4.text}",
							visible: true
						},
						{
							id: "demoApp-idTabla-idCol5",
							order: 4,
							text: "{i18n>oNameView.content.Table.Column.5.text}",
							visible: true
						},
						{
							id: "demoApp-idTabla-idCol6",
							order: 5,
							text: "{i18n>oNameView.content.Table.Column.6.text}",
							visible: true
						},
						{
							id: "demoApp-idTabla-idCol7",
							order: 6,
							text: "{i18n>oNameView.content.Table.Column.7.text}",
							visible: true
						}*/
			]
		},

		setMyPersData : function (oTable) {
			
			var oArray = this.oData.aColumns = [];
			var oNroCol = oTable.getColumns().length;
			var oIDTabla = oTable.getId();
			/*
			for(var i=0; i<oNroCol; i++){
				
				var oObject = {
						id		: "demoApp-"+oIDTabla+"-idCol"+(i+1),
						order	: i,
						text	: "{i18n>"+oVista+".Monitor.Table.Column."+(i+1)+"}",
						visible	: true
				};
				oArray.push(oObject);
			}*/
			for(var i=0; i<oNroCol; i++){
				var oTexto = oTable.getColumns()[i].getHeader().getText();
				
				if(oTexto == "	") oTexto = "#";
				var oObject = {
						id		: "demoApp-"+oIDTabla+"-idCol"+(i+1),
						order	: i,
						text	: oTexto,
						visible	: true
				};
				oArray.push(oObject);
			}
			this.oData.aColumns = oArray;
		},

		getPersData : function(){
			var oDeferred = new jQuery.Deferred();
			if (!this._oBundle) {
				this._oBundle = this.oData;
			}
			var oBundle = this._oBundle;
			oDeferred.resolve(oBundle);
			return oDeferred.promise();
		},

		setPersData : function(oBundle){
			var oDeferred = new jQuery.Deferred();
			this._oBundle = oBundle;
			oDeferred.resolve();
			return oDeferred.promise();
		},

		resetPersData : function(){
			alert("reset");
			var oDeferred = new jQuery.Deferred();
			var oInitialData = {
					_persoSchemaVersion: "1.0",
					aColumns : [/*
					            {
								id: "demoApp-idTabla-productCol",
									order: 0,
									text: "{i18n>oNameView.content.Table.Column.1.text}",
									visible: true
								},
								{
									id: "demoApp-idTabla-idCol2",
									order: 1,
									text: "{i18n>oNameView.content.Table.Column.2.text}",
									visible: true
								},
								{
									id: "demoApp-idTabla-idCol3",
									order: 2,
									text: "{i18n>oNameView.content.Table.Column.3.text}",
									visible: true
								},
								{
									id: "demoApp-idTabla-idCol4",
									order: 3,
									text: "{i18n>oNameView.content.Table.Column.4.text}",
									visible: true
								},
								{
									id: "demoApp-idTabla-idCol5",
									order: 4,
									text: "{i18n>oNameView.content.Table.Column.5.text}",
									visible: true
								},
								{
									id: "demoApp-idTabla-idCol6",
									order: 5,
									text: "{i18n>oNameView.content.Table.Column.6.text}",
									visible: true
								},
								{
									id: "demoApp-idTabla-idCol7",
									order: 6,
									text: "{i18n>oNameView.content.Table.Column.7.text}",
									visible: true
								}*/
							]
			};
 
			//set personalization
			this._oBundle = oInitialData;
 
			//reset personalization, i.e. display table as defined
			//this._oBundle = null;
 
			oDeferred.resolve();
			return oDeferred.promise();
		},
 
		//this caption callback will modify the TablePersoDialog' entry for the 'Weight' column
		//to 'Weight (Important!)', but will leave all other column names as they are.

		getCaption : function(oColumn){
			if (oColumn.getHeader() && oColumn.getHeader().getText) {
				if (oColumn.getHeader().getText() === "Weight") {
					return "Weight (Important!)";
				}
			}
			return null;
		},

		getGroup : function(oColumn){
			if( oColumn.getId().indexOf('productCol') != -1 ||
					oColumn.getId().indexOf('supplierCol') != -1) {
				return "Primary Group";
			}
			return "Secondary Group";
		}
	};