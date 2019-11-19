export function processItem({ name, category, color, id, image, rarity, suggested_price, type, sku }) {
  var data = {
    category,
    color,
    id,
    image,
    rarity,
    price: suggested_price,
    type,
    sku
  };

  var regex = /(★ )?(StatTrak™ )?(.+) \| (.+) \((.+)\)/.exec(name);

  // seperate weapons from misc
  if (regex)
    regex[0] = name
      .replace(/\((.+)\)/.exec(name)[0], "")
      .replace("StatTrak™ ", "");
  else regex = [name];

  // get item name
  if (/\((.+)\)/.exec(regex[0]) !== null)
    data.name = regex[0].replace(/\((.+)\)/.exec(regex[0])[0], "");
  else data.name = regex[0];

  if (regex[4]) data.skin = regex[4];


  data.gun = data.name.substring(0, data.name.lastIndexOf(" |"));
  data.name = data.name.substring(0, data.name.indexOf(" |"));

  data.condition = regex[5];

  return data;
};