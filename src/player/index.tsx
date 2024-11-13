import { parseStyles } from "@/functions/parseStyles"
import { CSSProperties, useEffect, useMemo, useState } from "react"

type PlayerPos = {
    x: number,
    y: number
}

interface usePlayerProps {

}
const usePlayer = ({ }: usePlayerProps) => {
    const [size, setSize] = useState(5)
    const [speed, setSpeed] = useState(5)
    const [pos, setPos] = useState<PlayerPos>({
        x: 0,
        y: 0
    })

    const onMove = ({ x, y }: PlayerPos) => {
        setPos(old => {
            const pos = {...old}
            pos.x += x * speed
            pos.y += y * speed
            return pos
        })
    }


    const onLoadPlayer = () => {
        document.addEventListener("keypress", (e) => {
            const sw: {
                [id in "x" | "y"]: {
                    [id: string]: number
                }
            } = {
                "y": {
                    "w": -1,
                    "s": 1,
                },
                "x": {
                    "d": 1,
                    "a": -1,
                },
            };
            onMove({
                x: sw.x[e?.key.toLowerCase()] ?? 0,
                y: sw.y[e?.key.toLowerCase()] ?? 0,
            })

        })
    }
    useEffect(() => onLoadPlayer, [])


    console.log({ pos });


    const style = useMemo<CSSProperties>(() => {
        return parseStyles({
            width:size,
            height:size,
            top:pos.y,
            left:pos.x,
        })
    }, [pos])

    return {
        pos,
        style
    }
}



export const Player = () => {
    const player = usePlayer({})
    console.log(player.pos);



    return <>
        <div data-id="player" style={player.style} />
    </>
}