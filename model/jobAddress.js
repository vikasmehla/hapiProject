module.exports={
    jobCollection: ()=>{
        db.createCollection('jobaddress',
    {
        validator:
        {
          $jsonSchema:
          {
              bsonType: "object",
              //required: ["userid","jobid","jobname","jobtype","core","basic"],
              additionalProperties: false,
              properties:
              {
                //_id:{},
                  job_id:{
                      bsonType:"objectId",
                      description:"'user_id' is required and is a string"
                  },
                  jobaddress:{
                    bsonType:"string",
                    description:"'job address' is required and is a string"
                },
                createdat:{
                    bsonType:"date",
                    description:"'created date' is required and is a date"
                },
                modifiedat:{
                    bsonType:"date",
                    description:"'modified date' is required and is a date"
                }

              }
          },
        // validationLevel: 'moderate',
  //validationAction: 'error',  
        }
    });
    
    }
    }