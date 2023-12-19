import MySQL from 'dt-sql-parser/dist/parser/mysql';
import {BaseSQLService} from "./base-sql-service";

export class MySQLService extends BaseSQLService {
    $service: MySQL;

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
        this.$service = new MySQL();
    }
}
