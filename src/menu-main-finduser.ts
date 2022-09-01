import ora from 'ora';
import { queryOdbc, getvalues } from './odbc-util';

const findUser = async (user: string) => {
	const query = await queryOdbc(
		`SELECT * FROM QSYS2.USER_INFO WHERE AUTHORIZATION_NAME = '${user}'`,
	);
	getvalues(query);
	return query;
};

export default async function () {
	const spinner = ora(`Checking...`).start();
	try {
		const find = await findUser(`TEQ`);
		spinner.succeed(`User found!`);
		return find;
	} catch (error: unknown) {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		spinner.fail(`Error: ${error}`);
		return error;
	}
}
