export const ROAST_LEVEL = {
  LIGHT: {
    data: 'light',
    display: 'ライトロースト(極浅煎り)',
  },
  CINNAMON: {
    data: 'cinnamon',
    display: 'シナモンロースト(浅煎り)',
  },
  MEDIUM: {
    data: 'medium',
    display: 'ミディアムロースト(中浅煎り)',
  },
  HIGH: {
    data: 'high',
    display: 'ハイロースト(中煎り)',
  },
  CITY: {
    data: 'city',
    display: 'シティロースト(中深煎り)',
  },
  FULL_CITY: {
    data: 'fullCity',
    display: 'フルシティロースト(中深〜深煎り)',
  },
  FRENCH: {
    data: 'french',
    display: 'フレンチロースト(深煎り)',
  },
  ITALIAN: {
    data: 'italian',
    display: 'イタリアンロースト(極深煎り)',
  }
}

export const PROCESS = {
  NATURAL: {
    data: 'natural',
    display: 'ナチュラル',
  },
  WASHED: {
    data: 'washed',
    display: 'ウォッシュド',
  },
  HONEY: {
    data: 'honey',
    display: 'ハニープロセス',
  },
  SEMI_WASHED: {
    data: 'semiWashed',
    display: 'セミウォッシュド',
  },
  PULPED_NATURAL: {
    data: 'pulpedNatural',
    display: 'パルプドナチュラル',
  },
  ANAEROBIC_NATURAL: {
    data: 'anaerobicNatural',
    display: 'アナエロビック・ナチュラル',
  },
  ANAEROBIC_WASHED: {
    data: 'anaerobicWashed',
    display: 'アナエロビック・ウォッシュド',
  },
  OTHER: {
    data: 'other',
    display: 'その他',
  }
}

export type FLAVOR_TYPE = {
  "id": string,
  "ja": string,
  "en": string,
  "level": string,
  "parentId": string | null
}


export const FLAVOR_LIST: FLAVOR_TYPE[] = [
  {
    "id": "floral",
    "ja": "花",
    "en": "Floral",
    "level": "category",
    "parentId": null
  },
  {
    "id": "blackTee",
    "ja": "紅茶",
    "en": "Black Tea",
    "level": "subCategory",
    "parentId": "floral"
  },
  {
    "id": "subFloral",
    "ja": "花",
    "en": "Floral",
    "level": "subCategory",
    "parentId": "floral"
  },
  {
    "id": "chamomile",
    "ja": "カモミール",
    "en": "Chamomile",
    "level": "group",
    "parentId": "subFloral"
  },
  {
    "id": "rose",
    "ja": "ローズ",
    "en": "Rose",
    "level": "group",
    "parentId": "subFloral"
  },
  {
    "id": "jasmine",
    "ja": "ジャスミン",
    "en": "Jasmine",
    "level": "group",
    "parentId": "subFloral"
  },
  {
    "id": "fruity",
    "ja": "フルーティー",
    "en": "Fruity",
    "level": "category",
    "parentId": null
  },
  {
    "id": "berry",
    "ja": "ベリー",
    "en": "Berry",
    "level": "subCategory",
    "parentId": "fruity"
  },
  {
    "id": "blackberry",
    "ja": "ブラックベリー",
    "en": "Blackberry",
    "level": "group",
    "parentId": "berry"
  },
  {
    "id": "raspberry",
    "ja": "ラズベリー",
    "en": "Raspberry",
    "level": "group",
    "parentId": "berry"
  },
  {
    "id": "blueberry",
    "ja": "ブルーベリー",
    "en": "Blueberry",
    "level": "group",
    "parentId": "berry"
  },
  {
    "id": "strawberry",
    "ja": "ストロベリー",
    "en": "Strawberry",
    "level": "group",
    "parentId": "berry"
  },
  {
    "id": "driedFruit",
    "ja": "ドライフルーツ",
    "en": "Dried Fruit",
    "level": "subCategory",
    "parentId": "fruity"
  },
  {
    "id": "raisin",
    "ja": "レーズン",
    "en": "Raisin",
    "level": "group",
    "parentId": "driedFruit"
  },
  {
    "id": "prune",
    "ja": "プルーン",
    "en": "Prune",
    "level": "group",
    "parentId": "driedFruit"
  },
  {
    "id": "otherFruits",
    "ja": "その他の果実",
    "en": "Other Fruits",
    "level": "subCategory",
    "parentId": "fruity"
  },
  {
    "id": "coconut",
    "ja": "ココナッツ",
    "en": "Coconut",
    "level": "group",
    "parentId": "otherFruits"
  },
  {
    "id": "cherry",
    "ja": "チェリー",
    "en": "Cherry",
    "level": "group",
    "parentId": "otherFruits"
  },
  {
    "id": "pomegranate",
    "ja": "ザクロ",
    "en": "Pomegranate",
    "level": "group",
    "parentId": "otherFruits"
  },
  {
    "id": "pineapple",
    "ja": "パイナップル",
    "en": "Pineapple",
    "level": "group",
    "parentId": "otherFruits"
  },
  {
    "id": "grape",
    "ja": "ブドウ",
    "en": "Grape",
    "level": "group",
    "parentId": "otherFruits"
  },
  {
    "id": "apple",
    "ja": "リンゴ",
    "en": "Apple",
    "level": "group",
    "parentId": "otherFruits"
  },
  {
    "id": "peach",
    "ja": "モモ",
    "en": "Peach",
    "level": "group",
    "parentId": "otherFruits"
  },
  {
    "id": "pear",
    "ja": "ナシ",
    "en": "Pear",
    "level": "group",
    "parentId": "otherFruits"
  },
  {
    "id": "citrus",
    "ja": "柑橘類",
    "en": "Citrus",
    "level": "subCategory",
    "parentId": "fruity"
  },
  {
    "id": "grapefruit",
    "ja": "グレープフルーツ",
    "en": "Grapefruit",
    "level": "group",
    "parentId": "citrus"
  },
  {
    "id": "orange",
    "ja": "オレンジ",
    "en": "Orange",
    "level": "group",
    "parentId": "citrus"
  },
  {
    "id": "lemon",
    "ja": "レモン",
    "en": "Lemon",
    "level": "group",
    "parentId": "citrus"
  },
  {
    "id": "lime",
    "ja": "ライム",
    "en": "Lime",
    "level": "group",
    "parentId": "citrus"
  },
  {
    "id": "sourFermented",
    "ja": "酸味/発酵",
    "en": "Sour/Fermented",
    "level": "category",
    "parentId": null
  },
  {
    "id": "sour",
    "ja": "酸味",
    "en": "Sour",
    "level": "subcategory",
    "parentId": "sourFermented"
  },
  {
    "id": "sourAromatics",
    "ja": "酸っぱい香り",
    "en": "Sour Aromatics",
    "level": "group",
    "parentId": "sour"
  },
  {
    "id": "aceticAcid",
    "ja": "酢",
    "en": "Acetic Acid",
    "level": "group",
    "parentId": "sour"
  },
  {
    "id": "butyricAcid",
    "ja": "銀杏",
    "en": "Butyric Acid",
    "level": "group",
    "parentId": "sour"
  },
  {
    "id": "isoValericAcid",
    "ja": "汗",
    "en": "Iso-Valeric Acid",
    "level": "group",
    "parentId": "sour"
  },
  {
    "id": "citricAcid",
    "ja": "クエン酸",
    "en": "Citric Acid",
    "level": "group",
    "parentId": "sour"
  },
  {
    "id": "malicAcid",
    "ja": "リンゴ酸",
    "en": "Malic Acid",
    "level": "group",
    "parentId": "sour"
  },
  {
    "id": "alcoholicFermented",
    "ja": "酒/発酵",
    "en": "Alcoholic/Fermented",
    "level": "subcategory",
    "parentId": "sourFermented"
  },
  {
    "id": "winey",
    "ja": "ワイン",
    "en": "Winey",
    "level": "group",
    "parentId": "alcoholicFermented"
  },
  {
    "id": "whiskey",
    "ja": "ウイスキー",
    "en": "Whiskey",
    "level": "group",
    "parentId": "alcoholicFermented"
  },
  {
    "id": "fermentedFruit",
    "ja": "発酵した果物",
    "en": "Fermented Fruit",
    "level": "group",
    "parentId": "alcoholicFermented"
  },
  {
    "id": "overripe",
    "ja": "熟れすぎ",
    "en": "Overripe",
    "level": "group",
    "parentId": "alcoholicFermented"
  },
  {
    "id": "vegetative",
    "ja": "野菜",
    "en": "Vegetative",
    "level": "category",
    "parentId": null
  },
  {
    "id": "oliveOil",
    "ja": "オリーブオイル",
    "en": "Olive Oil",
    "level": "subCategory",
    "parentId": "vegetative"
  },
  {
    "id": "raw",
    "ja": "生野菜",
    "en": "Raw",
    "level": "subCategory",
    "parentId": "vegetative"
  },
  {
    "id": "vegetative",
    "ja": "生植物/野菜",
    "en": "Vegetative",
    "level": "subCategory",
    "parentId": "vegetative"
  },
  {
    "id": "underripe",
    "ja": "未成熟な野菜",
    "en": "Underripe",
    "level": "group",
    "parentId": "vegetative"
  },
  {
    "id": "peapod",
    "ja": "エンドウ豆",
    "en": "Peapod",
    "level": "group",
    "parentId": "vegetative"
  },
  {
    "id": "fresh",
    "ja": "生鮮野菜",
    "en": "Fresh",
    "level": "group",
    "parentId": "vegetative"
  },
  {
    "id": "spinach",
    "ja": "ほうれん草",
    "en": "Spinach",
    "level": "group",
    "parentId": "vegetative"
  },
  {
    "id": "plant",
    "ja": "植物",
    "en": "Plant",
    "level": "group",
    "parentId": "vegetative"
  },
  {
    "id": "dry",
    "ja": "干し草",
    "en": "Dry",
    "level": "group",
    "parentId": "vegetative"
  },
  {
    "id": "herb",
    "ja": "ハーブ",
    "en": "Herb",
    "level": "group",
    "parentId": "vegetative"
  },
  {
    "id": "bean",
    "ja": "豆",
    "en": "Bean",
    "level": "subCategory",
    "parentId": "vegetative"
  },
  {
    "id": "other",
    "ja": "その他",
    "en": "Other",
    "level": "category",
    "parentId": null
  },
  {
    "id": "paperyMusty",
    "ja": "紙/カビ",
    "en": "Papery/Musty",
    "level": "subCategory",
    "parentId": "other"
  },
  {
    "id": "stale",
    "ja": "カビ臭い",
    "en": "Stale",
    "level": "group",
    "parentId": "paperyMusty"
  },
  {
    "id": "cardboard",
    "ja": "ダンボール",
    "en": "Cardboard",
    "level": "group",
    "parentId": "paperyMusty"
  },
  {
    "id": "papery",
    "ja": "紙",
    "en": "Papery",
    "level": "group",
    "parentId": "paperyMusty"
  },
  {
    "id": "woody",
    "ja": "木材",
    "en": "Woody",
    "level": "group",
    "parentId": "paperyMusty"
  },
  {
    "id": "moldyDamp",
    "ja": "カビ/湿気",
    "en": "Moldy/Damp",
    "level": "subCategory",
    "parentId": "paperyMusty"
  },
  {
    "id": "mustyDusty",
    "ja": "カビ/ホコリ",
    "en": "Musty/Dusty",
    "level": "group",
    "parentId": "paperyMusty"
  },
  {
    "id": "moldyEarthy",
    "ja": "カビ/土",
    "en": "Moldy/Earthy",
    "level": "group",
    "parentId": "paperyMusty"
  },
  {
    "id": "animalic",
    "ja": "動物",
    "en": "Animalic",
    "level": "group",
    "parentId": "paperMusty"
  },
  {
    "id": "meatyBrothy",
    "ja": "ブイヨン",
    "en": "Meaty/Brothy",
    "level": "group",
    "parentId": "paperyMusty"
  },
  {
    "id": "phenolic",
    "ja": "防腐剤",
    "en": "Phenolic",
    "level": "category",
    "parentId": "paperMusty"
  },
  {
    "id": "chemical",
    "ja": "化学薬品",
    "en": "Chemical",
    "level": "subCategory",
    "parentId": "other"
  },
  {
    "id": "bitter",
    "ja": "苦味",
    "en": "Bitter",
    "level": "group",
    "parentId": "chemical"
  },
  {
    "id": "salty",
    "ja": "塩味",
    "en": "Salty",
    "level": "group",
    "parentId": "chemical"
  },
  {
    "id": "medicinal",
    "ja": "薬",
    "en": "Medicinal",
    "level": "group",
    "parentId": "chemical"
  },
  {
    "id": "petroleum",
    "ja": "石油",
    "en": "Petroleum",
    "level": "group",
    "parentId": "chemical"
  },
  {
    "id": "skunky",
    "ja": "スカンク",
    "en": "Skunky",
    "level": "group",
    "parentId": "chemical"
  },
  {
    "id": "rubber",
    "ja": "ゴム",
    "en": "Rubber",
    "level": "group",
    "parentId": "chemical"
  },
  {
    "id": "roasted",
    "ja": "焼き",
    "en": "Roasted",
    "level": "category",
    "parentId": null
  },
  {
    "id": "pipeTobacco",
    "ja": "パイプタバコ",
    "en": "Pipe Tobacco",
    "level": "subCategory",
    "parentId": "roasted"
  },
  {
    "id": "tobacco",
    "ja": "タバコ",
    "en": "Tobacco",
    "level": "subCategory",
    "parentId": "roasted"
  },
  {
    "id": "burnt",
    "ja": "焦げ",
    "en": "Burnt",
    "level": "subCategory",
    "parentId": "roasted"
  },
  {
    "id": "acrid",
    "ja": "燃えたゴム臭",
    "en": "Acrid",
    "level": "group",
    "parentId": "burnt"
  },
  {
    "id": "ashy",
    "ja": "灰",
    "en": "Ashy",
    "level": "group",
    "parentId": "burnt"
  },
  {
    "id": "smoky",
    "ja": "煙",
    "en": "Smoky",
    "level": "group",
    "parentId": "burnt"
  },
  {
    "id": "brownRoast",
    "ja": "焦げ豆",
    "en": "Brown Roast",
    "level": "group",
    "parentId": "burnt"
  },
  {
    "id": "cereal",
    "ja": "穀物",
    "en": "Cereal",
    "level": "category",
    "parentId": null
  },
  {
    "id": "grain",
    "ja": "穀物",
    "en": "Grain",
    "level": "group",
    "parentId": "cereal"
  },
  {
    "id": "malt",
    "ja": "麦芽",
    "en": "Malt",
    "level": "group",
    "parentId": "cereal"
  },
  {
    "id": "spices",
    "ja": "スパイス",
    "en": "Spices",
    "level": "category",
    "parentId": null
  },
  {
    "id": "pungent",
    "ja": "コショウ",
    "en": "Pungent",
    "level": "subCategory",
    "parentId": "spices"
  },
  {
    "id": "pepper",
    "ja": "唐辛子",
    "en": "Pepper",
    "level": "group",
    "parentId": "spices"
  },
  {
    "id": "brownSpice",
    "ja": "香辛料",
    "en": "Brown Spice",
    "level": "subCategory",
    "parentId": "spices"
  },
  {
    "id": "anise",
    "ja": "アニス",
    "en": "Anise",
    "level": "group",
    "parentId": "brownSpice"
  },
  {
    "id": "nutmeg",
    "ja": "ナツメグ",
    "en": "Nutmeg",
    "level": "group",
    "parentId": "brownSpice"
  },
  {
    "id": "cinnamon",
    "ja": "シナモン",
    "en": "Cinnamon",
    "level": "group",
    "parentId": "brownSpice"
  },
  {
    "id": "clove",
    "ja": "クローブ",
    "en": "Clove",
    "level": "group",
    "parentId": "brownSpice"
  },
  {
    "id": "nuttyCocoa",
    "ja": "ナッツ/ココア",
    "en": "Nutty/Cocoa",
    "level": "category",
    "parentId": null
  },
  {
    "id": "nutty",
    "ja": "ナッツ",
    "en": "Nutty",
    "level": "subCategory",
    "parentId": "nuttyCocoa"
  },
  {
    "id": "cocoa",
    "ja": "ココア",
    "en": "Cocoa",
    "level": "subCategory",
    "parentId": "nuttyCocoa"
  },
  {
    "id": "peanut",
    "ja": "ピーナッツ",
    "en": "Peanut",
    "level": "group",
    "parentId": "nutty"
  },
  {
    "id": "hazelnut",
    "ja": "ヘーゼルナッツ",
    "en": "Hazelnut",
    "level": "group",
    "parentId": "nutty"
  },
  {
    "id": "almond",
    "ja": "アーモンド",
    "en": "Almond",
    "level": "group",
    "parentId": "nutty"
  },
  {
    "id": "chocolaty",
    "ja": "チョコレート",
    "en": "Chocolaty",
    "level": "group",
    "parentId": "cocoa"
  },
  {
    "id": "darkChocolate",
    "ja": "ダークチョコレート",
    "en": "Dark Chocolate",
    "level": "group",
    "parentId": "cocoa"
  },
  {
    "id": "sweet",
    "ja": "甘味",
    "en": "Sweet",
    "level": "category",
    "parentId": null
  },
  {
    "id": "brownSugar",
    "ja": "黒砂糖",
    "en": "Brown Sugar",
    "level": "subCategory",
    "parentId": "sweet"
  },
  {
    "id": "molasses",
    "ja": "モラセス",
    "en": "Molasses",
    "level": "group",
    "parentId": "brownSugar"
  },
  {
    "id": "mapleSyrup",
    "ja": "メープルシロップ",
    "en": "Maple Syrup",
    "level": "group",
    "parentId": "brownSugar"
  },
  {
    "id": "caramelized",
    "ja": "カラメル",
    "en": "Caramelized",
    "level": "group",
    "parentId": "brownSugar"
  },
  {
    "id": "honey",
    "ja": "ハチミツ",
    "en": "Honey",
    "level": "group",
    "parentId": "caramelized"
  },
  {
    "id": "vanilla",
    "ja": "バニラ",
    "en": "Vanilla",
    "level": "subCategory",
    "parentId": "sweet"
  },
  {
    "id": "vanillin",
    "ja": "バニリン",
    "en": "Vanillin",
    "level": "subCategory",
    "parentId": "sweet"
  },
  {
    "id": "otherSweet",
    "ja": "その他の甘味",
    "en": "Other Sweet",
    "level": "subCategory",
    "parentId": "sweet"
  },
  {
    "id": "sweetAromatics",
    "ja": "甘い香り",
    "en": "Sweet Aromatics",
    "level": "subCategory",
    "parentId": "sweet"
  }
]