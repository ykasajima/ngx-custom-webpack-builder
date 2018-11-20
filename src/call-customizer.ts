import * as path from 'path';
import * as webpack from 'webpack';
import {
  BrowserBuilderSchema,
  NormalizedBrowserBuilderSchema,
  NormalizedKarmaBuilderSchema,
} from '@angular-devkit/build-angular';
import { Path, getSystemPath } from '@angular-devkit/core';
import { BuildWebpackServerSchema } from '@angular-devkit/build-angular/src/server/schema';

/**
 * builder types.
 */
export type AngularBuilder = 'browser' | 'dev-server' | 'karma' | 'server';

/**
 * costom builder schema.
 */
export interface CustomWebpackBuilderSchema {
  /**
   * The path to the Webpack configuration file.
   */
  webpackConfig: string;
}

/**
 * callback of BuildWebpackConfig.
 */
export declare type BuildWebpackConfigCallback = (
  p: BuildWebpackConfigCallbackParameter,
) => webpack.Configuration;

/**
 * callback parameter.
 */
export interface BuildWebpackConfigCallbackParameter {
  builder: AngularBuilder;
  root: Path;
  projectRoot: Path;
  /**
   * source root
   */
  sourceRoot?: Path | undefined;
  /**
   * BuilderSchema
   *
   * builder is ...
   * - browser: NormalizedBrowserBuilderSchema
   * - dev-server: BrowserBuilderSchema
   * - karma: NormalizedKarmaBuilderSchema
   * - server: BuildWebpackServerSchema
   */
  options:
    | CustomWebpackBuilderSchema
    | NormalizedBrowserBuilderSchema
    | BrowserBuilderSchema
    | NormalizedKarmaBuilderSchema
    | BuildWebpackServerSchema;
  webpackConfig: webpack.Configuration;
}

export function callCustomizer(p: BuildWebpackConfigCallbackParameter) {
  const opt = p.options as CustomWebpackBuilderSchema;
  const customizerPath = path.join(getSystemPath(p.root), opt.webpackConfig);
  const customizer = require(customizerPath) as BuildWebpackConfigCallback;
  if (typeof customizer !== 'function') {
    throw new Error('options.webpackConfig export must be function.');
  }
  return customizer(p);
}
