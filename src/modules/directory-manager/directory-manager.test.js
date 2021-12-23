import { DirectoryManager } from ".";

describe("Directory Manager", () => {
  var directoryManager;

  beforeEach(() => {
    directoryManager = new DirectoryManager();
  });

  describe("create", () => {
    it("Should property create a directory", () => {
      var error;

      try {
        directoryManager.create("vegetables");
        directoryManager.create("grains/squash");
      } catch (e) {
        error = e;
      }

      expect(error).toBeUndefined();
    });

    it("Should trow error when invalid arguments", () => {
      var error;

      try {
        directoryManager.create("");
      } catch (e) {
        error = e;
      }

      expect(error.message).toBe("Invalid arguments.");
    });
  });

  describe("delete", () => {
    it("Should property delete a directory", () => {
      var error;

      try {
        directoryManager.create("grains/squash");
        directoryManager.delete("grains/squash");
      } catch (e) {
        error = e;
      }

      expect(error).toBeUndefined();
    });

    it("Should trow error when invalid arguments", () => {
      var error;

      try {
        directoryManager.delete("");
      } catch (e) {
        error = e;
      }

      expect(error.message).toBe("Invalid arguments.");
    });

    it("Should trow error when moving directory does not exist", () => {
      var error;

      try {
        directoryManager.delete("grains/squash");
      } catch (e) {
        error = e;
      }

      expect(error.message).toBe(
        "Cannot delete 'grains/squash' - 'grains' does not exist"
      );
    });
  });

  describe("move", () => {
    it("Should property move a directory", () => {
      var error;

      try {
        directoryManager.create("vegetables");
        directoryManager.create("grains/squash");
        directoryManager.move("grains/squash", "vegetables");
      } catch (e) {
        error = e;
      }

      expect(error).toBeUndefined();
    });

    it("Should trow error when invalid arguments", () => {
      var error;

      try {
        directoryManager.move("");
      } catch (e) {
        error = e;
      }

      expect(error.message).toBe("Invalid arguments.");
    });

    it("Should trow error when moving directory does not exist", () => {
      var error;

      try {
        directoryManager.create("vegetables");
        directoryManager.move("grains/squash", "vegetables");
      } catch (e) {
        error = e;
      }

      expect(error.message).toBe("Cannot move 'grains/squash' does not exist");
    });
  });

  describe("list", () => {
    it("Should return a correct list of created directories", () => {
      directoryManager.create("fruits/apples/fuji");
      expect(directoryManager.list()).toEqual("fruits\n  apples\n    fuji");
    });
  });
});
