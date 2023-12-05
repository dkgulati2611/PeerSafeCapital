function EMI(interestRate, amount, time){
    var RepayableAmount = amount*((1 + (interestRate*1.0)/100)**time);

    var emi = RepayableAmount/time;


    return emi;
}

exports.emi = EMI;
