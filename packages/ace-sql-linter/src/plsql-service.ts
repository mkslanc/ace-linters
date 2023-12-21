import PlSQL from 'dt-sql-parser/dist/parser/plsql';
import {BaseSQLService} from "./base-sql-service";

export class PlSQLService extends BaseSQLService {
    $service: PlSQL;

    serviceCapabilities = {
        diagnosticProvider: {
            interFileDependencies: true,
            workspaceDiagnostics: true
        }
    }
    
    constructor(mode: string) {
        super(mode);
        this.$service = new PlSQL();
    }
}
