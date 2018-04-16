const dataBase = require('../database.js');
const ConstantMsg = require('../constants').errorMessage.eng
const ObjectID = require('mongodb').ObjectID;
const jwtDecode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    checkToken: async (req) => {
        
        try {
            
            const a = await jwt.verify(req, 'hapiproject')
            
            console.log(a);
            if (a) {
                const decoded = jwtDecode(req);
                let id7 = ObjectID(decoded._id);
                console.log(id7)
                const collection25 = await db.collection('user').find({ '_id': id7 }).toArray();
                console.log(collection25)
                if (collection25) {
                    return true
                }
                else {
                    return ConstantMsg.invalidToken;
                }
            }

            else {

                return ConstantMsg.invalidToken;
            }
        }
        catch (error) {
            return ConstantMsg.invalidToken;
        }
    },
    emailCheck: async (req) => {
        try {
            const collection1 = await db.collection('user').findOne({ email: req });
            if (collection1 == null) {
                console.log(collection1);
                return true;
            } else {
                console.log(collection1);
                return false;
            }
        }
        catch (error) {
            return error;
        }
    },


    createUser: async (req) => {
        try {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(req.password, salt);
            // req.password =hash
            // req.createdat = new Date();
            // req.modifiedat = new Date();

            let data = {

                username: req.username,
                email: req.email,
                password: hash,
                location:req.location,
                createdat: new Date(),
                modifiedat: new Date(),
            }
           
            const userCreated = db.collection('user').insertOne(data);
            //console.log(userCreated)
            return userCreated;
        }
        catch (error) {
            return error;
        }
    },

    signInEmailCheck: async (req, res) => {
        try {
            const email20 = req.email;
            const collection55 = await db.collection('user').findOne({ email: email20 });
             console.log(collection55)
            if (collection55) {
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
    signInPasswordCheck: async (req, res) => {
        try {
            const email2 = req.email;
            
            
            const collection14 = await db.collection('user').findOne({ email: email2 });
            const password6 = await bcrypt.compare(req.password,collection14.password);
            const id5 = collection14._id;
            if (password6==false) {

                return false

            }
            else {
                return id5;
            }
        }
        catch (error) {
            return error;
        }
    },


    updateUsernameByToken: async (req, res) => {
        try {
            const decoded = jwtDecode(req.headers.token);
            let id7 = ObjectID(decoded._id);

            let username5 = req.payload.username;

            // console.log(req1)
            const updateUsername = db.collection('user').update(
                { _id: id7 },
                { $set: { username: username5,modifiedat: new Date() } });

            return updateUsername
        }
        catch (error) {
            return error;
        }

    },
    updateUserPasswordByToken: async (req) => {
        try {
            const decoded = jwtDecode(req.headers.token);
            let id8 = ObjectID(decoded._id);

            let password2 = req.payload.password;

            console.log(id8)

            console.log(password2)


            const updatePassword = db.collection('user').update(
                { _id: id8 },
                { $set: { password: password2, modifiedat: new Date() } });
            return updatePassword
        }
        catch (error) {
            return error;
        }

    },
    userByToken: async (req, res) => {
        try {
            const decoded = jwtDecode(req.headers.token);
            let id9 = ObjectID(decoded._id);
            const collection5 = await db.collection('user').findOne({ _id: id9 });
            console.log(collection5);
            return collection5
        }
        catch (error) {
            return error;
        }
    },
    deleteUserByToken: async (req) => {
        try {
            const decoded = jwtDecode(req.headers.token);
            let id10 = ObjectID(decoded._id);

            const collection6 = await db.collection('user').remove({ _id: id10 });
            return collection6
        }
        catch (error) {
            return error;
        }
    },
    getUserJobByToken: async (req, res) => {
        try {
            const decoded = jwtDecode(req);
            let id6 = ObjectID(decoded._id);
            console.log(id6)
            
            const collection15 = await db.collection('user').aggregate([
                {
                    $match: { _id: id6 }
                },
                {
                    $lookup:
                        {
                            from: "job",
                            localField: "_id",
                            foreignField: "user_id",
                            as: "user_Details"
                        }
                }
            ]).toArray();
            console.log(collection15);
            return collection15;
        }
        catch (error) {
            return error;
        }
    },
    getUserJobAndJobAddressByToken: async (req, res) => {
        try {
            const decoded = jwtDecode(req);
            let id11 = ObjectID(decoded._id);
            console.log(id11)
            
            const collection16 = await db.collection('user').aggregate([
                {
                    $match: { _id: id11 }
                },
                {
                    $lookup:
                        {
                            from: "job",
                            localField: "_id",
                            foreignField: "user_id",
                            as: "user_Details"
                        }
                },
                {
                    $unwind: "$user_Details"
                },
                {
                    $lookup:
                        {
                            from: "jobaddress",
                            localField: "user_Details._id",
                            foreignField: "job_id",
                            as: "job_Details"
                        }
                },
            ]).toArray();
            console.log(collection16);
            return collection16;
        }
        catch (error) {
            return error;
        }
    },
    // deleteUserJobByToken: async (req, res) => {
    //     try {
    //         let id1 = ObjectID(req);

    //         const collection13 = await db.collection('user').aggregate([
    //             {
    //                 $match: { _id: id1 }
    //             },
    //             {
    //                 $lookup:
    //                     {
    //                         from: "job",
    //                         localField: "_id",
    //                         foreignField: "userid",
    //                         as: "user_Details"
    //                     }
    //             }
    //         ]);
    //         console.log(collection13);
    //         return collection13;
    //     }
    //     catch (error) {
    //         return error;
    //     }
    // },

    // getUserJobByEmail: async (req, res) => {
    //     try {
    //         let id1 = ObjectID.ObjectID(req);
    //         console.log("123", req);
    //         const collection8 = await db.collection('user').aggregate([
    //             {
    //                 $match: { email: req }
    //             },
    //             {
    //                 $lookup:
    //                     {
    //                         from: "job",
    //                         localField: "email",
    //                         foreignField: "email",
    //                         as: "user_Details"
    //                     }
    //             }
    //         ]).toArray();
    //         console.log(collection8);
    //         return collection8;
    //     }
    //     catch (error) {
    //         return error;
    //     }
    // },

    // getAllUserByName: async (req, res) => {
    //     try {
    //         let id2 = ObjectID.ObjectID(req);

    //         const collection7 = await db.collection('job').find({ jobid: req }).toArray();
    //         const collection9 = await db.collection('user').aggregate([
    //             { $match: { username: req } },
    //             { $sort: { username: -1 } },
    //             { $project: { _id: 1, username: 1 } }
    //         ]).toArray();
    //         console.log(collection9);
    //         return collection9;
    //     }
    //     catch (error) {
    //         return error;
    //     }
    // },

    // getSkipUsers: async (req, res) => {
    //     try {
    //         let id3 = ObjectID.ObjectID(req);
    //         console.log(req);
    //         const collection10 = await db.collection('user').find().skip(parseInt(req)).toArray();
    //         console.log(collection10);
    //         return collection10;
    //     }
    //     catch (error) {
    //         return error;
    //     }
    // },
    // limitUser: async (req, res) => {
    //     try {
    //         let id3 = ObjectID.ObjectID(req);
    //         console.log(req);
    //         const collection11 = await db.collection('user').find().limit(parseInt(req)).toArray();
    //         console.log(collection11);
    //         return collection11;
    //     }
    //     catch (error) {
    //         return error;
    //     }
    // }





}




