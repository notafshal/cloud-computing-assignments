function payslip() {
  var empID = "";
  var empName = "";
  var empEmail = "";
  var empPhone = "";
  var empSalary = 0;
  var empDed = 0;
  var empTot = 0;

  var spSheet = SpreadsheetApp.getActiveSpreadsheet();
  var salSheet = spSheet.getSheetByName("PaySlip_Details");

  var payslipDetailsFolder = DriveApp.getFileById(
    "10IU4DGoZ0ucF3B4cM4gIMqjFD-oDHGRs"
  );
  var payslipTemplate = DriveApp.getFileById(
    "1r-i5lUSJW5PvfV0jADdEyThEHIR9qkgCN_00YkdhB0o"
  );

  var totalRows = salSheet.getLastRow();

  for (var rowNo = 2; rowNo <= totalRows; rowNo++) {
    empID = salSheet.getRange("A" + rowNo).getDisplayValue();
    empName = salSheet.getRange("B" + rowNo).getDisplayValue();
    empEmail = salSheet.getRange("C" + rowNo).getDisplayValue();
    empPhone = salSheet.getRange("D" + rowNo).getDisplayValue();
    empSalary = salSheet.getRange("E" + rowNo).getDisplayValue();
    empDed = salSheet.getRange("F" + rowNo).getDisplayValue();
    empTot = salSheet.getRange("G" + rowNo).getDisplayValue();

    var rawSalFile = payslipTemplate.makeCopy(payslipDetailsFolder);
    var rawFile = DocumentApp.openById(rawSalFile);

    var rawFileContent = rawFile.getBody();

    rawFileContent.replaceText("EMP_ID_XXXX", empID);
    rawFileContent.replaceText("EMP_NAME_XXXX", empID);
    rawFileContent.replaceText("SAL_XXXX", empID);
    rawFileContent.replaceText("DED_XXXX", empID);
    rawFileContent.replaceText("TOT_XXXX", empID);

    rawFile.saveAndClose();
    var payySlip = rawFile.getAs(MimeType.PDF);
    payPDF = payslipDetailsFolder
      .createFile(payySlip)
      .setName("Salary " + empName);

    payslipDetailsFolder.removeFile(rawSalFile);
    var mailSubject = "Salary Slip";
    var mailBody = "Please fint Your Payslip for this month attached.";
    GmailApp.sendEmail(empEmail, mailSubject, mailBody, {
      attachments: [payPDF.getAs(MimeType.PDF)],
    });
  }
}
