import { MAP } from "@/const/map";
import { useData } from "fenextjs";
import { ReactNode, useEffect } from "react";

type MapSize = {
  width: number;
  height: number;
};

export const useMapData = () => {
  return useData<{
    size:MapSize
  }>({
    size:{
      width:0,
      height:0,
    }
  },{
    useGlobalContext:"map"
  })
}

interface useMapProps { }
const useMap = ({ }: useMapProps) => {
  const {onChangeData} = useMapData()

  const onLoadMap = () => {
    onChangeData("size")({
      width:(window.innerWidth) / MAP.SCALE,
      height:(window.innerHeight) / MAP.SCALE,
    });
  };
  useEffect(onLoadMap, []);

  return {
    
  };
};

export interface MapProps {
  children?: ReactNode;
}

export const Map = ({ children }: MapProps) => {
  useMap({});
  return (
    <>
      <div
        data-id="map"
      >
        {children}
      </div>
      <style jsx global>
        {`
          html{
            font-size : ${MAP.SCALE}px;
          }
        `}
      </style>
    </>
  );
};
