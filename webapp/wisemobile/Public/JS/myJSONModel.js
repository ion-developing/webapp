jQuery.sap.declare("wisemobile.Public.JS.myJSONModel");
jQuery.sap.require("sap.ui.model.json.JSONModel");

sap.ui.model.json.JSONModel.extend("myJSONModel", {
	
	//declare our new method including two new parameters fnSuccess and fnError, our callback functions
	loadDataNew: function(sURL, fnSuccess, fnError, oParameters, bAsync, sType, header_xcsrf_token, bMerge, bCache){
			
			var that = this;

			if (bAsync !== false) {
				bAsync = true;
			}
			if (!sType)	{
				sType = "GET";
			}
			if (bCache === undefined) {
				bCache = this.bCache;
			}
			
			if (!header_xcsrf_token)	{
				header_xcsrf_token = "FETCH";
			}
			
			this.fireRequestSent({url : sURL, type : sType, async : bAsync, info : "cache="+bCache+";bMerge=" + bMerge});

			jQuery.ajax({
			  url: sURL,
			  async: bAsync,
			  cache: bCache,
	          contentType: "application/soap+xml; charset=utf-8",
			  headers: {
				  	"X-CSRF-Token": header_xcsrf_token,
				  	"Authorization": "Basic " + btoa( oUsuario + ":" + oPassword),
			        "accept-language": oLenguaje
			  },
			  data: oParameters,
			  type: sType,
			  success: function(oData, response, xhr) {
				if (!oData) {
					jQuery.sap.log.fatal("The following problem occurred: No data was retrieved by service: " + sURL);
				}
				that.oDataOrig = {};
				that.oDataOrig = jQuery.extend(true,{},that.oDataOrig, oData); // Holds a copy of the original data   
				that.setData(oData, bMerge);
				that.fireRequestCompleted({url : sURL, type : sType, async : bAsync, info : "cache=false;bMerge=" + bMerge});
				// call the callback success function if informed
				if (typeof fnSuccess === 'function') {
                    fnSuccess(oData, xhr.getResponseHeader("x-csrf-token"),xhr.status);
                }

			  },
			  error: function(XMLHttpRequest, textStatus, errorThrown){
				jQuery.sap.log.fatal("The following problem occurred: " + textStatus, XMLHttpRequest.responseText + ","
							+ XMLHttpRequest.status + "," + XMLHttpRequest.statusText);
				that.fireRequestCompleted({url : sURL, type : sType, async : bAsync, info : "cache=false;bMerge=" + bMerge});
				that.fireRequestFailed({message : textStatus,
					statusCode : XMLHttpRequest.status, statusText : XMLHttpRequest.statusText, responseText : XMLHttpRequest.responseText});
			  	// call the callback error function if informed
				if (typeof fnError === 'function') {
                    fnError({message : textStatus, statusCode : XMLHttpRequest.status, statusText : XMLHttpRequest.statusText, responseText : XMLHttpRequest.responseText});
                }
			  }
			});

	},
	
	getOrigData: function(){
		return this.oDataOrig; 
	},
	
	discardChanges: function(){
		this.setData(this.oDataOrig); 
	},
	
	commitChanges: function(){
		this.oDataOrig = this.getData();
	}

});		
