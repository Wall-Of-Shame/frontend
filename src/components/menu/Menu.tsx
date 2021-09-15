import {
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonRow,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import { person, alarm, statsChart } from "ionicons/icons";
import "./Menu.scss";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Challenges",
    url: "/challenges",
    iosIcon: alarm,
    mdIcon: alarm,
  },
  {
    title: "Wall of Shame",
    url: "/wall-of-shame",
    iosIcon: statsChart,
    mdIcon: statsChart,
  },
  {
    title: "Profile",
    url: "/profile",
    iosIcon: person,
    mdIcon: person,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId='main' type='overlay' className='nav-menu'>
      <IonContent>
        <IonGrid>
          <IonRow className='ion-justify-content-center'>
            <IonList id='menu-list'>
              <IonListHeader className='ion-padding-bottom'>
                WALL OF SHAME
              </IonListHeader>
              {appPages.map((appPage, index) => {
                return (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem
                      className={
                        location.pathname === appPage.url ? "selected" : ""
                      }
                      routerLink={appPage.url}
                      routerDirection='none'
                      lines='none'
                      detail={false}
                    >
                      <IonIcon
                        slot='start'
                        ios={appPage.iosIcon}
                        md={appPage.mdIcon}
                      />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                );
              })}
            </IonList>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
