import { HappinessCategory } from 'interfaces'

export const getCategoryByName = (name: string) => {
  const categories = getHappinessCategories()
  return categories.find(cate => cate.name === name) || categories[0]
}


export const getHappinessCategories = (): HappinessCategory[] => {
  const happinessCategories = [

    {
      "emoji": "🎉",
      "name": "成功",
      "examples": [
        "発表会で上手く演奏できた",
        "仕事相手と上手く会話できた",
        "告白してOKがもらえた",
        "セールでお目当ての品物ゲット！",
        "いつもより早起きできた",
        "奮発した美容液が肌に合ってた",
        "困りごとを上手いこと解決できた",
        "損な役回りを回避できた"
      ]
    },
    {
      "emoji": "💓",
      "name": "愛",
      "examples": [
        "好きな人が優しかった",
        "推しが今日も素敵だった",
        "友達から久しぶりに連絡が来た",
        "街で微笑ましい光景を見た",
        "いっぱいチャットした",
        "おススメしたものにハマってくれた",
        "友達が構ってくれた",
        "愛を再確認した",
        "ご飯を作ってもらった",
        "ネットの人に慰めてもらった"
      ]
    },
    {
      "emoji": "💯",
      "name": "えらい",
      "examples": [
        "お年寄りに親切にした",
        "お風呂に入った",
        "ご飯を作った",
        "積読を崩した",
        "事務書類をやっつけた",
        "クーポンで賢くお買い物した",
        "部屋をお掃除した",
        "友達を褒めてあげられた",
        "お仕事を頑張った",
        "家族のために家事をした"
      ]
    },
    {
      "emoji": "💰",
      "name": "収入・お得",
      "examples": [
        "臨時収入があった",
        "お小遣いをもらった",
        "給料が上がった",
        "セールで安く服が買えた",
        "50％オフのお寿司が買えた",
        "洗濯物からお金が出てきた",
        "パチンコでフィーバーした",
        "友達から耳寄り情報が入ってきた"
      ]
    },
    {
      "emoji": "🏃",
      "name": "運動",
      "examples": [
        "サッカーの試合で勝った",
        "ジョギングに行ってスッキリした",
        "たくさん歩いた",
        "100ｍ走で新記録を出した",
        "目標カロリーを消費した",
        "筋トレの成果が出てきた",
        "先生に頑張ってるねと褒められた",
        "スタイルが良くなってきた"
      ]
    },
    {
      "emoji": "👭",
      "name": "友達",
      "examples": [
        "友達と遊んでおいしいものを食べた",
        "悩みを相談して気が晴れた",
        "会話が盛り上がった",
        "仲直りした",
        "新しい友達ができた",
        "知らないことを教えてもらった",
        "何気なくしたことに感謝された",
        "遊ぶ約束をして計画を立てた"
      ]
    },
    {
      "emoji": "👨‍👩‍👦",
      "name": "家族",
      "examples": [
        "誕生日をお祝いしてもらった",
        "遊んでる子供が可愛かった",
        "仲直りした",
        "実家に帰って親孝行した",
        "電話して昔話をした",
        "久しぶりに会って元気そうだった",
        "生活物資などをもらった"
      ]
    },
    {
      "emoji": "🍻",
      "name": "交流",
      "examples": [
        "職場の飲み会にいって楽しかった",
        "新しい友達ができた",
        "オンライン飲み会で盛り上がった",
        "知らない世界の話を聞けた",
        "尊敬する人と会話できた",
        "苦手な人を少し好きになれた",
        "悩みを打ち明けてもらった"
      ]
    },
    {
      "emoji": "🍣",
      "name": "食事",
      "examples": [
        "お寿司を食べて美味しかった",
        "お昼ご飯の定食が美味しかった",
        "美味しいワインを飲んだ",
        "賞味期限前に食べきれた",
        "安いのに美味しいものを見つけた",
        "SNSで話題のアイス美味しかった",
        "好きな物をお腹いっぱい食べた",
        "買ったお茶が良い香り",
        "食べ過ぎなかった"
      ]
    },
    {
      "emoji": "🎂",
      "name": "お祝い",
      "examples": [
        "企画が成功した",
        "１０年ぶりに新作が発表された",
        "１周年記念だった",
        "子供がつかまり立ち出来た",
        "今日を生き延びた",
        "好きなキャラの出番があった",
        "家族が昇進した"
      ]
    },
    {
      "emoji": "🐾",
      "name": "動物・ペット",
      "examples": [
        "猫ちゃんが遊んでくれた",
        "一緒にお散歩に行ってご機嫌だった",
        "外でかわいい猫に出会った",
        "たくさんご飯を食べてくれた",
        "平和な寝顔に癒された",
        "いい子でお留守番してた",
        "秋の虫の鳴き声がした",
        "綺麗なちょうちょを見た"
      ]
    },
    {
      "emoji": "🐣",
      "name": "新しい経験",
      "examples": [
        "行きたかったカフェに行った",
        "近所に行きたい店を見つけた",
        "新しい楽器を買った",
        "役に立ちそうなアプリをDLした",
        "新しい家具を設置した",
        "好きな曲を発見した",
        "話してみたかった人と話せた",
        "知らない分野の本を買った"
      ]
    },
    {
      "emoji": "🍀",
      "name": "幸運",
      "examples": [
        "偶然友達と会った",
        "500円を拾った",
        "電車で座れた",
        "エレベーターがすぐ来た",
        "外でトイレがすぐ見つかった",
        "失くしたものが出てきた",
        "じゃんけんで勝った",
        "競馬で万馬券を当てた"
      ]
    },
    {
      "emoji": "🍳",
      "name": "料理",
      "examples": [
        "作ったご飯が美味しかった",
        "いつもより良い食材を買った",
        "美味しかったと褒めてもらえた",
        "買った調理器具が便利だった",
        "お肉の火加減がバッチリだった",
        "SNSで作ってみたい料理を見つけた",
        "ホットケーキが上手に出来た"
      ]
    },
    {
      "emoji": "🏖",
      "name": "リラックス",
      "examples": [
        "家でのんびり過ごした",
        "友達とお茶をした",
        "銭湯に行った",
        "気持ちよく昼寝した",
        "マッサージが気持ちよかった",
        "仕事中、上手に休憩できた",
        "悩みが特にない"
      ]
    },
    {
      "emoji": "🚗",
      "name": "お出かけ",
      "examples": [
        "キャンプに行って楽しかった",
        "お花見に行って綺麗だった",
        "思ったより近かった",
        "パーキングエリアでアイスを食べた",
        "旅行先の露天風呂が良かった",
        "始めて食べる料理が美味しかった",
        "自然の中でリフレッシュできた"
      ]
    },
    {
      "emoji": "🎡",
      "name": "イベント",
      "examples": [
        "ディズニーランドに遊びに行った",
        "推しのライブに行った",
        "天気が良くて行楽日和だった",
        "勉強会でためになる話を聞けた",
        "推しとツーショを撮った！",
        "展示品が素晴らしかった",
        "友達の家に泊まりに行った"
      ]
    },
    {
      "emoji": "🌤",
      "name": "自然",
      "examples": [
        "天気が良くて外が気持ちよかった",
        "涼しくなってきて嬉しい",
        "育ててる花が咲いた",
        "虹が見えた",
        "気圧が高くなってきて嬉しい",
        "雪が降って外が綺麗になった",
        "公園に綺麗な花が咲いていた"
      ]
    },
    {
      "emoji": "📺",
      "name": "娯楽",
      "examples": [
        "新作の映画を見に行って面白かった",
        "ひいきのチームが勝った",
        "買ったゲームが面白かった",
        "好きなキャラのメイン回だった",
        "アニメの展開が面白すぎた",
        "推しの生配信を聞けた",
        "チケット競争に勝利"
      ]
    },
    {
      "emoji": "👑",
      "name": "ファッション",
      "examples": [
        "髪型がビシッと決まった",
        "素敵な服を買った",
        "お洒落な人に服装を褒められた",
        "美容院に行ってサッパリした",
        "新しいリップ凄く似合ってる",
        "貰ったアクセサリーをして出かけた",
        "肌の調子がすこぶる良い",
        "履きやすい靴をゲット",
        "通販で買った服が期待通りだった"
      ]
    },
    {
      "emoji": "🎹",
      "name": "趣味",
      "examples": [
        "描いてた絵が完成した",
        "前より上達した",
        "人から褒められた",
        "面白さが分かってきた",
        "読んでる本が面白い",
        "同じ趣味の人と仲良くなれた",
        "ネトゲしてると最高に幸せ"
      ]
    },
    {
      "emoji": "👔",
      "name": "仕事",
      "examples": [
        "上司に褒められた",
        "バイト先のお客さんに褒められた",
        "大事なポジションを任された",
        "お客さんが優しい人だった",
        "公開した資料の評判が良かった",
        "お客さんから指名してもらえた",
        "困ってる後輩を助けてあげた",
        "有給取って遊んだ"
      ]
    },
    {
      "emoji": "📝",
      "name": "勉強",
      "examples": [
        "テストで目標の点を取れた",
        "試験に合格した",
        "前解けなかった問題が解けた",
        "今日の目標を達成した",
        "宿題をやった",
        "課題を提出した",
        "人前での発表で上手くできた",
        "新しい分野に挑戦した",
        "友達に勉強を教えてあげた",
        "人に聞いたら解決した"
      ]
    },
    {
      "emoji": "🎁",
      "name": "贈り物",
      "examples": [
        "懸賞に当たった",
        "職場で美味しいお菓子が配られた",
        "プレゼントを喜んでもらえた",
        "ゲーセンでぬいを取って貰った",
        "旅行のお土産をもらった",
        "貰ったクッキーとお茶が合う",
        "友達に絵を描いてもらった",
        "いらない物を欲しい人にあげた",
        "欲しいものを譲ってもらえた"
      ]
    },
    {
      "emoji": "💪",
      "name": "健康",
      "examples": [
        "ぐっすり寝て気持ちよく目覚めた",
        "風邪が治った",
        "お風呂にゆっくり入った",
        "休肝日を達成した",
        "ダイエットの目標をクリア",
        "筋肉が付いてきたのを感じる",
        "頭痛がしなかった",
        "家族の病気が治った",
        "昨日より元気",
        "健康にいいものを食べた"
      ]
    }, {
      "emoji": "☺",
      "name": "その他",
      "examples": [
        "何事もない平和な1日だった",
        "今日も地球が平和だった",
        "まだ木曜だと思ったら金曜だった",
        "楽しみにしてたＤＶＤが届いた",
        "好きな漫画の人気が高まってる",
        "ギャグがウケた",
        "心配事が解決した",
        "悪くない一日だった"
      ]
    },
  ]
  return happinessCategories.map((_cate, i) => {
    const category = Object.assign(_cate, { id: i })
    return category
  })
}




