import { useState } from "react";
import { HumanPos } from ".";
import { validatePos } from "@/functions/validatePos";

export interface useHumanPosProps{
    defaultPos?:HumanPos
    speed?:number
    size?:number

    onChangePos?:(d:HumanPos)=>void
}

export const useHumanPos = ({
    defaultPos= {
        x:0,
        y:0,
    },
    speed = 1,
    size= 10,
    onChangePos
}:useHumanPosProps) => {
  const [pos, setPos] = useState<HumanPos>(defaultPos);
  const [move, setMove] = useState(false);

  const onMove = ({ x, y }: HumanPos) => {
    const length = Math.max(Math.sqrt(Number(x) ** 2 + Number(y) ** 2), 0.1);
    const nx = x / length;
    const ny = y / length;
    

    setPos((old) => {
      let pos = { ...old };
      pos.x += nx * speed;
      pos.y += ny * speed;
      pos = {
        ...pos,
        ...validatePos({ ...pos, size })
      }
      if(JSON.stringify(old)==JSON.stringify(pos)){
        return old
      }
      if (x != 0) {
        pos.directionX = (x > 0 ? "right" : "left");
      }
      onChangePos?.(pos)
      return pos
    });
    setMove(x != 0 || y != 0);
  };

  return {
    pos,
    move,
    onMove,
  }
}