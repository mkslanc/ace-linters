import {TrinoSQL} from 'dt-sql-parser/dist/parser/trino';
import {BaseSQLService} from "./base-sql-service";

export class TrinoSQLService extends BaseSQLService {
    $service: TrinoSQL;

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
        this.$service = new TrinoSQL();
    }
}
