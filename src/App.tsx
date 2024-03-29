import React, { Suspense } from "react";
import { Redirect, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { IonReactRouter } from "@ionic/react-router";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import PrivateRoute from "./pages/PrivateRoute";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Page */
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import MakeGroup from "./pages/MakeGroup";
import KakaoRedirect from "./pages/KakaoRedirect";
import MenuDetail from "./pages/MenuDetail";
import Chat from "./pages/Chat";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";
import ChatList from "./pages/ChatList";
/* Components */
import GlobalHeader from "./components/header/GlobalHeader";
import Footer from "./components/footer/Footer";
/* Admin */
const Admin = React.lazy(() => import("./admin/Admin"));

setupIonicReact();

export default function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <RecoilRoot>
        <IonApp>
          <IonReactRouter>
            <GlobalHeader />
            {/* Router */}
            <IonRouterOutlet>
              <Route exact path="/home" component={Home} />
              {/* <PrivateRoute> */}
                <Route exact path="/make-group" component={MakeGroup} />
                <Route exact path="/restaurant/:r_seq" component={Restaurant} />
                <Route exact path="/chat-list" component={ChatList} />
                <Route exact path="/chatting/:chat_seq" component={Chat} />
                <Route
                  exact
                  path="/restaurant/:r_seq/menu/:m_seq"
                  component={MenuDetail}
                />
                <Route exact path="/cart/:chat_seq" component={Cart} />
                <Route exact path="/order-hisotry" component={OrderHistory} />
                <Route exact path="/profile" component={Profile} />
              {/* </PrivateRoute> */}
              <Route exact path="/oauth/kakao" component={KakaoRedirect} />
              <Route exact path="/store/:r_seq" component={Admin} />
              <Redirect to="/home" />
            </IonRouterOutlet>
            <Footer />
          </IonReactRouter>
        </IonApp>
      </RecoilRoot>
    </Suspense>
  );
}
