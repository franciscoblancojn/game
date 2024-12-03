import { HumanPos, useHuman } from "@/entities/human";
import { usePlayerData } from "@/entities/player";
import { parseStyles } from "@/functions/parseStyles";
import { useToush } from "@/hooks/Toush";
import { Pos } from "@/interfaces/Pos";
import { Size } from "@/interfaces/Size";
import { useData } from "fenextjs";
import { CSSProperties, useEffect, useMemo, useState } from "react";


export type BlockPos = Pos
export type BlockSize = Size
  
  
interface useBlockProps {
    pos:BlockPos
    size:BlockSize
}
const useBlock = ({pos,size }: useBlockProps) => {
    const { player,setPosAction} = usePlayerData()


    const onToush = () => {
        const pos_player = {...player.pos}

        const x0 = pos.x
        const y0 = pos.y
        const x1 = pos.x + size.width
        const y1 = pos.y + size.height

        const px0 = player.pos.x
        const py0 = player.pos.y
        const px1 = player.pos.x + player.size.width
        const py1 = player.pos.y + player.size.height

        const alignX = (x0 < px0 && px0 < x1) || (x0 < px1 && px1 < x1)
        const alignY = (y0 < py0 && py0 < y1) || (y0 < py1 && py1 < y1)

        if((px0 < x1 && px1 > x1) && alignY){
            
            pos_player.x = x1
        }

        if(JSON.stringify(pos_player)!=JSON.stringify(player.pos)){
            console.log("x");
            setPosAction(pos_player)
        }

    }

    useToush({
        entity1:player,
        entity2:{
            pos,
            size
        },
        onToush
    })

    const style = useMemo<CSSProperties>(() => {
        return parseStyles({
          width: size.width,
          height: size.height,
          top: pos.y,
          left: pos.x,
        });
      }, [pos, size]);
    
    return {
        pos,
        style,
    }
};

export const Block = ({...props}:useBlockProps) => {
    const {style } = useBlock({...props});

    return (
        <>
            <div data-id="block" className="block" style={style}/>
        </>
    );
};
