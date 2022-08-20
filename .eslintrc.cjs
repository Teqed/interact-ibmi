module.exports = {
	env: {
		browser: true,
		es2021: true,
		es6: true,
	},
	extends: [
		"canonical",
		"canonical/prettier",
	],
	overrides: [
		{
		  extends: [
			"canonical/typescript",
			"plugin:@typescript-eslint/recommended",
			"plugin:@typescript-eslint/eslint-recommended",
			'xo-typescript',
			"xo",
			"eslint:recommended",
		  ],
		  "files": "*.ts",
		  "parserOptions": {
			"project": "./tsconfig.json"
		  }
		},
		{
		  extends: [
			"canonical/react",
			"canonical/jsx-a11y",
			"canonical/typescript",
			"plugin:@typescript-eslint/recommended",
			"plugin:@typescript-eslint/eslint-recommended",
			'xo-typescript',
			"xo",
			"eslint:recommended",
		  ],
		  "files": "*.tsx",
		  "parserOptions": {
			"project": "./tsconfig.json"
		  }
		},
		{
		  extends: [
			"canonical/jest"
		  ],
		  "files": "*.test.{ts,tsx}",
		  "parserOptions": {
			"project": "./tsconfig.json"
		  }
		},
		{
		  extends: [
			"canonical/json"
		  ],
		  "files": "*.json"
		},
		{
		  extends: [
			"canonical/yaml"
		  ],
		  "files": "*.yaml"
		},
		{
		  extends: [
			"canonical/graphql"
		  ],
		  "files": "*.graphql"
		}
	  ],
	  "root": true,
	parser: "@typescript-eslint/parser",
	rules: {
	  },
	  plugins: ["prettier", "@typescript-eslint"]
};
