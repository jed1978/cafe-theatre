/**
 * 商品資料模組
 * 提供所有商品資料、FAQ、評價等資料
 */

export const products = [
  {
    id: 1,
    name: "倫敦西區",
    series: "城市系列",
    flavor: "檸檬、白花、佛手柑",
    roast: "淺焙",
    origin: "衣索比亞 耶加雪菲",
    price: 420,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80", // 咖啡豆特寫 - 淺焙
    description:
      "經典永不落幕，如同西區的音樂劇。明亮的檸檬酸質與細緻的白花香氣交織，尾韻帶有優雅的佛手柑清香，是一場感官的盛宴。",
  },
  {
    id: 2,
    name: "百老匯",
    series: "城市系列",
    flavor: "焦糖、堅果、黑巧克力",
    roast: "中焙",
    origin: "哥倫比亞 慧蘭",
    price: 360,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80", // 咖啡豆與杯子
    description:
      "華麗而均衡，百老匯的黃金年代。甜美的焦糖香氣，搭配堅果的醇厚口感，黑巧克力的尾韻為整場演出畫下完美句點。",
  },
  {
    id: 3,
    name: "巴黎左岸",
    series: "城市系列",
    flavor: "莓果、紅酒、煙燻",
    roast: "中深焙",
    origin: "瓜地馬拉 安提瓜",
    price: 380,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80", // 深色咖啡豆
    description:
      "文人的咖啡館，存在主義的餘韻。莓果的酸甜與紅酒般的醇厚交融，細緻的煙燻香氣彷彿左岸咖啡館的時光。",
  },
  {
    id: 4,
    name: "莎士比亞",
    series: "劇作家系列",
    flavor: "黑醋栗、葡萄柚、蜂蜜",
    roast: "中焙",
    origin: "肯亞 AA",
    price: 360,
    image: "https://images.unsplash.com/photo-1587734195503-904a22d6f7a5?w=800&q=80", // 咖啡豆與木勺
    description:
      "悲喜交織，層次豐富。如同莎翁筆下的劇作，黑醋栗的濃郁、葡萄柚的明亮、蜂蜜的甜美，每一口都是一段故事。",
  },
  {
    id: 5,
    name: "契訶夫",
    series: "劇作家系列",
    flavor: "榛果、奶油、可可",
    roast: "中深焙",
    origin: "巴西 喜拉朵",
    price: 380,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80", // 咖啡與咖啡豆
    description:
      "日常的詩意，溫柔而深刻。榛果的溫潤、奶油的柔滑、可可的綿密，像契訶夫筆下那些細膩的生活切片。",
  },
  {
    id: 6,
    name: "貝克特",
    series: "劇作家系列",
    flavor: "雪松、香料、黑糖",
    roast: "深焙",
    origin: "印尼 曼特寧",
    price: 380,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", // 深焙咖啡豆特寫
    description:
      "等待的藝術，濃郁而內斂。雪松的沉穩、香料的複雜、黑糖的甜蜜，如同貝克特的荒謬劇場，餘韻悠長。",
  },
];

/**
 * FAQ 資料
 */
export const faqs = [
  {
    id: 1,
    question: "如何付款？",
    answer:
      "我們採用 7-11 超商取貨付款方式。您只需在訂購表單填寫資料，商品送達指定門市後，取貨時再付款即可，安全又方便。",
  },
  {
    id: 2,
    question: "運費怎麼算？",
    answer: "全台灣 7-11 門市取貨，單筆訂單運費統一為 NT$ 60。滿 NT$ 1000 免運費。",
  },
  {
    id: 3,
    question: "多久會到貨？",
    answer:
      "一般工作天（週一至週五）下午 2 點前的訂單，約 3-5 個工作天送達指定門市。假日訂單將於下個工作日開始處理。",
  },
  {
    id: 4,
    question: "可以退換貨嗎？",
    answer:
      "商品寄出後，如因個人因素（口味不符、訂錯商品等）恕不接受退換貨。若收到瑕疵品，請於收貨 7 日內聯繫客服，我們將協助處理。",
  },
  {
    id: 5,
    question: "咖啡豆保存方式？",
    answer:
      "建議將咖啡豆存放在陰涼乾燥處，避免陽光直射與高溫潮濕環境。開封後請密封保存，並於一個月內飲用完畢，以確保最佳風味。",
  },
  {
    id: 6,
    question: "如何聯繫客服？",
    answer:
      "您可以透過以下方式聯繫我們：Email: hello@cafe-theatre.com / LINE官方帳號: @cafetheatre / 客服專線: 02-1234-5678（週一至週五 10:00-18:00）",
  },
];

/**
 * 顧客評價資料
 */
export const testimonials = [
  {
    id: 1,
    text: "倫敦西區真的太驚艷了！明亮的花香和柑橘調完全是我的菜，每天早晨都像在看一場精彩的演出。",
    author: "Sarah L.",
    rating: 5,
  },
  {
    id: 2,
    text: "貝克特的深焙層次感很豐富，喝起來沉穩內斂，很適合靜下來慢慢品味，配合閱讀時光超棒。",
    author: "Mark W.",
    rating: 5,
  },
  {
    id: 3,
    text: "包裝設計超有質感，送禮自用兩相宜。咖啡本身品質也很好，風味描述很精準，值得信賴。",
    author: "Jennifer C.",
    rating: 5,
  },
  {
    id: 4,
    text: "莎士比亞系列真的很特別，黑醋栗跟蜂蜜的組合太迷人了，喝完會想再回購！",
    author: "David T.",
    rating: 5,
  },
  {
    id: 5,
    text: "第一次在網路上買咖啡豆，咖啡小劇場的品質讓我很放心，客服回覆也很迅速，推薦！",
    author: "Emily K.",
    rating: 4,
  },
  {
    id: 6,
    text: "巴黎左岸的煙燻味很獨特，喝起來真的有種在文青咖啡館的感覺，氛圍感滿分。",
    author: "Alex M.",
    rating: 5,
  },
];

/**
 * 根據 ID 取得單一商品
 * @param {number} id - 商品 ID
 * @returns {object|null} 商品物件或 null
 */
export function getProductById(id) {
  return products.find((product) => product.id === id) || null;
}

/**
 * 根據系列名稱篩選商品
 * @param {string} series - 系列名稱
 * @returns {array} 商品陣列
 */
export function getProductsBySeries(series) {
  return products.filter((product) => product.series === series);
}
