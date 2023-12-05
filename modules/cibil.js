function CIBIL_score(numTaken, returnedOnTime) {
    var score;
    //Math.floor(Math.random() * (max - min + 1)) + min

    if (numTaken == 0) {
        score = Math.floor(Math.random() * (21)) + 330;

        return score;
    }

    if (returnedOnTime == 0) {
        return 300;
    }

    if (returnedOnTime < numTaken) {
        score = Math.floor(Math.random() * (11)) + 300;

        return score;
    }
    if (returnedOnTime / numTaken == 1 && numTaken >= 5) {
        score = Math.floor(Math.random() * (41)) + 800;

        return score;
    }

    if (returnedOnTime / numTaken == 1 && numTaken < 5) {
        score = Math.floor(Math.random() * (41)) + 700;

        return score;
    }

    if (returnedOnTime / numTaken >= 0.75 && numTaken >= 5) {
        score = Math.floor(Math.random() * (41)) + 650;
        return score;
    }


    if (returnedOnTime / numTaken >= 0.75 && numTaken < 5) {
        score = Math.floor(Math.random() * (41)) + 500;
        return score;
    }


    if (returnedOnTime / numTaken >= 0.5 && numTaken < 5) {
        score = Math.floor(Math.random() * (41)) + 400;

        return score;
    }

    if (returnedOnTime / numTaken >= 0.5 && numTaken >= 5) {
        score = Math.floor(Math.random() * (41)) + 450;

        return score;
    }

    if (returnedOnTime / numTaken < 0.5) {
        score = Math.floor(Math.random() + 101) + 300;

        return score;
    }
}
exports.cibil = CIBIL_score;
