module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    // @babel / preset - env 这个值注意要修改
    ["@babel/preset-env", { "modules": false }]
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
