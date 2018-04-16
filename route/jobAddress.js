const async =require('async');
const Joi = require('joi');
const controllerIndex = require('../controller');


module.exports =[
     {
        method: 'POST',
        path: '/address/addJobAddress',
       
        config: {
            description: 'addJobAddress method form',
            notes: 'return job Address values',
            tags: ['api'],
            plugins:{
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                headers: Joi.object({
                    'token': Joi.string().required()
                }).unknown(),
                payload: {
                   
                    jobaddress: Joi.string().required()
                }
            }
        },
        handler:async function (req, res) {
            try{
                
           const addingJobAddress= await controllerIndex.controllerJobAddress.registeringJobAddress(req);
            
            return addingJobAddress;
            }
            catch(error){
              
                return error;
            }
        }
   }     
 
]