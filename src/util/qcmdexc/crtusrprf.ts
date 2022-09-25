import { type CreateUserInterface } from '../types.js';

export default (toUser: CreateUserInterface) => {
	return `CRTUSRPRF \
USRPRF(${toUser.userId}) \
STATUS(*ENABLED) \
PASSWORD(${toUser.userPassword}) \
PWDEXP(*YES) \
USRCLS(${toUser.userClass}) \
INLPGM(${toUser.userInitialProgram}) \
INLMNU(${toUser.userInitialMenu}) \
LMTCPB(${toUser.userLimitCapabilities}) \
TEXT(''${toUser.userText}'') \
SPCAUT(${toUser.userSpecialAuthority}) \
JOBD(${toUser.userJobDescription}) \
GRPPRF(${toUser.userGroupProfile}) \
GRPAUT(${toUser.userGroupAuthority}) \
ACGCDE(${toUser.userAccountingCode}) \
DLVRY(${toUser.userDelivery}) \
OUTQ(${toUser.userOutqueue}) \
ATNPGM(${toUser.userAttentionProgram}) \
SUPGRPPRF(${toUser.userSupplementalGroups})`;
	// TODO Remove undefined values.
};
