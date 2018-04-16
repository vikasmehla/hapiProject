const dataBase=require('../database.js');

const ObjectID = require('mongodb').ObjectID;
const jwtDecode = require('jwt-decode'); 
const responseSend = require('../lib/error');
const ConstantMsg = require('../constants').errorMessage.eng
const jwt = require('jsonwebtoken');
module.exports={
    checkToken: async(req)=>{
        try{
           
            const c= await jwt.verify(req,'hapiproject')
             console.log(c);
            if(c){  
        const decoded = jwtDecode(req);
        let id10 = ObjectID(decoded._id);
       
        console.log(id10)
      const collection33=await db.collection('job').find({_id:id10}).toArray();
      //console.log(collection33)
    
      if(collection33){
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
   jobAddressCheck: async (req,res) => {
    try{

      const decoded = jwtDecode(req.headers.token);
      let id8 = ObjectID(decoded._id);
      const  jobaddress1= req.payload.jobaddress;
    //   console.log("0000000000")
    //   console.log(jobaddress1)
    const collection41 = await db.collection('jobaddress').findOne({job_id:id8,jobaddress:jobaddress1});
    console.log(collection41)
    if(collection41){
            return true;
        } else {
            
           return false;
        }
    }
    catch(error){
     
        return error;
    }
     }, 

createJobAddress: async (req,res)=>{
    try {
        const decoded = jwtDecode(req.headers.token);
        const  id22 = ObjectID(decoded._id);
        let data3 = {
            job_id:id22,
            jobaddress:req.payload.jobaddress,
            createdat: new Date(),
            modifiedat: new Date()

        }
       const creatingCollection2=  await db.collection('jobaddress').insert(data3);
     
       return creatingCollection2;

    } catch (error) {
        console.log(error)   
    }
   
}
}



   
