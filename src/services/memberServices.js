const responseDTO = require("../dto/responseDTO");
const { MemberBeans } = require("../beans/memberBeans");

exports.getMember = () => {
  try {
    const memberDataBeanList = [];
    for (let i = 0; i < 10; i++) {
      const memberDataBean = new MemberBeans(
        "Member-" + i,
        i % 2 === 0,
        "2021/01/12 14:37:2" + i,
        "2021/01/12 14:37:2" + i
      );
      memberDataBeanList.push(memberDataBean);
    }
    return responseDTO.generalResponse(true, memberDataBeanList);
  } catch (e) {
    console.log(e);
    return responseDTO.generalResponse(false, "發生嚴重錯誤！");
  }
};
