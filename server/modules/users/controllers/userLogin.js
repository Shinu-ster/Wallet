const userLogin = ((req,res)=>{
    console.log(req.body)
    res.status(200).json({
        status:"Login",
    })
})
module.exports = userLogin;