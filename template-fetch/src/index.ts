function doGet(e) {
  // var params = e.parameter;
  // Logger.log(params);

  // https://sampleapis.com/api-list/wines
  const reponse = UrlFetchApp.fetch('https://api.sampleapis.com/wines/reds');
  if (Math.floor(reponse.getResponseCode()) === 200) {
    var output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(
      JSON.stringify({
        status: 0,
        message: JSON.parse(reponse.getContentText()),
      })
    );
    return output;
  }
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify({ status: 1, message: 'something wrong' }));
  return output;
}
