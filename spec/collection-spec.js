var jsdom = require('jsdom');
var dom = require('..');

global.document = jsdom.jsdom();
global.window = global.document.parentWindow;

function t(text) {
  return document.createTextNode(text);
}

describe("collection", function() {

  var container, element;

  describe(".insertAt()", function() {

    beforeEach(function() {

      container = document.createElement("span");

      ["a", "b", "c", "d", "e", "f"].forEach(function(text) {
        container.appendChild(t(text));
      });

    });

    it("returns the inserted element", function() {

      var element = t("_");
      expect(dom.insertAt(element, 0, container)).toBe(element);

    });

    it("inserts an element in first position", function() {

      dom.insertAt(t("_"), 0, container);
      expect(container.textContent).toBe("_abcdef");

    });

    it("inserts an element in second position", function() {

      dom.insertAt(t("_"), 1, container);
      expect(container.textContent).toBe("a_bcdef");

    });

    it("inserts an element", function() {

      dom.insertAt(t("_"), 2, container);
      expect(container.textContent).toBe("ab_cdef");

    });

    it("inserts an element in middle position", function() {

      dom.insertAt(t("_"), 3, container);
      expect(container.textContent).toBe("abc_def");

    });

    it("inserts an element in last position", function() {

      dom.insertAt(t("_"), 6, container);
      expect(container.textContent).toBe("abcdef_");

    });

    it("inserts an element in last position if index > childNodes.length", function() {

      dom.insertAt(t("_"), 7, container);
      expect(container.textContent).toBe("abcdef_");

    });

  });

  describe(".moveAt()", function() {

    beforeEach(function() {

      container = document.createElement("span");
      element = t("_");

      ["a", "b", "c", "d", "e", "f"].forEach(function(text) {
        container.appendChild(t(text));
      });

      dom.insertAt(element, 2, container);

    });

    it("returns the moved element", function() {

      expect(dom.moveAt(element, 0, container)).toBe(element);

    });

    it("moves an element in first position", function() {

      dom.moveAt(element, 0, container);
      expect(container.textContent).toBe("_abcdef");

    });

    it("moves an element in second position", function() {

      dom.moveAt(element, 1, container);
      expect(container.textContent).toBe("a_bcdef");

    });

    it("supports moving on itself", function() {

      dom.moveAt(element, 2, container);
      expect(container.textContent).toBe("ab_cdef");

    });

    it("moves an element in middle position", function() {

      dom.moveAt(element, 3, container);
      expect(container.textContent).toBe("abc_def");

    });

    it("moves an element in last position", function() {

      dom.moveAt(element, 6, container);
      expect(container.textContent).toBe("abcdef_");

    });

    it("moves an element in last position if index > childNodes.length", function() {

      dom.moveAt(element, 7, container);
      expect(container.textContent).toBe("abcdef_");

    });

  });

  describe(".replaceAt()", function() {

    beforeEach(function() {

      container = document.createElement("span");
      element = t("_");

      ["a", "b", "c", "d", "e", "f"].forEach(function(text) {
        container.appendChild(t(text));
      });

    });

    it("returns the replaced element", function() {

      expect(dom.replaceAt(element, 0, container)).toBe(element);

    });

    it("replaces an element in first position", function() {

      dom.replaceAt(element, 0, container);
      expect(container.textContent).toBe("_bcdef");

    });

    it("replaces an element in second position", function() {

      dom.replaceAt(element, 1, container);
      expect(container.textContent).toBe("a_cdef");

    });

    it("replaces an element in middle position", function() {

      dom.replaceAt(element, 3, container);
      expect(container.textContent).toBe("abc_ef");

    });

    it("replaces an element in last position", function() {

      dom.replaceAt(element, 5, container);
      expect(container.textContent).toBe("abcde_");

    });

  });

  describe(".removeAt()", function() {

    beforeEach(function() {

      container = document.createElement("span");

      ["a", "b", "c", "d", "e", "f"].forEach(function(text) {
        container.appendChild(t(text));
      });

    });

    it("removes an element in first position", function() {

      dom.removeAt(0, container);
      expect(container.textContent).toBe("bcdef");

    });

    it("returns the removed element", function() {

      var a = container.childNodes[0];
      expect(dom.removeAt(0, container)).toBe(a);

    });

    it("returns `undefined` if no element has been removed", function() {

      expect(dom.removeAt(100, container)).toBe(undefined);

    });

    it("removes an element in second position", function() {

      dom.removeAt(1, container);
      expect(container.textContent).toBe("acdef");

    });

    it("removes an element in middle position", function() {

      dom.removeAt(3, container);
      expect(container.textContent).toBe("abcef");

    });

    it("removes an element in last position", function() {

      dom.removeAt(5, container);
      expect(container.textContent).toBe("abcde");

    });

  });

});
