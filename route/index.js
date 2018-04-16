const lodash = require('lodash')
const routeUser= require('./user.js');
const routeJob= require('./job.js');
const routeJobAddress = require('./jobAddress.js')
// console.log("111111111111111",routeUser)
// console.log("routeJob",routeJob)
// console.log("routeJobcccccccccccccccccccccccc",c)
//const route = []
//const allRoutes = lodash.concat([], jobAddress)
//const allRoutes=[].concat(routeJobAddress)
const allRoutes=[].concat(routeUser, routeJob,routeJobAddress)
// let allRoutes =  {};
// allRoutes.routeUser;
// allRoutes.routeJob;
// allRoutes.routeJobAddress;
//console.log("here s issue====",allRoutes)

module.exports = allRoutes;
