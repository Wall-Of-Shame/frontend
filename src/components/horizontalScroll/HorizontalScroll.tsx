import { IonCol, IonRow } from "@ionic/react";
import "./HorizontalScroll.scss";

interface HorizontalScrollProps {
  profiles: any[];
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = (
  props: HorizontalScrollProps
) => {
  const { profiles } = props;

  return (
    <IonRow className='stories'>
      <div className='story-container'>
        {profiles.map((story, index) => {
          return (
            <IonCol key={index} className='story'>
              <img alt='story avatar' src={story.avatar} />
            </IonCol>
          );
        })}
      </div>
    </IonRow>
  );
};

export default HorizontalScroll;
