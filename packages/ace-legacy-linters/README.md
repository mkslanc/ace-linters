# ace-legacy-linters

This package contains drop-in replacements for legacy Ace Editor worker files.

Its purpose is simple:
- build standalone worker scripts that can replace legacy Ace workers
- keep the existing Ace worker loading flow unchanged
- provide updated linting or syntax-checking behavior without modifying Ace itself

The generated files are intended to be used in place of the corresponding Ace worker assets, such as files under
`ace-builds/src` or `ace-builds/src-noconflict`.

Currently this package replaces these Ace workers:
- `worker-php.js`
- `worker-lua.js`
- `worker-html.js`
- `worker-json.js`
- `worker-css.js`
- `worker-xml.js`
- `worker-yaml.js`
- `worker-javascript.js`

This package is not a general-purpose language service layer. It is only for compatibility replacements of legacy Ace
workers.
