sap.ui.define([], function() {
    "use strict";
    return {
        formatCurrency: function(value) {
            //Se agrega la validación para que se visualice $0.00 si es que no hay datos...
            if (value === null || value === undefined || value === "") {
                return "$0.00";
            }
            // Convertir el valor a un número flotante
            var floatValue = parseFloat(value);
            // Convertir el valor original a una cadena
            var originalValue = value.toString();
            // Obtener el num de decimales del valor original
            var decimalPlaces = (originalValue.split(".")[1] || "").length;
            // Si los decimales son más de dos,limita
            decimalPlaces = decimalPlaces > 2 ? 2 : decimalPlaces;
            // Formatear el num a una cadena con separadores de miles y el mismo num de decimales
            var formattedValue = floatValue.toLocaleString("es-MX", {
                minimumFractionDigits: decimalPlaces,
                maximumFractionDigits: decimalPlaces
            });
            return "$" + formattedValue;
        }
    };
});