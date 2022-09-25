import type odbc from 'odbc';
import { queryOdbc } from '../odbc/odbc-util.js';

// qcmdexc takes a command, runs it on the AS400 system with QCMDEXC, then returns the result of the command.

export default async (qcmdexc: string): Promise<odbc.Result<Array<number | string>>> =>
	queryOdbc(`CALL QSYS2.QCMDEXC('${qcmdexc}')`);
