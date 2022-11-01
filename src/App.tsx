import { Redirect, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { IonReactRouter } from "@ionic/react-router";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";

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
import FloatCartButton from "./components/button/FloatCartButton";
import ConfirmModal from "./components/modal/ConfirmModal";
import { KAKAO_LOGIN_LINK } from "./utils/contants";

setupIonicReact();

export default function App() {
  return (
    <RecoilRoot>
      <IonApp>
        <IonReactRouter>
          <GlobalHeader />
          {/* Router */}
          {/* <IonTabs> */}
          <IonRouterOutlet>
            <Route exact path="/home" component={Home} />
            <Route
              exact
              path="/make-group"
              render={() => {
                return Boolean(window.localStorage.getItem("access_token")) ? (
                  <MakeGroup />
                ) : (
                  <ConfirmModal
                    message="로그인이 필요한 서비스 입니다. 로그인 하시겠습니까?"
                    onConfirm={() => (window.location.href = KAKAO_LOGIN_LINK)}
                  />
                );
              }}
            />
            <Route exact path="/restaurant/:r_seq" component={Restaurant} />
            <Route
              exact
              path="/chat-list"
              component={ChatList}
              // render={() => {
              //   return Boolean(window.localStorage.getItem("access_token")) ? (
              //     <ChatList />
              //   ) : (
              //     <ConfirmModal
              //       message="로그인이 필요한 서비스 입니다. 로그인 하시겠습니까?"
              //       onConfirm={() => (window.location.href = KAKAO_LOGIN_LINK)}
              //     />
              //   );
              // }}
            />
            <Route
              exact
              path="/chatting/:chat_seq"
              render={() => {
                return Boolean(window.localStorage.getItem("access_token")) ? (
                  <Chat />
                ) : (
                  <ConfirmModal
                    message="로그인이 필요한 서비스 입니다. 로그인 하시겠습니까?"
                    onConfirm={() => (window.location.href = KAKAO_LOGIN_LINK)}
                  />
                );
              }}
            />
            <Route
              exact
              path="/restaurant/:r_seq/menu/:m_seq"
              component={MenuDetail}
            />
            <Route
              exact
              path="/cart"
              render={() => {
                return Boolean(window.localStorage.getItem("access_token")) ? (
                  <Cart />
                ) : (
                  <ConfirmModal
                    message="로그인이 필요한 서비스 입니다. 로그인 하시겠습니까?"
                    onConfirm={() => (window.location.href = KAKAO_LOGIN_LINK)}
                  />
                );
              }}
            />
            <Route
              exact
              path="/order-hisotry"
              render={() => {
                return Boolean(window.localStorage.getItem("access_token")) ? (
                  <OrderHistory />
                ) : (
                  <ConfirmModal
                    message="로그인이 필요한 서비스 입니다. 로그인 하시겠습니까?"
                    onConfirm={() => (window.location.href = KAKAO_LOGIN_LINK)}
                  />
                );
              }}
            />
            <Route
              exact
              path="/profile"
              component={Profile}
              render={() => {
                return Boolean(window.localStorage.getItem("access_token")) ? (
                  <Profile />
                ) : (
                  <ConfirmModal
                    message="로그인이 필요한 서비스 입니다. 로그인 하시겠습니까?"
                    onConfirm={() => (window.location.href = KAKAO_LOGIN_LINK)}
                  />
                );
              }}
            />

            <Route exact path="/oauth/kakao" component={KakaoRedirect} />
            <Redirect to="/home" />
          </IonRouterOutlet>
          {/* Tab Menu */}
          {/* <IonTabBar slot="bottom">
              <IonTabButton tab="schedule" href="/home">
                <IonIcon icon={homeOutline} />
                <IonLabel>홈</IonLabel>
              </IonTabButton>

              <IonTabButton tab="chatting" href="/chatting">
                <IonIcon icon={chatboxOutline} />
                <IonLabel>채팅</IonLabel>
              </IonTabButton>

              <IonTabButton tab="make-chat" href="/make-group">
                <IonIcon icon={addCircleOutline} />
                <IonLabel>방만들기</IonLabel>
              </IonTabButton>

              <IonTabButton tab="order-history" href="/order-hisotry">
                <IonIcon icon={newspaperOutline} />
                <IonLabel>주문내역</IonLabel>
              </IonTabButton>

              <IonTabButton tab="profile" href="/profile">
                <IonIcon icon={personCircleOutline} />
                <IonLabel>프로필</IonLabel>
              </IonTabButton>
            </IonTabBar> */}
          {/* </IonTabs> */}
          <FloatCartButton />
          <Footer />
        </IonReactRouter>
      </IonApp>
    </RecoilRoot>
  );
}
