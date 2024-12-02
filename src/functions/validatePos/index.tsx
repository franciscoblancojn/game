import { MAP } from "@/const/map";

export interface validatePosProps {
  x: number;
  y: number;
  size: number;
}

export const validatePos = ({ x, y, size }: validatePosProps) => {
  return {
    x: Math.max(0, Math.min((window.innerWidth - (MAP.SCALE * size)) / MAP.SCALE, x)),
    y: Math.max(0, Math.min((window.innerHeight - (MAP.SCALE * size)) / MAP.SCALE, y)),
  };
};
