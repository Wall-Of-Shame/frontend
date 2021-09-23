import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

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
import "../theme/variables.scss";

import { alarm, statsChart, person, personOutline } from "ionicons/icons";
import Challenges from "../pages/challenges";
import Profile from "../pages/profile";
import WallOfShame from "../pages/wallOfShame";
import ChallengeDetails from "../pages/challenges/details";
import CreateChallenge from "../pages/challenges/create";
import EditProfile from "../pages/profile/edit";
import Settings from "../pages/profile/settings";
import challengeIcon from "../assets/icons/challenge-icon.svg";
import shameIcon from "../assets/icons/shame-icon.svg";

import "./App.scss";

const redirectToChallenges = (): React.ReactNode => (
  <Redirect to={"/challenges"} />
);

const AuthenticatedApp: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet animated={false}>
            <Route exact path='/challenges'>
              <Challenges />
            </Route>
            <Route exact path='/challenges/create'>
              <CreateChallenge />
            </Route>
            <Route exact path='/challenges/:id/details'>
              <ChallengeDetails />
            </Route>
            <Route exact path='/wall-of-shame'>
              <WallOfShame />
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>
            <Route exact path='/profile/edit'>
              <EditProfile />
            </Route>
            <Route exact path='/profile/settings'>
              <Settings />
            </Route>
            <Route render={redirectToChallenges} />
          </IonRouterOutlet>
          <IonTabBar slot='bottom' className='tabs-nav'>
            <IonTabButton tab='challenges' href='/challenges'>
              <IonIcon src={challengeIcon} />
            </IonTabButton>
            <IonTabButton tab='wall-of-shame' href='/wall-of-shame'>
              <IonIcon src={shameIcon} />
            </IonTabButton>
            <IonTabButton tab='profile' href='/profile'>
              <IonIcon icon={personOutline} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default AuthenticatedApp;
