function adminMiddleware (req, res, next){
try{
  const role = req.user.role;
if(role === "admin"){
  return next();
}else{
 return res.status(403).json({
    success: false,
    status: 403,
    error: "forbidden",
    data: null,
    message: "Access Denied, Don't try to access that is forbidden"
  })
}
}catch(err){
  res.status(500).json({
    success: false,
    status: 500,
    error: "server error",
    data: null,
    message: "Internal server error"
  })
}
}

export default adminMiddleware;