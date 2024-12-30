import { FlinkSQL } from 'dt-sql-parser/dist/parser/flink';
import { BaseSQLService } from "./base-sql-service";
export declare class FlinkSQLService extends BaseSQLService {
    $service: FlinkSQL;
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
