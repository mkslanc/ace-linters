import PlSQL from 'dt-sql-parser/dist/parser/plsql';
import { BaseSQLService } from "./base-sql-service";
export declare class PlSQLService extends BaseSQLService {
    $service: PlSQL;
    serviceCapabilities: {
        diagnosticProvider: {
            interFileDependencies: boolean;
            workspaceDiagnostics: boolean;
        };
    };
    constructor(mode: string);
}
