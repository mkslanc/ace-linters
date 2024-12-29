import {PostgreSQL} from 'dt-sql-parser/dist/parser/postgresql';
import {BaseSQLService} from "./base-sql-service";

export class PgSQLService extends BaseSQLService {
    $service: PostgreSQL;

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
        this.$service = new PostgreSQL();
    }
}
