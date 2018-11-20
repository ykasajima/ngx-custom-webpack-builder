import { Stats } from 'fs';
import * as webpack from 'webpack';
import { DevServerBuilder, BrowserBuilderSchema } from '@angular-devkit/build-angular';
import { BuilderContext } from '@angular-devkit/architect';
import { Path, virtualFs } from '@angular-devkit/core';
import { callCustomizer } from '../call-customizer';

export default class WebpackDevServerBuilder extends DevServerBuilder {
  constructor(context: BuilderContext) {
    super(context);
  }

  buildWebpackConfig(
    root: Path,
    projectRoot: Path,
    host: virtualFs.Host<Stats>,
    browserOptions: BrowserBuilderSchema,
  ): webpack.Configuration {
    const webpackConfig = super.buildWebpackConfig(
      root,
      projectRoot,
      host,
      browserOptions,
    ) as webpack.Configuration;

    return callCustomizer({
      builder: 'dev-server',
      root: root,
      projectRoot: projectRoot,
      options: browserOptions,
      webpackConfig: webpackConfig,
    });
  }
}
