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
  const notCompletedSliced = notCompleted.slice(0, 8);
  const startingPosition =
    notCompletedSliced.length == 1 ? 0 : (notCompletedSliced.length - 1) * 45;

  return (
    <div className='bg'>
      {notCompletedSliced.map((u, index) => {
        return (
          <div
            style={{
              width: "100px",
              height: "100px",
              transform: `rotate(${startingPosition - 45 * index}deg)`,
              transformOrigin: "50% -50%",
              zIndex: index,
              position: "absolute",
            }}
            key={index}
          >
            <img src={activeAnimalMap[u.avatar.animal][u.avatar.color]}></img>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveChallengeImg;
