class MemberBeans {
  constructor(account = "", enable = false, createTime = "", updateTime = "") {
    this.account = account;
    this.enable = enable;
    this.createTime = createTime;
    this.updateTime = updateTime;
  }
}

module.exports = {
  MemberBeans,
};
