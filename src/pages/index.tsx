import { Enemy } from "@/enemy";
import { Map } from "@/map";
import { Player } from "@/player";

export default function Home() {
  return (
    <>
      <Map>
        <Player />

        <Enemy/>
      </Map>
    </>
  );
}
