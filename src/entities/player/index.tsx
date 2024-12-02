import { PLAYER } from "@/const/player";
import { HumanPos, useHuman } from "@/entities/human";
import { useData } from "fenextjs";
import { useEffect, useState } from "react";
import { useHumanPos } from "../human/pos";

const PlayerKeyMoveConst = ["w", "d", "s", "a"] as const;

type PlayerKeyMove = (typeof PlayerKeyMoveConst)[number];

const PlayerKeyJumpConst = [" "] as const;

type PlayerKeyJump = (typeof PlayerKeyMoveConst)[number];

interface PlayerData {
  pos?: HumanPos
  size?: number
  jump?: boolean
  coolDownJump?: boolean
  live: number
  coolDownHit?: boolean
}
export const usePlayerData = () => {
  const { data: player, setDataFunction, onConcatData, onChangeData } = useData<PlayerData>({ coolDownJump: false, size: 10, live: 100, coolDownHit: false }, {
    useGlobalContext: 'player'
  })
  console.log("live", player.live);


  const onJump = () => {
    setDataFunction((e) => {
      if (e.coolDownJump == false) {
        setTimeout(() => {
          onConcatData({
            jump: false,
            coolDownJump: true
          })
        }, PLAYER.JUMP_TIME);
        setTimeout(() => {
          onConcatData({
            jump: false,
            coolDownJump: false
          })
        }, PLAYER.JUMP_COOLDOWN);
        return {
          ...e,
          jump: true,
          coolDownJump: true
        }
      }
      return e
    })

  }
  const onHit = (hit: number) => {
    setDataFunction(old => {
      if(old.coolDownHit){
        return old
      }
      setTimeout(() => {
        onConcatData({
          coolDownHit:false
        })
      }, PLAYER.HIT_COOLDOWN);
      return {
        ...old,
        coolDownHit:true,
        live: Math.max(old.live - hit, 0)
      }
    })
  }

  const setPos = onChangeData("pos")

  return {
    player,
    onJump,
    onHit,
    setPos
  }
}


interface usePlayerProps { }
const usePlayer = ({ }: usePlayerProps) => {
  type KeyPressType = {
    [id in PlayerKeyMove]?: boolean;
  };
  const [keyPress, setKeyPress] = useState<KeyPressType>({});
  const { player, onJump, setPos } = usePlayerData()

  const { onMove ,move,pos} = useHumanPos({
    speed: player.jump ?PLAYER.JUMP_SPEED :  PLAYER.SPEED
  })

  const { Human } = useHuman({
    name:"player",
    type:"player",
    size: player.size,
    move,
    pos
  });

  const onMovePlayer = (keyPress: KeyPressType) => {
    const pos = {
      x: keyPress.d ? 1 : keyPress.a ? -1 : 0,
      y: keyPress.s ? 1 : keyPress.w ? -1 : 0,
      speed: player.jump ? PLAYER.JUMP_SPEED : PLAYER.SPEED
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
    if (PlayerKeyJumpConst.includes(key) && value) {
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
  }, [keyPress, player.jump]);

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
