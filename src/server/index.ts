import { Stats } from 'fs';
import * as webpack from 'webpack';
import { ServerBuilder } from '@angular-devkit/build-angular';
import { BuilderContext } from '@angular-devkit/architect';
import { Path, virtualFs } from '@angular-devkit/core';
import { callCustomizer } from '../call-customizer';
import { BuildWebpackServerSchema } from '@angular-devkit/build-angular/src/server/schema';

export default class WebpackServerBuilder extends ServerBuilder {
  constructor(context: BuilderContext) {
    super(context);
  }

  buildWebpackConfig(
    root: Path,
    projectRoot: Path,
    host: virtualFs.Host<Stats>,
    options: BuildWebpackServerSchema,
  ) {
    const webpackConfig = super.buildWebpackConfig(
      root,
      projectRoot,
      host,
      options,
    ) as webpack.Configuration;

    return callCustomizer({
      builder: 'server',
      root: root,
      projectRoot: projectRoot,
      options: options,
      webpackConfig: webpackConfig,
    });
  }
}
