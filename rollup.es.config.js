import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import license from 'rollup-plugin-license';

const path = require('path');

export default {
    output: {
        format: 'es',
        sourcemap: true
    },
    plugins: [
      resolve({
        module: true,
        jsnext: true,
        main: true,
        extensions: ['.js', '.json'],
        preferBuiltins: false,
        modulesOnly: true
      }),
        sourcemaps(),
        license({
            sourceMap: true,

            banner: {
                file: path.join(__dirname, 'license-banner.txt'),
                encoding: 'utf-8',
            }
        })
    ],
    onwarn: () => { return }
}
