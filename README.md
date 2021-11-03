# YouTubeNotificationWithGAS
指定したYouTubeチャンネルで新しい動画がアップロードされたらLINEBOTで通知します。

## How to use
GoogleDrive内に、スプレッドシートとGASファイル(GoogleAppScript)を用意してください。

このリポジトリ内のYouTubeFeed.gsの内容をコピーし、先程GoogleDeiveに作ったGASファイルにペーストしてください。

GASファイルを開いたとき、左側に"サービス"という欄があるはずなのでその中から`YouTube Data API v3`を選んで

一行目の`const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN_HERE"`の`YOUR_ACCESS_TOKEN_HERE`に自分のLINEBOTのアクセストークンをペーストしてください。(わからない方はこちらを参考にしてください:https://arukayies.com/gas/line_bot/gettoken)

GoogleDeive内のスプレッドシートを開いたとき、リンクはこの様(`https://docs.google.com/spreadsheets/d/ABCDEFG12345/edit#gid=0`)になっていると思うのでこのリンクで言うところの`ABCDEFG12345`の部分をコピーしておいてください。これがスプレッドシートのIDになります。

GASファイルの５行目にある`const ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID_HERE')`の`YOUR_SPREADSHEET_ID_HERE`の部分に先程コピーしたスプレッドシートのIDをペーストしてください。

通知させたいYouTubeチャンネルのIDをコピーしてください。(`https://www.youtube.com/channel/abcdefg1234567`で言うところの`abcdefg1234567`の部分)

12行目にある`"channel_id": 'YOUTUBE_CHANNEL_ID_HERE',`のYOUTUBE_CHANNEL_ID_HEREの部分に先程コピーしたチャンネルIDをペーストしてください。


コードを保存したら関数`YouTubeFeed`を実行してください。警告が出てくるかもしれませんが、気にせず進んでOKです。

自分のLINEBOTからメッセージが来て、それが指定したYouTubeチャンネルの最新の動画ということを確認してください。　もし、メッセージが送られて来なかったら、もう一度手順を確認してみてください。

もし、自動で新しい動画をLINEに送ってほしいのならば、YouTubeFeedのトリガーを設定することをおすすめします。私は、下記の問題点を踏まえて２時間に一回YouTubeFeedを実行するようにしています。

## 問題点
https://cloud.google.com/apis/docs/capping-api-usage?hl=ja&visit_id=637668617549827626-2772998193&rd=1 これが適用されるはずだけど確認した限り、YouTube Date APIをGASで実行したときは、制限が確認できなかった。

