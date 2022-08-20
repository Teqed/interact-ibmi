module.exports = {
	env: {
		browser: true,
		es6: true,
		es2022: true,
		node: true,
	},
	extends: [
		"canonical",
		"canonical/prettier",
		"canonical/typescript",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		'xo-typescript',
		"xo",
	],
	  rules: {
		"import/extensions": [
		   "error",
		   "ignorePackages",
		   {
			 "js": "never",
			 "jsx": "never",
			 "ts": "never",
			 "tsx": "never"
		   }
		],
		"no-console": "off",
		"@typescript-eslint/indent" : "off",
		"@typescript-eslint/no-explicit-any" : "warn",
		"@typescript-eslint/return-await" : "off",
	  }
};
