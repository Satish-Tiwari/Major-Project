module.exports = async function sendToken(user, message, statusCode, res) {
  const awthToken = await user.getToken();
  const options = {};
  return res
    .status(statusCode)
    .cookie("userToken", awthToken, options)
    .json({ success: true,awthToken, message });
};
