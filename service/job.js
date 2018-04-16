const dataBase=require('../database.js');

const ObjectID = require('mongodb').ObjectID;
const jwtDecode = require('jwt-decode'); 
const responseSend = require('../lib/error');
const ConstantMsg = require('../constants').errorMessage.eng
const jwt = require('jsonwebtoken');
module.exports={
    checkToken: async(req)=>{
        try{
           
            const b= await jwt.verify(req,'hapiproject')
             console.log(b);
            if(b){  
        const decoded = jwtDecode(req);
        let id8 = ObjectID(decoded._id);
       
        console.log(id8)
      const collection32=await db.collection('user').find({_id:id8}).toArray();
      console.log(collection32)
    
      if(collection32){
          return true
      }
      else{
        return ConstantMsg.invalidToken;
      }
    }
        
        else{
            
            return ConstantMsg.invalidToken;
        }
    }
    catch(error){   
        return ConstantMsg.invalidToken;
    }
    },
   jobCheck: async (req,res) => {
    try{

      const decoded = jwtDecode(req.headers.token);
      let id8 = ObjectID(decoded._id);
      const  jobname1= req.payload.jobname;
    const collection40 = await db.collection('job').findOne({user_id:id8,jobname:jobname1});
    console.log(collection40)
    if(collection40){
            return true;
        } else {
            
           return false;
        }
    }
    catch(error){
     
        return error;
    }
     }, 

createJob: async (req,res)=>{
    try {
        const decoded = jwtDecode(req.headers.token);
        const  id22 = ObjectID(decoded._id);
        //console.log("00000000000")
        console.log(id22)
        let data2 = {
            user_id:id22,
            jobid:req.payload.jobid,
            jobname:req.payload.jobname,
            jobtype:req.payload.jobtype,
            core:req.payload.core,
            basic:req.payload.basic,
            createdat: new Date(),
            modifiedat: new Date()

        }
       const creatingCollection2=  await db.collection('job').insertOne(data2);
     //console.log("1111111111111111")
       return creatingCollection2;

    } catch (error) {
        console.log(error)   
    }
   
},
checkJobName: async (req, res) => {
    try {
        const jobname4 = req.jobname;

        const collection14 = await db.collection('job').findOne({ jobname: jobname4 });
        if (collection14) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return error;
    }
},
checkJobId: async (req, res) => {
    try {
        
        
        
        const collection15 = await db.collection('job').findOne({ jobname: req.jobname,jobid:req.jobid });
       
        if (collection15) {
            const id6=collection15._id;
            return id6;

        }
        else {
            return false;
        }
    }
    catch (error) {
        return error;
    }
},
updateJobNameByToken: async (req)=>{
    const decoded = jwtDecode(req.headers.token);
    const  id21 = ObjectID(decoded._id);
    const jobid1= req.payload.jobid;

    const collection3= await db.collection('job').update(
        { user_id: id21,jobid: jobid1},
        { $set: { jobname: req.payload.jobname}});
      return collection3;
 },
 updateJobTypeByToken: async (req)=>{
    const decoded = jwtDecode(req.headers.token);
    const  id22 = ObjectID(decoded._id);
    const jobid2= req.payload.jobid;
    const collection4=db.collection('job').update(
        { user_id: id22,jobid: jobid2},
        { $set: {  jobtype: req.payload.jobtype }});
      
 },
 jobByToken: async(req,res)=>{
     try{
        const decoded = jwtDecode(req.headers.token);
        const  id23 = ObjectID(decoded._id);
     const collection5 = await db.collection('job').findOne({user_id:id23});
      
     return collection5;
     }
     catch(error){
        return error;
    }
 },

deleteJobByToken: async(req,res)=>{
    try{
        const decoded = jwtDecode(req.headers.token);
        const  id24 = ObjectID(decoded._id);
     
    const collection6 = await db.collection('job').remove({user_id:id24});
     
    return collection6
    }
    catch(error){
        return error;
    }
},
getJobAndJobAddressByToken: async (req, res) => {
    try {
        const decoded = jwtDecode(req);
        let id14 = ObjectID(decoded._id);
        console.log(id14)
        
        const collection45 = await db.collection('job').aggregate([
            {
                $match: { _id: id14 }
            },
            {
                $lookup:
                    {
                        from: "jobaddress",
                        localField: "_id",
                        foreignField: "job_id",
                        as: "job_Details"
                    }
            }
        ]).toArray();
        console.log(collection45);
        return collection45;
    }
    catch (error) {
        return error;
    }
},
// allJobByToken: async(req,res)=>{
//     try{
//         const decoded = jwtDecode(req.headers.token);
//         const  id25 = ObjectID(decoded._id);
     
//     const collection7 = await db.collection('job').find({userid:id25}).toArray();
     
//     return collection7;
//     }
//     catch(error){
//         return error;
//     }
// }
}



   
