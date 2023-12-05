import react from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./dheader.css";
import img from "../../icons/loan.png";
import profile from "../../icons/profile.png";
import notification from "../../icons/notification.png";

class Dheader extends react.Component {
  logout = () => {
    window.sessionStorage.clear();
    window.location.replace("/");
    return true;
}
  opennotification = () => {
    document.getElementById("controlled-tab-tab-notifications").click();
  };
  render(props) {
    let logout = (<button onClick={this.logout} className="button_bg p-2">Logout</button>);;
    return (
      <div className="header">
        <Navbar bg="dark" expand="sm" variant="dark" className="p-3">
          <Container fluid>
            <Navbar.Brand className="rt" href="/home">
              {" "}
              <img className="logo " src={img} alt="img" />{" "}
              <span className="p-2 ">PeerSafe Capital</span>{" "}
            </Navbar.Brand>
            <Nav className="dlinks">
              <Nav.Link onClick={this.opennotification}>
                <img src={notification} className="img_size" alt="img"></img>
              </Nav.Link>
              <Nav.Link href="/dashboard">
                Hey, <b>{this.props.username}</b> !
                <img 
                src={(window.sessionStorage.getItem("avatar")==="" || 
                window.sessionStorage.getItem("avatar")===null || 
                window.sessionStorage.getItem("avatar")==="null")?profile:window.sessionStorage.getItem("avatar")} 
                style={{"border-radius": "50%", "height": "45px", "width":"45px"}} className="img_size" alt="img"></img>
              </Nav.Link>
              {window.sessionStorage.getItem("userid")?logout:""}
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Dheader;
