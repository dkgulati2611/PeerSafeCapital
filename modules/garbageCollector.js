const Mongodb = require("mongodb");
const MongoClient = Mongodb.MongoClient;

const URI = "mongodb+srv://newuser:1234%401234@cluster0.t1qjn.mongodb.net/test";
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });


async function Beyond20days(req, res) {
    try {
        const d = new Date();
        d.setHours(0, 0, 0);
        d.setDate(d.getDate() - 20);

        // Check if the session is still valid
        if (client && client.topology && client.topology.isConnected()) {
            const db = client.db("Flipr");

            // Connect to MongoDB
            await client.connect();

            // Find documents matching the criteria
            const transactions = await db.collection("LoanRequest").find({ "Date": { $lt: d } }).toArray();

            if (transactions.length > 0) {
                // Delete documents matching the criteria
                await db.collection("LoanRequest").deleteMany({ "Date": { $lt: d } });

                const somarray = transactions.map(trans => ({
                    requestid: trans._id,
                    accepted: false,
                    borrower: trans.borrower,
                    lender: null,
                    amount: trans.amount,
                    interestrate: trans.interestrate,
                    time: trans.time,
                    finaldate: new Date(),
                }));

                // Insert new documents into RequestHistory
                await db.collection("RequestHistory").insertMany(somarray);
            } else {
                console.log("No transactions to process.");
            }

            // Return success response
            return {
                success: true,
                message: "success",
            };
        } else {
            console.error("MongoDB session has expired");
            return {
                success: false,
                message: "MongoDB session has expired",
            };
        }
    } catch (error) {
        console.error("Error in Beyond20days:", error.message);
        // Return error response
        return {
            success: false,
            message: error.message,
        };
    } finally {
        // Always close the client connection after using it
        await client.close();
    }
}


async function EMIPenalty(req, res){
    return new Promise(async (resolve, reject) => {
        try{
            var d = new Date();
            d.setHours(0,0,0);
            await client.connect();
            const db = client.db("Flipr");
            var val = await db.collection("ActiveLoans").find({
                "DateOfEMI" : {$lt : d}
            }).toArray();
            for(var i = 0; i < val.length; i++){
                val[i].Penalty += 1;
                await db.collection("ActiveLoans").updateOne({"_id": val[i]._id},{$set: val[i]});
            }
            resolve({
                success: true,
                message: "success",
            });

        }catch (err) {
            // return the error
            reject({
                success: false,
                message: err.message,
            });
        }
    });
}

async function sslipcond(req, res){
    return new Promise(async (resolve, reject) => {
        try{
            var d = new Date();
            d.setHours(0,0,0);
            d.setDate(d.getDate() - 2);
            await client.connect();
            const db = client.db("Flipr");
            let usr = await db.collection("Users").find({"sslip" : null}).toArray();
            for (var i = 0; i < usr.length; i++){
                if (usr[i].datecreated < d){
                    await db.collection("Users").deleteOne({"_id" : Mongodb.ObjectID(usr._id)});
                }
            }
            resolve({
                success: true,
                message: "success",
            });
        } catch (err) {
            // return the error
            reject({
                success: false,
                message: error.message,
            });
        }
    });

}

exports.Beyond20days = Beyond20days;
exports.EMIPenalty = EMIPenalty;
exports.sslipcond = sslipcond;