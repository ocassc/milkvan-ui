import React from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Layout, ConfigProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";

import WelcomeScreen from "./Screens/WelcomeScreen";
import { Nav } from "./Nav";

import { Footers } from "./Footers";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import HomeScreen from "./Screens/HomeScreen";
import CustomerAddScreen from "./Screens/Customer/CustomerAddScreen";
import CustomerListScreen from "./Screens/Customer/CustomerListScreen";
import MemberListScreen from "./Screens/MemberListScreen";


require("./css/App-dev.css");


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        
          <Layout className="layout">
            {/* <Content className="container"> */}
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
                <Route path="CustomerListScreen" element={<CustomerListScreen/>}/>
                <Route path="MemberListScreen" element={<MemberListScreen/>}/>
                
              </Routes>
            </ConfigProvider>
            {/* </Content> */}
            <Footers />
          </Layout>
        
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
