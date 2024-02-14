'use strict'

const FLAVOR_CATEGORY_LIST = [
  {
    origin: "floral",
    ja: "花",
    en: "Floral",
    level: "category",
    parentOrigin: null
  },
  {
    origin: "fruity",
    ja: "フルーティー",
    en: "Fruity",
    level: "category",
    parentOrigin: null
  },
  {
    origin: "sourFermented",
    ja: "酸味/発酵",
    en: "Sour/Fermented",
    level: "category",
    parentOrigin: null
  },
  {
    origin: "vegetative",
    ja: "野菜",
    en: "Vegetative",
    level: "category",
    parentOrigin: null
  },
  {
    origin: "other",
    ja: "その他",
    en: "Other",
    level: "category",
    parentOrigin: null
  },
  {
    origin: "roasted",
    ja: "焼き",
    en: "Roasted",
    level: "category",
    parentOrigin: null
  },
  {
    origin: "cereal",
    ja: "穀物",
    en: "Cereal",
    level: "category",
    parentOrigin: null
  },
  {
    origin: "spices",
    ja: "スパイス",
    en: "Spices",
    level: "category",
    parentOrigin: null
  },
  {
    origin: "nuttyCocoa",
    ja: "ナッツ/ココア",
    en: "Nutty/Cocoa",
    level: "category",
    parentOrigin: null
  },
  {
    origin: "sweet",
    ja: "甘味",
    en: "Sweet",
    level: "category",
    parentOrigin: null
  },
]

const FLAVOR_SUB_CATEGORY_LIST = [
  {
    origin: "blackTee",
    ja: "紅茶",
    en: "Black Tea",
    level: "subCategory",
    parentOrigin: "floral"
  },
  {
    origin: "subFloral",
    ja: "花",
    en: "Floral",
    level: "subCategory",
    parentOrigin: "floral"
  },
  {
    origin: "berry",
    ja: "ベリー",
    en: "Berry",
    level: "subCategory",
    parentOrigin: "fruity"
  },
  {
    origin: "driedFruit",
    ja: "ドライフルーツ",
    en: "Dried Fruit",
    level: "subCategory",
    parentOrigin: "fruity"
  },
  {
    origin: "otherFruits",
    ja: "その他の果実",
    en: "Other Fruits",
    level: "subCategory",
    parentOrigin: "fruity"
  },
  {
    origin: "citrus",
    ja: "柑橘類",
    en: "Citrus",
    level: "subCategory",
    parentOrigin: "fruity"
  },
  {
    origin: "sour",
    ja: "酸味",
    en: "Sour",
    level: "subcategory",
    parentOrigin: "sourFermented"
  },
  {
    origin: "alcoholicFermented",
    ja: "酒/発酵",
    en: "Alcoholic/Fermented",
    level: "subcategory",
    parentOrigin: "sourFermented"
  },
  {
    origin: "oliveOil",
    ja: "オリーブオイル",
    en: "Olive Oil",
    level: "subCategory",
    parentOrigin: "vegetative"
  },
  {
    origin: "raw",
    ja: "生野菜",
    en: "Raw",
    level: "subCategory",
    parentOrigin: "vegetative"
  },
  {
    origin: "vegetative",
    ja: "生植物/野菜",
    en: "Vegetative",
    level: "subCategory",
    parentOrigin: "vegetative"
  },
  {
    origin: "bean",
    ja: "豆",
    en: "Bean",
    level: "subCategory",
    parentOrigin: "vegetative"
  },
  {
    origin: "paperyMusty",
    ja: "紙/カビ",
    en: "Papery/Musty",
    level: "subCategory",
    parentOrigin: "other"
  },
  {
    origin: "moldyDamp",
    ja: "カビ/湿気",
    en: "Moldy/Damp",
    level: "subCategory",
    parentOrigin: "paperyMusty"
  },
  {
    origin: "chemical",
    ja: "化学薬品",
    en: "Chemical",
    level: "subCategory",
    parentOrigin: "other"
  },
  {
    origin: "pipeTobacco",
    ja: "パイプタバコ",
    en: "Pipe Tobacco",
    level: "subCategory",
    parentOrigin: "roasted"
  },
  {
    origin: "tobacco",
    ja: "タバコ",
    en: "Tobacco",
    level: "subCategory",
    parentOrigin: "roasted"
  },
  {
    origin: "burnt",
    ja: "焦げ",
    en: "Burnt",
    level: "subCategory",
    parentOrigin: "roasted"
  },
  {
    origin: "pungent",
    ja: "コショウ",
    en: "Pungent",
    level: "subCategory",
    parentOrigin: "spices"
  },
  {
    origin: "brownSpice",
    ja: "香辛料",
    en: "Brown Spice",
    level: "subCategory",
    parentOrigin: "spices"
  },
  {
    origin: "nutty",
    ja: "ナッツ",
    en: "Nutty",
    level: "subCategory",
    parentOrigin: "nuttyCocoa"
  },
  {
    origin: "cocoa",
    ja: "ココア",
    en: "Cocoa",
    level: "subCategory",
    parentOrigin: "nuttyCocoa"
  },
  {
    origin: "brownSugar",
    ja: "黒砂糖",
    en: "Brown Sugar",
    level: "subCategory",
    parentOrigin: "sweet"
  },
  {
    origin: "vanilla",
    ja: "バニラ",
    en: "Vanilla",
    level: "subCategory",
    parentOrigin: "sweet"
  },
  {
    origin: "vanillin",
    ja: "バニリン",
    en: "Vanillin",
    level: "subCategory",
    parentOrigin: "sweet"
  },
  {
    origin: "otherSweet",
    ja: "その他の甘味",
    en: "Other Sweet",
    level: "subCategory",
    parentOrigin: "sweet"
  },
  {
    origin: "sweetAromatics",
    ja: "甘い香り",
    en: "Sweet Aromatics",
    level: "subCategory",
    parentOrigin: "sweet"
  }
]

const FLAVOR_GROUP_LIST = [
  {
    origin: "chamomile",
    ja: "カモミール",
    en: "Chamomile",
    level: "group",
    parentOrigin: "subFloral"
  },
  {
    origin: "rose",
    ja: "ローズ",
    en: "Rose",
    level: "group",
    parentOrigin: "subFloral"
  },
  {
    origin: "jasmine",
    ja: "ジャスミン",
    en: "Jasmine",
    level: "group",
    parentOrigin: "subFloral"
  },
  {
    origin: "blackberry",
    ja: "ブラックベリー",
    en: "Blackberry",
    level: "group",
    parentOrigin: "berry"
  },
  {
    origin: "raspberry",
    ja: "ラズベリー",
    en: "Raspberry",
    level: "group",
    parentOrigin: "berry"
  },{
    origin: "blueberry",
    ja: "ブルーベリー",
    en: "Blueberry",
    level: "group",
    parentOrigin: "berry"
  },
  {
    origin: "strawberry",
    ja: "ストロベリー",
    en: "Strawberry",
    level: "group",
    parentOrigin: "berry"
  },
  {
    origin: "raisin",
    ja: "レーズン",
    en: "Raisin",
    level: "group",
    parentOrigin: "driedFruit"
  },
  {
    origin: "prune",
    ja: "プルーン",
    en: "Prune",
    level: "group",
    parentOrigin: "driedFruit"
  },
  {
    origin: "cherry",
    ja: "チェリー",
    en: "Cherry",
    level: "group",
    parentOrigin: "otherFruits"
  },
  {
    origin: "pomegranate",
    ja: "ザクロ",
    en: "Pomegranate",
    level: "group",
    parentOrigin: "otherFruits"
  },
  {
    origin: "pineapple",
    ja: "パイナップル",
    en: "Pineapple",
    level: "group",
    parentOrigin: "otherFruits"
  },
  {
    origin: "coconut",
    ja: "ココナッツ",
    en: "Coconut",
    level: "group",
    parentOrigin: "otherFruits"
  },
  {
    origin: "grape",
    ja: "ブドウ",
    en: "Grape",
    level: "group",
    parentOrigin: "otherFruits"
  },
  {
    origin: "apple",
    ja: "リンゴ",
    en: "Apple",
    level: "group",
    parentOrigin: "otherFruits"
  },
  {
    origin: "peach",
    ja: "モモ",
    en: "Peach",
    level: "group",
    parentOrigin: "otherFruits"
  },
  {
    origin: "pear",
    ja: "ナシ",
    en: "Pear",
    level: "group",
    parentOrigin: "otherFruits"
  },
  {
    origin: "grapefruit",
    ja: "グレープフルーツ",
    en: "Grapefruit",
    level: "group",
    parentOrigin: "citrus"
  },
  {
    origin: "orange",
    ja: "オレンジ",
    en: "Orange",
    level: "group",
    parentOrigin: "citrus"
  },
  {
    origin: "lemon",
    ja: "レモン",
    en: "Lemon",
    level: "group",
    parentOrigin: "citrus"
  },
  {
    origin: "lime",
    ja: "ライム",
    en: "Lime",
    level: "group",
    parentOrigin: "citrus"
  },
  {
    origin: "sourAromatics",
    ja: "酸っぱい香り",
    en: "Sour Aromatics",
    level: "group",
    parentOrigin: "sour"
  },
  {
    origin: "aceticAcid",
    ja: "酢",
    en: "Acetic Acid",
    level: "group",
    parentOrigin: "sour"
  },
  {
    origin: "butyricAcid",
    ja: "銀杏",
    en: "Butyric Acid",
    level: "group",
    parentOrigin: "sour"
  },
  {
    origin: "isoValericAcid",
    ja: "汗",
    en: "Iso-Valeric Acid",
    level: "group",
    parentOrigin: "sour"
  },
  {
    origin: "citricAcid",
    ja: "クエン酸",
    en: "Citric Acid",
    level: "group",
    parentOrigin: "sour"
  },
  {
    origin: "malicAcid",
    ja: "リンゴ酸",
    en: "Malic Acid",
    level: "group",
    parentOrigin: "sour"
  },
  {
    origin: "winey",
    ja: "ワイン",
    en: "Winey",
    level: "group",
    parentOrigin: "alcoholicFermented"
  },
  {
    origin: "whiskey",
    ja: "ウイスキー",
    en: "Whiskey",
    level: "group",
    parentOrigin: "alcoholicFermented"
  },
  {
    origin: "fermentedFruit",
    ja: "発酵した果物",
    en: "Fermented Fruit",
    level: "group",
    parentOrigin: "alcoholicFermented"
  },
  {
    origin: "overripe",
    ja: "熟れすぎ",
    en: "Overripe",
    level: "group",
    parentOrigin: "alcoholicFermented"
  },
  {
    origin: "underripe",
    ja: "未成熟な野菜",
    en: "Underripe",
    level: "group",
    parentOrigin: "vegetative"
  },
  {
    origin: "peapod",
    ja: "エンドウ豆",
    en: "Peapod",
    level: "group",
    parentOrigin: "vegetative"
  },
  {
    origin: "fresh",
    ja: "生鮮野菜",
    en: "Fresh",
    level: "group",
    parentOrigin: "vegetative"
  },
  {
    origin: "spinach",
    ja: "ほうれん草",
    en: "Spinach",
    level: "group",
    parentOrigin: "vegetative"
  },
  {
    origin: "plant",
    ja: "植物",
    en: "Plant",
    level: "group",
    parentOrigin: "vegetative"
  },
  {
    origin: "dry",
    ja: "干し草",
    en: "Dry",
    level: "group",
    parentOrigin: "vegetative"
  },
  {
    origin: "herb",
    ja: "ハーブ",
    en: "Herb",
    level: "group",
    parentOrigin: "vegetative"
  },
  {
    origin: "stale",
    ja: "カビ臭い",
    en: "Stale",
    level: "group",
    parentOrigin: "paperyMusty"
  },
  {
    origin: "cardboard",
    ja: "ダンボール",
    en: "Cardboard",
    level: "group",
    parentOrigin: "paperyMusty"
  },
  {
    origin: "papery",
    ja: "紙",
    en: "Papery",
    level: "group",
    parentOrigin: "paperyMusty"
  },
  {
    origin: "woody",
    ja: "木材",
    en: "Woody",
    level: "group",
    parentOrigin: "paperyMusty"
  },
  {
    origin: "mustyDusty",
    ja: "カビ/ホコリ",
    en: "Musty/Dusty",
    level: "group",
    parentOrigin: "paperyMusty"
  },
  {
    origin: "moldyEarthy",
    ja: "カビ/土",
    en: "Moldy/Earthy",
    level: "group",
    parentOrigin: "paperyMusty"
  },
  {
    origin: "animalic",
    ja: "動物",
    en: "Animalic",
    level: "group",
    parentOrigin: "paperyMusty"
  },
  {
    origin: "meatyBrothy",
    ja: "ブイヨン",
    en: "Meaty/Brothy",
    level: "group",
    parentOrigin: "paperyMusty"
  },
  {
    origin: "bitter",
    ja: "苦味",
    en: "Bitter",
    level: "group",
    parentOrigin: "chemical"
  },
  {
    origin: "salty",
    ja: "塩味",
    en: "Salty",
    level: "group",
    parentOrigin: "chemical"
  },
  {
    origin: "medicinal",
    ja: "薬",
    en: "Medicinal",
    level: "group",
    parentOrigin: "chemical"
  },
  {
    origin: "petroleum",
    ja: "石油",
    en: "Petroleum",
    level: "group",
    parentOrigin: "chemical"
  },
  {
    origin: "skunky",
    ja: "スカンク",
    en: "Skunky",
    level: "group",
    parentOrigin: "chemical"
  },
  {
    origin: "rubber",
    ja: "ゴム",
    en: "Rubber",
    level: "group",
    parentOrigin: "chemical"
  },
  {
    origin: "acrid",
    ja: "燃えたゴム臭",
    en: "Acrid",
    level: "group",
    parentOrigin: "burnt"
  },
  {
    origin: "ashy",
    ja: "灰",
    en: "Ashy",
    level: "group",
    parentOrigin: "burnt"
  },
  {
    origin: "smoky",
    ja: "煙",
    en: "Smoky",
    level: "group",
    parentOrigin: "burnt"
  },
  {
    origin: "brownRoast",
    ja: "焦げ豆",
    en: "Brown Roast",
    level: "group",
    parentOrigin: "burnt"
  },
  {
    origin: "grain",
    ja: "穀物",
    en: "Grain",
    level: "group",
    parentOrigin: "cereal"
  },
  {
    origin: "malt",
    ja: "麦芽",
    en: "Malt",
    level: "group",
    parentOrigin: "cereal"
  },
  {
    origin: "pepper",
    ja: "唐辛子",
    en: "Pepper",
    level: "group",
    parentOrigin: "spices"
  },
  {
    origin: "anise",
    ja: "アニス",
    en: "Anise",
    level: "group",
    parentOrigin: "brownSpice"
  },
  {
    origin: "nutmeg",
    ja: "ナツメグ",
    en: "Nutmeg",
    level: "group",
    parentOrigin: "brownSpice"
  },
  {
    origin: "cinnamon",
    ja: "シナモン",
    en: "Cinnamon",
    level: "group",
    parentOrigin: "brownSpice"
  },
  {
    origin: "clove",
    ja: "クローブ",
    en: "Clove",
    level: "group",
    parentOrigin: "brownSpice"
  },
  {
    origin: "peanut",
    ja: "ピーナッツ",
    en: "Peanut",
    level: "group",
    parentOrigin: "nutty"
  },
  {
    origin: "hazelnut",
    ja: "ヘーゼルナッツ",
    en: "Hazelnut",
    level: "group",
    parentOrigin: "nutty"
  },
  {
    origin: "almond",
    ja: "アーモンド",
    en: "Almond",
    level: "group",
    parentOrigin: "nutty"
  },
  {
    origin: "chocolaty",
    ja: "チョコレート",
    en: "Chocolaty",
    level: "group",
    parentOrigin: "cocoa"
  },
  {
    origin: "darkChocolate",
    ja: "ダークチョコレート",
    en: "Dark Chocolate",
    level: "group",
    parentOrigin: "cocoa"
  },
  {
    origin: "molasses",
    ja: "モラセス",
    en: "Molasses",
    level: "group",
    parentOrigin: "brownSugar"
  },
  {
    origin: "mapleSyrup",
    ja: "メープルシロップ",
    en: "Maple Syrup",
    level: "group",
    parentOrigin: "brownSugar"
  },
  {
    origin: "caramelized",
    ja: "カラメル",
    en: "Caramelized",
    level: "group",
    parentOrigin: "brownSugar"
  },
  {
    origin: "honey",
    ja: "ハチミツ",
    en: "Honey",
    level: "group",
    parentOrigin: "caramelized"
  },
]

const FLAVOR_LIST = [
  FLAVOR_CATEGORY_LIST,
  FLAVOR_SUB_CATEGORY_LIST,
  FLAVOR_GROUP_LIST
]

const FLAVOR_LEVEL_LIST = {
  category: 0,
  subCategory: 1,
  group: 2,
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const flavorsToInsert = []

    let count = 0
    const originToIdMap = {}
    for (const flavorList of FLAVOR_LIST) {
      for (const flavor of flavorList) {
        count++
        originToIdMap[flavor.origin] = count
        flavorsToInsert.push({
          id: count,
          level: flavor.level,
          origin: flavor.origin,
          ja: flavor.ja,
          en: flavor.en,
          parentId: flavor.parentOrigin ? originToIdMap[flavor.parentOrigin] : null,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    }

    await queryInterface.bulkInsert('flavors', flavorsToInsert).catch((e) => {
      console.error(e)
      throw e
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('flavors', null, {})
  }
};
