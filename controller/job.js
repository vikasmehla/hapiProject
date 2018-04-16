const async = require('async');
const serviceIndex = require('../service');
const responseSend = require('../lib/error');
const ConstantMsg = require('../constants').errorMessage.eng
const jwt = require('jsonwebtoken');

module.exports = {
    registeringJob: async (req, res) => {
    
        try {
           
            const tokenId6 = await serviceIndex.serviceJob.checkToken(req.headers.token);
            
            if (tokenId6 == true) {
                
                console.log(tokenId6)
                const status = await serviceIndex.serviceJob.jobCheck(req);
                
                console.log(status);
                if (status == false) {

                    console.log('user job not existt already');

                    const creatingJob = await serviceIndex.serviceJob.createJob(req);

                    console.log(creatingJob)

                    return responseSend.sendSuccess(req.query, creatingJob)
                }
                else {
                    console.log(status);
                    console.log('job already exist ');
                    return ConstantMsg.jobExist;

                }
            }

            else {
                return tokenId6
            }
        }
        catch (error) {
            return error;
        }

    },
    createJobAddressToken: async (req,res)=>{
        try{
     
      let status = await serviceIndex.serviceJob.checkJobName(req);
      
       if(status==false){
             return ConstantMsg.jobNotExist;           }
       
        else{
          let status2 = await serviceIndex.serviceJob.checkJobId(req);
          
          if(status2== false){
              return ConstantMsg.jobIdNotExist;
          }
          else{
            console.log(status)
            console.log(status2)
              const privatekey = 'hapiproject';
              const token = jwt.sign({_id:status2},privatekey, {algorithm:'HS256'})
              console.log(token)
              return responseSend.sendSuccess(req.query,token)
          }
          
        }
    }
        catch(error){
            return responseSend.sendError(error);
        }

    },
    updationJobNameByToken: async (req, res) => {
        try {
            let tokenId11 = await serviceIndex.serviceJob.checkToken(req.headers.token);  
            console.log(tokenId11)
           
                if(tokenId11==true){

            const jobUpdate = await serviceIndex.serviceJob.updateJobNameByToken(req);
            return responseSend.sendSuccess(req.query, jobUpdate)
        }
        return tokenId11
    }
        catch (error) {
            return error;
        }

    },
    updationJobTypeByToken: async (req, res) => {
        try {
            let tokenId12 = await serviceIndex.serviceJob.checkToken(req.headers.token);  
            console.log(tokenId12)
           
                if(tokenId12==true){

            const updateJobType = await serviceIndex.serviceJob.updateJobTypeByToken(req);
            return responseSend.sendSuccess(req.query, updateJobType)
        }
        else{
            return tokenId12
        }
    }
        catch (error) {
            return error;
        }
    },

    getJobByToken: async (req, res) => {
        try {
            let tokenId13 = await serviceIndex.serviceJob.checkToken(req.headers.token);  
            console.log(tokenId13)
           
                if(tokenId13==true){
            const jobByToken = await serviceIndex.serviceJob.jobByToken(req);
            return responseSend.sendSuccess(req.query, jobByToken)
        }
        else{
            return tokenId13
        }
    }
        catch (error) {
            return error;
        }

    },

    deleteJobByToken: async (req, res) => {
        try {
            let tokenId14 = await serviceIndex.serviceJob.checkToken(req.headers.token);  
            console.log(tokenId14)
           
                if(tokenId14==true){
            const deleteByToken = await serviceIndex.serviceJob.deleteJobByToken(req);
            return responseSend.sendSuccess(req.query, deleteByToken)
        }
        else{
            return tokenId14
        }
    }
        catch (error) {
            return error;
        }
    },
    getJobAndJobAddressByToken: async (req,res)=>{
        try{
            
            let tokenId10 = await serviceIndex.serviceJob.checkToken(req.headers.token);  
            console.log(tokenId22)
           
                if(tokenId22==true){
                    
       const getJobAndJobAddressByToken= await serviceIndex.serviceJob.getJobAndJobAddressByToken(req.headers.token);
            return  responseSend.sendSuccess(req.query,getJobAndJobAddressByToken)
        }
        else {
            return tokenId22
        }
    }
        catch(error){
        
            
           return error;
       }
    },
    // getAllJobByToken: async (req, res) => {
    //     try {
    //         const jobByToken = await serviceIndex.serviceJob.allJobByToken(req);
    //         //console.log()
    //         return responseSend.sendSuccess(req.query, jobByToken)
    //     }
    //     catch (error) {
    //         return error;
    //     }
    // }






};