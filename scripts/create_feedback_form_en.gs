/**
 * 英語版「ご感想・お問い合わせ」Google フォームを作るスクリプト
 * （日本語版 create_feedback_form.gs と同じ構成）
 *
 * 使い方：
 *  1. https://script.google.com を開き「新しいプロジェクト」
 *  2. 中身をすべて消して、このファイルの内容を貼り付けて保存
 *  3. 関数名が「createFeedbackFormEn」になっているのを確かめて「実行」
 *  4. 下の「実行ログ」に出る「回答用URL」をコピー
 */
function createFeedbackFormEn() {
  var form = FormApp.create('Yuimaru Fasting - Feedback & Contact');
  form.setDescription(
    'Thank you for reading our website!\n' +
    'We would love to hear what you think, whether it was easy to read, ' +
    'which parts were helpful, or your own fasting experience. Even a few words mean a lot.\n' +
    'You can also send questions or sign up for updates here.\n' +
    'A pharmacist in Okinawa reads every message.'
  );
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setConfirmationMessage(
    'Thank you for your feedback!\n' +
    'Your words will help us improve the website and our courses.\n' +
    'If you asked a question, we will reply by email.'
  );

  form.addSectionHeaderItem().setTitle('About the website');

  form.addScaleItem()
    .setTitle('How easy was the website to read?')
    .setBounds(1, 5)
    .setLabels('Hard to read', 'Very easy to read')
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Which sections did you find helpful? (Select all that apply)')
    .setChoiceValues([
      'Fasting in 1 minute',
      'Start tonight: 12 hours',
      'Island fasting tips (handling hunger, etc.)',
      'What is fasting?',
      'History of fasting',
      'How to fast & schedule',
      'FAQ',
      'Latest research',
      'Nuchigusui herb guide',
      'Body weight and pain',
      'Obesity and medical costs',
      'Profile / progress records'
    ])
    .showOtherOption(true)
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Your feedback')
    .setHelpText(
      'Tell us what you thought, what helped, or what you would like to know more about.\n' +
      'e.g. "Great content and very easy to read. The tips on handling hunger were really helpful."'
    )
    .setRequired(true);

  form.addSectionHeaderItem().setTitle('Your fasting experience');

  form.addMultipleChoiceItem()
    .setTitle('Have you tried fasting?')
    .setChoiceValues([
      'I fast regularly',
      'I have tried it before',
      'I would like to start',
      'Still thinking about it'
    ])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Share your experience or thoughts (optional)')
    .setHelpText(
      'Changes you noticed in your body or mind, or your thoughts on fasting.\n' +
      'e.g. "I lost 15 kg through fasting and feel great. ' +
      'If fasting culture spreads, it could lead to healthier lives."'
    )
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('May we share your feedback or experience on our website or note?')
    .setChoiceValues([
      'Yes, with my nickname',
      'Yes, anonymously',
      'No, please do not share'
    ])
    .setRequired(true);

  form.addSectionHeaderItem()
    .setTitle('Name, questions & updates')
    .setHelpText('Please enter your email only if you would like a reply or updates.');

  form.addTextItem().setTitle('Name (nickname is fine)').setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Questions / inquiries (optional)')
    .setHelpText('Including courses, support, or media requests. If you take any medication or have a medical condition, please let us know.')
    .setRequired(false);

  var emailValidation = FormApp.createTextValidation()
    .requireTextIsEmail()
    .setHelpText('Please enter a valid email address')
    .build();
  form.addTextItem()
    .setTitle('Email (optional)')
    .setHelpText('For replies and updates')
    .setValidation(emailValidation)
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Updates')
    .setChoiceValues(['Send me updates about courses and support by email'])
    .setRequired(false);

  Logger.log('回答用URL（サイトに貼るのはこちら）: ' + form.getPublishedUrl());
  Logger.log('編集用URL: ' + form.getEditUrl());
}
