import getRows from '../../../util/odbc/get-rows-odbc.js';
import { genericPressEnterPrompt } from '../../generic/generic.js';
import pickUser from './pick-user.js';

const fullUserInfo = async (user: string) => {
	const query = `SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${user}'`;
	const result = await getRows(query);
	console.log(result);
	await genericPressEnterPrompt();
	return result;
};

const findUserPrompt = async () => {
	const findUserMenuChoice = await pickUser();
	return fullUserInfo(findUserMenuChoice);
};

export default async function () {
	try {
		return await findUserPrompt();
	} catch (error: unknown) {
		return error;
	}
}
