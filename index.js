const postcss = require('postcss');
const parser = require('postcss-selector-parser');
const cleanNode = require('./cssTransformator/utils/cleanNode');
// const transformAtrules = require('./cssTransformator/transformAtrules');
// const transformMsUnit = require('./cssTransformator/transformMsUnit');
const ratios = require('./constants/ratios');

const parse = str => {
  let nodes;
  const saver = parser(parsed => {
    nodes = parsed;
  });
  saver.processSync(str);
  return nodes.at(0);
};

const replace = (nodes, parent) => {
  let replaced = false;
  nodes.each(item => {
    if (item.type === 'nesting') {
      item.replaceWith(parent.clone());
      replaced = true;
    } else if (item.nodes) {
      if (replace(item, parent)) {
        replaced = true;
      }
    }
  });
  return replaced;
};

const selectors = (parent, child) => {
  const result = [];
  parent.selectors.forEach(parentSelector => {
    const parentNode = parse(parentSelector);

    child.selectors.forEach(childSelector => {
      const node = parse(childSelector);
      const replaced = replace(node, parentNode);
      if (!replaced) {
        node.prepend(parser.combinator({ value: ' ' }));
        node.prepend(parentNode.clone());
      }
      result.push(node.toString());
    });
  });
  return result;
};

const pickComment = (comment, after) => {
  if (comment && comment.type === 'comment') {
    after.after(comment);
    return comment;
  }
  return after;
};

const atruleChilds = (rule, atrule) => {
  const children = [];
  atrule.each(ch => {
    const child = ch;
    if (child.type === 'comment') {
      children.push(child);
    }
    if (child.type === 'decl') {
      children.push(child);
    } else if (child.type === 'rule') {
      child.selectors = selectors(rule, child);
    } else if (child.type === 'atrule') {
      atruleChilds(rule, child);
    }
  });
  if (atrule.name === 'font-face') return;

  if (children.length) {
    const clone = rule.clone({ nodes: [] });
    for (let i = 0; i < children.length; i += 1) {
      clone.append(children[i]);
    }
    atrule.prepend(clone);
  }
};

const processRule = r => {
  const rule = r;
  const namesOfAtrule = [
    'media',
    'supports',
    'document',
    'font-face',
    't-above',
    't-below',
    't-only',
    't-between',
  ];
  let unwrapped = false;
  cleanNode(rule);
  rule.each(ch => {
    const child = ch;
    let after = rule;
    cleanNode(child);
    cleanNode(after);
    if (child.type === 'rule') {
      unwrapped = true;
      child.selectors = selectors(rule, child);
      after = pickComment(child.prev(), after);
      after.after(child);
      after = child;
    } else if (child.type === 'atrule') {
      if (namesOfAtrule.indexOf(child.name) !== -1) {
        unwrapped = true;
        atruleChilds(rule, child);
        after = pickComment(child.prev(), after);
        after.after(child);
        after = child;
      }
    }
  });
  if (unwrapped) {
    rule.raws.semicolon = true;
    if (rule.nodes.length === 0) rule.remove();
  }
};

const typographist = postcss.plugin('typographist', config => {
  const process = node => {
    node.each(child => {
      if (child.type === 'rule') {
        processRule(child);
      } else if (child.type === 'atrule') {
        process(child);
      }
    });
  };
  return process;
});

module.exports = {
  typographist,
  ratios,
};
