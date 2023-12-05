import react from "react";
import {
  Container,
  Row,
  Col,
  Stack,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";

class Newrequest extends react.Component {
  submit = (event) => {
    event.preventDefault();
    axios.post("/api/database",{
      method: "POST",
      type: "LoanRequest",
      borrower:(window.sessionStorage.getItem("userid")),
      amount: event.target.amount.value,
      interestrate: event.target.interestrate.value,
      time: event.target.borrowingperiod.value
    }).then((res)=>{
      if(res.data.success === true){
        alert("Loan Request added successfully !");
        window.location.reload();
        return true;
      }
    })
  }
  render(props) {
    
    return (
      <>
        <Container>
          <Row>
            <Col
              xs={{ span: 1 }}
              md={{ span: 2 }}
              lg={{ span: 3 }}
              xl={{ span: 4 }}
            />

            <Col
              xs={{ span: 10 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
              xl={{ span: 4 }}
            >
              <form onSubmit={this.submit} >
                <Stack gap={2}>
                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                    <FormControl
                      name = "amount"
                      placeholder="Amount"
                      aria-label="Amount"
                      aria-describedby="basic-addon1"
                      type="number"
                    />
                  </InputGroup>
                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                    <FormControl
                      name = "interestrate"
                      placeholder="Interest rate"
                      aria-label="Interest Rate"
                      aria-describedby="basic-addon1"
                      type="number"
                      step="0.01"
                    />
                  </InputGroup>
                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                    <FormControl
                      name = "borrowingperiod"
                      placeholder="Borrowing Period"
                      aria-label="Borrowing Period"
                      aria-describedby="basic-addon1"
                      type="number"
                    />
                  </InputGroup>
                  <button className="button_bg p-2" type="submit">
                    Place a Request
                  </button>
                  <hr className="h_break" />
                </Stack>
              </form>
            </Col>

            <Col
              xs={{ span: 1 }}
              md={{ span: 2 }}
              lg={{ span: 3 }}
              xl={{ span: 4 }}
            />
          </Row>
        </Container>
      </>
    );
  }
}

export default Newrequest;
