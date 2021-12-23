import { NodeTree } from ".";
import { Node } from "./node";

describe("Node Tree", () => {
  var nodeTree;

  beforeEach(() => {
    nodeTree = new NodeTree("root");
  });

  describe("add", () => {
    it("Should property add a new Node", () => {
      var newNode = nodeTree.add("A", nodeTree.root);
      expect(nodeTree.root.children.includes(newNode)).toBe(true);
    });

    it("Should throw error when no parent provided", () => {
      var error;
      try {
        nodeTree.add("A");
      } catch (e) {
        error = e;
      }
      expect(error.message).toBe("Root node is already assigned");
    });
  });

  describe("getChild", () => {
    it("Should return the found child", () => {
      var newNode = nodeTree.add("A", nodeTree.root);
      expect(nodeTree.getChild("A", nodeTree.root)).toBe(newNode);
    });

    it("Should return undefined when no child found", () => {
      expect(nodeTree.getChild("A", nodeTree.root)).toBeUndefined();
    });
  });

  describe("addChild", () => {
    it("Should append a child to a existing node", () => {
      var node = nodeTree.add("A", nodeTree.root);
      var child = new Node("A1");

      nodeTree.addChild(child, node);
      expect(nodeTree.getChild("A1", node)).toBe(child);
    });
  });

  describe("removeChild", () => {
    it("Should remove a child to a existing node", () => {
      var child = nodeTree.add("A", nodeTree.root);

      nodeTree.removeChild(child, nodeTree.root);
      expect(nodeTree.root.children.length).toBe(0);
    });
  });

  describe("Stringify", () => {
    it("Should return a string version of the tree", () => {
      var node = nodeTree.add("A", nodeTree.root);
      nodeTree.add("A1", node);

      expect(nodeTree.stringify()).toBe("A\n  A1");
    });
  });
});
