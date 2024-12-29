import { ImpalaSQL } from 'dt-sql-parser/dist/parser/impala';
import { BaseSQLService } from "./base-sql-service";
export declare class ImpalaSQLService extends BaseSQLService {
    $service: ImpalaSQL;
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
