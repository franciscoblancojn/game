import { Enemy } from "@/entities/enemy";
import { Map } from "@/map";
import { Player } from "@/entities/player";
import { useCronActionLoad } from "@/cron/action";

export default function Home() {
  useCronActionLoad()
  return (
    <>
      <Map>
        <Player />

        <Enemy/>
      </Map>
    </>
  );
}
