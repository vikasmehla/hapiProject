const Hapi = require('hapi');
const routeIndex = require('./route');
const databaseConnection = require('./database');
const Inert = require('inert');
const Vision = require('vision');
const hapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const server =  Hapi.server({ port: 3030, host: 'localhost' });

const swaggerOption ={
    info:{
        'title':'API',
        //version:Pack.version
    //    ' contact':{
    //        'name': 'vikas',
    //        'email': 'vikas0000@gmail.com'
      // }
    },
};

const init = async () => {
   
    try{
        
       
        await server.register([
            Inert,
            Vision,
            {
                plugin: hapiSwagger,
            options: swaggerOption
            }
        ]);
        
    await databaseConnection.databaseConnection1();
    await server.start();
   //console.log(routeIndex)
   server.route(routeIndex);
     
      
    

    }
    catch(error){

        return error;
    }
};
// process.on('unhandledRejection',(err)=>{
//      console.log(err)
//     process.exit(1);
// })

// process.on('uncaughtException',(err)=>{
//     console.log(err)
//    process.exit(1);
// })
// console.log("2222223333")
init();

 console.log("server started");
