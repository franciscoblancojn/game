import { ENEMY } from "@/const/enemy";
import { useHuman } from "@/entities/human";
import { usePlayerData } from "@/entities/player";
import { useEffect } from "react";
import { useHumanPos } from "../human/pos";


const size = 10
interface useEnemyProps { }
const useEnemy = ({ }: useEnemyProps) => {
  const { player ,onHit} = usePlayerData()

  const { onMove ,move,pos,} = useHumanPos({
    speed: ENEMY.SPEED,
    defaultPos : {
      x:Math.random()*100,
      y:Math.random()*100
    }
  })

  const { Human } = useHuman({
    name:"enemy",
    type:"enemy",
    move,
    pos,
    size
  });

  const getIfToushPlayer = ()=>{
    return  Math.abs((player?.pos?.x ?? 0 )- pos.x) <= (size + (player.size ?? 0)) / 2 &&
    Math.abs((player?.pos?.y ?? 0 )- pos.y) <= (size + (player.size ?? 0)) / 2 
  }

  const onToushPlayer = () => {
    if(getIfToushPlayer()){
      onHit(1)
    }
    
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
