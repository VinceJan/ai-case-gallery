// 物品名称表
export const ITEM_NAMES = {
  ticket: '往返车票',
  letter: '奶奶的信',
  package: '给田中家的包裹',
  hat: '小雪的帽子',
  omamori: '神社护身符',
  coffee_beans: '咖啡豆',
  catFound: '（找到了猫）',
  onigiri: '饭团',
  bread: '牛奶面包',
  milk: '牛奶',
  candy: '樱花糖',
  tissue: '纸巾',
  battery: '电池',
  icecream: '抹茶冰淇淋',
  petbottle: '瓶装茶',
  item_tea: '冰镇麦茶',
};

export function itemName(id) {
  return ITEM_NAMES[id] || id;
}
