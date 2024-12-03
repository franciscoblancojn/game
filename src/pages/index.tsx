import { Enemy } from "@/entities/enemy";
import { Map } from "@/map";
import { Player } from "@/entities/player";
import { useCronActionLoad } from "@/cron/action";
import { Block } from "@/block";

export default function Home() {
  useCronActionLoad()
  return (
    <>
      <Map>
        <Player />

        {/* <Enemy/> */}

        <Block pos={{x:20,y:20}}
          size={{
            height:10,
            width:10
          }}
        />

      </Map>
    </>
  );
}
