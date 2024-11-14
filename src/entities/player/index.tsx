import { PLAYER } from "@/const/player";
import { HumanPos, useHuman } from "@/entities/human";
import {  useData } from "fenextjs";
import { useEffect, useState } from "react";

const PlayerKeyMoveConst = ["w", "d", "s", "a"] as const;

type PlayerKeyMove = (typeof PlayerKeyMoveConst)[number];

const PlayerKeyJumpConst = [" "] as const;

type PlayerKeyJump = (typeof PlayerKeyMoveConst)[number];

interface PlayerData {
  pos?:HumanPos
  size?:number
  jump?: boolean
  validJump?: boolean
}
export const usePlayerData = () => {
  const DATA =  useData<PlayerData>({validJump: true,size:10},{
    useGlobalContext:'player'
  })

  const onJump = async () => {
    DATA.setDataFunction((e) => {
      if (e.validJump) {
        setTimeout(() => {
          DATA.onConcatData({
            jump: false,
            validJump: false
          })
        }, PLAYER.JUMP_TIME);
        setTimeout(() => {
          DATA.onConcatData({
            jump: false,
            validJump: true
          })
        }, PLAYER.JUMP_COOLDOWN);
        return {
          ...e,
          jump: true,
          validJump: false
        }
      }
      return e
    })
    
  }

  return {
    ...DATA,
    onJump
  }
}


interface usePlayerProps { }
const usePlayer = ({ }: usePlayerProps) => {
  type KeyPressType = {
    [id in PlayerKeyMove]?: boolean;
  };
  const [keyPress, setKeyPress] = useState<KeyPressType>({});
  const {data,onJump,onChangeData} = usePlayerData()

  const { Human, onMove } = useHuman({
    onChangePos:onChangeData("pos"),
    size:data.size
  });

  const onMovePlayer = (keyPress: KeyPressType) => {
    const pos = {
      x: keyPress.d ? 1 : keyPress.a ? -1 : 0,
      y: keyPress.s ? 1 : keyPress.w ? -1 : 0,
      speed: data.jump ? PLAYER.JUMP_SPEED : PLAYER.SPEED
    }
    onMove(pos);
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
      onJump()
    }
  };
  useEffect(() => {
    const t = setInterval(() => {
      onMovePlayer(keyPress);
    }, 1);
    return () => {
      clearInterval(t);
    };
  }, [keyPress,data.jump]);

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
