 function handleAdminDashboard(req, res){
  try{
    if(req.user.role === "admin"){
      res.status(200).json({
        success: true,
        error: null,
        status: 200,
        data: null,
        message: "You are qualified to go admin dashboard."
      });
    }else{
       res.status(403).json({
        success: false,
        error: "Forbidden",
        status: 403,
        data: null,
        message: "Access Denied."
      });
    }
  }catch(err){
     res.status(500).json({
        success: true,
        error: "server error",
        status: 500,
        data: null,
        message: "Internal server error."
      });
  } 
}

export default handleAdminDashboard;