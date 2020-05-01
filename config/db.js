const crypto = require('crypto').randomBytes(256).toString('hex');


module.exports= {
    //uri:"mongodb://localhost:27017/MXiansPortal",
    uri:"mongodb+srv://dhanumdp:mcadhanu@dhanumdp-brslm.mongodb.net/MXiansPortal?retryWrites=true&w=majority",
    secret:crypto
}
