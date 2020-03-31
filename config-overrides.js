const { override, fixBabelImports, addLessLoader, useBabelRc } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#0C3863',
      '@primary-1': '#7BA8CD',
      '@link-color': '@white',
      '@tabs-active-color': '@white',
      '@tabs-ink-bar-color': '@white',
      '@tabs-highlight-color': '@white',
      '@tabs-hover-color': '@white',
      // '@modal-heading-color': '#fade(#000, 85%)',
      // '@heading-color': '@white',
      '@label-color': '#001529',
      '@form-item-margin-bottom': '0',
      '@select-dropdown-bg': '@primary-1',
      '@select-item-selected-bg': '@primary-1',
      '@select-item-active-bg': '@primary-1',
      '@table-header-bg': '@primary-color',
      '@table-header-color': '@white',
    },
  }),
  useBabelRc(),
);
