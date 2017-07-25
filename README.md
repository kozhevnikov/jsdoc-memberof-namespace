# JSDoc MemberOf Namespace

*JSDoc plugin to automatically generate memberof namespace tags*

This plugin creates a [`@memberof`][jsdoc-memberof] tag, if missing, from the [`@namespace`][jsdoc-namespace] tag defined in `index.js` ([index scope](#index-scope)) or the file itself ([module scope](#module-scope)). This enables for a complex project with many modules or packages to be documented easily without needing to manually add `@memberof` tags to every comment to keep documentation organised.

Sample documentation for [test](test) code is available on [docs](https://kozhevnikov.github.io/jsdoc-memberof-namespace/) page.

## Installation and Configuration

JSDoc should be [installed][npm-jsdoc] and [configured][jsdoc-config].

1. Install [`jsdoc-memberof-namespace`][npm-jsdoc-memberof-namespace]

    ```bash
    npm install jsdoc-memberof-namespace --save-dev
    ```

2. Add `node_modules/jsdoc-memberof-namespace` to [`plugins`][jsdoc-plugin] in JSDoc [configuration file][jsdoc-config]

   Sample `conf.json`

   ```json
   {
     "source": {
       "include": "src"
     },
     "plugins": [
       "plugins/markdown",
       "node_modules/jsdoc-memberof-namespace"
     ],
     "opts": {
       "recurse": true
     }
   }
   ```

## Usage

```javascript
/**
 * Acme Corporation
 * @namespace acme
 */

/**
 * Base product
 * Documented as acme.Product
 */
class Product {
    /**
     * Add product to basket
     * Documented as acme.Product#buy
     */
    buy() { }
}
```

Multiple namespaces can defined in multiple places and the closest applicable namespace will be used:

1. The current file (last namespace defined if multiple)
2. The `index.js` in the same directory as the file
3. The `index.js` in any parent directory closest to the file

### Index Scope

Namespace can be defined in `index.js` file located in same directory as the file being documented or any of the parent directories. It is the easiest way to document your project by simply adding `@namespace` once alongside your re-exports.

### Module Scope

Namespace can be defined in the file being documented itself. This namespace will only apply to other documentation comments in the file and only those defined after the namespace. The behaviour is similar to [`@module`][jsdoc-module] tag.

## Notes

- Only [classes, constants, and functions](index.js#L6) are processed, for other [kinds][jsdoc-kind] to be included please submit an issue with sample code
- Prefix references with namespaces as you normally would even if your IDE highlights them as (yet) unresolved
  ```javascript
  /**
   * @type {acme.Foo}
   * @param {acme.Bar} bar
   */
  ```
- Enable `useLongnameInNav` default template configuration option to use fully qualified names for navigation
  ```json
  "templates": {
    "default": {
      "includeDate": false,
      "useLongnameInNav": true
    }
  }
  ```
- Add `--debug` [command-line option][jsdoc-cli] to increase JSDoc logging level and look for messages with `[JMN]` prefix

[jsdoc-cli]: http://usejsdoc.org/about-commandline.html
[jsdoc-config]: http://usejsdoc.org/about-configuring-jsdoc.html
[jsdoc-plugin]: http://usejsdoc.org/about-plugins.html
[jsdoc-kind]: http://usejsdoc.org/tags-kind.html
[jsdoc-module]: http://usejsdoc.org/tags-module.html
[jsdoc-memberof]: http://usejsdoc.org/tags-memberof.html
[jsdoc-namespace]: http://usejsdoc.org/tags-namespace.html
[npm-jsdoc]: https://www.npmjs.com/package/jsdoc
[npm-jsdoc-memberof-namespace]: https://www.npmjs.com/package/jsdoc-memberof-namespace
