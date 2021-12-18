import { NodeTree } from "../node-tree";

/**
 * Class responsible of create and the NodeTree instance
 */
export class DirectoryManager {
    directoryTree;

    constructor(){
        this.directoryTree = new NodeTree('root');
    }

    /**
     * Creates a new directory or appends o a existing one
     * 
     * @param {string} newDirectory
     */
    create(newDirectory){
        if(!newDirectory || !newDirectory.length){
            console.log("> Error: Invalid arguments.");
            return;
        }
        
        let path = newDirectory.split("/");
        let currentDirectory = this.directoryTree.root;
        
        path.forEach(directory => {
            currentDirectory = 
                this.directoryTree.getChild(directory, currentDirectory) || 
                this.directoryTree.add(directory, currentDirectory);
        });
    }

    /**
     * Prints the directory tree
     */
     list(){
        console.log(this.directoryTree.stringify());
    }

    delete(directoryPath){
        if(!directoryPath || !directoryPath.length){
            console.log("> Error: Invalid arguments.");
            return;
        }
        
        let path = directoryPath.split("/");
        let currentDirectory = this.directoryTree.root;
        let parent;
        
        for(let i=0; i<path.length; i++){
            parent = currentDirectory;
            currentDirectory = this.directoryTree.getChild(path[i], currentDirectory);
            
            if(!currentDirectory){
                console.log(`> Cannot delete '${directoryPath}' - '${path[i]}' does not exist`);
                return;
            }

            if(i == path.length-1){
                this.directoryTree.removeChild(currentDirectory, parent);
            }
        }
    }

    move(originPath, destinationPath){
        if(!originPath || !originPath.length || !destinationPath || !destinationPath.length ){
            console.log("> Error: Invalid arguments.");
            return;
        }
        
        let origin = originPath.split("/");
        let destination = destinationPath.split("/");
        let child = this.getDirectory(origin);
        let newParent = this.getDirectory(destination);

        if(child && newParent){
            let parent = this.getDirectory(origin.slice(0, origin.length-1));
            this.directoryTree.removeChild(child, parent);
            this.directoryTree.addChild(child, newParent);   
        }
    }

    /**
     * Helper method for geting the directory of a specific path
     * 
     * @param {string} path 
     * @returns 
     */
    getDirectory(path){
        let currentDirectory = this.directoryTree.root;

        path.every(directory => {
            currentDirectory = this.directoryTree.getChild(directory, currentDirectory);

            if(!currentDirectory){
                console.log(`> Cannot delete '${path.join("/")}' - '${directory}' does not exist`);
                currentDirectory = null;
                return false;
            }

            return true;
        });

        return currentDirectory;
    }
}