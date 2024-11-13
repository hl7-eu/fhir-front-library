import commonjs from "@rollup/plugin-commonjs";
import json from '@rollup/plugin-json';
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import replace from '@rollup/plugin-replace';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import copy from 'rollup-plugin-copy';

const packageJson = require("./package.json");

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            replace({
                delimiters: ['', ''],
                values: {
                    'use client': 'use strict',
                },
                preventAssignment: true
            }),
            resolve({
                browser: true,
                preferBuiltins: true,
            }),
            commonjs(),
            json(),
            typescript({ tsconfig: "./tsconfig.json" }),
            postcss(),
            nodePolyfills(),
            copy({
                targets: [
                    { src: 'public/assets/*', dest: 'dist/public/assets' },
                ]
            })
        ],
        external: ['react', 'react-dom'],
        onwarn(warning, warn) {
            // suppress circular dependency warnings
            if (warning.code === 'CIRCULAR_DEPENDENCY') return;
            // Use default for everything else
            warn(warning);
        }
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts.default()],
        external: [/\.css$/, 'react', 'react-dom'],
    },
];