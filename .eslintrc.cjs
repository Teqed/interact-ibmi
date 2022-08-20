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
	],
	overrides: [
		{
		  extends: [
			"eslint:recommended",
			"xo",
			'xo-typescript',
			"plugin:@typescript-eslint/eslint-recommended",
			"plugin:@typescript-eslint/recommended",
			"canonical/typescript",
		  ],
		  "files": "*.ts",
		  "parserOptions": {
			"project": "./tsconfig.json"
		  }
		},
		{
		  extends: [
			"eslint:recommended",
			"xo",
			'xo-typescript',
			"plugin:@typescript-eslint/eslint-recommended",
			"plugin:@typescript-eslint/recommended",
			"canonical/typescript",
			"canonical/jsx-a11y",
			"canonical/react",
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
	  parser: "@typescript-eslint/parser",
	plugins: ["prettier", "@typescript-eslint"],
	"root": true,
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
		"no-console": "off"
	  }
};
