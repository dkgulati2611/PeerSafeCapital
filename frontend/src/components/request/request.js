import react from "react";
import "./request.css";
import axios from "axios";
import {
    Row,
    Col,
    Container,
} from "react-bootstrap";
import RequestCard from "../../components/request_card/request_card.js"
import Newrequest from "../../components/newrequest/newrequest";



class Request extends react.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            DataisLoaded: false,
            visible : false,
        };
    }
    componentDidMount(){
        axios.post("/api/database",{
            type: "LoanRequest",
            method: "GET",
            borrower: window.sessionStorage.getItem("userid")
        }).then((res) => {
            if(res.data.success===true){
                console.log("request: ",res);
                this.setState({
                    data: res.data.message,
                    DataisLoaded: true,
                    visible: false,
                });
            }
            
        });
    }
    
    render(props){
        if(!this.state.DataisLoaded){
            return (<> <h3> Data is loading </h3> </>)
        }
        const check = this.state.visible ? <Newrequest /> : (
            <>
                {
                    this.state.data?this.state.data.map((item)=>{
                        return <RequestCard 
                        amount = {item.amount}
                        interestrate = {item.interestrate}
                        time = {item.time}
                        finaldate = {item.finaldate}
                    />
                    }):""
                }
            </>
        );
        const bt_text = this.state.visible ? "See Previous Requests" : "Create new request";
        const show = this.state.visible ? null : "Your previous Requests";
        
        return(
            <>
            <Container>
                <Row>
                    <Col  className="center p-2">
                    <button className="button_bg p-3 m-4" onClick={ () => {
                         this.setState({visible: !this.state.visible});
                     }}
                      >
                        <h5>{bt_text}</h5>
                    </button>
                    <hr className="h_break"></hr>
                    </Col>
                </Row>
                <h3 className="p-2" >{show}</h3>
                {check}
                <br></br>
                
                
                
            </Container>
            </>
        );
    }
}

export default Request;