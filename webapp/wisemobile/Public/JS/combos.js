jQuery.sap.declare("wisemobile.Public.JS.combos");

var oCombos = {
    returnData: function() {
        return {
        	"TIPORECEPCION":[
        		{
        			"TIPO": "1",
        			"TEXT": oCnt_FHelps.f_readTranslate("FiltersItems.TIPORECEPCION.1")
        		},
        		{
        			"TIPO": "2",
        			"TEXT": oCnt_FHelps.f_readTranslate("FiltersItems.TIPORECEPCION.2")
        		},
        		{
        			"TIPO": "3",
        			"TEXT": oCnt_FHelps.f_readTranslate("FiltersItems.TIPORECEPCION.3")
        		}
        	],
        	"ESTADO_COTIZACIONES":[
        		{
        			"TIPO": "A",
        			"TEXT": oCnt_FHelps.f_readTranslate("FiltersItems.ESTATUSCOTIZACIONES.1")
        		},
        		{
        			"TIPO": "P",
        			"TEXT": oCnt_FHelps.f_readTranslate("FiltersItems.ESTATUSCOTIZACIONES.2")
        		},
        		{
        			"TIPO": "R",
        			"TEXT": oCnt_FHelps.f_readTranslate("FiltersItems.ESTATUSCOTIZACIONES.3")
        		}
        	],
        	"ESTADO_LISTADOFACTURA":[
        		{
        			"TIPO": "0",
        			"TEXT": oCnt_FHelps.f_readTranslate("FiltersItems.ESTATUSLISTADOFACTURAS.1")
        		},
        		{
        			"TIPO": "1",
        			"TEXT": oCnt_FHelps.f_readTranslate("FiltersItems.ESTATUSLISTADOFACTURAS.2")
        		},
        		{
        			"TIPO": "3",
        			"TEXT": oCnt_FHelps.f_readTranslate("FiltersItems.ESTATUSLISTADOFACTURAS.3")
        		},
        		{
        			"TIPO": "4",
        			"TEXT": oCnt_FHelps.f_readTranslate("FiltersItems.ESTATUSLISTADOFACTURAS.4")
        		}
        	]
        };
    }
};