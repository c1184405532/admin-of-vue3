# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).


## 路径别名配置

1. vite.config.ts中配置 resolve.alias [参考资料](https://cn.vitejs.dev/config/shared-options.html#resolve-alias)
2. 如果是ts版本，还需要在tsconfig.json中配置 baseUrl & paths: {"@/*", ["src/*"]} key是你的别名，数组中的value是你的路径

## less配置

1. vite3中提供了对 .scss, .sass, .less, .styl 和 .stylus 文件的内置支持。没有必要为他们安装特定的 vite 插件，只需安装预处理器依赖本身。
2. 安装less：npm i less -D

## antd主题色配置

1. 在vite.config文件下的defineConfig函数参数中定义 css.preprocessorOptions.less 选项。[参考资料](https://www.antdv.com/docs/vue/customize-theme-cn)
2. 在vite.config配置plugins中的 AntDesignVueResolver 传入构造参数 importStyle: "less"
3. 当你想设置自定义主题时请在 antd.theme.ts 文件修改即可。（在vite.config文件中导入模块需要在 tsconfig.node.json 的 include 选项配置，否则会提示错误信息）
