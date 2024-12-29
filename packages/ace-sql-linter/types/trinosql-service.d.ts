import { TrinoSQL } from 'dt-sql-parser/dist/parser/trino';
import { BaseSQLService } from "./base-sql-service";
export declare class TrinoSQLService extends BaseSQLService {
    $service: TrinoSQL;
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
