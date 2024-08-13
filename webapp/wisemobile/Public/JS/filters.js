jQuery.sap.declare("wisemobile.Public.JS.filters");

var oFilters = {
    returnData: function() {
        return {
        	"LISTADOFACTURA":[
        		{
        			"zcolumnKey": "BUKRS",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.razon_social"),
        			"ztype": "combo",
        			"zbindingPath": "SOCIEDADES_ZW18-BUKRS-BUTXT"
        		},
        		{
        			"zcolumnKey": "f_Factura",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.f_Factura"),
        			"ztype": "date"
        		},
        		{
        			"zcolumnKey": "estado",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.estado"),
        			"ztype": "combo",
        			"zbindingPath": "ESTADO_LISTADOFACTURA-TIPO-TEXT"
        		}
        	],
        	"REQUISICIONESPORAUTORIZAR": [
        		{
        			"zcolumnKey": "f_requisiciones",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.f_requisiciones"),
        			"ztype": "date"
        		}
        	],
        	"ORDENESDECOMPRAPORAUTORIZAR": [
        		{
        			"zcolumnKey": "f_orden_compra",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.f_orden_Compra"),
        			"ztype": "date"
        		}
        	],
        	"ESTATUSRECEPCION": [
        		{
        			"zcolumnKey": "BUKRS",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.razon_social"),
        			"ztype": "combo",
        			"zbindingPath": "SOCIEDADES_ZW18-BUKRS-BUTXT"
        		},
        		{
        			"zcolumnKey": "f_Factura",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.f_Factura"),
        			"ztype": "date"
        		}
        	],
        	"ORDENCOMPRACFACTURA_2": [
        		{
        			"zcolumnKey": "BUKRS",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.razon_social"),
        			"ztype": "combo",
        			"zbindingPath": "SOCIEDADES_ZW18-BUKRS-BUTXT"
        		},
        		{
        			"zcolumnKey": "AEDAT",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.f_orden_Compra"),
        			"ztype": "date"
        		},
        		{
        			"zcolumnKey": "TIPO",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.tipo_recepcion"),
        			"ztype": "combo",
        			"zbindingPath": "TIPORECEPCION-TIPO-TEXT"
        		},
        		{
        			"zcolumnKey": "WAERS",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.moneda"),
        			"ztype": "combo",
        			"zbindingPath": "MONEDAS_ZW18-WAERS-LTEXT"
        		},
				{
        			"zcolumnKey": "EBELN",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.orden_compra"),
        			"ztype": "string",
        			"zbindingPath": "MONEDAS_ZW18-WAERS-LTEXT"
        		}
        	],
        	"ORDENCOMPRACFACTURA": [
        		{
        			"zcolumnKey": "BUKRS",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.razon_social"),
        			"ztype": "combo",
        			"zbindingPath": "SOCIEDADES_ZW18-BUKRS-BUTXT"
        		},
        		{
        			"zcolumnKey": "f_orden_Compra",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.f_orden_Compra"),
        			"ztype": "date"
        		},
        		{
        			"zcolumnKey": "tipo_recepcion",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.tipo_recepcion"),
        			"ztype": "combo",
        			"zbindingPath": "TIPORECEPCION-TIPO-TEXT"
        		},
        		{
        			"zcolumnKey": "WAERS",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.moneda"),
        			"ztype": "combo",
        			"zbindingPath": "MONEDAS_ZW18-WAERS-LTEXT"
        		}
        	],
        	"CONSIGNACIONCFACTURA_2": [
        		{
        			"zcolumnKey": "BUKRS",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.razon_social"),
        			"ztype": "combo",
        			"zbindingPath": "SOCIEDADES_ZW18-BUKRS-BUTXT"
        		},
        		{
        			"zcolumnKey": "DATE",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.f_orden_Compra"),
        			"ztype": "date"
        		},
				{
        			"zcolumnKey": "MBLNR",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.documento_material"),
        			"ztype": "string",
        			"zbindingPath": "MONEDAS_ZW18-WAERS-LTEXT"
        		}
        	],
        	"CONSIGNACIONCFACTURA": [
        		{
        			"zcolumnKey": "BUKRS",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.razon_social"),
        			"ztype": "combo",
        			"zbindingPath": "SOCIEDADES_ZW18-BUKRS-BUTXT"
        		},
        		{
        			"zcolumnKey": "f_orden_Compra",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.f_orden_Compra"),
        			"ztype": "date"
        		}
        	],
        	"COMPLEMENTOS": [
        		{
        			"zcolumnKey": "sociedad",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.sociedad"),
        			"ztype": "combo",
        			"zbindingPath": "SOCIEDADES_ZW12-BUKRS-BUTXT"
        		},
        		{
        			"zcolumnKey": "f_pago",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.f_pago"),
        			"ztype": "date"
        		},
        		{
        			"zcolumnKey": "estado",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.estado"),
        			"ztype": "combo",
        			"zbindingPath": "ESTATUS_ZW12-STATUS-STATDESC"
        		}
        	],
        	"ORDENCOMPRAFACTURAR": [
        		{
        			"zcolumnKey": "BUKRS",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.razon_social"),
        			"ztype": "combo",
        			"zbindingPath": "RAZONSOCIAL"
        		},
        		{
        			"zcolumnKey": "f_orden_Compra",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.f_orden_Compra"),
        			"ztype": "date"
        		},
        		{
        			"zcolumnKey": "tipo_recepcion",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.tipo_recepcion"),
        			"ztype": "string"
        		},
        		{
        			"zcolumnKey": "WAERS",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.moneda"),
        			"ztype": "combo",
        			"zbindingPath": "MONEDA"
        		},
        		{
        			"zcolumnKey": "nota_Entega",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.nota_Entega"),
        			"ztype": "string"
        		}
        	],
        	"GRUPOS": [
        		{
        			"zcolumnKey": "descripcion",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.descripcion"),
        			"ztype": "string"
        		},
        		{
        			"zcolumnKey": "id_grupo",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.id_grupo"),
        			"ztype": "string"
        		}
        	],
        	"USUARIOS": [
        		{
        			"zcolumnKey": "nombre",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.nombre"),
        			"ztype": "string"
        		},
        		{
        			"zcolumnKey": "apellidos",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.apellidos"),
        			"ztype": "string"
        		}
        	],
        	"APLICACIONES": [
        		{
        			"zcolumnKey": "id_app",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.id_app"),
        			"ztype": "string"
        		},
        		{
        			"zcolumnKey": "nombre_app",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.nombre_app"),
        			"ztype": "string"
        		}
        	],
        	"ROLES": [
        		{
        			"zcolumnKey": "id_rol",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.id_rol"),
        			"ztype": "string"
        		},
        		{
        			"zcolumnKey": "nombre_rol",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.nombre_rol"),
        			"ztype": "string"
        		}
        	],
        	"APROBACIONES": [
        		{
        			"zcolumnKey": "BUKRS",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.razon_social"),
        			"ztype": "combo",
        			"zbindingPath": "RAZONSOCIAL"
        		},
        		{
        			"zcolumnKey": "division",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.division"),
        			"ztype": "combo",
        			"zbindingPath": "DIVISION"
        		},
        		{
        			"zcolumnKey": "f_documento",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.f_documento"),
        			"ztype": "date"
        		},
        		{
        			"zcolumnKey": "estado",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.estado"),
        			"ztype": "combo",
        			"zbindingPath": "ESTADO"
        		},
        		{
        			"zcolumnKey": "nocomprobacion",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.nocomprobacion"),
        			"ztype": "string"
        		}
        	],
        	"LTAANTICIPOS": [
        		{
        			"zcolumnKey": "BUKRS",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.razon_social"),
        			"ztype": "combo",
        			"zbindingPath": "RAZONSOCIAL"
        		},
        		{
        			"zcolumnKey": "division",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.division"),
        			"ztype": "combo",
        			"zbindingPath": "DIVISION"
        		},
        		{
        			"zcolumnKey": "f_solicitud",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.f_solicitud"),
        			"ztype": "date"
        		},
        		{
        			"zcolumnKey": "estado",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.estado"),
        			"ztype": "combo",
        			"zbindingPath": "ESTADO"
        		}
        	],
        	"ESTADOCUENTA": [
        		{
        			"zcolumnKey": "BUKRS",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.razon_social"),
        			"ztype": "combo",
        			"zbindingPath": "SOCIEDADES_ZW18-BUKRS-BUTXT"
        		}
        	],
        	"COTIZACIONES": [
        		{
        			"zcolumnKey": "BUKRS",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.razon_social"),
        			"ztype": "combo",
        			"zbindingPath": "SOCIEDADES_ZW12-BUKRS-BUTXT"
        		},
        		{
        			"zcolumnKey": "f_licitacion",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.f_licitacion"),
        			"ztype": "date"
        		},
        		{
        			"zcolumnKey": "peticion_oferta",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.peticion_oferta"),
        			"ztype": "text"
        			//"zbindingPath": "TIPORECEPCION-TIPO-TEXT"
        		}
        	],
        	
        	"ESTATUS_COTIZACIONES": [
        		{
        			"zcolumnKey": "BUKRS",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.razon_social"),
        			"ztype": "combo",
        			"zbindingPath": "SOCIEDADES_ZW12-BUKRS-BUTXT"
        		},
        		{
        			"zcolumnKey": "peticion_oferta",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.peticion_oferta"),
        			"ztype": "text"
        		},
        		{
        			"zcolumnKey": "f_licitacion",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.f_licitacion"),
        			"ztype": "date"
        		},
        		{
        			"zcolumnKey": "estado",
        			"ztext": oCnt_FHelps.f_readTranslate("Filters.estado"),
        			"ztype": "combo",
        			"zbindingPath": "ESTADO_COTIZACIONES-TIPO-TEXT"
        		}
        	]
        };
    }
};