# JSDoc MemberOf Namespace

*JSDoc plugin to automatically set `@memberof` to `index.js` `@namespace`*

The plugin allows you to stop adding [`@memberof`][6] tags to every class, constant and function to
document your complex Node.js projects that are organised into subpackages and simply define 
[`@namespace`][7] in your `index.js` files at any level instead. The plugin will find `@namespace`
doclets in `index.js` files first and will add `@memberof` tags to files in the same folder and
subfolders to generate hierarchical structure automatically.

## Installation

You should already have JSDoc [installed][1] and [configured][4].

1. Install [`jsdoc-memberof-namespace`][2] package

    ```bash
    npm install jsdoc-memberof-namespace --save-dev
    ```

2. Add `node_modules/jsdoc-memberof-namespace` to `plugins` in `conf.json`

    ```json
    {
      "plugins": ["node_modules/jsdoc-memberof-namespace"],
      "source": {
        "include": ".",
        "exclude": ["out", "node_modules"]
      },
      "opts": {
        "recurse": true
      }
    }
    ```

3. Add [`@namespace`][7] tags to `index.js` files

    ```javascript
    /**
     * Foobar Package
     * @namespace foobar
     */

    export { default as Foo } from './Foo';
    export { default as Bar } from './Bar';
    ```

4. Any class, constant or function defined in the same folder or any subfolders will now have
appropriate `@memberof` tag added automatically

    ```javascript
    /** Foo Class */
    class Foo { // documented as foobar.Foo
        /** Foo Method */
        foo() { } // documented as foobar.Foo#foo
    }
    ```

## Debugging

Add `--debug` [command-line option][3] to increase logging verbosity and look for `[JMN]` messages.

[1]: https://www.npmjs.com/package/jsdoc
[2]: https://www.npmjs.com/package/jsdoc-memberof-namespace
[3]: http://usejsdoc.org/about-commandline.html
[4]: http://usejsdoc.org/about-configuring-jsdoc.html
[5]: http://usejsdoc.org/about-plugins.html
[6]: http://usejsdoc.org/tags-memberof.html
[7]: http://usejsdoc.org/tags-namespace.html
