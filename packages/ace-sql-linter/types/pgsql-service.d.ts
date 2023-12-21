import PgSQL from 'dt-sql-parser/dist/parser/pgsql';
import { BaseSQLService } from "./base-sql-service";
export declare class PgSQLService extends BaseSQLService {
    $service: PgSQL;
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
