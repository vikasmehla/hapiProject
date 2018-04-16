const Boom = require('boom')

module.exports = {
    

    errorMessage: {
        eng: {
            emailExit: Boom.conflict("Email Already exist"),
            jobExist: Boom.conflict("job Already exist"),
            jobNotExist: Boom.conflict("job not  exist"),
            jobAddressExist: Boom.conflict("job Address Already exist"),
            userNotExist: Boom.conflict("user not exist"),
            passwordNotExist: Boom.conflict("password not exist"),
            jobIdNotExist: Boom.conflict("job id not match"),
            invalidToken:Boom.unauthorized("invalid token"),
            invalidCredentials: Boom.unauthorized("Invalid Credentials"),
            userNotFound: Boom.notFound("User Not found")
            

        }
    }
}