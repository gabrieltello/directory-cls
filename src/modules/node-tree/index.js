import { Node } from "./node";

/**
 * JS NodeTree object with elemental methods
 */
export class NodeTree {
  root;

  constructor(root) {
    if (root) this.root = new Node(root);
  }

  /**
   * Add a new child to the specified parent (root is the default parent);
   *
   * @param {*} value
   * @param {Node} parent
   * @returns {Node} Created Node
   */
  add(value, parent) {
    var node = new Node(value);

    if (parent) {
      parent.children.push(node);
    } else if (!this.root) {
      this.root = node;
    } else {
      throw new Error("Root node is already assigned");
    }

    return node;
  }

  /**
   * Helper method for getting a Node's child
   *
   * @param {*} value
   * @param {Node} node
   * @returns {Node} Found child
   */
  getChild(value, node) {
    return node.children.find((children) => children.value === value);
  }

  /**
   * Helper method for add a Node's existing child
   *
   * @param {Node} child
   * @param {Node} node
   */
  addChild(child, node) {
    node.children.push(child);
  }

  /**
   * Helper method for removing a Node's child
   *
   * @param {Node} child
   * @param {Node} node
   */
  removeChild(child, node) {
    node.children.splice(node.children.indexOf(child), 1);
  }

  /**
   * Makes the tree preOrderSearch and executes the optional 
   * effect and callback to the current Node
   *
   * @param {Node} node
   * @param {Function} effect
   * @param {Function} callback
   */
  preOrderSearch(node, effect, callback) {
    if (!node) return;

    effect && effect(node);

    node.children
      .sort((a, b) => (a.value < b.value ? -1 : 1))
      .forEach((child) => {
        this.preOrderSearch(child, effect, callback);
      });

    callback && callback(node);
  }

  /**
   * Turns the preOrderSearch results into a readable string
   *
   * @returns {string} Tree string
   */
  stringify() {
    var result = [];
    var current = this.root;
    var buffer = 0;

    this.preOrderSearch(
      current,
      (node) => {
        if (node !== this.root) {
          result.push(`${" ".repeat(buffer)}${node.value}`);
          buffer += 2;
        }
      },
      () => {
        if (buffer) buffer -= 2;
      }
    );

    return result.join("\n");
  }
}
