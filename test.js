exports.handleTest = function(req,res) {
  let testString = req.body.q;
  res.send(testString);
}
