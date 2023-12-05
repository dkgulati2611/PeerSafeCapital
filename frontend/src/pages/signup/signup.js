// components
import react from "react";
import "./signup.css";
import { Container, Row, Col, Stack, InputGroup, FormControl } from "react-bootstrap";
import Header from "../../components/header/header";
// icons
import userimg from "../../icons/user.png";
import padlock from "../../icons/padlock.png";
import phone from "../../icons/phone.png";
import email from "../../icons/email.png";
import home from "../../icons/home.png"
import pin from "../../icons/pin.png"
import card from "../../icons/card.png"
import bank from "../../icons/bank.png"
import growth from "../../icons/growth.png"
import axios from "axios";
// css
import "../../common.css";
import Footer from "../../components/footer/footer";

class Signup extends react.Component {
  submit = (event) => {
    event.preventDefault();
    for(var i=0;i<event.target.length;i++){
      if(event.target[i].value==="" || event.target[i].value===null){
        alert(`Please fill the required field : '${event.target[i].name}' .`);
        return false;
      }
    }
    axios.post("/api/database",{
      method: "POST",
      type: "Users",
      username: event.target.username.value,
      name: event.target.name.value,
      password: event.target.password.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
      address: event.target.address.value,
      aadharnum: event.target.aadharnum.value,
      pannum: event.target.pannum.value,
      noloans: 0,
      loansrepaid: 0,
      country: event.target.country.value,
      bankname: event.target.bankname.value,
      accountno: event.target.accountno.value,
      branch: event.target.branch.value,
      icode: event.target.icode.value,
      ctc: event.target.ctc.value,
    }).then((res)=>{
      if(res.data.success === true){
        alert("User added successfully !");
        window.location.replace("/login");
        return true;
      }
      alert(`Error occured, error message: ${res}`);
      return false;
    });
  }
  render() {
    if(window.sessionStorage.getItem("userid")){
      window.location.replace("/dashboard");
    }
    return (
    <>
        <Header />
        <Container>
          <Row className="p-2 mt-2 mb-2">
            <Col xs={{ span: 1 }} md={{ span: 2 }}  lg={{span: 3}} xl={{span: 4}}/>

            <Col xs={{ span: 10 }} md={{ span: 8 }} lg={{span: 6}} xl={{span: 4}}>
              <form onSubmit={this.submit}>

                <Stack gap={2}>
                  <br />
                  <h2 style={{"width": "100%", "text-align": "center"}}>Personal Details</h2>
                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"><img alt="form_image" className="img_size" src={userimg}></img></InputGroup.Text>
                    <FormControl
                      placeholder="Username"
                      name = "username"
                      aria-label="username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"><img alt="form_image" className="img_size" src={padlock}></img></InputGroup.Text>
                    <FormControl
                      type="password"
                      placeholder="Password"
                      name = "password"
                      aria-label="password"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"><img alt="form_image" className="img_size" src={userimg}></img></InputGroup.Text>
                    <FormControl
                      placeholder="Name"
                      name = "name"
                      aria-label="name"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"><img alt="form_image" className="img_size" src={phone}></img></InputGroup.Text>
                    <FormControl
                      placeholder="Phone"
                      name = "phone"
                      aria-label="phone"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"><img alt="form_image" className="img_size" src={email}></img></InputGroup.Text>
                    <FormControl
                      placeholder="Email"
                      name="email"
                      aria-label="email"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"><img alt="form_image" className="img_size" src={home}></img></InputGroup.Text>
                    <FormControl
                      placeholder="Address"
                      name="address"
                      aria-label="address"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"><img alt="form_image" className="img_size" src={pin}></img></InputGroup.Text>
                    <FormControl
                      placeholder="Country"
                      name="country"
                      aria-label="country"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"><img alt="form_image" className="img_size" src={card}></img></InputGroup.Text>
                    <FormControl
                      placeholder="Aadhaar Number"
                      aria-label="aadharnum"
                      name="aadharnum"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"><img alt="form_image" className="img_size" src={card}></img></InputGroup.Text>
                    <FormControl
                      placeholder="Pan Number"
                      aria-label="pannum"
                      name="pannum"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                    <hr className="h_break"></hr>
                  <h2 style={{"width": "100%", "text-align": "center"}} className="mt-4 mb-4">Bank Details</h2>

                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"><img alt="form_image" className="img_size" src={bank}></img></InputGroup.Text>
                    <FormControl
                      placeholder="Bank Name"
                      name="bankname"
                      aria-label="bankname"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"><img alt="form_image" className="img_size" src={card}></img></InputGroup.Text>
                    <FormControl
                      placeholder="Account Number"
                      name="accountno"
                      aria-label="accountno"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"><img alt="form_image" className="img_size" src={bank}></img></InputGroup.Text>
                    <FormControl
                      placeholder="Branch"
                      name="branch"
                      aria-label="branch"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"><img alt="form_image" className="img_size" src={card}></img></InputGroup.Text>
                    <FormControl
                      placeholder="IFSC code"
                      name="icode"
                      aria-label="icode"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"><img alt="form_image" className="img_size" src={growth}></img></InputGroup.Text>
                    <FormControl
                      placeholder="CTC"
                      name="ctc"
                      aria-label="ctc"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <button
                    className="button_bg p-2"
                    type="submit" value="signup">
                    SignUp
                  </button>
                  <h4 className="center">Already have an account ? <a className="link" href = "/login">Login</a></h4> 
                </Stack>
              </form>
            </Col>
          
            <Col xs={{ span: 1 }} md={{ span: 2 }} lg={{span: 3}} xl={{span: 4}}/>
          </Row>
        
        </Container>
        <Footer />

    </>
    );
  }

}

export default Signup;
