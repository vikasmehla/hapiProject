const async =require('async');
const Joi = require('joi');
const controllerIndex = require('../controller');


module.exports =[
     {
        method: 'POST',
        path: '/job/addJob',
       
        config: {
            description: 'addJob form',
            notes: 'return job values',
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
                   
                    jobid: Joi.string().required(),
                    jobname: Joi.string().required(),
                    jobtype: Joi.string().required(),
                    core: Joi.string().required(),
                    basic: Joi.string().required()
                }
            }
        },
        handler:async function (req, res) {
            try{
               
           const addingJob= await controllerIndex.controllerJob.registeringJob(req);
            
            return addingJob;
            }
            catch(error){
              
                return error;
            }
        }
   },
   {
    method: 'POST',
    path: '/job/createTokenForJobAddress',
    config: {
        description: 'token for job address form',
            notes: 'return the token  values',
            tags: ['api'],
            plugins:{
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
        
        validate: {
            payload: {
                
                jobname: Joi.string().required(),
                jobid: Joi.string().required()
            }
        }
    },
    handler: async function (req, res) {
        
      const token5 = await controllerIndex.controllerJob.createJobAddressToken(req.payload);
        
         console.log("job address token");
        return token5;
    }   
},
{
   method: 'PUT',
   path: '/job/updateJobNameByToken',
   
   config: {
    description: 'update Job values form',
    notes: 'return the user values',
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
            jobid: Joi.string().required(),
            jobname: Joi.string().required()
           
           }
       }
   },

   handler:async function (req, res) {
       try{
  const updateJobNameByToken=  await controllerIndex.controllerJob.updationJobNameByToken(req);
    
    
    return updateJobNameByToken
       }
       catch(error){
        return error;
    }
},
           

},
{
    method: 'PUT',
    path: '/job/updateJobTypeByToken',
    
    config: {
        description: 'update job Type form',
            notes: 'return the user values',
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
                jobid: Joi.string().required(),
                jobtype: Joi.string().required()
            
            }
        }
    },
    handler:async function (req, res) {
        try{
    const updateJobType= await controllerIndex.controllerJob.updationJobTypeByToken(req);
     
      
     return updateJobType;
        }
        catch(error){
            return error;
        }
 },
            
 
 },
{
    method: 'GET',
    path: '/job/getJobByToken',
    
    config: {
        description: 'getJob form',
            notes: 'return the user values',
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
        }
    },
    
    handler: async function (req, res) {
       try{
    const jobByToken= await controllerIndex.controllerJob.getJobByToken(req);
    return jobByToken;
     
       }
       catch(error){
        return error;
    }
 }
            
 
},
,
{
    method: 'DELETE',
    path: '/job/deleteJobByToken',
    
    config: {
        validate: {
            headers: Joi.object({
                'token': Joi.string().required()
            }).unknown(),
        }
    },
    
    handler: async function (req, res) {
      try{ 
   const deleteByToken = await controllerIndex.controllerJob.deleteJobByToken(req);
     
     
     return deleteByToken
      }
      catch(error){
        return error;
    }
 }
            
 
},
{
    method: 'GET',
    path: '/user/getJobAndJobAddressByToken',
    
    config: {
        description: 'get Job and JobAddress form',
            notes: 'return the  job and JobAddress values',
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
        }
    },
    
    handler: async function (req, res) {
     
    const jobAndJobAddressByToken= await controllerIndex.controllerJob.getJobAndJobAddressByToken(req);
     
      console.log("getting job and jobaddress  by token");
     return jobAndJobAddressByToken;

}  
},
// {
//     method: 'GET',
//     path: '/getAllJobByToken',
    
//     // config: {
//     //     validate: {
//     //         headers: {
//     //          token: Joi.string().alphanum().required()
//     //         }
//     //     }
//     // },
    
//     handler: async function (req, res) {
//        try{
//     const allJobByToken= await controllerIndex.controllerJob.getAllJobByToken(req);
     
      
//      return allJobByToken;
//        }
//        catch(error){
//         return error;
//     }
//  }
// }
]