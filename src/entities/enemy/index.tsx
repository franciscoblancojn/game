
import { useCronAction } from "@/cron/action";
import { useHuman } from "@/entities/human";
import { usePlayerData } from "@/entities/player";
import { useEffect } from "react";



interface useEnemyProps { }
const useEnemy = ({ }: useEnemyProps) => {

  const { data:player } = usePlayerData()
  // console.log({player});
  
  // useCronAction({
  //   onActionExecute:()=>{
  //     console.log(posPlayer);
      
  //   }
  // })

  const { Human, onMove,pos, size} = useHuman({defaultPos : {
    x:Math.random()*100,
    y:Math.random()*100
  },});

  const getIfToushPlayer = ()=>{
    return  Math.abs((player?.pos?.x ?? 0 )- pos.x) <= (size + (player.size ?? 0)) / 2 &&
    Math.abs((player?.pos?.y ?? 0 )- pos.y) <= (size + (player.size ?? 0)) / 2 
  }

  const onToushPlayer = () => {
    console.log(getIfToushPlayer());
    
  }
  useEffect(onToushPlayer,[ player.pos,pos])

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
