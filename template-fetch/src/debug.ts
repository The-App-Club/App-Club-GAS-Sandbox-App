function debugDoGet() {
  var e = {
    parameter: {
      email: 'HERE_YOUR_KEY',
      userName: 'HERE_YOUR_KEY',
      organization: 'HERE_YOUR_KEY',
      department: 'HERE_YOUR_KEY',
      accountExpireDate: 'HERE_YOUR_KEY',
    },
  };
  function doGet(e) {
    // var params = e.parameter;
    // Logger.log(params);

    // https://sampleapis.com/api-list/wines
    const reponse = UrlFetchApp.fetch('https://api.sampleapis.com/wines/reds');
    Logger.log(reponse.getResponseCode());

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
    output.setContent(
      JSON.stringify({ status: 1, message: 'something wrong' })
    );
    return output;
  }
  //Logger.log(e);
  return doGet(e);
}
