import SparkSQL from 'dt-sql-parser/dist/parser/spark';
import {BaseSQLService} from "./base-sql-service";

export class SparkSQLService extends BaseSQLService {
    $service: SparkSQL;

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
        this.$service = new SparkSQL();
    }
}
