const cookieParser = require('cookie-parser');

exports.Home = async (req, res) => {
  console.log("req from frontend");
  return res.status(200).json({ message: "Cookie set successfully" });
};
