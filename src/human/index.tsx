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
          <svg
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g data-id="Head" className="human-head">
              <path
                data-id="border"
                d="M15 14H7V13H6V4H7V3H15V4H16V13H15V14Z"
                fill="var(--human-border,black)"
              />
              <path data-id="hat" d="M15 4H7V5H15V4Z" fill="var(--human-hat,#464647)" />
              <path
                data-id="face"
                d="M15 6H7V12H8V13H14V12H15V6Z"
                fill="var(--human-face,#E5AA7A)"
              />
              <g data-id="eyes">
                <path data-id="eyeleft" d="M9 9V8H11V9H9Z" fill="var(--human-eye,black)" />
                <path data-id="eyeright" d="M15 8H13V9H15V8Z" fill="var(--human-eye,black)" />
              </g>
            </g>
            <g data-id="Body-stop" className="human-body-stop">
              <path
                data-id="border_2"
                d="M10 20H7V13H15V20H12V18H10V20Z"
                fill="var(--human-border,black)"
              />
              <path
                data-id="legs"
                d="M8 19H9V17H13V19H14V16H8V19Z"
                fill="var(--human-legs,#9C5B3C)"
              />
            </g>
            <g data-id="Body-move" className="human-body-move">
              <path
                data-id="border_3"
                d="M12 18H10H9V19H8V20H6V18H7V13H15V18H16V20H14V19H13V18H12Z"
                fill="var(--human-border,black)"
              />
              <path
                data-id="legs_2"
                d="M7 19V18H8V16H14V18H15V19H14V18H13V17H9V18H8V19H7Z"
                fill="var(--human-legs,#9C5B3C)"
              />
            </g>
            <g data-id="Body-top" className="human-body-top">
              <path data-id="body2" d="M14 15H8V16H14V15Z" fill="var(--human-body-1,#474747)" />
              <path data-id="body1" d="M14 14H8V15H14V14Z" fill="var(--human-body-2,#B4B4B5)" />
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
