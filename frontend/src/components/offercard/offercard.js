import react from "react";
import { Card, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./offercard.css";

class OfferCard extends react.Component {

  constructor(props){
    super(props);
    this.state = {
        data: [],
        DataisLoaded: false,
        _id: this.props.loanid,
    };
  }

    clicked = () =>{
      axios.post("/api/payemi",{
        method: "POST",
        _id :  this.state._id,
    }).then((res) => {
        if(res.data.success===true){
          this.setState({
            data: res.data.message,
            DataisLoaded: true,
          });
          alert("Your have paid the EMI .");
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
                    <th className="tabledata">Lender</th>
                    <th className="tabledata">Amount (INR) [EMI]</th>
                    <th className="tabledata">Interest Rate (%)</th>
                    <th className="tabledata">Borrowing Period ( Months )</th>
                    <th className="tabledata">EMI Date</th>
                    <th className="tabledata">EMI Left</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="tabledata">{this.props.lender}</td>
                    <td className="tabledata">{this.props.amount} [ {parseInt(this.props.emi)} ]</td>
                    <td className="tabledata">{this.props.interestrate}</td>
                    <td className="tabledata">{this.props.time}</td>
                    <td className="tabledata">{this.props.emidate}</td>
                    <td className="tabledata">{this.props.emileft}</td>
                  </tr>
                </tbody>
              </Table>
              <button className="button_bg p-2 m-3" onClick={this.clicked}><h5>Pay EMI</h5></button>
            </Card.Text>
          </Card.Body>
        </Card>
        </Container>
        <hr className="h_break"></hr>
      </>
    );
  }
}

export default OfferCard;
