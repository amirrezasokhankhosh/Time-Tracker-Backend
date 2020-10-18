const mix = require('laravel-mix');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

mix.setPublicPath('public').js('resources/assets/js/main.js', 'public/js')
// .sass('resources/sass/app.scss', 'public/css')

mix.webpackConfig({
  plugins: [
    new VuetifyLoaderPlugin({
      match (originalTag, { kebabTag, camelTag, path, component }) {
        if (kebabTag.startsWith('core-')) {
          return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
        }
      }
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(
        __dirname,
        "resources/assets/js"
      ),
      //   "@sass": path.resolve(
      //     __dirname,
      //     "resources/assets/sass"
      //   ),
    }
  }
});
