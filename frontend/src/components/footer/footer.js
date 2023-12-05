// imports
import { Container, Row, Col } from "react-bootstrap";
import react from "react";
// css
import "./footer.css";
// icons
import logo from "../../icons/loan.png";
import gmail from "../../icons/gmail.png";
import twitter from "../../icons/twitter.png";
import instagram from "../../icons/instagram.png";
import facebook from "../../icons/facebook.png";

class Footer extends react.Component {
    render(){
        return (
            <div>
                <Container fluid className="bg-dark mt-2" style={{"color": "white",}}>
                    <Row className="p-5">
                        <Col md={{span: 6}} style={{"font-size": "3em"}} className="p-2 center_align">
                            <img className="logo_big" src={logo} alt="img"/> Lending Platform
                        </Col>
                        <Col md={{span: 6}} style={{"font-size": "1.2em"}} className="p-2">
                            <Container fluid ClassName="logoContainer">
                                <Row>
                                    <Col>
                                        Our platform enables people to
                                        connect with other people
                                        according to their needs. People
                                        can either take a loan or give
                                        away a loan as per their
                                        convenience and the platform will
                                        find an apt match for the receiver
                                        as well as the lender. The platform
                                        is secure, keeps the credit score of
                                        each user, ensures safety and takes
                                        responsibility of all the information
                                        and possession for everyone who joins
                                        the community to help each other in need
                                        and grow for a better tomorrow.
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <Row className="p-5">
                        <Col md={{span: 1}} style={{"font-size": "3em"}}>
                            {/* empty to set icons in center */}
                        </Col>
                        <Col md={{span: 2
                        }} style={{"font-size": "3em"}} className="p-2 center_align">
                            <img className="logo_medium" src={gmail} alt="img"/>
                        </Col>
                        <Col md={{span: 2}} style={{"font-size": "3em"}} className="p-2 center_align">
                            <img className="logo_medium" src={twitter} alt="img" />
                        </Col>
                        <Col md={{span: 2}} style={{"font-size": "3em"}} className="p-2 center_align">
                            <img className="logo_medium" src={facebook} alt="img"/>
                        </Col>
                        <Col md={{span: 2}} style={{"font-size": "3em"}} className="p-2 center_align">
                            <img className="logo_medium" src={instagram} alt="img"/>
                        </Col>
                        <Col md={{span: 1}} style={{"font-size": "3em"}}>

                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Footer;
