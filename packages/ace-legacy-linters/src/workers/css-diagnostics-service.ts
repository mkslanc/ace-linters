import {Parser} from 'vscode-css-languageservice/lib/esm/parser/cssParser';
import {CSSValidation} from 'vscode-css-languageservice/lib/esm/services/cssValidation';
import {CSSDataProvider} from 'vscode-css-languageservice/lib/esm/languageFacts/dataProvider';
import {SCSSParser} from 'vscode-css-languageservice/lib/esm/parser/scssParser';
import {LESSParser} from 'vscode-css-languageservice/lib/esm/parser/lessParser';
import {LanguageService} from "vscode-css-languageservice";
import * as objects from 'vscode-css-languageservice/lib/esm/utils/objects';
import {cssData} from "./css-diagnostics-data.generated";

export type CssDiagnosticsService = Pick<LanguageService, "configure" | "doValidation" | "parseStylesheet">

function createFacade(parser, validation) {
    return {
        configure: (settings) => {
            validation.configure(settings);
        },
        doValidation: validation.doValidation.bind(validation),
        parseStylesheet: parser.parseStylesheet.bind(parser),
    };
}

const defaultLanguageServiceOptions = {};

export function getCSSDiagnosticsService(options = defaultLanguageServiceOptions): CssDiagnosticsService {
    const cssDataManager = new CSSDataManager(options);
    return createFacade(new Parser(), new CSSValidation(cssDataManager));
}

export function getSCSSDiagnosticsService(options = defaultLanguageServiceOptions): CssDiagnosticsService {
    const cssDataManager = new CSSDataManager(options);
    return createFacade(new SCSSParser(), new CSSValidation(cssDataManager));
}

export function getLESSDiagnosticsService(options = defaultLanguageServiceOptions): CssDiagnosticsService {
    const cssDataManager = new CSSDataManager(options);
    return createFacade(new LESSParser(), new CSSValidation(cssDataManager));
}


class CSSDataManager {
    private dataProviders: any[];
    private _propertySet: {};
    private _atDirectiveSet: {};
    private _pseudoClassSet: {};
    private _pseudoElementSet: {};
    private _properties: any[];
    private _atDirectives: any[];
    private _pseudoClasses: any[];
    private _pseudoElements: any[];

    constructor(options) {
        this.dataProviders = [];
        this._propertySet = {};
        this._atDirectiveSet = {};
        this._pseudoClassSet = {};
        this._pseudoElementSet = {};
        this._properties = [];
        this._atDirectives = [];
        this._pseudoClasses = [];
        this._pseudoElements = [];
        this.setDataProviders(options?.useDefaultDataProvider !== false, options?.customDataProviders || []);
    }

    setDataProviders(builtIn, providers) {
        this.dataProviders = [];
        if (builtIn) {
            this.dataProviders.push(new CSSDataProvider(cssData));
        }
        this.dataProviders.push(...providers);
        this.collectData();
    }

    /**
     * Collect all data  & handle duplicates
     */
    collectData() {
        this._propertySet = {};
        this._atDirectiveSet = {};
        this._pseudoClassSet = {};
        this._pseudoElementSet = {};
        this.dataProviders.forEach(provider => {
            provider.provideProperties().forEach(p => {
                if (!this._propertySet[p.name]) {
                    this._propertySet[p.name] = p;
                }
            });
            provider.provideAtDirectives().forEach(p => {
                if (!this._atDirectiveSet[p.name]) {
                    this._atDirectiveSet[p.name] = p;
                }
            });
            provider.providePseudoClasses().forEach(p => {
                if (!this._pseudoClassSet[p.name]) {
                    this._pseudoClassSet[p.name] = p;
                }
            });
            provider.providePseudoElements().forEach(p => {
                if (!this._pseudoElementSet[p.name]) {
                    this._pseudoElementSet[p.name] = p;
                }
            });
        });
        this._properties = objects.values(this._propertySet);
        this._atDirectives = objects.values(this._atDirectiveSet);
        this._pseudoClasses = objects.values(this._pseudoClassSet);
        this._pseudoElements = objects.values(this._pseudoElementSet);
    }

    getProperty(name) {
        return this._propertySet[name];
    }

    getAtDirective(name) {
        return this._atDirectiveSet[name];
    }

    getPseudoClass(name) {
        return this._pseudoClassSet[name];
    }

    getPseudoElement(name) {
        return this._pseudoElementSet[name];
    }

    getProperties() {
        return this._properties;
    }

    getAtDirectives() {
        return this._atDirectives;
    }

    getPseudoClasses() {
        return this._pseudoClasses;
    }

    getPseudoElements() {
        return this._pseudoElements;
    }

    isKnownProperty(name) {
        return name.toLowerCase() in this._propertySet;
    }

    isStandardProperty(name) {
        return this.isKnownProperty(name) &&
            (!this._propertySet[name.toLowerCase()].status || this._propertySet[name.toLowerCase()].status === 'standard');
    }
}
