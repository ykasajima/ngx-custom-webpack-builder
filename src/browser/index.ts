import * as fs from 'fs';
import * as webpack from 'webpack';
import { BuilderContext } from '@angular-devkit/architect';
import { BrowserBuilder, NormalizedBrowserBuilderSchema } from '@angular-devkit/build-angular';
import { Path, virtualFs } from '@angular-devkit/core';
import { callCustomizer } from '../call-customizer';

export default class WebpackBrowserBuilder extends BrowserBuilder {
  constructor(context: BuilderContext) {
    super(context);
  }

  buildWebpackConfig(
    root: Path,
    projectRoot: Path,
    host: virtualFs.Host<fs.Stats>,
    options: NormalizedBrowserBuilderSchema,
  ): webpack.Configuration {
    const webpackConfig = super.buildWebpackConfig(
      root,
      projectRoot,
      host,
      options,
    ) as webpack.Configuration;

    return callCustomizer({
      builder: 'browser',
      root: root,
      projectRoot: projectRoot,
      options: options,
      webpackConfig: webpackConfig,
    });
  }
}
