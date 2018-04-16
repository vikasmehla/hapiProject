const async =require('async');


const Joi = require('joi');
const controllerIndex = require('../controller');


module.exports =[
     {
        method: 'POST',
        path: '/user/signup',
       
        config: {
            description: 'signup form',
            notes: 'return the user values',
            tags: ['api'],
            plugins:{
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: {
                    username: Joi.string().min(2).max(15).error(new Error('username must be between 5 to 15 characters')).required(),
                    email: Joi.string().email().min(5).max(20).error(new Error('email must be between 5 to 15 characters')).required(),
                    password: Joi.string().min(5).max(20).error(new Error('password must be between 5 to 15 characters')).required(),
                    location:Joi.array().min(1).items(Joi.object().keys({
                        'city': Joi.string().error(new Error('city not valid')),
                        'state':Joi.string().error(new Error('state not valid')),
                        'pincode':Joi.string().error(new Error('pincode not valid'))
                    })).optional()
                
                }
        },
        handler:async function (req, res) {
           
           const signup= await controllerIndex.controllerUser.registration(req);
            return signup;
        }
   }
},

   {
    method: 'POST',
    path: '/user/signIn',
    config: {
        description: 'signIn form',
            notes: 'return the token  values',
            tags: ['api'],
            plugins:{
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
        
        validate: {
            payload: {
                
                email: Joi.string().email().required(),
                password: Joi.string().required()
            }
        }
    },
    handler: async function (req, res) {
        
      const token1 = await controllerIndex.controllerUser.signIn(req.payload);
        
         console.log("route Signin");
        return token1;
    }   
},

{
   method: 'PUT',
   path: '/user/updateUsernameByToken',
   
   config: {
    description: 'update username form',
    notes: 'return the updated username values',
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
          username: Joi.string().required()
           
           }
       }
   },

   handler:async function (req, res) {
      
      
    const usernameUpdateByToken = await controllerIndex.controllerUser.updationUsernameByToken(req);
    
     console.log("route updateUsername by token");
    return usernameUpdateByToken;
},
           

},
{
    method: 'PUT',
    path: '/user/updatePasswordByToken',
    
    config: {
        description: 'updatePassword form',
            notes: 'return the updated password  values',
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
               
             password: Joi.string().required()
            
            }
        }
    },
    handler:async function (req, res) {
        
    const updatePasswordByToken= await controllerIndex.controllerUser.updationPasswordByToken(req);
     
      console.log("route Password");
     return updatePasswordByToken;
     
 },
            
 
 },
{
    method: 'GET',
    path: '/user/getUserByToken',
    
    config: {
        description: 'get User form',
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
       
    const userByToken= await controllerIndex.controllerUser.getUserByToken(req);
     
      console.log("getting user by token");
     return userByToken;
 
    }            
 
},
{
    method: 'DELETE',
    path: '/user/deleteUserByToken',
    
    config: {
        description: 'delete form',
            notes: 'return the deleted values',
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
    
   const deleteUserByToken=  await controllerIndex.controllerUser.deleteUserByToken(req);
     
     console.log(" deleteuser by token");
     return deleteUserByToken;
    
 }
},
{
    method: 'GET',
    path: '/user/getUserJobByToken',
    
    config: {
        description: 'get UserJob form',
            notes: 'return the user job values',
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
     
    const userJobByToken= await controllerIndex.controllerUser.getUserJobByToken(req);
     
      console.log("getting user  by token");
     return userJobByToken;

}  
},
{
    method: 'GET',
    path: '/user/getUserAndJobAndJobAddressByToken',
    
    config: {
        description: 'get User andJob and job address  form',
            notes: 'return the user and job and addresvalues',
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
     
    const userJobAndJobAddressByToken= await controllerIndex.controllerUser.getUserJobAndJobAddressByToken(req);
     
      console.log("getting user job and job address  by token");
     return userJobAndJobAddressByToken;

}  
},

// {
//     method: 'DELETE',
//     path: '/deleteUserJobByToken',
    
//     config: {
//         description: 'delete form',
//             notes: 'return the delete by token values',
//             tags: ['api'],
//             plugins:{
//                 'hapi-swagger': {
//                     payloadType: 'form'
//                 }
//             },
//         // validate: {
//         //     headers: {
//         //      token: Joi.string().alphanum().required()
//         //     }
//         // }
//     },
    
//     handler: async function (req, res) {
    
//     const deleteUserJobByToken= await controllerIndex.controllerUser.deletetUserJobByToken(req);
     
//       console.log(" delete userjob by token");
//      return deleteUserJobByToken;
   
//  }
            
 
// },

// {
//     method: 'GET',
//     path: '/getAllUserByName',
    
//     config: {
//         validate: {
//             query: {
//              id: Joi.string().required()
//             }
//         }
//     },
    
//     handler: async function (req, res) {
       
//     const allUserByName= await controllerIndex.controllerUser.getAllUserByName(req.query.username);
     
//       console.log(" get  all user by name");
//      return allUserByName;
      
//  }
            
 
// },
// {
//     method: 'PUT',
//     path: '/uploadImage',
    
//     config: {
//         handler: async function (req, h) {
       
//             const image= req.payload;
//             // // console.log(image.image.path);
             
             
//              return image;
//          },
//        payload:{
//         maxBytes:209715200,
//         output: 'file',
//         parse: true,
//         uploads:'images'
//        }
//     },
    

            
 
// },
// {
//     method: 'GET',
//     path: '/skipUsers',
    
//     config: {
//         validate: {
//             query: {
//              id: Joi.string().required()
//             }
//         }
//     },
    
//     handler: async function (req, res) {
       
//     const skipUsers= await controllerIndex.controllerUser.skipUsers(req.query.skipUsers);
     
//       console.log(" get skipped users");
//      return skipUsers;
    
//  }
            
 
// },
// {
//     method: 'GET',
//     path: '/limitUser',
    
//     config: {
//         validate: {
//             query: {
//              id: Joi.string().required()
//             }
//         }
//     },
    
//     handler: async function (req, res) {
       
//     const limitUser= await controllerIndex.controllerUser.limitUser(req.query.limitUser);
     
//      console.log(" get limited users");
//      return limitUser;
    
//  }
//}
        
 

            
 

]