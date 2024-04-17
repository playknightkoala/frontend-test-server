const connectDB = require("../units/database/connectDB");

exports.queryMemberByAccount = async (account) => {
  return await connectDB.query("SELECT * FROM users WHERE account = ?", account);
};

exports.queryMemberById = async (id) => {
  return await connectDB.query("SELECT * FROM users WHERE id = ?", id);
};

exports.queryAllMember = async () => {
  return await connectDB.query("SELECT * FROM users");
};

exports.createMember = async (userInfo) => {
  return await connectDB.query(
    "INSERT INTO users (status, level, account, account_name, password, email, create_time, update_time) VALUE ( ?, ?, ?, ?, ?, ?, ?, ?)",
    userInfo
  );
};

exports.updateMember = async (setStatement, userInfoStatement) => {
  return await connectDB.query(`UPDATE users SET ${setStatement.join(",")} WHERE id = ?`, userInfoStatement);
};

exports.deleteMember = async (id) => {
  return await connectDB.query("DELETE FROM users WHERE id = ?", id);
};
