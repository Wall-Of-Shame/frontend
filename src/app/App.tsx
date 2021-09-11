import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { alarm, statsChart, person } from "ionicons/icons";
import Challenges from "../pages/challenges/Challenges";
import WallOfShame from "../pages/wallOfShame/WallOfShame";
import Profile from "../pages/profile/Profile";

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
import "../theme/variables.css";
import "./App.css";
import Onboarding from "../pages/onboarding/Onboarding";
import Menu from "../components/menu/Menu";
import Page from "../components/page/Page";

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId='main'>
          <Menu />
          <IonRouterOutlet id='main'>
            <Route path='/' exact={true}>
              <Redirect to='/page/Inbox' />
            </Route>
            <Route path='/page/:name' exact={true}>
              <Page />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path='/onboarding'>
              <Onboarding />
            </Route>
            <Route exact path='/challenges'>
              <Challenges />
            </Route>
            <Route exact path='/wall-of-shame'>
              <WallOfShame />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route exact path='/'>
              <Redirect to='/challenges' />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot='bottom' className='tabs-nav'>
            <IonTabButton tab='challenges' href='/challenges'>
              <IonIcon icon={alarm} />
              <IonLabel>Challenges</IonLabel>
            </IonTabButton>
            <IonTabButton tab='wall-of-shame' href='/wall-of-shame'>
              <IonIcon icon={statsChart} />
              <IonLabel>Wall of Shame</IonLabel>
            </IonTabButton>
            <IonTabButton tab='profile' href='/profile'>
              <IonIcon icon={person} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
