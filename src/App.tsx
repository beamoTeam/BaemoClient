import { Redirect, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { IonReactRouter } from "@ionic/react-router";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import {
  newspaperOutline,
  personCircleOutline,
  chatboxOutline,
  addCircleOutline,
  homeOutline,
} from "ionicons/icons";
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
import MakeChat from "./pages/MakeChat";
import KakaoRedirect from "./pages/KakaoRedirect";
import MenuDetail from "./pages/MenuDetail";
import Chatting from "./pages/Chatting";
/* Components */
import GlobalHeader from "./components/header/GlobalHeader";
import ModalContainer from "./components/modal/common/ModalPortal";

setupIonicReact();

export default function App() {
  return (
    <RecoilRoot>
      <IonApp>
        <IonReactRouter>
          <GlobalHeader />
          <IonTabs>
            {/* Router */}
            <IonRouterOutlet>
              <Route exact path="/home" component={Home} />
              <Route exact path="/make-chat" component={MakeChat} />
              <Route exact path="/restaurant/:r_seq" component={Restaurant} />
              <Route exact path="/chatting" component={Chatting} />
              <Route
                exact
                path="/restaurant/:r_seq/menu/:m_seq"
                component={MenuDetail}
              />
              {/* <Route exact path="/menu/:r_seq" component={Menu} /> */}
              <Route
                exact
                path={process.env.REACT_APP_KAKAO_REDIRECT_URI}
                component={KakaoRedirect}
              />
              <Redirect to="/home" />
            </IonRouterOutlet>
            {/* Tab Menu */}
            <IonTabBar slot="bottom">
              <IonTabButton tab="schedule" href="/home">
                <IonIcon icon={homeOutline} />
                <IonLabel>홈</IonLabel>
              </IonTabButton>

              <IonTabButton tab="chat">
                <IonIcon icon={chatboxOutline} />
                <IonLabel>채팅</IonLabel>
              </IonTabButton>

              <IonTabButton tab="make-chat" href="/make-chat">
                <IonIcon icon={addCircleOutline} />
                <IonLabel>방만들기</IonLabel>
              </IonTabButton>

              <IonTabButton tab="order-history">
                <IonIcon icon={newspaperOutline} />
                <IonLabel>주문내역</IonLabel>
              </IonTabButton>

              <IonTabButton tab="profile">
                <IonIcon icon={personCircleOutline} />
                <IonLabel>프로필</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
        <ModalContainer />
      </IonApp>
    </RecoilRoot>
  );
}
