// components
import react from "react";
import { Container, Row, Col, Stack, InputGroup, FormControl } from "react-bootstrap";
import Header from "../../components/header/header";
import axios from "axios";
// icons
import userimg from "../../icons/user.png";
import padlock from "../../icons/padlock.png";
// css
import "../../common.css";
import "./login.css";

class Login extends react.Component {
  submit = (event) => {
    event.preventDefault();
    if(event.target.email.value === null || event.target.email.value === "" || event.target.password.value === "" || event.target.password.value === null){
      alert("Plase Fill all the Fields.");
      return false;
    }
    axios.post("/api/database",{
      type: "Login",
      method: "GET",
      email: event.target.email.value,
      password: event.target.password.value,
    }).then((res)=>{
      if(res.data.success===true){
        window.sessionStorage.setItem("userid",res.data.message._id);
        window.sessionStorage.setItem("name",res.data.message.name);
        window.sessionStorage.setItem("username",res.data.message.username);
        window.sessionStorage.setItem("phone",res.data.message.phone);
        window.sessionStorage.setItem("email",res.data.message.email);
        window.sessionStorage.setItem("address",res.data.message.address);
        window.sessionStorage.setItem("completedloans",res.data.message.loansrepaid);
        window.sessionStorage.setItem("country",res.data.message.country);
        window.sessionStorage.setItem("aadhar",res.data.message.aadharnum);
        window.sessionStorage.setItem("pan",res.data.message.pannum);
        window.sessionStorage.setItem("bank",res.data.message.bankname);
        window.sessionStorage.setItem("branch",res.data.message.branch);
        window.sessionStorage.setItem("ifsc",res.data.message.icode);
        window.sessionStorage.setItem("ctc",res.data.message.ctc);
        window.sessionStorage.setItem("activeloans",res.data.message.noloans);
        window.sessionStorage.setItem("avatar",res.data.message.photo);
        window.sessionStorage.setItem("sslip", res.data.message.sslip);
        window.sessionStorage.setItem("cibil", res.data.message.cibil);
        window.location.replace("/dashboard");
        return true;
      }
      alert(`Error: ${res.data.message}`)
      return false;
    })
  }

  render() {
    if(window.sessionStorage.getItem("userid")){
      window.location.replace("/dashboard");
    }
    return (
      <>
        <Header />
        <Container>
          <Row className="vcon">
            <Col xs={{ span: 1 }} md={{ span: 2 }}  lg={{span: 3}} xl={{span: 4}}/>

            <Col xs={{ span: 10 }} md={{ span: 8 }} lg={{span: 6}} xl={{span: 4}}>
              <form onSubmit={this.submit}>
                <Stack gap={2}>
                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"><img className="img_size" src={userimg} alt="img"></img></InputGroup.Text>
                    <FormControl
                      placeholder="Email"
                      aria-label="email"
                      name="email"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <InputGroup className="mb-3 ">
                    <InputGroup.Text id="basic-addon1"><img className="img_size" src={padlock} alt="img"></img></InputGroup.Text>
                    <FormControl
                      type="password"
                      placeholder="Password"
                      aria-label="password"
                      name="password"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <button
                    className="button_bg p-2"
                    onClick={this.clicked}>
                    Login
                  </button>
                  <hr className="h_break" />
                  <h4 className="center">Didn't have an account ? <a className="signup" href = "/signup">SignUp</a></h4>
                </Stack>
              </form>
            </Col>

            <Col xs={{ span: 1 }} md={{ span: 2 }} lg={{span: 3}} xl={{span: 4}}/>
          </Row>
        </Container>
      </>
    );
  }
}

export default Login;
