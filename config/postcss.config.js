export default ({ options, env }) => ({
  plugins: {
    autoprefixer: options.autoprefixer,
    'postcss-flexbugs-fixes': options.flexbugsFixes,
    'postcss-short': options.short,
    cssnano: env === 'production' ? options.cssnano : false,
  },
});
