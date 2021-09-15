import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonRouterOutlet,
  IonLabel,
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import "./TabRootPage.scss";
import { person, alarm, statsChart } from "ionicons/icons";
import Challenges from "./challenges";
import Profile from "./profile";
import WallOfShame from "./wallOfShame";

const TabRootPage: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
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
      <IonTabBar slot='bottom' className='nav-tabs'>
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
  );
};

export default TabRootPage;
