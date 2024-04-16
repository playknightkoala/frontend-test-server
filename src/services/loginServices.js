const unit = require("../units/unit");
const responseDTO = require("../dto/responseDTO");
const processJWT = require("../units/processJWT");

const { isEmpty } = unit;

exports.login = (request) => {
  try {
    const loginInfoBody = request.body;
    if (!isEmpty(loginInfoBody)) {
      const { account, password } = loginInfoBody;
      if (isEmpty(account) || isEmpty(password)) {
        return responseDTO.generalResponse(false, "帳號或密碼不得空白，請輸入帳號和密碼！");
      }
      if (account === "admin" && password === "admin") {
        return responseDTO.generalResponse(
          true,
          processJWT.generalJWT({
            account: "admin",
            accountName: "admin",
          })
        );
      }
      return responseDTO.generalResponse(false, "帳號或密碼錯誤！請重新輸入！");
    }
    return responseDTO.generalResponse(false, "發生嚴重錯誤！");
  } catch (e) {
    console.log(e);
    return responseDTO.generalResponse(false, "發生嚴重錯誤！");
  }
};
