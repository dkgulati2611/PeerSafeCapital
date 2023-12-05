// Database imports
const URI = "mongodb+srv://newuser:1234%401234@cluster0.t1qjn.mongodb.net/test";
const Mongodb = require("mongodb");
const client = new Mongodb.MongoClient(URI);
// API Imports
var Cibil = require("../modules/cibil.js");
var EMIGen = require("../modules/emi.js");

async function get(req,res){
    try {
        // fetch request data
        let query = req.body
        let rdata = [];
        // fetch the posts
        await client.connect();
        const db = client.db("Flipr");
        if(query.type === "Users"){
            rdata = await db.collection(query.type).findOne({_id : Mongodb.ObjectID(query._id)});
        }
        else if(query.type === "Notif"){
            rdata = await db.collection("Users").findOne({_id : Mongodb.ObjectID(query._id)});
            rdata = rdata.notifications;
        }
        else if(query.type==="Login"){
            rdata = await db.collection("Users").findOne({email : query.email, password: query.password});
        }
        else if (query.type == "MoneyLended"){
            rdata = await db.collection("ActiveLoans").find({lender: Mongodb.ObjectID(query.userid)}).toArray();
        }
        else if (query.type == "MoneyBorrowed"){
            rdata = await db.collection("ActiveLoans").find({borrower: Mongodb.ObjectID(query.userid)}).toArray();
        }
        else if (query.type == "GetUsername"){
            rdata = await db.collection("Users").findOne({"_id": Mongodb.ObjectID(query.userid)});
            rdata = rdata.username;
        }
        else if(query.type == "LoanOffer"){
            rdata = await db.collection(query.type).find({"borrower": Mongodb.ObjectID(query.borrower)}).toArray();
        }
        else if(query.type == "LoanRequest"){
            rdata = await db.collection(query.type).find({"borrower": Mongodb.ObjectID(query.borrower)}).toArray();
        }
        else if(query.type == "Market"){
            rdata = await db.collection("LoanRequest").find().toArray();
        }
        else {
            rdata = await db.collection(query.type).find().toArray();
        }
        await client.close();
        // return the posts
        if(rdata === [] || rdata === null){
            return {
                message: "No Entry Found.",
                success: false,
            }
        }
        return {
            message: rdata,
            success: true,
        };
    } catch (err) {
        // return the error
        return {
            message: err.message,
            success: false,
        };
    }
}

async function update(req, res) {
    try {
        // connect to the database
        await client.connect();
        let db = client.db("Flipr");
        // get body data
        let query = req.body
        // set update data
        let udata = {};
        if(query.type === "Users"){
            let rdata = await db.collection(query.type).findOne({_id : Mongodb.ObjectID(query._id)});
            udata = {
                username: query.username,
                name: query.name,
                password: rdata.password,
                phone: query.phone,
                email: query.email,
                address: query.address,
                aadharnum: query.aadharnum,
                pannum: query.pannum,
                photo: query.photo,
                cibil: Cibil.cibil(query.noloans, query.loansrepaid),
                country: query.country,
                bankname: query.bankname,
                accountno: query.accountno,
                branch: query.branch,
                icode: query.icode,
                ctc: query.ctc,
                sslip: query.sslip,
                notifications: rdata.notifications,
                noloans: rdata.noloans,
                loansrepaid: rdata.loansrepaid,
            }
        }
        else if( query.type === "LoanHistory" ) {
            udata = {
                loanid: query.loanid,
                borrower: query.borrower,
                lender: query.lender,
                amount: query.amount,
                interestrate: query.interestrate,
                time: query.time,
                paid: query.paid,
            }
        }
        else if(query.type === "LoanRequest"){
            udata = {
                borrower: query.borrower,
                amount: query.amount,
                interestrate: query.interestrate,
                time:query.time,
                offeres: query.offers,
            }

        }
        else if(query.type === "LoanOffer"){
            if (query.accepted === "true"){
                let offer = await db.collection("LoanOffer").findOne({"_id" : Mongodb.ObjectID(query.offerid)});
                let adata = {
                    requestid: offer.requestid,
                    borrower: offer.borrower,
                    lender: offer.lender,
                    paid: false,
                    interestrate: parseFloat(offer.interestrate),
                    amount: Number(offer.amount),
                    time: offer.time,
                    date: new Date(),
                }
                let hist = await db.collection("LoanHistory").insertOne(adata);
                var d = new Date();
                d.setHours(23,59,59);
                d.setMonth(d.getMonth() + 2);
                adata = {
                    loanid : hist.insertedId,
                    borrower: offer.borrower,
                    lender: offer.lender,
                    interestrate: parseFloat(offer.interestrate),
                    amount: parseInt(offer.amount),
                    time: parseInt(offer.time),
                    emi: EMIGen.emi(parseFloat(offer.interestrate), parseInt(offer.amount), parseInt(offer.time)),
                    payable: EMIGen.emi(parseFloat(offer.interestrate), parseInt(offer.amount), parseInt(offer.time)) * parseInt(offer.time),
                    penalty : 0,
                    emileft: parseInt(offer.time),
                    dateofemi: d,
                }
                let usr = await db.collection("Users").findOne({_id : Mongodb.ObjectID(offer.borrower)});
                usr = parseInt(usr.noloans);
                usr += 1;
                await db.collection("Users").updateOne({_id: Mongodb.ObjectID(offer.borrower)}, {$set: {noloans : usr}});
                await db.collection("ActiveLoans").insertOne(adata);
                let req = await db.collection("LoanRequest").findOne({"_id":Mongodb.ObjectID(offer.requestid)});
                req = req.offeres;

                for (var i = 0; i < req.length; i++){
                    await db.collection("LoanOffer").deleteOne({"_id":req[i]});
                }
                await db.collection("LoanRequest").deleteOne({"_id":offer.requestid});
                adata = {
                    requestid: offer.requestid,
                    borrower: offer.borrower,
                    accepted: true,
                    interestrate: parseFloat(offer.interestrate),
                    amount: parseInt(offer.amount),
                    time: parseInt(offer.time),
                    finaldate: new Date(),
                }
                await db.collection("RequestHistory").insertOne(adata);
                return {
                    message: 'Data updated successfully',
                    success: true,
                };
            }
            else if(query.accepted ==="false"){
                let reqid = await db.collection("LoanOffer").findOne({"_id": Mongodb.ObjectID(query.offerid)})
                await db.collection("LoanOffer").deleteOne({"_id": Mongodb.ObjectID(query.offerid)});
                let req = await db.collection("LoanRequest").findOne({"_id":reqid.requestid});
                console.log(req)
                let ofr = req.offeres;
                let ind = ofr.indexOf(Mongodb.ObjectID(query.offerid));
                ofr.splice(ind, 1);
                await db.collection("LoanRequest").updateOne({"_id": req._id}, {$set : {offeres: ofr}});
            }
        }
        else if(query.type === "ActiveLoans"){
            udata = {
                loanid: query.loanid,
                borrower: query.borrower,
                lender: query.lender,
                amount: query.amount,
                payable: query.payable,
                interestrate: query.interestrate,
                dateofemi: query.dateofemi,
                emi: query.emi,
                penalty: query.penalty,
                emileft: query.emileft,
            }
        }
        else if(query.type === "RequestHistory"){
            udata = {
                requestid: query.requestid,
                accepted: query.accepted,
                borrower: query.borrower,
                lender: query.lender,
                amount: query.amount,
                payable: query.payable,
                interestrate: query.interestrate,
                time: query.time,
            }
        }
        else{
            return res.status(200).send({
                message: 'Invalid database type',
                success: false,
            });
        }
        // update the published status of the post
        await db.collection(query.type).updateOne({"_id": Mongodb.ObjectID(query._id)},{$set: udata});
        await client.close();
        // return a message
        return {
            message: 'Data updated successfully',
            success: true,
        };
    } catch (err) {

        // return an error
        return {
            message: err.message,
            success: false,
        };
    }
}

async function Delete(req, res) {
    try {
        // Connecting to the database
        await client.connect();
        let db = client.db("Flipr");

        // Deleting the post
        await db.collection(req.body.type).deleteOne({
            "_id": Mongodb.ObjectID(req.body._id),
        });
        await client.close();
        // returning a message
        return res.json({
            message: 'Data deleted successfully',
            success: true,
        });
    } catch (err) {
        // returning an error
        return res.json({
            message: err.message,
            success: false,
        });
    }
}

async function add(req, res) {
    try {
        // connect to database
        await client.connect();
        const db = client.db("Flipr");
        // set user query
        let query = req.body
        //  set add data
        let adata = {};
        if(query.type === "Users"){
            adata = {
                username: query.username,
                name: query.name,
                password: query.password,
                phone: query.phone,
                email: query.email,
                address: query.address,
                aadharnum: query.aadharnum,
                pannum: query.pannum,
                photo: query.photo,
                cibil: Cibil.cibil(query.noloans, query.loansrepaid),
                country: query.country,
                bankname: query.bankname,
                accountno: query.accountno,
                branch: query.branch,
                icode: query.icode,
                ctc: query.ctc,
                sslip: query.sslip,
                notifications: [],
                noloans: query.noloans,
                loansrepaid: query.loansrepaid,
                datecreated: new Date(),
            }
        }
        else if( query.type === "LoanHistory" ) {
            adata = {
                loanid: Mongodb.ObjectID(query.loanid),
                borrower: query.borrower,
                lender: query.lender,
                amount: query.amount,
                interestrate: query.interestrate,
                time: query.time,
                paid: query.paid,
                date: new Date(),
            }
        }
        else if(query.type === "LoanRequest"){
            adata = {
                borrower: Mongodb.ObjectID(query.borrower),
                amount: parseInt(query.amount),
                interestrate: parseFloat(query.interestrate),
                time:parseInt(query.time),
                offeres: [],
                date: new Date(),
            }

        }
        else if(query.type === "LoanOffer"){
            adata = {
                requestid: Mongodb.ObjectID(query.requestid),
                borrower: Mongodb.ObjectID(query.borrower),
                lender: Mongodb.ObjectID(query.lender),
                amount: parseInt(query.amount),
                interestrate: parseFloat(query.interestrate),
                time: parseInt(query.time),
                date: new Date(),
            }
            let re = await db.collection("LoanOffer").insertOne(adata);
            re = re.insertedId;
            let req = await db.collection("LoanRequest").findOne({"_id" : Mongodb.ObjectID(adata.requestid)});
            req = req.offeres;
            req.push(re);
            await db.collection("LoanRequest").updateOne({"_id" : Mongodb.ObjectID(adata.requestid)}, {$set: {"offeres" : req}});
            return {
                message: 'Data updated successfully',
                success: true,
            };
        }
        else if(query.type === "ActiveLoans"){
            adata = {
                loanid: query.loanid,
                borrower: query.borrower,
                lender: query.lender,
                amount: query.amount,
                payable: query.payable,
                interestrate: query.interestrate,
                dateofemi: query.dateofemi,
                emi: query.emi,
                penalty: query.penalty,
                emileft: query.emileft,
            }
        }
        else if(query.type === "RequestHistory"){
            adata = {
                requestid: query.requestid,
                accepted: query.accepted,
                borrower: query.borrower,
                lender: query.lender,
                amount: query.amount,
                payable: query.payable,
                interestrate: query.interestrate,
                time: query.time,
                finaldate: new Date(),
            }
        }
        else{
            return res.status(200).send({
                message: 'Invalid database type',
                success: false,
            });
        }
        // update the published status of the post
        await db.collection(query.type).insertOne(adata);
        await client.close();
        // return a message
        return {
            message: 'Data updated successfully',
            success: true,
        };
    } catch (err) {

        // return an error
        return {
            message: err.message,
            success: false,
        };
    }
}



async function handler(req, res){
    var response = {
        success: false,
        message: "Invalid Request Type ! ",
    };
    switch(req.body.method){
        case "GET"      :
            response = await get(req, res);
            break;
        case "POST"     :
            response = await add(req, res);
            break;
        case "DELETE"   :
            response = await Delete(req, res);
            break;
        case "PUT"      :
            response = await update(req, res);
            break;
    }
    console.log(`API response : ${response.success}`);
    return res.status(200).json(response);
}
exports.execute = handler;
