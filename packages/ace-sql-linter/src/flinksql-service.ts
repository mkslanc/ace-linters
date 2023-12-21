import FlinkSQL from 'dt-sql-parser/dist/parser/flinksql';
import {BaseSQLService} from "./base-sql-service";

export class FlinkSQLService extends BaseSQLService {
    $service: FlinkSQL;

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
        this.$service = new FlinkSQL();
    }
}
