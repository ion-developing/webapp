jQuery.sap.declare("util.Formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");
jQuery.sap.require("sap.ui.core.format.NumberFormat");


sDateFormat_ag = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "MMM dd, yyyy HH:mm"});
sDateFormat_ag2 = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-dd-MM"});
sDateFormat_ag3 = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd/MM/yyyy HH:mm:ss"});
sDateFormat_ag4 = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "MM/dd/yyyy HH:mm:ss"});
sDateFormat_ag5 = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd"});

util.Formatter = {};
util.Formatter.ErrorXML= function(oValue){
	
		if(oValue == "X")
			return true;
		else
			return false;
	
}
util.Formatter.OrdnCompra= function(oValue){
	if (oValue != undefined ) {
		var oImg ="";
		switch(oValue.toString()){
			case "A":
				oImg = "sap-icon://save";
				break;
			default:
				oImg = "";
				break;
		}
		return oImg;
	}
};
util.Formatter.Visible_OrdnCompra= function(oValue){
	if (oValue != undefined ) {
		if(oValue=="A")
			return true;
		else
			return false;
	}
};
util.Formatter.ShowIcon = function(oValue){
	if (oValue != undefined ) {
		return "sap-icon://color-fill";
	}
};
util.Formatter.DateFormat_agenda = function(oValue){
	
	if (oValue != undefined ) {
		return sDateFormat_ag.format(new Date(oValue))
	}
};
util.Formatter.Prioridad = function(oValue){
	
	if (oValue != undefined ) {
		switch(oValue.toString()){
			case "1":
				status = "#1F618D";
				break;
			case "2":
				status = "#1A5276";
				break;
			default:
				break;
		}
		return status;
	}
};
util.Formatter.ColorCode = function(activo){
	
	if (activo != null) {
		
		var imgColor="";
				
		if(!activo)	imgColor = "quinelaapp/Public/Img/amarillo.png";
		else imgColor = "quinelaapp/Public/Img/verde.png";
		
		return imgColor;
	}
};
util.Formatter.Img_top_down_src = function(oValue){
	if (oValue != undefined) {
		
		var oNumer = parseInt(oValue);
		if(oNumer<50)
			return "sap-icon://expand-group";
		else
			return "sap-icon://collapse-group";
	}
};
util.Formatter.Img_top_down_color = function(oValue){
	if (oValue != undefined) {
		
		var oNumer = parseInt(oValue);
		if(oNumer<50)
			return "#33f168";
		else
			return "#dc0c0e";
	}
};

util.Formatter.Date = function(oDate){
	if (oDate != null) {
		var date;
		date = oDate[0]+oDate[1]+oDate[2]+oDate[3]+"."+oDate[4]+oDate[5]+"."+oDate[6]+oDate[7];
		return date;
	}
};

util.Formatter.Hour = function(oHour){
	var hour;
	hour = oHour[0]+oHour[1]+":"+oHour[2]+oHour[3]+":"+oHour[4]+oHour[5];
	return hour;
};
util.Formatter.DateFormat = function(oDate){
	if (oDate != null) {
		var oLimit = oDate.indexOf("T");
		
		return oDate.substring(0, oLimit); // 10
	}
};