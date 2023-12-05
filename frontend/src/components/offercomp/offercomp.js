import react from "react";
import { Card, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./offercomp.css";

class OfferComp extends react.Component {

  constructor(props){
    super(props);
    this.state = {
        data: [],
        DataisLoaded: false,
        _id: this.props.id,
    };
  }

    accept = () =>{
      axios.post("/api/database",{
        method: "PUT",
        type: "LoanOffer",
        accepted: "true",
        offerid :  this.state._id,
    }).then((res) => {
        if(res.data.success===true){
          this.setState({
            data: res.data.message,
            DataisLoaded: true,
          });
          alert("Request has been accepted ! ");
          window.location.reload();
        }
      });
    }
    reject = () =>{
        axios.post("/api/database",{
          method: "PUT",
          type: "LoanOffer",
          accepted: "false",
          offerid :  this.state._id,
      }).then((res) => {
          if(res.data.success===true){
            this.setState({
              data: res.data.message,
              DataisLoaded: true,
            });
            alert("Request has been accepted ! ");
            window.location.reload();
          }
        });
      }
  render(props) { 
    return (
      <>
      <Container>
        <Card className="blue">
          <Card.Header as="h5"></Card.Header>
          <Card.Body>
            <Card.Title>
              {this.props.offerid}
            </Card.Title>
            <Card.Text>
              <Table striped bordered hover responsive="md">
                <thead>
                  <tr>
                    <th className="tabledata">Request Id</th>
                    <th className="tabledata">Lender</th>
                    <th className="tabledata">Amount (INR)</th>
                    <th className="tabledata">Interest Rate (%)</th>
                    <th className="tabledata">Borrowing Period ( Months )</th>
                    <th className="tabledata">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="tabledata">{this.props.requestid}</td>
                    <td className="tabledata">{this.props.lender}</td>
                    <td className="tabledata">{this.props.amount}</td>
                    <td className="tabledata">{this.props.interestrate}</td>
                    <td className="tabledata">{this.props.time}</td>
                    <td className="tabledata">{this.props.date}</td>
                  </tr>
                </tbody>
              </Table>
              <div style={{"textAlign": "center"}}>
                <button className="button_bg p-2 m-3" onClick={this.accept}><h5>Accept</h5></button>
                <button className="button_bg p-2 m-3" onClick={this.reject}><h5>Reject</h5></button>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
        </Container>
        <hr className="h_break"></hr>
      </>
    );
  }
}

export default OfferComp;
