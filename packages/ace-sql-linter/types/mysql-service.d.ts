import { MySQL } from 'dt-sql-parser/dist/parser/mysql';
import { BaseSQLService } from "./base-sql-service";
export declare class MySQLService extends BaseSQLService {
    $service: MySQL;
    serviceCapabilities: {
        completionProvider: {
            triggerCharacters: string[];
        };
        diagnosticProvider: {
            interFileDependencies: boolean;
            workspaceDiagnostics: boolean;
        };
    };
    constructor(mode: string);
}
