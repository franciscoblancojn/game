import { MAP } from "@/const/map";
import { Pos } from "@/interfaces/Pos";
import { Size } from "@/interfaces/Size";

export interface validatePosProps {
  pos: Pos;
  size: Size;
}

export const validatePos = ({ pos, size }: validatePosProps) => {
  return {
    x: Math.max(0, Math.min((window.innerWidth - (MAP.SCALE * size.width)) / MAP.SCALE, pos.x)),
    y: Math.max(0, Math.min((window.innerHeight - (MAP.SCALE * size.height)) / MAP.SCALE, pos.y)),
  };
};
