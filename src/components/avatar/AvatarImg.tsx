import { IonGrid } from "@ionic/react";
import React from "react";
import { Avatar } from "../../interfaces/models/Users";
import { avatarMap } from "../../assets/avatar";
import "./AvatarImg.scss";

interface AvatarImgProps {
  avatar: Avatar | null;
}

const AvatarImg: React.FunctionComponent<AvatarImgProps> = (
  props: AvatarImgProps
) => {
  const { avatar } = props;

  if (avatar == null) {
    return <img></img>;
  }
  return (
    <IonGrid className='circle' style={{ backgroundColor: avatar.background }}>
      <img
        className='animal'
        src={avatarMap[avatar.animal][avatar.color]}
        alt='animal'
      ></img>
    </IonGrid>
  );
};

export default AvatarImg;
