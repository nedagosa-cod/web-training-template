/**
 * Google Apps Script - Control de Accesos
 * 
 * Este script recibe datos vía POST desde la aplicación web
 * y los registra en la hoja "Control_Accesos" de Google Sheets.
 * 
 * Formato de la hoja:
 * ID | FECHA CREACION | USUARIO | CAMPAÑA | SEGMENTO | OBSERVACION
 * 
 * Deployment ID: AKfycbxAKwZw0k-ircBh1RLpd7ETARFzvfovebSJCSIvyNU_yoiJWcLbvTe_DtcPGv1vK5zK
 */

const SHEET_NAME = 'Control_Accesos';

/**
 * Maneja las peticiones GET (para verificar que el servicio está activo)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Servicio de Control de Accesos activo' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Maneja las peticiones POST con los datos de sesión
 * @param {Object} e - Evento de la petición
 */
function doPost(e) {
  try {
    // Parsear el cuerpo de la petición
    var body = JSON.parse(e.postData.contents);

    // Obtener la hoja "Control_Accesos"
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // Si la hoja no existe, crearla con los encabezados
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(['ID', 'FECHA CREACION', 'USUARIO', 'CAMPAÑA', 'SEGMENTO', 'OBSERVACION']);
    }

    // Generar ID auto-incremental
    var lastRow = sheet.getLastRow();
    var newId = lastRow <= 1 ? 1 : lastRow; // Si solo hay encabezado, empezar en 1

    // Generar fecha en formato DD/MM/YYYY HH:mm:ss
    var now = new Date();
    var fechaCreacion = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');

    // Extraer los datos recibidos
    var usuario = body.usuario || '';
    var campana = body.campana || '';
    var segmento = body.segmento || '';
    var observacion = body.observacion || '';

    // Agregar la nueva fila con los datos
    sheet.appendRow([newId, fechaCreacion, usuario, campana, segmento, observacion]);

    // Responder con éxito
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Datos registrados correctamente en Control_Accesos',
        data: {
          id: newId,
          fechaCreacion: fechaCreacion,
          usuario: usuario,
          campana: campana,
          segmento: segmento,
          observacion: observacion
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Responder con error
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Error al registrar los datos: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
