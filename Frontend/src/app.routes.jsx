import {createBrowserRouter} from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";


const routes = createBrowserRouter([
    {
       path:"/login" ,
       element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/",
        element: <Protected><Home/></Protected>
    },
    {
        path:"/interview/report/:interviewId",
        element: <Protected><Interview/></Protected>
    }
])

export {routes};