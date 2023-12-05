import react from "react";
import {
    Card,
    Table,
    Container,
} from "react-bootstrap";


class Lcard extends react.Component {
    render(props){
        
        return(
            <>
            <Container>
                <br />
                
                <Card className="blue">
          <Card.Header as="h5"></Card.Header>
          <Card.Body>
            <Card.Title>{this.props.requestid}</Card.Title>
            <Card.Text>
              <Table striped bordered hover responsive="md">
                <thead>
                  <tr>
                    <th className="tabledata">Borrower</th>
                    <th className="tabledata">Amount (INR) [EMI]</th>
                    <th className="tabledata">Interest Rate (%)</th>
                    <th className="tabledata">Borrowing Period (months)</th>
                    <th className="tabledata">EMI Date</th>
                    <th className="tabledata">EMI Left</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="tabledata">{this.props.borrower}</td>
                    <td className="tabledata">{this.props.amount} [{parseInt(this.props.emi)}]</td>
                    <td className="tabledata">{this.props.interestrate}</td>
                    <td className="tabledata">{this.props.time}</td>
                    <td className="tabledata">{this.props.emidate}</td>
                    <td className="tabledata">{this.props.emileft}</td>
                  </tr>
                    
                    </tbody>
              </Table>
            </Card.Text>
          </Card.Body>
        </Card>
                </Container>
                <hr className="h_break"></hr>
            </>
        );
    }
}

export default Lcard;