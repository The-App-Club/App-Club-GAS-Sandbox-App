function doGet(e) {
  // https://developers.google.com/apps-script/reference/utilities/utilities#base64decodeencoded,-charset
  function decodeBase64Text(text) {
    const dec = Utilities.base64Decode(text, Utilities.Charset.UTF_8);
    return decodeURI(Utilities.newBlob(dec).getDataAsString());
  }

  const params = e.parameter;

  const pushItem = {
    no: 0,
    planType: 'something',
    email: decodeBase64Text(params.email),
    userName: decodeBase64Text(params.userName),
    organization: decodeBase64Text(params.organization),
    department: decodeBase64Text(params.department),
    accountExpireDate: decodeBase64Text(params.accountExpireDate),
    accountCreateStatus: 'something',
    mailSendStatus: 'something',
    contractProcess: 'something',
  };

  const accountManagementSpreadsheetId =
    PropertiesService.getScriptProperties().getProperty(
      'ACCOUNT_MANAGEMENT_SPREADSHEET_ID'
    );
  const spreadsheet = SpreadsheetApp.openById(accountManagementSpreadsheetId);

  const accountManageSheetData = spreadsheet
    .getSheetByName('template')
    .getDataRange()
    .getValues();

  let startRowPoint = 0;
  let startColumnPoint = 0;

  const dataRowCount = accountManageSheetData.length;

  // 記載開始ポイントを取得
  for (let rowIndex = 0; rowIndex < dataRowCount; rowIndex++) {
    const rowData = accountManageSheetData[rowIndex];
    const columnIndex = 1;
    const columnData = rowData[columnIndex];

    if (!columnData) {
      startRowPoint = rowIndex;
      startColumnPoint = columnIndex;
      break;
    }
  }

  let pushItemRowList = [];
  let pushItemColumnList = [];
  let targetPushItemList = Object.keys(pushItem);

  for (let index = 0; index < targetPushItemList.length; index++) {
    let targetPushItem = {};
    if (targetPushItemList[index] === 'no') {
      targetPushItem = startRowPoint;
    } else {
      targetPushItem = pushItem[targetPushItemList[index]];
    }
    pushItemColumnList.push(targetPushItem);
  }
  pushItemRowList.push(pushItemColumnList);

  // https://developers.google.com/apps-script/reference/spreadsheet/sheet#getrangerow,-column,-numrows,-numcolumns
  let rowCount = pushItemRowList.length;
  let columnCount = Object.keys(pushItem).length;
  const accountManageSheet = spreadsheet.getSheetByName('template');
  accountManageSheet
    .getRange(startRowPoint + 1, startColumnPoint, rowCount, columnCount)
    .setValues(pushItemRowList);

  Object.assign(pushItem, { no: startRowPoint});

  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify({ message: pushItem }));

  return output;
}
