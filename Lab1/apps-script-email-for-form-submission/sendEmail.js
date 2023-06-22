var EMAIL_DOC_URL =
  "https://docs.google.com/document/d/1Kw_8YAQnl5QxhYyiEjYRaoUoJ4FBR_ZMoDeEiGQ3nnY/edit?usp=sharing";
var EMAIL_SUBJECT = "Thank You for filling out the form!";

function onFormSubmit(e) {
  var responses = e.namedValues;

  var email = responses["Email address"][0].trim();
  Logger.log("; responses=" + JSON.stringify(responses));

  MailApp.sendEmail({
    to: email,
    subject: EMAIL_SUBJECT,
    htmlBody: createEmailBody(),
  });
  Logger.log("email sent to: " + email);

  var sheet = SpreadsheetApp.getActiveSheet();
  var row = sheet.getActiveRange().getRow();
  var column = e.values.length + 1;
  sheet.getRange(row, column).setValue("Email Sent");
}

function createEmailBody() {
  var docId = DocumentApp.openByUrl(EMAIL_DOC_URL).getId();
  var emailBody = docToHtml(docId);
  return emailBody;
}

function docToHtml(docId) {
  var url =
    "https://docs.google.com/feeds/download/documents/export/Export?id=" +
    docId +
    "&exportFormat=html";
  var param = {
    method: "get",
    headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
    muteHttpExceptions: true,
  };
  return UrlFetchApp.fetch(url, param).getContentText();
}
