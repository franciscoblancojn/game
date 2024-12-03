import { useState } from "react";
import { usePos, usePosProps } from "../Pos";
import { Direction } from "@/interfaces/Direction";
import { Pos } from "@/interfaces/Pos";

export interface useMoveProps extends usePosProps{
    speed?:number
}

export const useMove = ({
    size,
    defaultPos,
    onChangePos,
    speed = .1,
    name,
    onActionExecute,
}:useMoveProps) => {
  const {pos,setPos} = usePos({size,defaultPos,onChangePos,name,onActionExecute})
  const [move, setMove] = useState(false);
  const [direction,setDirection] = useState<Direction>({x:"right",y:"top"});

  const onMove = ({ x, y }: Pos) => {
    const length = Math.max(Math.sqrt(Number(x) ** 2 + Number(y) ** 2), 0.1);
    const nx = x / length;
    const ny = y / length;
    

    setPos((old) => {
      let pos = { ...old };
      pos.x += nx * speed;
      pos.y += ny * speed;

      const newDirection = {...direction}

      if (x != 0) {
        newDirection.x = (x > 0 ? "right" : "left");
      }
      if (y != 0) {
        newDirection.y = (y > 0 ? "bottom" : "top");
      }
      setDirection(newDirection)
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