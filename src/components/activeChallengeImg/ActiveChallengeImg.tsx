import { activeAnimalMap } from "../../assets/activeChallenge";
import { UserMini } from "../../interfaces/models/Challenges";
import "./ActiveChallengeImg.scss";

interface ActiveChallengeImgProps {
  notCompleted: UserMini[];
}

const ActiveChallengeImg: React.FunctionComponent<ActiveChallengeImgProps> = (
  props: ActiveChallengeImgProps
) => {
  const { notCompleted } = props;
  const notCompletedSliced = notCompleted.slice(0, 6);
  const startingPosition =
    notCompletedSliced.length === 1 ? 0 : (notCompletedSliced.length - 1) * 45;

  return (
    <div className='bg-active'>
      {notCompletedSliced.map((u, index) => {
        return (
          <div
            className='animal-in-wheel'
            style={{
              transform: `rotate(${startingPosition - 45 * index}deg)`,
              zIndex: index,
            }}
            key={index}
          >
            <img
              src={activeAnimalMap[u.avatar.animal][u.avatar.color]}
              alt=''
            ></img>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveChallengeImg;
