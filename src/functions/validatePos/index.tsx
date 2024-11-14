import { MAP } from "@/const/map";

export interface validatePosProps {
  x: number;
  y: number;
  size: number;
}

export const validatePos = ({ x, y, size }: validatePosProps) => {
  return {
    x: Math.max(0, Math.min(MAP.SCALE - size, x)),
    y: Math.max(0, Math.min(MAP.SCALE - size, y)),
  };
};
