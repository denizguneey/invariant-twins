import { a as makeBuiltinPluginCallable, n as BuiltinPlugin } from "./shared/normalize-string-or-regex-DUkI3MrN.mjs";
import { t as esmExternalRequirePlugin } from "./shared/constructors-LV0jge7E.mjs";
// src/builtin-plugin/replace-plugin.ts
/**
* Replaces targeted strings in files while bundling.
*
* @example
* **Basic usage**
* ```js
* replacePlugin({
*   'process.env.NODE_ENV': JSON.stringify('production'),
*    __buildVersion: 15
* })
* ```
* @example
* **With options**
* ```js
* replacePlugin({
*   'process.env.NODE_ENV': JSON.stringify('production'),
*   __buildVersion: 15
* }, {
*   preventAssignment: false,
* })
* ```
*
* @see https://rolldown.rs/builtin-plugins/replace
* @category Builtin Plugins
*/
function replacePlugin(values = {}, options = {}) {
	Object.keys(values).forEach((key) => {
		const value = values[key];
		if (typeof value !== "string") values[key] = String(value);
	});
	return makeBuiltinPluginCallable(new BuiltinPlugin("builtin:replace", {
		...options,
		values
	}));
}
export { esmExternalRequirePlugin, replacePlugin };
