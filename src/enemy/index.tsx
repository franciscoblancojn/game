
import { useHuman } from "@/human";
import { useEffect } from "react";



interface useEnemyProps { }
const useEnemy = ({ }: useEnemyProps) => {

  const { Human, onMove } = useHuman({defaultPos : {
    x:Math.random()*100,
    y:Math.random()*100
  },});

  const onMoveEnemy = () => {
    // onMove({
    //   x: keyPress.d ? 1 : keyPress.a ? -1 : 0,
    //   y: keyPress.s ? 1 : keyPress.w ? -1 : 0
    // });
  };

  useEffect(() => {
    // const t = setInterval(() => {
    //   onMoveEnemy();
    // }, 1);
    // return () => {
    //   clearInterval(t);
    // };
  }, []);

  const onLoadEnemy = () => {
    
  };
  useEffect(onLoadEnemy, []);

  return {
    Human,
  };
};

export const Enemy = () => {
  const { Human } = useEnemy({});

  return (
    <>
      <div data-id="enemy" className="enemy">
        {Human}
      </div>
    </>
  );
};
