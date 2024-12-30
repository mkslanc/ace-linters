import { HiveSQL } from 'dt-sql-parser/dist/parser/hive';
import { BaseSQLService } from "./base-sql-service";
export declare class HiveSQLService extends BaseSQLService {
    $service: HiveSQL;
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
