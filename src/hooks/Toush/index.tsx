import { useEffect } from "react";

export type ToushPos = {
    x: number;
    y: number;
};
export type ToushSize = {
    width: number;
    height: number;
};

export type Entity = {
    pos : ToushPos
    size : ToushSize
}

export interface useToushProps {
    entity1:Entity
    entity2:Entity
    onToush?:()=>void
}

export const useToush = ({entity1,entity2,onToush}:useToushProps) => {
  const getIfToush = ()=>{
    return !(entity1.pos.x + entity1.size.width < entity2.pos.x || 
             entity1.pos.x > entity2.pos.x + entity2.size.width || 
             entity1.pos.y + entity1.size.height < entity2.pos.y || 
             entity1.pos.y > entity2.pos.y + entity2.size.height);
  }
  useEffect(()=>{
    if(getIfToush()){
        onToush?.()
    }
  },[ entity1,entity2,onToush])
}