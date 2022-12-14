const jwt = require("jsonwebtoken");

const userAuthentication = async function (req, res, next) {
  try {

    let token = req.headers["x-api-key"];

    if (!token) return res.status(400).send({ status: false, msg: "Enter token in header" });

    jwt.verify(token,"Assignment-4",function(error,decoded){

      if(error)return res.status(401).send({ status: false, msg: "Invalid Token" });

      else 
      next()
   });   
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports= {userAuthentication}