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
import MemberEditScreen from "./Screens/Member/MemberEditScreen";
import CustomerEditScreen from "./Screens/Customer/CustomerEditScreen";
import FatsnfRateMatrix from "./Screens/FatsnfRateMatrix/FatsnfRateMatrix";
import CompanyScreen from "./Screens/Company/CompanyScreen";
import CompanyEditScreen from "./Screens/Company/CompanyEditScreen";
import FatScreen from "./Screens/Fat/FatScreen";
import SnfScreen from "./Screens/Snf/SnfScreen";
import RoleScreen from "./Screens/Role/RoleScreen";
import VehicleTypeScreen from "./Screens/Vehicle/VehicleTypeScreen";
import VehicleScreen from "./Screens/Vehicle/VehicleScreen";
import RouteScreen from "./Screens/Route/RouteScreen";
import UserRoleScreen from "./Screens/Role/UserRoleScreen";
import DefaultUserSetting from "./Screens/DefaultUserSetting/DefaultUserSetting";
import VehicleService from "./Screens/Vehicle/VehicleService";

require("./css/App-dev.css");

function App() {
  const [waitstate, setWaitstate] = useState(true);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    
    if (
      localStorage.getItem("authtoken") !== null &&
      localStorage.getItem("authtoken") !== undefined
    ) {
      
      setAuthToken(JSON.parse(localStorage.getItem("authtoken")));
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
              authToken !== null
                ? {
                    userId: authToken.id === undefined ? 1 : authToken.id,
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
                  <Route path="MemberEditScreen/:id" element={<MemberEditScreen />} />
                  <Route path="HomeScreen" element={<HomeScreen />} />
                  <Route path="CustomerEditScreen/:id" element={<CustomerEditScreen/>}/>
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
                  <Route path="FatsnfRateMatrix" element={<FatsnfRateMatrix/>}/>
                  <Route path="CompanyScreen" element={<CompanyScreen/>}/>
                  <Route path="ComapnyEditScreen/:id" element={<CompanyEditScreen/>}/>
                  <Route path="FatScreen" element={<FatScreen/>}/>
                  <Route path="SnfScreen" element={<SnfScreen/>}/>
                  <Route path="RoleScreen" element={<RoleScreen/>}/>
                  <Route path="VehicleScreen" element={<VehicleScreen/>}/>
                  <Route path="VehicleTypeScreen" element={<VehicleTypeScreen/>}/>
                  <Route path="RouteScreen" element={<RouteScreen/>}/>
                  <Route path="UserRole" element={<UserRoleScreen/>}/>
                  <Route path="DefaultUserSetting" element={<DefaultUserSetting/>}/>
                  <Route path="VehicleService" element={<VehicleService/>}/>
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
