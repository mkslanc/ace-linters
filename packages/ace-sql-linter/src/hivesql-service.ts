import {HiveSQL} from 'dt-sql-parser/dist/parser/hive';
import {BaseSQLService} from "./base-sql-service";

export class HiveSQLService extends BaseSQLService {
    $service: HiveSQL;

    serviceCapabilities = {
        completionProvider: {
            triggerCharacters: [".", " "]
        },
        diagnosticProvider: {
            interFileDependencies: true,
            workspaceDiagnostics: true
        }
    }
    constructor(mode: string) {
        super(mode);
        this.$service = new HiveSQL();
    }
}
