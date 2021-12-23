import * as readline from "readline";
import { stdin, stdout as output } from "process";
import {
  directoryManagerCommand,
  ExecutionStatus,
} from "./interfaces/execution.interface";
import { DirectoryManager } from "./modules/directory-manager";
import demoCommands from "./mock/demo.json";

/**
 * Main class responsible for providing the command line interface
 */
export class App {
  reader;
  directoryManager;

  constructor() {
    this.directoryManager = new DirectoryManager();
    this.reader = readline.createInterface({ input: stdin, output });
  }

  /**
   * Validates de command and invokes the corresponding method
   *
   * @param {string} input
   * @returns {string} ExecutionStatus
   */
  execute(input) {
    const args = input.split(" ");
    const command = args[0].toLowerCase();

    if (command.toLowerCase() == "exit") {
      this.reader.close();
      return ExecutionStatus.EXIT;
    }

    try {
      switch (command) {
        case directoryManagerCommand.CREATE:
          this.directoryManager.create(args[1]);
          break;
        case directoryManagerCommand.DELETE:
          this.directoryManager.delete(args[1]);
          break;
        case directoryManagerCommand.LIST:
          console.log(this.directoryManager.list());
          break;
        case directoryManagerCommand.MOVE:
          this.directoryManager.move(args[1], args[2]);
          break;
        default:
          throw new Error(
            `'${command}' is not recognized as a executable command.`
          );
      }
    } catch (error) {
      console.error(error.message);
      return ExecutionStatus.ERROR;
    }

    return ExecutionStatus.OK;
  }

  /**
   * Performs a demo with pre load commands
   */
  demo() {
    demoCommands.forEach((input) => {
      console.log(input);
      this.execute(input);
    });
  }

  /**
   * Preserves the interface awaiting for commands
   */
  listen() {
    return new Promise((resolve) => {
      this.reader.question("", (input) => {
        resolve(this.execute(input) === ExecutionStatus.EXIT);
      });
    }).then((endExecution) => !endExecution && this.listen());
  }
}
