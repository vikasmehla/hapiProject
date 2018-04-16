
module.exports={
userCollection: ()=>{
    db.createCollection('user',
{
    validator:
    {
      $jsonSchema:
      {
          bsonType: "object",
          required: ["username","email","password"],
          additionalProperties: false,
          properties:
          {
            username:{
                  bsonType:"string",
                  description:"'username' is required and is a string"
            },
            email:{
                bsonType:"string",
                description:"'email' is required and is a string"
            },
            password:{
                bsonType:"string",
                description:"'password' is required and is a string"
            },
            location:{
                bsonType: ["array"],
                minItems: 1,
                maxItems:10,
                items: {
                    required: ["city", "state", "pincode"],
                     bsonType: "object",
                    additionalProperties: false,
                    properties: {
                        city: {
                          bsonType: "string",
                          description: "'city' must be a string and is required"
                        },
                        state: {
                          bsonType: "string",
                          description: "'state' must be a string"
                        },
                        pincode: {
                          bsonType: "string",
                          description: "'pincode' must be a integer and is required"
                        }
                    }
            }
        },
            createdat:{
                bsonType:"date",
                description:"'createdat' is required and is a date"
            },
            modifiedat:{
                bsonType:"date",
                description:"'modifiedat' is required and is a date"
            }
          }
      }  
    }
});

}
}