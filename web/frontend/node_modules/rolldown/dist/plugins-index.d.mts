import { _ as BindingReplacePluginConfig } from "./shared/binding-CVMT71K4.mjs";
import { I as BuiltinPlugin } from "./shared/define-config-BoIay7tU.mjs";
import { t as esmExternalRequirePlugin } from "./shared/constructors-D8_9mYWx.mjs";
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
export declare function replacePlugin(values?: BindingReplacePluginConfig["values"], options?: Omit<BindingReplacePluginConfig, "values">): BuiltinPlugin;
export { esmExternalRequirePlugin };