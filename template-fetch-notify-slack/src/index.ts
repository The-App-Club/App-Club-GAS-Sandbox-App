function doGet(e) {
  // var params = e.parameter;
  // Logger.log(params);

  const dressUpNotifyTemplate = (targetItem) => {
    const {
      winery = '',
      wine = '',
      rating = {},
      image = '',
      location = '',
    } = {
      ...targetItem,
    };
    const { average = '', reviews = '' } = { ...rating };
    const notifyTemplate = {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${winery}*\n*${wine}*`,
      },
      accessory: {
        type: 'image',
        image_url: image,
        alt_text: ' ',
      },
      fields: [
        {
          type: 'mrkdwn',
          text: `*average*\n${average}`,
        },
        {
          type: 'mrkdwn',
          text: `*reviews*\n${reviews}`,
        },
        {
          type: 'mrkdwn',
          text: `*location*\n${location.replace(/\n/, '')}`,
        },
      ],
    };

    return notifyTemplate;
  };
  // https://qiita.com/yarnaimo/items/e92600237d65876f8dd8
  function eachSlice<T extends any[]>(arr: T, size: number) {
    return arr.reduce(
      (newarr, _, i) =>
        i % size ? newarr : [...newarr, arr.slice(i, i + size)],
      [] as T[][]
    );
  }

  // https://sampleapis.com/api-list/wines
  const reponse = UrlFetchApp.fetch('https://api.sampleapis.com/wines/reds');
  if (Math.floor(reponse.getResponseCode()) === 200) {
    const resultInfoList = JSON.parse(reponse.getContentText());
    const groupedResultInfo2DList = eachSlice(resultInfoList, 5);
    for (let i = 0; i < groupedResultInfo2DList.length; i++) {
      const groupedResultInfoList = groupedResultInfo2DList[i];
      const blockInfoList = [];
      blockInfoList.push({
        type: 'header',
        text: {
          type: 'plain_text',
          text: `${'🍷 Wines'} - ${'Reds'}`,
          emoji: true,
        },
      });
      for (let j = 0; j < groupedResultInfoList.length; j++) {
        const groupedResultInfo = groupedResultInfoList[j];
        blockInfoList.push(dressUpNotifyTemplate(groupedResultInfo));
        blockInfoList.push({
          type: 'divider',
        });
      }

      const notifySlackMessage = {
        blocks: blockInfoList,
      };
      // https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app#fetchurl,-params
      UrlFetchApp.fetch(
        PropertiesService.getScriptProperties().getProperty(
          'SLACK_WEBHOOK_URL'
        ),
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
          },
          method: 'post',
          payload: JSON.stringify(notifySlackMessage),
        }
      );
    }
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
