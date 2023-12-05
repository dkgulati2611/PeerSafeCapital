import OfferComp from "../offercomp/offercomp.js";
import react from "react";
import axios from "axios";
import {
    Container,
} from "react-bootstrap";

class Offer extends react.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            DataisLoaded: false,
        };
    }
    componentDidMount(){
        axios.post("/api/database",{
            type: "LoanOffer",
            borrower: window.sessionStorage.getItem("userid"),
            method: "GET",
        }).then((res) => {
            if(res.data.success===true){    
                console.log("Offers: ",res);
                this.setState({
                    data: res.data.message,
                    DataisLoaded: true,
                }); 
            }
        });
    }
    render(props){
        if(!this.state.DataisLoaded){
            return (<><h3>Data is loading...</h3></>)
        }
        return(
            <>
            <br></br>
                <h3 className="p-2" >Your Offers</h3>
            <Container>
            {
                this.state.data?this.state.data.map((item)=>{
                    var DATE = new Date (item.date);
                    var day, month, year;
                    day = DATE.getDate();
                    month = DATE.getMonth();
                    year = DATE.getFullYear();
                    return (<>
                        <OfferComp id={item._id} requestid={item.requestid} lender={item.lender} amount={item.amount} interestrate={item.interestrate} time={item.time} date={day + "-"+  month +"-" + year} />
                    </>);
                }):""
                
            }
            </Container>
        
            </>
            
        );
    }
}

export default Offer;