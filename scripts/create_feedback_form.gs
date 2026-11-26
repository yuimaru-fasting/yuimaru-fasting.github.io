/**
 * 「ホームページを読んだ感想」を中心にした Google フォームを作るスクリプト
 * （お問い合わせ・最新情報の受け取りもこのフォームでまとめて受け付けます）
 *
 * 使い方：
 *  1. https://script.google.com を開き「新しいプロジェクト」
 *  2. 中身をすべて消して、このファイルの内容を貼り付けて保存
 *  3. 上の「実行」を押す（初回は権限の許可を求められるので許可）
 *  4. 下の「実行ログ」に出る「回答用URL」をコピー
 *
 * ※ 新しいフォームとして作るので、今までのお問い合わせフォームと
 *    その回答はそのまま残ります。
 */
function createFeedbackForm() {
  var form = FormApp.create('ゆいまーるファスティング ご感想・お問い合わせ');
  form.setDescription(
    'ホームページを読んでいただき、ありがとうございます。\n' +
    '「読みやすかった」「この内容が参考になった」「自分もこんな体験をした」など、' +
    'ひとことでもうれしいです。ご感想をお聞かせください。\n' +
    'ご質問や最新情報の受け取りも、こちらから受け付けています。\n' +
    '沖縄の薬剤師がすべて目を通します。'
  );
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setConfirmationMessage(
    'ご感想ありがとうございます！\n' +
    'いただいた声は、ホームページや講座づくりに活かします。\n' +
    'ご質問をいただいた方には、メールでお返事します。'
  );

  // ── ご感想 ─────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('ホームページの感想');

  form.addScaleItem()
    .setTitle('ホームページの読みやすさはいかがでしたか？')
    .setBounds(1, 5)
    .setLabels('読みにくかった', 'とても読みやすかった')
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('参考になった内容（いくつでも）')
    .setChoiceValues([
      '1分でわかるファスティング',
      'まずは今夜から、12時間',
      '島の断食ごよみ（空腹時の過ごし方など）',
      'ファスティング（断食）とは',
      '断食の歴史',
      'やり方とスケジュール',
      'よくある質問',
      '研究のいま',
      'ぬちぐすい薬草図鑑',
      '体重と体の痛みの関係',
      '肥満改善と医療費削減',
      'プロフィール・記録の見える化'
    ])
    .showOtherOption(true)
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('ご感想')
    .setHelpText(
      '感じたこと、役に立ったこと、もっと知りたいことなど、自由にお書きください。\n' +
      '例）HPはいい内容でとても読みやすかった。空腹時の対応も載っていて参考になりました。'
    )
    .setRequired(true);

  // ── ファスティングの経験 ───────────────────
  form.addSectionHeaderItem()
    .setTitle('ファスティングのご経験');

  form.addMultipleChoiceItem()
    .setTitle('ファスティング（断食）のご経験はありますか？')
    .setChoiceValues([
      '続けている',
      'やったことがある',
      'これから始めてみたい',
      'まだ考え中'
    ])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('あなたの体験・思いを聞かせてください（任意）')
    .setHelpText(
      'やってみての体や気持ちの変化、断食について思うことなど。\n' +
      '例）自分もファスティングで15kg落としてから調子が良い。' +
      '断食文化が広まれば、健康的な生活につながると思う。'
    )
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('いただいたご感想・体験を、ホームページやnoteで紹介してもよいですか？')
    .setChoiceValues([
      'ニックネームを添えて紹介してよい',
      '名前を出さずに紹介してよい',
      '紹介しないでほしい'
    ])
    .setRequired(true);

  // ── お名前・ご質問・最新情報 ─────────────────
  form.addSectionHeaderItem()
    .setTitle('お名前・ご質問・最新情報')
    .setHelpText('お返事や最新情報が必要な方だけ、メールアドレスをご記入ください。');

  form.addTextItem()
    .setTitle('お名前（ニックネーム可）')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('ご質問・お問い合わせ（任意）')
    .setHelpText('講座・サポートや取材のご依頼なども。服用中のお薬や持病があれば、あわせてお書きください')
    .setRequired(false);

  var emailValidation = FormApp.createTextValidation()
    .requireTextIsEmail()
    .setHelpText('メールアドレスの形で入力してください')
    .build();
  form.addTextItem()
    .setTitle('メールアドレス（任意）')
    .setHelpText('お返事・最新情報をお送りします')
    .setValidation(emailValidation)
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('最新情報のお知らせ')
    .setChoiceValues(['講座・サポートの最新情報をメールで受け取る'])
    .setRequired(false);

  Logger.log('回答用URL（サイトに貼るのはこちら）: ' + form.getPublishedUrl());
  Logger.log('編集用URL: ' + form.getEditUrl());
}
