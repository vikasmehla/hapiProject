module.exports={
    jobCollection: ()=>{
        db.createCollection('job',
    {
        validator:
        {
          $jsonSchema:
          {
              bsonType: "object",
              required: ["user_id","jobid","jobname","jobtype","core","basic","createdat","modifiedat"],
              additionalProperties: false,
              properties:
              {
                //_id:{},
                  user_id:{
                      bsonType:"objectId",
                      description:"'user_id' is required and is a string"
                  },
                  jobid:{
                    bsonType:"string",
                    description:"'jobid' is required and is a integer "
                },
                jobname:{
                    bsonType:"string",
                    description:"'jobname' is required and is a string"
                },
                   jobtype:{
                    bsonType:"string",
                    description:"'jobtype' is required and is a string"
                },
                  core:{
                    bsonType:"string",
                    description:"'core' is required and is a string"
                },
                basic:{
                    bsonType:"string",
                    description:"'basic' is required and is a int"
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