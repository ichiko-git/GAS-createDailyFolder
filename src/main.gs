/**
 * 指定したGoogleドライブの場所に今日の日付のフォルダを作成
 * 火曜〜木曜のみ実行する
 */
function createDailyFolder() {
  // 今日の曜日をチェック（0=日曜、1=月曜、...、6=土曜）
  const today = new Date();
  const dayOfWeek = today.getDay();

  // 火曜（2）〜木曜（4）のみ実行
  if (dayOfWeek < 2 || dayOfWeek > 4) {
    console.log("今日は対象外の曜日です");
    return;
  }

  // 親フォルダのIDを指定（Googleドライブで確認）
  const PARENT_FOLDER_ID =
    PropertiesService.getScriptProperties().getProperty("PARENT_FOLDER_ID");

  try {
    // 親フォルダを取得
    const parentFolder = DriveApp.getFolderById(PARENT_FOLDER_ID);

    // 今日の日付をフォーマット（例：2025-07-09）
    const dateString = Utilities.formatDate(today, "Asia/Tokyo", "yyyyMMdd");

    // 同じ名前のフォルダが既に存在するかチェック
    const existingFolders = parentFolder.getFoldersByName(dateString);

    if (existingFolders.hasNext()) {
      console.log(`フォルダ「${dateString}」は既に存在します`);
      return;
    }

    // 新しいフォルダを作成
    const newFolder = parentFolder.createFolder(dateString);
    console.log(`フォルダ「${dateString}」を作成しました`);
    console.log(`フォルダURL: ${newFolder.getUrl()}`);
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
}
