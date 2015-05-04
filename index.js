/**
 * Index based collection manipulation methods for DOM childNodes.
 */

var collection = Object.create(null);

/**
 * Inserts an DOM element at a specific index.
 *
 * @param  Object element   The DOM element insert.
 * @param  Number index     The index insertion value.
 * @param  Object parent    The parent container.
 * @return Object           The inserted DOM element.
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
 * @param  Object element   The DOM element to move.
 * @param  Number index     The index insertion value.
 * @param  Object parent    The parent container.
 * @return Object           The moved DOM element.
 */
collection.moveAt = function(element, index, parent) {
  parent = selectParent(element, parent);
  parent.removeChild(element);
  collection.insertAt(element, index, parent);
  return element;
}

/**
 * Replaces a node by another node.
 *
 * @param Object newNode The new node.
 * @param Object oldNode The node to be replaced.
 */
collection.replaceAt = function(element, index, parent) {
  parent = selectParent(element, parent);
  var target = parent.childNodes[index];
  parent.replaceChild(element, target);
}


/**
 * Removes all childs inside a DOM element (faster than using innerHTML).
 *
 * @param Object element A DOM element to clean up.
 */
collection.removeAt = function(index, parent) {
  var element = parent.childNodes[index];
  if (element) {
    return parent.removeChild(element);
  }
}

function selectParent(element, parent) {
  if (parent) {
    return parent;
  }
  return element.parentNode;
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
