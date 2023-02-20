// Import Module Course Model
const userModel = require("../models/userModel");
const firebase = require("../../firebase/admin");
// const authorizedRoles = ['admin', 'co-op', 'helper'];

//ath PUT
function authMiddlewarePUT(request, response, next) {
  const authorizedRoles = ['admin', 'co-op'];
  const headerToken = request.headers.authorization;
  if (!headerToken) {
    return response.status(401).send({ message: "No token provided" });
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    return response.status(401).send({ message: "Invalid token" });
  }

  const token = headerToken.split(" ")[1];

  firebase
    .auth()
    .verifyIdToken(token)
    .then((data) => {
      // console.log(data.email);
      userModel.findOne({ email: data.email })
        .then((user) => {
          if (!user) {
            return response.status(404).send({ message: "User not found" });
          }
          if (!authorizedRoles.includes(user.role)) {
            return response.status(401).send({ message: 'Bạn không có quyền, mời bạn chim cút' });
          }
          next();
        })
        .catch((err) => response.status(500).send({ message: "An error occurred", error: err }));
    })
    .catch(() => response.status(403).send({ message: "Could not authorize" }));
}
//Auth Del
function authMiddlewareDEL(request, response, next) {
  const authorizedRoles = ['adminSpec'];
  const headerToken = request.headers.authorization;
  if (!headerToken) {
    return response.status(401).send({ message: "No token provided" });
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    return response.status(401).send({ message: "Invalid token" });
  }

  const token = headerToken.split(" ")[1];

  firebase
    .auth()
    .verifyIdToken(token)
    .then((data) => {
      // console.log(data.email);
      userModel.findOne({ email: data.email })
        .then((user) => {
          if (!user) {
            return response.status(404).send({ message: "User not found" });
          }
          // Kiểm tra xem người dùng đăng nhập bằng email có trùng với người dùng trong hệ thống hay không
          if (data.email !== user.user) {
            return response.status(401).send({ message: "You are not authorized" });
          }
          if (!authorizedRoles.includes(user.role)) {
            return response.status(401).send({ message: 'Bạn không có quyền, mời bạn chim cút' });
          }
          next();
        })
        .catch((err) => response.status(500).send({ message: "An error occurred", error: err }));
    })
    .catch(() => response.status(403).send({ message: "Could not authorize" }));
}
module.exports = {
  authMiddlewarePUT,
  authMiddlewareDEL
};
