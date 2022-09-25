export default (newUser: string) => {
	const qcmdexc = `CHGOBJOWN \
OBJ(QSYS/${newUser}) \
OBJTYPE(*USRPRF) \
NEWOWN(QSECOFR)`;
	return qcmdexc;
};
