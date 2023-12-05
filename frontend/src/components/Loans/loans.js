import react from "react";
import axios from "axios";

import Lcard from "../lcard/lcard.js";
import OfferCard from "../offercard/offercard.js";



class Loans extends react.Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            data1:[],
            DataisLoaded: false,
            Data1isLoaded: false,
        };
    }
    componentDidMount(){
        
        axios.post("/api/database",{
            type: "MoneyLended",
            userid: window.sessionStorage.getItem("userid"), 
            method: "GET",
        }).then((res) => {
            if(res.data.success===true){
                console.log("Money Lended : ",res);
                this.setState({
                    data: res.data.message,
                    DataisLoaded: true,
                });
            }    
        }); 
        axios.post("/api/database",{
            type: "MoneyBorrowed",
            userid: window.sessionStorage.getItem("userid"), 
            method: "GET",
        }).then((res1) => {
            if(res1.data.success===true){
                console.log("Money Borrowed : ",res1);
                this.setState({
                    data1: res1.data.message,
                    Data1isLoaded: true,
                });
            }
        });
    }

    

    render(props){
        if(!this.state.DataisLoaded && !this.state.Data1isLoaded)
        {
            return(<>
            <h3>Data is loading...</h3>
            </>)
        }
        return (
            <>
            <h3 className="p-2 mt-4" >Money Borrowed</h3>
            {
                this.state.data1?this.state.data1.map((item)=>{
                    var DATE = new Date (item.dateofemi);
                    var day, month, year;
                    day = DATE.getDate();
                    month = DATE.getMonth();
                    year = DATE.getFullYear();
                    return (<>
                        <OfferCard loanid={item._id} lender={item.lender} amount={item.amount} interestrate={item.interestrate} time={item.time} emidate={(day + "-"+  month +"-" + year)} emileft={item.emileft} emi={item.emi}/>
                    </>);
                }):""
            }
          
            <h3 className="p-2 mt-4" >Money Lended</h3>
            {
                this.state.data?this.state.data.map((item)=>{
                    var DATE = new Date (item.dateofemi);
                    var day, month, year;
                    day = DATE.getDate();
                    month = DATE.getMonth();
                    year = DATE.getFullYear();
                    return (<>
                        <Lcard borrower={item.borrower} amount={item.amount} interestrate={item.interestrate} time={item.time} emidate={(day + "-"+  month +"-" + year)} emileft={item.emileft} emi={item.emi} />
                    </>);
                }):""
            }
            </>
        );
        
    }
}

export default Loans;