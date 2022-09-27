import { parseODBCErrorMessage } from '../../util/qcmdexc/qcmdexc-util.js';
import { exampleError2 } from '../../example-objects.js';

export default async () => {
	return parseODBCErrorMessage(exampleError2);
};
