import { SparkSQL } from 'dt-sql-parser/dist/parser/spark';
import { BaseSQLService } from "./base-sql-service";
export declare class SparkSQLService extends BaseSQLService {
    $service: SparkSQL;
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
