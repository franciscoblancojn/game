import { useHuman } from "@/human";
import { useEffect, useState } from "react";

const PlayerKeyMoveConst = ["w", "d", "s", "a"] as const;

type PlayerKeyMove = (typeof PlayerKeyMoveConst)[number];

const PlayerKeyJumpConst = [" "] as const;

type PlayerKeyJump = (typeof PlayerKeyMoveConst)[number];

interface usePlayerProps { }
const usePlayer = ({ }: usePlayerProps) => {
  type KeyPressType = {
    [id in PlayerKeyMove]?: boolean;
  };
  const [keyPress, setKeyPress] = useState<KeyPressType>({});
  type JumpType = {
    jump?: boolean
    validJump?: boolean
  }
  const [jump, setJump] = useState<JumpType>({ validJump: true })

  const { Human, onMove } = useHuman({});

  const onMovePlayer = (keyPress: KeyPressType) => {
    onMove({
      x: keyPress.d ? 1 : keyPress.a ? -1 : 0,
      y: keyPress.s ? 1 : keyPress.w ? -1 : 0,
      speed: jump.jump ? 1 : undefined
    });
  };

  const onChangeKeyPress = (value: boolean) => (e: KeyboardEvent) => {
    const key = e.key.toLowerCase() as any;

    if (PlayerKeyMoveConst.includes(key)) {
      setKeyPress((e) => {
        if (e[key as PlayerKeyMove] == value) {
          return e;
        }
        const keyP = {
          ...e,
          [key]: value,
        };
        return keyP;
      });
    }
    if (PlayerKeyJumpConst.includes(key ) && value) {
      setJump((e) => {
        if (e.validJump) {
          setTimeout(() => {
            setJump({
              jump: false,
              validJump: false
            })
          }, 100);
          setTimeout(() => {
            setJump({
              jump: false,
              validJump: true
            })
          }, 1000);
          return {
            jump: true,
            validJump: false
          }
        }
        return e
      })
    }
  };
  useEffect(() => {
    const t = setInterval(() => {
      onMovePlayer(keyPress);
    }, 1);
    return () => {
      clearInterval(t);
    };
  }, [keyPress,jump]);

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
