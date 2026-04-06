import {JSONValidation} from 'vscode-json-languageservice/lib/esm/services/jsonValidation';
import {parse as parseJSON} from 'vscode-json-languageservice/lib/esm/parser/jsonParser';
import {schemaContributions} from 'vscode-json-languageservice/lib/esm/services/configuration';
import {JSONSchemaService} from 'vscode-json-languageservice/lib/esm/services/jsonSchemaService';
import {LanguageService} from "vscode-json-languageservice";

export type JsonDiagnosticsService = Pick<LanguageService, "configure" | "resetSchema" | "doValidation" | "getLanguageStatus" | "parseJSONDocument" | "getMatchingSchemas">

export function getJsonDiagnosticsService(params): JsonDiagnosticsService {
    const promise = Promise;
    const jsonSchemaService = new JSONSchemaService(params.schemaRequestService, params.workspaceContext, promise);
    jsonSchemaService.setSchemaContributions(schemaContributions);
    const jsonValidation = new JSONValidation(jsonSchemaService, promise);
    return {
        configure: (settings) => {
            jsonSchemaService.clearExternalSchemas();
            settings.schemas?.forEach(jsonSchemaService.registerExternalSchema.bind(jsonSchemaService));
            jsonValidation.configure(settings);
        },
        resetSchema: (uri) => jsonSchemaService.onResourceChange(uri),
        doValidation: jsonValidation.doValidation.bind(jsonValidation),
        getLanguageStatus: jsonValidation.getLanguageStatus.bind(jsonValidation),
        parseJSONDocument: (document) => parseJSON(document, {collectComments: true}),
        getMatchingSchemas: jsonSchemaService.getMatchingSchemas.bind(jsonSchemaService),
    };
}
