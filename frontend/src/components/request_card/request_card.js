import react from "react";
import { Card } from "react-bootstrap";
import "./request_card.css";
import tick from "../../icons/tick.png";
import cross from "../../icons/remove.png";
import Table from "react-bootstrap/Table";

class RequestCard extends react.Component {
  render(props) {
    var success = window.sessionStorage.getItem("finalstatus");
    return (
      <>
        <Card className="blue">
          <Card.Header as="h5"></Card.Header>
          <Card.Body>
            <Card.Title>
              {this.props.requestid}
              <img src={success ? tick : cross} className="img_size" alt="img"/>
            </Card.Title>
            <Card.Text>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Amount (INR)</th>
                    <th>Interest Rate (%)</th>
                    <th>Borrowing Period (yrs)</th>
                    <th>Disposal Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.props.amount}</td>
                    <td>{this.props.interestrate}</td>
                    <td>{this.props.time}</td>
                    <td>{this.props.finaldate}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Text>
          </Card.Body>
        </Card>
        <hr className="h_break"></hr>
      </>
    );
  }
}

export default RequestCard;
