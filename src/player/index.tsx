import { useHuman } from "@/human";
import { useEffect, useState } from "react";

const PlayerKeyMoveConst = ["w", "d", "s", "a"] as const;

type PlayerKeyMove = (typeof PlayerKeyMoveConst)[number];

interface usePlayerProps {}
const usePlayer = ({}: usePlayerProps) => {
  type KeyPressType = {
    [id in PlayerKeyMove]?: boolean;
  };
  const [keyPress, setKeyPress] = useState<KeyPressType>({});

  const { Human, onMove } = useHuman({});

  const onMovePlayer = (keyPress: KeyPressType) => {
    onMove({
      x: keyPress.d ? 1 : keyPress.a ? -1 : 0,
      y: keyPress.s ? 1 : keyPress.w ? -1 : 0,
    });
  };
  const onChangeKeyPress = (value: boolean) => (e: KeyboardEvent) => {
    const key = e.key.toLowerCase() as PlayerKeyMove;
    if (PlayerKeyMoveConst.includes(key)) {
      setKeyPress((e) => {
        if (e[key] == value) {
          return e;
        }
        const keyP = {
          ...e,
          [key]: value,
        };
        return keyP;
      });
    }
  };
  useEffect(() => {
    const t = setInterval(() => {
      onMovePlayer(keyPress);
    }, 1);
    return () => {
      clearInterval(t);
    };
  }, [keyPress]);

  const onLoadPlayer = () => {
    document.addEventListener("keydown", onChangeKeyPress(true));
    document.addEventListener("keyup", onChangeKeyPress(false));
    // document.addEventListener("keypress", onChangeKeyPress(true))
  };
  useEffect(onLoadPlayer, []);

  return {
    Human,
  };
};

export const Player = () => {
  const { Human } = usePlayer({});

  return (
    <>
      <div data-id="player" className="player">
        {Human}
      </div>
    </>
  );
};
