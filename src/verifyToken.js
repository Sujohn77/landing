let response = require("../response");

module.exports = function(req,res,next)  {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        req.token = header;
        next();
    } else {
        response = {
            resultCode: 1,
            data: {},
            message: "Token wasn't passed"
        };

        res.json(response);
    }
};