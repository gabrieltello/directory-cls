/**
 * Node data structure class
 */
export class Node {
  value;
  children;

  constructor(value) {
    this.value = value;
    this.children = [];
  }
}
