module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
		"node": true,
	},
	"extends": [
		"eslint:recommended",
		"plugin:vue/vue3-essential",
		"plugin:@typescript-eslint/recommended"
	],
	"parser": "vue-eslint-parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"parser": "@typescript-eslint/parser",
		"sourceType": "module"
	},
	"plugins": [
		"vue",
		"@typescript-eslint"
	],
	"rules": {
		"quotes": ["error", "double", {
			"avoidEscape": true,
			"allowTemplateLiterals": true
		}],
		"vue/multi-word-component-names": ["error", { // 由于个人需要index作为目录主文件输出，所以配置过滤。 新版校验组件规则 https://eslint.vuejs.org/rules/multi-word-component-names.html。
			"ignores": ["index"]
		}],
		"@typescript-eslint/no-var-requires": "off", // 关闭使用require导入文件提示错误，如果是ts版本还需安装 @types/node 依赖包
		"@typescript-eslint/no-explicit-any": "off", // 关闭不能使用any类型
		"@typescript-eslint/no-non-null-assertion": "off", // 关闭不能使用非空断言

		// "object-curly-spacing": ["error", "always"]
		// "space-before-function-paren": ["error", "never"],
    // "no-mixed-spaces-and-tabs": "on",
    // "semi": "on",
	}
}
