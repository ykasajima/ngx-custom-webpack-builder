import * as fs from 'fs';
import * as webpack from 'webpack';
import { KarmaBuilder, NormalizedKarmaBuilderSchema } from '@angular-devkit/build-angular';
import { BuilderContext } from '@angular-devkit/architect';
import { Path, virtualFs } from '@angular-devkit/core';
import { callCustomizer } from '../call-customizer';

export default class WebpackKarmaBuilder extends KarmaBuilder {
  constructor(context: BuilderContext) {
    super(context);
  }

  buildWebpackConfig(
    root: Path,
    projectRoot: Path,
    sourceRoot: Path | undefined,
    host: virtualFs.Host<fs.Stats>,
    options: NormalizedKarmaBuilderSchema,
  ) {
    const webpackConfig = super.buildWebpackConfig(
      root,
      projectRoot,
      sourceRoot,
      host,
      options,
    ) as webpack.Configuration;

    return callCustomizer({
      builder: 'karma',
      root: root,
      projectRoot: projectRoot,
      sourceRoot: sourceRoot,
      options: options,
      webpackConfig: webpackConfig,
    });
  }
}
