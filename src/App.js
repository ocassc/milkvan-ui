import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Layout, ConfigProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";

import WelcomeScreen from "./Screens/WelcomeScreen";
import { Nav } from "./Nav";
import { UserContext } from "./globalContext";

import { Footers } from "./Footers";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import HomeScreen from "./Screens/HomeScreen";
import CustomerAddScreen from "./Screens/Customer/CustomerAddScreen";
import CustomerListScreen from "./Screens/Customer/CustomerListScreen";
import MemberListScreen from "./Screens/MemberListScreen";

require("./css/App-dev.css");

function App() {
  const [waitstate, setWaitstate] = useState(true);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    debugger
    if (
      localStorage.getItem("authtoken") !== null &&
      localStorage.getItem("authtoken") !== undefined
    ) {
      setAuthToken(localStorage.getItem("authtoken"));
      setWaitstate(false);
    } else {
      setWaitstate(false);
      setAuthToken(null);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {!waitstate && (
          <UserContext.Provider
            value={
              authToken !== (null || undefined)
                ? {
                    authToken: localStorage.getItem("authtoken"),
                    config: {
                      dateFormat: "DD-MMM-YYYY",
                      datetimeFormat: "DD-MMM-YYYY HH:mm",
                      datetimeFormatWithoutYear: "DD-MMM HH:mm",
                      datetimeSecondFormat: "DD-MMM-YYYY HH:mm:ss",
                      datetimeSecondFormatAMPM: "DD-MMM-YYYY hh:mm:ss A",
                      timeFormat: "hh:mm:ss A",
                    },
                    customer: localStorage.getItem("customer"),
                  }
                : null
            }
          >
            <Layout className="layout">
              {authToken && <Nav />}
              <ConfigProvider locale={enUS}>
                <Routes>
                  <Route path="/" element={<LoginScreen />} />
                  <Route path="WelcomeScreen" element={<WelcomeScreen />} />
                  <Route path="SignupScreen" element={<SignupScreen />} />
                  <Route path="HomeScreen" element={<HomeScreen />} />
                  <Route
                    path="CustomerAddScreen"
                    element={<CustomerAddScreen />}
                  />
                  <Route
                    path="CustomerListScreen"
                    element={<CustomerListScreen />}
                  />
                  <Route
                    path="MemberListScreen"
                    element={<MemberListScreen />}
                  />
                </Routes>
              </ConfigProvider>
              <Footers />
            </Layout>
          </UserContext.Provider>
        )}
      </div>
    </BrowserRouter>
  );
}

// function DefaultContainer() {
//   const [waitstate, setWaitstate] = useState(true);

//   return (
//     <BrowserRouter >
//       <div className="App">
//         {!waitstate ? (
//           <UserContext.Provider
//         >
//             <Layout className="layout">
//               <Nav />
//               <Content className="container">
//                 <ConfigProvider locale={enUS}>
//                   <Route
//                     render={({ location }) => (
//                       <TransitionGroup>
//                         <CSSTransition
//                           key={location.key}
//                           timeout={450}
//                           classNames="fade"
//                         >
//                           {/* <Switch location={location}>
//                             <Route
//                               exact
//                               path="/dashboard"
//                               component={Dashboard}
//                             />

//                             <Route exact path="/member" component={Member} />
//                             <Route exact path="/shapes" component={Shapes} />

//                             <Route exact path="/shapeinfo" component={ShapeDetailIndex} />
//                             <Route path="*" component={NotFound} />
//                           </Switch> */}
//                         </CSSTransition>
//                       </TransitionGroup>
//                     )}
//                   />
//                 </ConfigProvider>
//               </Content>
//              <Footers/>
//             </Layout>
//           </UserContext.Provider>
//         ) : (
//           <span>Loading....</span>
//         )}
//       </div>
//     </BrowserRouter>
//   );
// }

export default App;
