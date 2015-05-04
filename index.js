/**
 * Index based collection manipulation methods for DOM childNodes.
 */

var collection = Object.create(null);

/**
 * Inserts an DOM element at a specific index.
 *
 * @param  Object element The DOM element insert.
 * @param  Number index   The insertion index.
 * @param  Object parent  The parent container.
 * @return Object         The inserted DOM element.
 */
collection.insertAt = function(element, index, parent) {
  var childNodes = parent.childNodes;
  var target = index >= childNodes.length ? null : childNodes[index];
  parent.insertBefore(element, target);
  return element;
}

/**
 * Moves a DOM element to a specific index.
 *
 * @param  Object element The DOM element to move.
 * @param  Number index   The target index.
 * @param  Object parent  The parent container.
 * @return Object         The moved DOM element.
 */
collection.moveAt = function(element, index, parent) {
  parent ? parent : element.parentNode;
  parent.removeChild(element);
  collection.insertAt(element, index, parent);
  return element;
}

/**
 * Replaces a DOM element at a specific index.
 *
 * @param  Object element The DOM element to replace by.
 * @param  Number index   The index of the element to replace.
 * @param  Object parent  The parent container.
 * @return Object         The replaced DOM element.
 */
collection.replaceAt = function(element, index, parent) {
  parent ? parent : element.parentNode;
  var target = parent.childNodes[index];
  parent.replaceChild(element, target);
  return element;
}

/**
 * Removes a DOM element at a specific index.
 *
 * @param  Number index  The index of the element to remove.
 * @param  Object parent The parent container.
 */
collection.removeAt = function(index, parent) {
  var element = parent.childNodes[index];
  return element ? parent.removeChild(element) : undefined;
}

/**
 * Extends an object with this module functions.
 *
 * @param Object object The object to extend.
 */
collection.extend = function(object) {
  for (key in collection) {
    object[key] = collection[key];
  }
}

module.exports = collection;
