import ImpalaSQL from 'dt-sql-parser/dist/parser/impala';
import {BaseSQLService} from "./base-sql-service";

export class ImpalaSQLService extends BaseSQLService {
    $service: ImpalaSQL;

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
        this.$service = new ImpalaSQL();
    }
}
