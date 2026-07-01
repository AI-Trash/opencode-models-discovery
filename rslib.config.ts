import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      autoExtension: true,
      dts: true,
    },
    {
      format: 'cjs',
      autoExtension: true,
      dts: true,
    },
  ],
});