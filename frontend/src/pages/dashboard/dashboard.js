import react from "react";
import "./dashboard.css";
import Dheader from "../../components/dheader/dheader.js";
import Profile from "../../components/profile/profile.js";
import Footer from "../../components/footer/footer.js";
import Request from "../../components/request/request.js";
import { Tabs, Tab, Row, Col, Container } from "react-bootstrap";
import Notifications from "../../components/notifications/notifications";
import Offer from "../../components/offers/offers";
import Loans from "../../components/Loans/loans";

class Dashboard extends react.Component {
  render() {
    if(!window.sessionStorage.getItem("userid")){
      window.location.replace("/login");
      return <>Unauthenticated access ! redirecting...</>;
    }
    return (
      <>
        <Dheader username = {window.sessionStorage.getItem("name")? window.sessionStorage.getItem("name") : "User"} />
        <Container className="bg-dark flex-column mt-4 mb-4 p-5">
          <Row>
            <Col>
              <Tabs
                defaultActiveKey="profile"
                id="controlled-tab"
                className="tabs"
              >
                <Tab eventKey="profile" title="Profile" className="tabs">
                  <Profile
                    name={window.sessionStorage.getItem("name")}
                    username={window.sessionStorage.getItem("username")}
                    phone={window.sessionStorage.getItem("phone")}
                    Email={window.sessionStorage.getItem("email")}
                    address={window.sessionStorage.getItem("address")}
                    country={window.sessionStorage.getItem("country")}
                    aadhar={window.sessionStorage.getItem("aadhar")}
                    pan={window.sessionStorage.getItem("pan")}
                    bank={window.sessionStorage.getItem("bank")}
                    branch={window.sessionStorage.getItem("branch")}
                    ifsc={window.sessionStorage.getItem("ifsc")}
                    ctc={window.sessionStorage.getItem("ctc")}
                    activeloans={window.sessionStorage.getItem("activeloans")}
                    completedloans={window.sessionStorage.getItem("completedloans")}
                    image={window.sessionStorage.getItem("avatar")}
                    sslip={window.sessionStorage.getItem("sslip")}
                    cibil={window.sessionStorage.getItem("cibil")}
                  />
                </Tab>
                <Tab eventKey="home" title="Requests">
                  <Request />
                </Tab>
                <Tab eventKey="offers" title="Offers">
                  <Offer />
                </Tab>
                <Tab eventKey="loans" title="Loans">
                  <Loans />
                </Tab>
                <Tab eventKey="notifications" title="Notifications" className="tabs">
                  <Notifications />
                </Tab>


              </Tabs>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}
export default Dashboard;
