/** 向上找到最近的指定组件————findCompoenntUpward
 *
 *
 * 在 while 语句里不断向上覆盖当前的 parent 对象，
 * 通过判断组件（即 parent）的 name 与传入的 componentName 是否一致，
 * 直到直到最近的一个组件为止。
 *
 *
 * @param context  当前上下文，比如你要基于哪个组件来向上寻找
 * @param componentName  要找的组件的 name
 * @returns {Vue}
 */
function findComponentUpward(context, componentName) {
  let parent = content.$parent;
  let name = parent.$options.name;

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}

/**
 * 上传找到所有的指定组件————findComponentsUpward
 * */

function findComponentsUpward(context, componentName) {
  let parents = [];
  const parent = context.$parent;
  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);
    return parents.concat(findComponentUpward(parent, componentName));
  } else {
    return [];
  }
}

/**
 * 向下找到最近的指定组件
 * context.$children 得到的是当前组件的全部子组件，
 * 所以需要遍历一遍，找到有没有匹配到的组件 name，如果没找到，
 * 继续递归找每个 $children 的 $children，直到找到最近的一个为止。
 * */
function findComponentDownward(context, componentName) {
  const childrens = context.$children;
  let children = null;
  if (childrens.length) {
    for (let child of childrens) {
      const name = child.$options.name;
      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) break;
      }
    }
  }
  return children;
}

/**
 * 这里巧妙使用 reduce 做累加器，并用递归将找到的组件合并为一个数组并返回
 * */
function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}

// 由一个组件，找到指定组件的兄弟组件
function findBrothersComponents(context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName;
  });
  let index = res.findIndex(item => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}

export {
  findComponentUpward,
  findComponentsUpward,
  findComponentsDownward,
  findComponentDownward,
  findBrothersComponents
};
