const async=require('async');
const serviceIndex = require('../service');
const responseSend = require('../lib/error');
const ConstantMsg = require('../constants').errorMessage.eng
const jwt = require('jsonwebtoken');

module.exports = {
         registration: async (req)=>{
             try{
                 
           let status = await serviceIndex.serviceUser.emailCheck(req.payload.email);
           if(status==true){
             console.log(status);
             console.log('user not existt already');
             
          const createUser=  await serviceIndex.serviceUser.createUser(req.payload);
            return responseSend.sendSuccess(req.query,createUser)
           }
           else{
            console.log(status);
             console.log('already exist');
            return ConstantMsg.emailExit;
            
               
           }
             }
             catch(error){
                 return responseSend.sendError(error);
             }

        },

        signIn: async (req,res)=>{
            try{
          
          let status = await serviceIndex.serviceUser.signInEmailCheck(req);
          
           if(status==false){
               
                 return ConstantMsg.userNotExist;           }
           
            else{
              let status1 = await serviceIndex.serviceUser.signInPasswordCheck(req);
              
              if(status1== false){
                  return ConstantMsg.passwordNotExist;
              }
              else{
                console.log(status)
                console.log(status1)
                  const privatekey = 'hapiproject';
                  const token = jwt.sign({_id:status1},privatekey, {algorithm:'HS256'})
                  console.log(token)
                  return responseSend.sendSuccess(req.query,token)
              }
              
            }
        }
            catch(error){
                return responseSend.sendError(error);
            }
 
        },
      



        updationUsernameByToken: async (req,res)=>{
            try{ 
           const tokenId = await serviceIndex.serviceUser.checkToken(req.headers.token);  
           if(tokenId==true){
          const usernameUpdateByToken= await serviceIndex.serviceUser.updateUsernameByToken(req);
          console.log(usernameUpdateByToken)
          return responseSend.sendSuccess(req.query,usernameUpdateByToken)
        }
            
          else{
             // console.log(tokenId)
              return tokenId
          }
            }
            catch(error){
                return error;
            }

       },
       updationPasswordByToken: async (req,res)=>{
           try{ 
            const tokenId1 = await serviceIndex.serviceUser.checkToken(req.headers.token);  
            if(tokenId1==true){
          
       const updatePasswordByToken= await serviceIndex.serviceUser.updateUserPasswordByToken(req);
       return responseSend.sendSuccess(req.query,updatePasswordByToken)
            }
            else{
                return tokenId1
            }
           }
           catch(error){
            return error;
        }
    },

    getUserByToken: async (req,res)=>{
        try{
            const tokenId2 = await serviceIndex.serviceUser.checkToken(req.headers.token);  
            if(tokenId2==true){
      const userByToken =  await serviceIndex.serviceUser.userByToken(req);
        return responseSend.sendSuccess(req.query,userByToken)
        }
    
    else{
             return tokenId2
    }
}
        catch(error){
            return error;
        }
            
    },
    deleteUserByToken: async (req)=>{
        try{
            
                const tokenId3 = await serviceIndex.serviceUser.checkToken(req.headers.token);  
                if(tokenId3==true){
        const deleteUserByToken= await serviceIndex.serviceUser.deleteUserByToken(req);
      return responseSend.sendSuccess(req.query,deleteUserByToken)
        }
        else{
            return tokenId3
        }
    }
        catch(error){
            return error;
        }  
    }, 
    getUserJobByToken: async (req,res)=>{
        try{
            
            let tokenId10 = await serviceIndex.serviceUser.checkToken(req.headers.token);  
            console.log(tokenId10)
           
                if(tokenId10==true){
                    
       const getUserJobByToken= await serviceIndex.serviceUser.getUserJobByToken(req.headers.token);
            return  responseSend.sendSuccess(req.query,getUserJobByToken)
        }
        else {
            return tokenId10
        }
    }
        catch(error){
        
            
           return error;
       }
    },
    getUserJobAndJobAddressByToken: async (req,res)=>{
        try{
            
            let tokenId11 = await serviceIndex.serviceUser.checkToken(req.headers.token);  
            console.log(tokenId11)
           
                if(tokenId11==true){
                    
       const getUserJobAndJobAddressByToken= await serviceIndex.serviceUser.getUserJobAndJobAddressByToken(req.headers.token);
            return  responseSend.sendSuccess(req.query,getUserJobAndJobAddressByToken)
        }
        else {
            return tokenId11
        }
    }
        catch(error){
        
            
           return error;
       }
    },
   
    // deleteUserJobByToken: async (req,res)=>{
    //     try{
    //         const tokenId5 = await serviceIndex.serviceUser.checkToken(req.headers.token);  
    //             if(tokenId5==true){
    //     const deleteUserJobByToken=await serviceIndex.serviceUser.deleteUserJobByToken(req);
    //     return deleteUserJobByToken;
    //     }
    //     else{
    //         return tokenId5
    //     }
    // }
    //     catch(error){
    //         return error;
    //     }     
    // },

    // getUserJobByEmail: async (req,res)=>{
    //     try{
    //     const userJobByEmail=await serviceIndex.serviceUser.getUserJobByEmail(req);
    //     return userJobByEmail;
    // }
    // catch(error){
    //     return error;
    // }
            
    // },

    // getAllUserByName: async (req,res)=>{
    //     try{
    //    const allUserByName= await serviceIndex.serviceUser.getAllUserByName(req);
    //         return  allUserByName;
    //     }
    //     catch(error){
    //         return error;
    //     }
    // },
    //  skipUsers: async (req,res)=>{
    //      try{
    //     const skipUsers= await serviceIndex.serviceUser.getSkipUsers(req);
    //          return  skipUsers;
    //      }
    //      catch(error){
    //         return error;
    //     }
    //  },
    //  limitUser: async (req,res)=>{
    //      try{
    //     const limitUser= await serviceIndex.serviceUser.limitUser(req);
    //          return  limitUser;
    //      }
    //      catch(error){
    //         return error;
    //     }
    //  }
     


     
             
    

    

}