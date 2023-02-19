import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import Root from "./routes/Root";
import Home from "./routes/Home";
import Routines from "./routes/Routines";
import MyRoutines from "./routes/MyRoutines";
import Register from "./routes/Register";
import Login from "./routes/Login";
import ErrorPage from "./ErrorPage";
import NewRoutine from './components/NewRoutine';
import AddActivity from './components/AddActivity';
import SingleRoutine from './components/SingleRoutine';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "routines",
        element: <Routines />,
      },
      {
        path: "routines/:activityId",
        element: <AddActivity />,
      },
      {
        path: "myRoutines",
        element: <MyRoutines />,
      },      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "newRoutine",
        element: <NewRoutine />,
      },
      {
        path: "singleRoutine",
        element: <SingleRoutine />,
      },
    ],
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} /> 
      {/* create router and pass the router to router provider */}
    </div>
  );
}

export default App;
