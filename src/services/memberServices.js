const responseDTO = require("../dto/responseDTO");
const { MemberBeans } = require("../beans/memberBeans");
const memberDAO = require("../dao/memberDAO");
const units = require("../units/unit");
const moment = require("moment");
const { isEmpty, passwordToMD5Hash, getTokenInfo } = units;

const levelComparison = {
  0: "系統管理者",
  1: "管理者",
  2: "一般成員",
};

exports.getMember = async () => {
  try {
    const memberDataBeanList = [];
    const response = await memberDAO.queryAllMember();
    if (response.status && response.response.length !== 0) {
      for (const responseElement of response.response) {
        const memberDataBean = new MemberBeans(
          responseElement.id,
          responseElement.account,
          responseElement.account_name,
          responseElement.email,
          responseElement.status,
          levelComparison[responseElement.level],
          moment(responseElement.create_time).format("YYYY/MM/DD HH:mm:ss.SSS"),
          moment(responseElement.update_time).format("YYYY/MM/DD HH:mm:ss.SSS")
        );
        memberDataBeanList.push(memberDataBean);
      }
    }

    return responseDTO.generalResponse(true, memberDataBeanList);
  } catch (e) {
    console.log(e);
    return responseDTO.generalResponse(false, "發生嚴重錯誤！");
  }
};

exports.createMember = async (request) => {
  try {
    const userInfo = request.body;

    if (isEmpty(userInfo)) {
      return responseDTO.generalResponse(false, "發生嚴重錯誤！");
    }
    if (
      isEmpty(userInfo.account) ||
      isEmpty(userInfo.accountName) ||
      isEmpty(userInfo.password) ||
      isEmpty(userInfo.level) ||
      isEmpty(userInfo.email) ||
      isEmpty(userInfo.status)
    ) {
      return responseDTO.generalResponse(false, "發生嚴重錯誤！");
    }

    const queryMemberByAccountResponse = await memberDAO.queryMemberByAccount([userInfo.account]);
    if (queryMemberByAccountResponse.status && queryMemberByAccountResponse.response.length !== 0) {
      return responseDTO.generalResponse(false, "帳號已重複！");
    }

    const password = passwordToMD5Hash(userInfo.password);
    const createMemberResponse = await memberDAO.createMember([
      userInfo.status,
      userInfo.level,
      userInfo.account,
      userInfo.accountName,
      password,
      userInfo.email,
      moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
      moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
    ]);
    if (createMemberResponse.status) {
      return responseDTO.generalResponse(true, "創建帳號成功！");
    }

    return responseDTO.generalResponse(false, "創建帳號失敗！");
  } catch (e) {
    console.log(e);
    return responseDTO.generalResponse(false, "發生嚴重錯誤！");
  }
};

exports.updateMember = async (request) => {
  try {
    const userInfo = request.body;
    const id = request.params.id;
    const setStatement = [];
    const userInfoStatement = [];
    const tokenInfo = await getTokenInfo(request);

    if (isEmpty(userInfo) || isEmpty(id) || (tokenInfo.level !== "系統管理者" && tokenInfo.level !== "管理員")) {
      return responseDTO.generalResponse(false, "發生嚴重錯誤！");
    }

    if (
      isEmpty(userInfo.email) ||
      isEmpty(userInfo.account) ||
      isEmpty(userInfo.accountName) ||
      isEmpty(userInfo.level) ||
      isEmpty(userInfo.status)
    ) {
      return responseDTO.generalResponse(false, "發生嚴重錯誤！");
    }

    if (userInfo.account === "admin") {
      return responseDTO.generalResponse(false, "發生嚴重錯誤！");
    }

    const queryMemberByIdResponse = await memberDAO.queryMemberById([id]);
    if (queryMemberByIdResponse.status && queryMemberByIdResponse.response.length === 0) {
      return responseDTO.generalResponse(false, "發生嚴重錯誤！");
    }
    if (queryMemberByIdResponse.response[0].level === 0) {
      return responseDTO.generalResponse(false, "發生嚴重錯誤！");
    }
    const memberInfo = queryMemberByIdResponse.response[0];

    if (!isEmpty(userInfo.password) && memberInfo.password !== passwordToMD5Hash(userInfo.password)) {
      userInfoStatement.push(passwordToMD5Hash(userInfo.password));
      setStatement.push("password=?");
    }
    userInfoStatement.push(userInfo.account);
    setStatement.push("account=?");
    userInfoStatement.push(userInfo.accountName);
    setStatement.push("account_name=?");
    userInfoStatement.push(userInfo.email);
    setStatement.push("email=?");

    if (typeof userInfo.status !== "boolean" || typeof userInfo.level !== "number") {
      return responseDTO.generalResponse(false, "發生嚴重錯誤！");
    }
    userInfoStatement.push(userInfo.status);
    setStatement.push("status=?");
    userInfoStatement.push(userInfo.level);
    setStatement.push("level=?");
    userInfoStatement.push(moment().format("YYYY/MM/DD HH:mm:ss.SSS"));
    setStatement.push("update_time=?");

    if (isEmpty(userInfoStatement) || isEmpty(setStatement)) {
      return responseDTO.generalResponse(false, "發生嚴重錯誤！");
    }

    userInfoStatement.push(id);
    const updateMemberResponse = await memberDAO.updateMember(setStatement, userInfoStatement);
    if (updateMemberResponse.status) {
      return responseDTO.generalResponse(true, "更新帳號成功！");
    }

    return responseDTO.generalResponse(false, "發生嚴重錯誤！");
  } catch (e) {
    console.log(e);
    return responseDTO.generalResponse(false, "發生嚴重錯誤！");
  }
};

exports.deleteMember = async (request) => {
  try {
    const id = request.params.id;

    if (isEmpty(id)) {
      return responseDTO.generalResponse(false, "發生嚴重錯誤！");
    }
    const deleteMemberResponse = await memberDAO.deleteMember([id]);
    if (deleteMemberResponse.status) {
      return responseDTO.generalResponse(true, "刪除帳號成功！");
    }

    return responseDTO.generalResponse(false, "發生嚴重錯誤！");
  } catch (e) {
    console.log(e);
    return responseDTO.generalResponse(false, "發生嚴重錯誤！");
  }
};
