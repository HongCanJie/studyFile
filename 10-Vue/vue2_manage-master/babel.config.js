module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset', // 保留
	["@babel/preset-env", { "modules": false }]
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
