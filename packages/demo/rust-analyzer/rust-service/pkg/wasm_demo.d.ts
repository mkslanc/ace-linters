/* tslint:disable */
/* eslint-disable */
/**
*/
export function start(): void;
/**
* @param {number} num_threads
* @returns {Promise<any>}
*/
export function initThreadPool(num_threads: number): Promise<any>;
/**
* @param {number} receiver
*/
export function wbg_rayon_start_worker(receiver: number): void;
/**
*/
export class WorldState {
  free(): void;
/**
*/
  constructor();
/**
* @param {string} code
* @param {string} fake_std
* @param {string} fake_core
* @param {string} fake_alloc
*/
  init(code: string, fake_std: string, fake_core: string, fake_alloc: string): void;
/**
* @param {string} code
* @returns {any}
*/
  update(code: string): any;
/**
* @returns {any}
*/
  inlay_hints(): any;
/**
* @param {number} line_number
* @param {number} column
* @returns {any}
*/
  completions(line_number: number, column: number): any;
/**
* @param {number} line_number
* @param {number} column
* @returns {any}
*/
  hover(line_number: number, column: number): any;
/**
* @returns {any}
*/
  code_lenses(): any;
/**
* @param {number} line_number
* @param {number} column
* @param {boolean} include_declaration
* @returns {any}
*/
  references(line_number: number, column: number, include_declaration: boolean): any;
/**
* @param {number} line_number
* @param {number} column
* @returns {any}
*/
  prepare_rename(line_number: number, column: number): any;
/**
* @param {number} line_number
* @param {number} column
* @param {string} new_name
* @returns {any}
*/
  rename(line_number: number, column: number, new_name: string): any;
/**
* @param {number} line_number
* @param {number} column
* @returns {any}
*/
  signature_help(line_number: number, column: number): any;
/**
* @param {number} line_number
* @param {number} column
* @returns {any}
*/
  definition(line_number: number, column: number): any;
/**
* @param {number} line_number
* @param {number} column
* @returns {any}
*/
  type_definition(line_number: number, column: number): any;
/**
* @returns {any}
*/
  document_symbols(): any;
/**
* @param {number} line_number
* @param {number} column
* @param {string} ch
* @returns {any}
*/
  type_formatting(line_number: number, column: number, ch: string): any;
/**
* @returns {any}
*/
  folding_ranges(): any;
/**
* @param {number} line_number
* @param {number} column
* @returns {any}
*/
  goto_implementation(line_number: number, column: number): any;
}
/**
*/
export class wbg_rayon_PoolBuilder {
  free(): void;
/**
* @returns {number}
*/
  numThreads(): number;
/**
* @returns {number}
*/
  receiver(): number;
/**
*/
  build(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly start: () => void;
  readonly __wbg_worldstate_free: (a: number) => void;
  readonly worldstate_new: () => number;
  readonly worldstate_init: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly worldstate_update: (a: number, b: number, c: number) => number;
  readonly worldstate_inlay_hints: (a: number) => number;
  readonly worldstate_completions: (a: number, b: number, c: number) => number;
  readonly worldstate_hover: (a: number, b: number, c: number) => number;
  readonly worldstate_code_lenses: (a: number) => number;
  readonly worldstate_references: (a: number, b: number, c: number, d: number) => number;
  readonly worldstate_prepare_rename: (a: number, b: number, c: number) => number;
  readonly worldstate_rename: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly worldstate_signature_help: (a: number, b: number, c: number) => number;
  readonly worldstate_definition: (a: number, b: number, c: number) => number;
  readonly worldstate_type_definition: (a: number, b: number, c: number) => number;
  readonly worldstate_document_symbols: (a: number) => number;
  readonly worldstate_type_formatting: (a: number, b: number, c: number, d: number) => number;
  readonly worldstate_folding_ranges: (a: number) => number;
  readonly worldstate_goto_implementation: (a: number, b: number, c: number) => number;
  readonly __wbg_wbg_rayon_poolbuilder_free: (a: number) => void;
  readonly wbg_rayon_poolbuilder_numThreads: (a: number) => number;
  readonly wbg_rayon_poolbuilder_receiver: (a: number) => number;
  readonly wbg_rayon_poolbuilder_build: (a: number) => void;
  readonly wbg_rayon_start_worker: (a: number) => void;
  readonly initThreadPool: (a: number) => number;
  readonly memory: WebAssembly.Memory;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_start: () => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
* @param {WebAssembly.Memory} maybe_memory
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>, maybe_memory?: WebAssembly.Memory): Promise<InitOutput>;
