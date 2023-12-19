# Ace SQL Linter

Ace SQL Linter is a powerful extension for the Ace Linters suite, designed to provide comprehensive Language Server Protocol (LSP) support for various SQL dialects, including MySQL, PostgreSQL, and more. This extension integrates seamlessly with Ace Linters, enhancing your Ace editor with robust SQL linting capabilities.

## Key Features

- **Support for Multiple SQL Dialects**: Comprehensive linting for popular SQL dialects.
- **Seamless Integration with Ace Linters**: Works in conjunction with the Ace Linters suite.
- **Easy Setup**: Quick and straightforward integration into your existing Ace editor setup.
- **Robust SQL Language Features**: Includes features like syntax highlighting, error detection.

## Installation

To install Ace SQL Linter, run the following command:

```bash
npm install ace-linters
npm install ace-sql-linter
```

## Usage 
1. Register neccessary service(s) on webworker's side: 
    ```javascript
    import {ServiceManager} from "ace-linters/build/service-manager";
    
    manager.registerService("mysql", {
        module: () => import("ace-sql-linter/build/mysql-service"),
        className: "MySQLService",
        modes: "mysql",
    });
    ```

2. Use in conjuction with `ace-linters` main package [similar to predefined services example](https://github.com/mkslanc/ace-linters?tab=readme-ov-file#example-client-with-pre-defined-services) 

## Supported SQL Languages
- MySQL *powered by* [dt-sql-parser](https://github.com/DTStack/dt-sql-parser)
- FlinkSQL *powered by* [dt-sql-parser](https://github.com/DTStack/dt-sql-parser)
- SparkSQL *powered by* [dt-sql-parser](https://github.com/DTStack/dt-sql-parser)
- HiveSQL *powered by* [dt-sql-parser](https://github.com/DTStack/dt-sql-parser)
- TrinoSQL (PrestoSQL) *powered by* [dt-sql-parser](https://github.com/DTStack/dt-sql-parser)
- PostgreSQL *powered by* [dt-sql-parser](https://github.com/DTStack/dt-sql-parser)
- Impala SQL *powered by* [dt-sql-parser](https://github.com/DTStack/dt-sql-parser)
- PL/SQL *powered by* [dt-sql-parser](https://github.com/DTStack/dt-sql-parser)

## License

Ace linters is released under the [MIT License](https://opensource.org/licenses/MIT).

