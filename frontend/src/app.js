import react from "react";
import {Outlet} from "react-router-dom";
import "./app.css";

class App extends react.Component {
    render() {
        return (
            <>
            <Outlet />
            </>
        );
    }

}
export default App;
