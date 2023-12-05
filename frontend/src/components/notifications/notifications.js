import react from "react";
import NotificationCard from "../notification_card/notification_card";
import axios from "axios";

class Notifications extends react.Component {
  constructor(props){
    super(props);
    this.state = {
      notifications: [],
      notificationsisloaded: false,
    }
  }
  componentDidMount(){
    axios.post("/api/database",{
      type: "Notif",
      _id: window.sessionStorage.getItem("userid"),
      method: "GET",
    }).then((res) => {
      if(res.data.success===true){
        console.log("Notifications",res.data.message);
        this.setState({
          notifications: res.data.message,
          notificationsisloaded: true,
        })
      }
    });
  }
  render(props) {
    if(!this.state.notificationsisloaded){
      return <>Loading notifications</>
    }
    return (
      <>
        <h2 className="m-2 p-2 center">Your Notifications</h2>
        {
            this.state.notifications?this.state.notifications.map((item)=>{
              var DATE = new Date (item.time);
              return <><NotificationCard notificationtext={item.msg} hour={DATE.getHours()} min={DATE.getMinutes()} /></>
            }):""
        }
      </>
    );
  }
}

export default Notifications;
