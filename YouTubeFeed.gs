const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN_HERE" //ここにあなたのLINEのアクセストークンを貼り付けてください。

function youtubeFetcher() {

  const ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID_HERE') //スプレッドシートのIDをここに貼り付けてください。
  const sheet = ss.getSheetByName('シート1'); //シートの名前(ここも変える必要があるかも?)
  const lastRow = sheet.getLastRow();

  for (var v = 0; v < 1; v++) {

    var video = YouTube.Search.list('id,snippet', {
      "channel_id": 'YOUTUBE_CHANNEL_ID_HERE',//チャンネルIDをここへ貼り付けてください。
      "order": "date", //新しい順に取得 
      "type": "Video",
      "regionCode": "JP",
      "maxResults": "1" //最新の動画を一件だけ取得
    });


    let obj = JSON.parse(video) //取得したデータをオブジェクトの形式に
    let videoid = obj["items"][0]["id"]["videoId"] //オブジェクトの中からvideoIdを取り出し
    let link = "https://www.youtube.com/watch?v=" + videoid //YouTubeのリンクにする
    Logger.log(link) //ログにリンクを出す
    if (sheet.getRange(lastRow, 1).getValue() === link) {
      break  //もしシートにあるリンクが取得したものと一緒だったら処理を中断
    }
    else {
      sheet.getRange(lastRow, 1).setValue(link); //シートにリンクを挿入
      sendLineMessage(link); //sendLineMessage関数を実行　linkもつれていく
    }

  }
}


function sendLineMessage(link) { //LINEにメッセージを送信する関数

  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/broadcast', { //LINEの友達全員にメッセージを送る 参照:https://developers.line.biz/ja/docs/messaging-api/sending-messages/
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    payload: JSON.stringify({
      messages: [
        {
          type: 'text',
          text: "YouTubeで新しい動画が投稿されたよ！\n\n" + link, //テキストとリンクを送信。\nは改行
        }
      ]
    }),
  });

}
