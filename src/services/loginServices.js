const memberDAO = require("../dao/memberDAO");
const unit = require("../units/unit");
const responseDTO = require("../dto/responseDTO");
const processJWT = require("../units/processJWT");

const { isEmpty, passwordToMD5Hash } = unit;

const levelComparison = {
  0: "系統管理者",
  1: "管理者",
  2: "一般成員",
};

exports.login = async (request) => {
  const loginInfoBody = request.body;
  if (!isEmpty(loginInfoBody)) {
    const { account, password } = loginInfoBody;
    if (isEmpty(account) || isEmpty(password)) {
      return responseDTO.generalResponse(false, "帳號或密碼不得空白，請輸入帳號和密碼！");
    }
    const response = await memberDAO.queryMemberByAccount([account]);
    if (response.status && response.response.length !== 0) {
      const memberInfo = response.response[0];
      if (passwordToMD5Hash(password) === memberInfo.password && memberInfo.status) {
        return responseDTO.generalResponse(
          true,
          processJWT.generalJWT({
            id: memberInfo.id,
            account: memberInfo.account,
            accountName: memberInfo.account_name,
            email: memberInfo.email,
            level: levelComparison[memberInfo.level],
          })
        );
      }
    }
    return responseDTO.generalResponse(false, "帳號或密碼錯誤！或帳號未啟用！");
  }
  return responseDTO.generalResponse(false, "發生嚴重錯誤！");
};
