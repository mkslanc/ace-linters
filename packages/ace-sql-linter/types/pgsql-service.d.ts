import { PostgreSQL } from 'dt-sql-parser/dist/parser/postgresql';
import { BaseSQLService } from "./base-sql-service";
export declare class PgSQLService extends BaseSQLService {
    $service: PostgreSQL;
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
