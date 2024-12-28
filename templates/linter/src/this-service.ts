import {BaseService} from "ace-linters/src/services/base-service";

import {LanguageService} from "ace-linters/src/types/language-service";
import type {ThisServiceOptions} from "./service";

export class ThisService extends BaseService<ThisServiceOptions> implements LanguageService {
    // set type for $service
    $service;

    // set capabilities
    serviceCapabilities = {}

    constructor(mode: string) {
        super(mode);
    }
}
