class MemberBeans {
  constructor(id = 0, account = "", accountName = "", email = "", enable = false, level = "", createTime = "", updateTime = "") {
    this.id = id;
    this.account = account;
    this.accountName = accountName;
    this.email = email;
    this.enable = enable;
    this.level = level;
    this.createTime = createTime;
    this.updateTime = updateTime;
  }
}

module.exports = {
  MemberBeans,
};
