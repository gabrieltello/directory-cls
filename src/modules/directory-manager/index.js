import { NodeTree } from "../node-tree";

/**
 * Class responsible of create and the NodeTree instance
 */
export class DirectoryManager {
  directoryTree;

  constructor() {
    this.directoryTree = new NodeTree("root");
  }

  /**
   * Creates a new directory or appends o a existing one
   *
   * @param {string} newDirectory
   */
  create(newDirectory) {
    if (!newDirectory || !newDirectory.length) {
      throw new Error("Invalid arguments.");
    }

    const path = newDirectory.split("/");
    var currentDirectory = this.directoryTree.root;

    path.forEach((directory) => {
      currentDirectory =
        this.directoryTree.getChild(directory, currentDirectory) ||
        this.directoryTree.add(directory, currentDirectory);
    });
  }

  /**
   * Prints the directory tree
   *
   * @returns {string} Directory tree
   */
  list() {
    return this.directoryTree.stringify();
  }

  /**
   * Removes a existing directory path
   *
   * @param {string} directoryPath
   */
  delete(directoryPath) {
    if (!directoryPath || !directoryPath.length) {
      throw new Error("Invalid arguments.");
    }

    const path = directoryPath.split("/");
    var currentDirectory = this.directoryTree.root;
    var parent;

    for (let i = 0; i < path.length; i++) {
      parent = currentDirectory;
      currentDirectory = this.directoryTree.getChild(path[i], currentDirectory);

      if (!currentDirectory) {
        throw new Error(
          `Cannot delete '${directoryPath}' - '${path[i]}' does not exist`
        );
      }

      if (i == path.length - 1) {
        this.directoryTree.removeChild(currentDirectory, parent);
      }
    }
  }

  /**
   * Changes the parent directory path of a given directory
   *
   * @param {string} originPath
   * @param {string} destinationPath
   */
  move(originPath, destinationPath) {
    if (
      !originPath ||
      !originPath.length ||
      !destinationPath ||
      !destinationPath.length
    ) {
      throw new Error("Invalid arguments.");
    }

    const origin = originPath.split("/");
    const destination = destinationPath.split("/");
    const child = this.getDirectory(origin);
    const newParent = this.getDirectory(destination);
    var parent;

    if (!child) throw new Error(`Cannot move '${originPath}' does not exist`);
    if (!newParent)
      throw new Error(`Cannot move '${destinationPath}' does not exist`);

    parent = this.getDirectory(origin.slice(0, origin.length - 1));
    this.directoryTree.removeChild(child, parent);
    this.directoryTree.addChild(child, newParent);
  }

  /**
   * Helper method for getting the directory of a specific path
   *
   * @param {string} path
   * @returns {Node} Directory
   */
  getDirectory(path) {
    var currentDirectory = this.directoryTree.root;

    path.every((directory) => {
      currentDirectory = this.directoryTree.getChild(
        directory,
        currentDirectory
      );

      if (!currentDirectory) {
        currentDirectory = null;
        return false;
      }

      return true;
    });

    return currentDirectory;
  }
}
