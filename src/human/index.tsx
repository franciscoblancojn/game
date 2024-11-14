import { parseStyles } from "@/functions/parseStyles";
import { validatePos } from "@/functions/validatePos";
import { CSSProperties, useEffect, useMemo, useState } from "react";

export type HumanPos = {
  x: number;
  y: number;
  speed?: number;
};

export interface useHumanProps {
  size?: number;
  speed?: number;
  defaultPos?: HumanPos;
  onLoad?: () => void;
}
export const useHuman = ({
  size = 10,
  speed = 0.2,
  defaultPos = { x: 0, y: 0 },
  onLoad,
}: useHumanProps) => {
  const [pos, setPos] = useState<HumanPos>(defaultPos);
  const [move, setMove] = useState(false);
  const [directionX, setDirectionX] = useState<"right" | "left">("right");

  const onMove = ({ x, y, speed: speedP }: HumanPos) => {
    const length = Math.max(Math.sqrt(Number(x) ** 2 + Number(y) ** 2), 0.1);
    const nx = x / length;
    const ny = y / length;

    setPos((old) => {
      const pos = { ...old };
      pos.x += nx * (speedP ?? speed);
      pos.y += ny * (speedP ?? speed);
      return validatePos({ ...pos, size });
    });
    if (x != 0) {
      setDirectionX(x > 0 ? "right" : "left");
    }
    setMove(x + y != 0);
  };
  const onLoadHuman = () => {
    onLoad?.();
  };
  useEffect(onLoadHuman, []);

  const style = useMemo<CSSProperties>(() => {
    return parseStyles({
      width: size,
      height: size,
      top: pos.y,
      left: pos.x,
    });
  }, [pos, size]);

  const Human = useMemo(() => {
    return (
      <>
        <div
          data-id="human"
          className={`human ${move ? "human-move" : "human-stop"} human-directionX-${directionX}`}
          style={style}
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g data-id="Player">
              <g data-id="Body">
                <g data-id="Head">
                  <path data-id="border" d="M14 13H6V12H5V4H6V3H14V4H15V12H14V13Z" fill="black" />
                  <path data-id="hat" d="M14 4H6V5H14V4Z" fill="#464647" />
                  <path data-id="face" d="M14 6H6V11H7V12H13V11H14V6Z" fill="#E5AA7A" />
                  <g data-id="eyes">
                    <path data-id="eyeleft" d="M8 9V8H10V9H8Z" fill="black" />
                    <path data-id="eyeright" d="M14 8H12V9H14V8Z" fill="black" />
                  </g>
                </g>
                <g data-id="Body-stop">
                  <path data-id="border_2" d="M9 19H6V12H14V19H11V17H9V19Z" fill="black" />
                  <path data-id="legs" d="M7 18H8V16H12V18H13V15H7V18Z" fill="#9C5B3C" />
                  <path data-id="body2" d="M13 14H7V15H13V14Z" fill="#474747" />
                  <path data-id="body1" d="M13 13H7V14H13V13Z" fill="#B4B4B5" />
                </g>
                <g data-id="Body-move">
                  <path data-id="border_3" d="M11 17H9H8V18H7V19H5V17H6V12H14V17H15V19H13V18H12V17H11Z" fill="black" />
                  <path data-id="legs_2" d="M6 18V17H7V15H13V17H14V18H13V17H12V16H8V17H7V18H6Z" fill="#9C5B3C" />
                  <path data-id="body2" d="M13 14H7V15H13V14Z" fill="#474747" />
                  <path data-id="body1" d="M13 13H7V14H13V13Z" fill="#B4B4B5" />
                </g>
              </g>
            </g>
          </svg>

        </div>
      </>
    );
  }, [style, directionX, move]);

  return {
    pos,
    style,
    Human,
    onMove,
  };
};
