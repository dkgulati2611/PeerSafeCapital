import react from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./header.css";
import img from "../../icons/loan.png";

class Header extends react.Component {
    logout = () => {
        window.sessionStorage.clear();
        window.location.replace("/");
        return true;
    }
    render(props){
        var links = {};
        let logout = (<Nav.Link onClick={this.logout} className="button_bg p-2">Logout</Nav.Link>);;
        if ( window.sessionStorage.getItem("userid") === null || window.sessionStorage.getItem("userid") === "" ){
            links = {
                "Home"      :   '/home',
                "Login"     :   '/login',
                "Market"    :   '/market',
            };
        }
        else{
            links = {
                "Home"      :   '/home',
                "Dashboard" :   '/dashboard',
                "Market"    :   '/market',
            }
        }
        return (
            <div className ="header" >
                <Navbar bg = "dark" expand = "lg" variant = "dark" className="p-3">
                    <Container fluid>
                        <Navbar.Brand href="/home"> <img className="logo" src={img} alt="img"/> <span className="p-2">PeerSafe Capital</span> </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            {
                                Object.keys(links).map(item => {
                                    return (
                                        <Nav.Link href={links[item]} className="p-2">{item}</Nav.Link>
                                    );
                                })
                            }
                            {window.sessionStorage.getItem("userid")?logout:""}
                        </Nav>
                        
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default Header;
