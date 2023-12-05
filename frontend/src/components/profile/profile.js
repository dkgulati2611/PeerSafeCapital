import react from "react";
import "./profile.css";
import {
  Row,
  Col,
  Container,
  InputGroup,
  FormControl
} from "react-bootstrap";
import profile from "../../icons/profile.png";
import axios from "axios";

class Profile extends react.Component {
  submit = (event) =>{
    event.preventDefault();
    for(var i=0;i<event.target.length-1;i++){
      if(event.target[i].value==="" || event.target[i].value===null){
        alert("Please enter the required URL !");
        return false;
      }
    }
    if(event.target[0].name==="avatar"){
      window.sessionStorage.setItem("avatar",event.target[0].value);
    }
    else if(event.target[0].name==="sslips"){
      window.sessionStorage.setItem("sslip",event.target[0].value);
    }
    axios.post("https://loan-lending-backend.adityasingh208.repl.co/api/database",{
      method: "PUT",
      type: "Users",
      _id: window.sessionStorage.getItem("userid"),
      name: window.sessionStorage.getItem("name"),
      username: window.sessionStorage.getItem("username"),
      phone: window.sessionStorage.getItem("phone"),
      email: window.sessionStorage.getItem("email"),
      address: window.sessionStorage.getItem("address"),
      loanrepaid: window.sessionStorage.getItem("completedloans"),
      country: window.sessionStorage.getItem("country"),
      aadharnum: window.sessionStorage.getItem("aadhar"),
      pannum: window.sessionStorage.getItem("pan"),
      bankname: window.sessionStorage.getItem("bank"),
      branch: window.sessionStorage.getItem("branch"),
      icode: window.sessionStorage.getItem("ifsc"),
      ctc: window.sessionStorage.getItem("ctc"),
      noloans: window.sessionStorage.getItem("activeloans"),
      photo: window.sessionStorage.getItem("avatar"),
      sslip: window.sessionStorage.getItem("sslip"),
    }).then(res=>{
      if(res.data.success===true){
        window.location.reload();
        return true;
      }
      return false;
    })
  }
  tab = (<>&ensp;&emsp;</>);
  two_space = (<>&ensp;</>);
  one_space = (<>&nbsp;</>);
  four_space = (<>&emsp;</>);
  render(props) {
    console.log(this.props.sslip==='null')
    return (
      <Container>
        <Row>
          <Col md={{ span: 5 }} className="center mt-5 mb-5">
            <img
              src={(this.props.image==="" || this.props.image===null || this.props.image==="null") ? profile : this.props.image}
              className="fit center p-3"
              style={{"border-radius":"50%","height":"200px","width":"200px"}} alt="img"
            ></img>
            <form onSubmit={this.submit}>
              <InputGroup className="mb-3 p-2">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <FormControl
                  type="link"
                  name="avatar"
                  placeholder="URL for avatar"
                  aria-label="sslips"
                  aria-describedby="basic-addon1"
                />
                <button className="button_bg p-2" type="submit">
                  Submit
                </button>
              </InputGroup>
            </form>
          </Col>
          <Col className=" p-1 mt-2">
            <h1 className="center">Personal Details</h1>
            <hr className="h_break"></hr>
            <br></br>
            <h6>
              Name{this.tab}
              {this.tab}
              {this.two_space}:{this.tab}
              {this.tab}
              {this.props.name}
            </h6>
            <h6>
              Username{this.tab}:{this.tab}
              {this.tab}
              {this.props.username}
            </h6>
            <h6>
              Phone{this.tab}
              {this.tab}
              {this.one_space}:{this.tab}
              {this.tab}
              {this.props.phone}
            </h6>
            <h6>
              Email{this.tab}
              {this.tab}
              {this.two_space}
              {this.one_space}:{this.tab}
              {this.tab}
              {this.props.Email}
            </h6>
            <h6>
              Address{this.tab}
              {this.four_space}:{this.tab}
              {this.tab}
              {this.props.address}
            </h6>
            <h6>
              Country{this.tab}
              {this.four_space}:{this.tab}
              {this.tab}
              {this.props.country}
            </h6>
            <br></br>
            <br></br>
            <hr className="h_break"></hr>
            <h1 className="center">Bank Details</h1>
            <hr className="h_break"></hr>
            <br></br>
            <h6>
              Aadhar Number{this.tab}:{this.tab}
              {this.tab}
              {this.props.aadhar}
            </h6>
            <h6>
              PAN Number{this.tab}
              {this.four_space}
              {this.one_space}:{this.tab}
              {this.tab}
              {this.props.pan}
            </h6>
            <h6>
              Bank{this.tab}
              {this.tab}
              {this.tab}
              {this.tab}
              {this.two_space}:{this.tab}
              {this.tab}
              {this.props.bank}
            </h6>
            <h6>
              Branch{this.tab}
              {this.tab}
              {this.tab}
              {this.four_space}:{this.tab}
              {this.tab}
              {this.props.branch}
            </h6>
            <h6>
              IFSC Code{this.tab}
              {this.tab}
              {this.two_space}
              {this.two_space}
              {this.one_space}:{this.tab}
              {this.tab}
              {this.props.ifsc}
            </h6>
            <h6>
              CTC{this.tab}
              {this.tab}
              {this.tab}
              {this.tab}
              {this.two_space}
              {this.two_space}:{this.tab}
              {this.tab}
              {this.props.ctc}
            </h6>
            <h6>
            Cibil{this.tab}
              {this.tab}
              {this.tab}
              {this.tab}
              {this.two_space}:{this.tab}
              {this.tab}
              {this.props.cibil}
            </h6>
            <br></br>
            <br></br>
            <hr className="h_break"></hr>
            <h1 className="center">Loan Details</h1>
            <hr className="h_break"></hr>
            <h6>
              Active Loans{this.tab}
              {this.tab}
              {this.two_space}
              {this.one_space}:{this.tab}
              {this.tab}
              {this.props.activeloans}
            </h6>
            <h6>
              Completed Loans{this.tab}:{this.tab}
              {this.tab}
              {this.props.completedloans}
            </h6>
            <br />
            <hr className="h_break"></hr>
            <h1 className="center">Update Salary Slips</h1>
            <br />
            <h6>
              Salary Slips{this.tab}:{this.tab}
              {this.tab}
              <a className="signup" href={(this.props.sslip==="" || this.props.sslip===null || this.props.sslip==="null")?"":this.props.sslip }> 
                {(this.props.sslip==="" || this.props.sslip===null || this.props.sslip==="null")?"No Link is available":"Link to data"} 
              </a>
            </h6>
            <form onsubmit={this.submit} className="center">
              <InputGroup className="mb-3 ">
                <InputGroup.Text id="basic-addon1">
                  @
                </InputGroup.Text>
                <FormControl
                  type="link"
                  name="sslips"
                  placeholder="URL for salary slip / s"
                  aria-label="sslips"
                  aria-describedby="basic-addon1"
                />
                <button className="button_bg p-2" type="submit">
                  Submit
                </button>
              </InputGroup>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Profile;
