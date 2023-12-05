const garbage = require("./garbageCollector");

async function schedule() {
    try {
        const emiResult = await garbage.EMIPenalty();
        const beyond20DaysResult = await garbage.Beyond20days();
        const sslipCondResult = await garbage.sslipcond();

        // Use the results if needed

        console.log("Schedule completed successfully");
    } catch (error) {
        console.error("Error in schedule:", error.message);
        // Handle the error appropriately
    }
}

exports.func = schedule;
