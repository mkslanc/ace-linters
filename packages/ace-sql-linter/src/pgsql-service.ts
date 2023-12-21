import PgSQL from 'dt-sql-parser/dist/parser/pgsql';
import {BaseSQLService} from "./base-sql-service";

export class PgSQLService extends BaseSQLService {
    $service: PgSQL;

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
        this.$service = new PgSQL();
    }
}
