const async = require('async');
const serviceIndex = require('../service');
const responseSend = require('../lib/error');
const ConstantMsg = require('../constants').errorMessage.eng

module.exports = {
    registeringJobAddress: async (req, res) => {
    
        try {
            const tokenId8 = await serviceIndex.serviceJobAddress.checkToken(req.headers.token);
            if (tokenId8 == true) {
                const status = await serviceIndex.serviceJobAddress.jobAddressCheck(req);
                console.log(status);
                if (status == false) {

                    console.log('user job address not exist already');

                    const creatingJobAddress = await serviceIndex.serviceJobAddress.createJobAddress(req);

                    console.log(creatingJobAddress)

                    return responseSend.sendSuccess(req.query, creatingJobAddress)
                }
                else {
                    console.log(status);
                    console.log('job Address already exist ');
                    return ConstantMsg.jobAddressExist;

                }
            }

            else {
                return tokenId8
            }
        }
        catch (error) {
            return error;
        }

    }






};