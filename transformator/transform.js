const transformBubblingAtrule = require('./transformBubblingAtrule');
const transformTRoot = require('./transformTRoot');
const transformTBase = require('./transformTBase');
const transformTAbove = require('./transformTAbove');
// const transformTBelow = require('./transformTBelow');
// const transformTBetween = require('./transformTBetween');

/*  !!!!!!!!!!!!!
Todo transformTAbove не вызывается потому,
что функция   transformMsUnit не пропускает нужные ей узлы.
Создать новую ветку и попробовать изменить условия для вызыва transformMsUnit

Данный попытка предположительно должна рендерить медиазапросы

и избежать лишних алгоритмов пересчёта */

/*  !!!!!!!!!!!!! 
Попробовать вынести логигу расчёта медиазапросов в api */

/*  !!!!!!!!!!!!! 
Создать функции для расчёта заданных breakpoints */

module.exports = (node, config) => {
  if (transformTRoot.test(node)) {
    transformTRoot(node, config);
  }

  if (transformTBase.test(node)) {
    transformTBase(node, config);
  }

  // if (transformMsUnit.test(node, config)) {
  //   transformMsUnit(node, config);
  // }

  if (transformBubblingAtrule.test(node)) {
    transformBubblingAtrule(node);
  }

  if (transformTAbove.test(node)) {
    transformTAbove(node, config);
  }

  // if (transformTBelow.test(node)) {
  //   transformTBelow(node, config);
  // }

  // if (transformTBetween.test(node)) {
  //   transformTBetween(node, config);
  // }
};
