
# Change Log
All notable changes to this code challenge.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/).
 
## [Demo] - 2021-12-23
 
Directory command line script improvements.
 
### Added
- LIST command output alphabetically sorted.
- Jest Unit test implemented for all modules.
- ESLint implemented and code linted.
- Prettier implemented
 
### Changed
- Command prefix removed
- Spacer changed to 2 spaces
- Folder structure improvements, kebab-case name convention used for directories and files (Inspired by NestJS).
- Error handling updated to error log level

### Fixed
- JS Docs params updated according to the method signature
- JS Docs typos fixed

## Notes
Most of cases it is needed to use variables which changes through the function, that's why I used var for those variables.

In some cases it is only needed to keep the variable for the current block (maybe a foreach accumulator or a small block validation), in that cases I decided use let (because of its scope)

There are some cases where is needed to use a value constant and access it through the function, in that cases I decided to use const

Finally there are some cases where it is needed to use a value which changes between functions during the execution, thats why in that cases I decided to use class attributes for that, i.e the state of the current directory or the root node of a NodeTree, class attributes doesn't use keywords as const or var, they are only scoped to the object instance and accessible via [instance].[attribute] (If needed it can be improved by using TypeScript, since this allows to define the access to the properties, like public, private or protected). 