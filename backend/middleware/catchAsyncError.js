module.exports = (myFun) => (req, res, next) => {
  Promise.resolve(myFun(req, res, next)).catch(next);
};
