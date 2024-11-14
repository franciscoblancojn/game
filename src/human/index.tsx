import { parseStyles } from "@/functions/parseStyles"
import { validatePos } from "@/functions/validatePos"
import { CSSProperties, useEffect, useMemo, useState } from "react"

export type HumanPos = {
    x: number,
    y: number
}

export interface useHumanProps {
    defaultSize?: number
    defaultSpeed?: number
    defaultPos?: HumanPos
    onLoad?: () => void
}
export const useHuman = ({ defaultSize = 10, defaultSpeed = .2, defaultPos = { x: 0, y: 0 }, onLoad }: useHumanProps) => {

    const [size, setSize] = useState(defaultSize)
    const [speed, setSpeed] = useState(defaultSpeed)
    const [pos, setPos] = useState<HumanPos>(defaultPos)

    const onMove = ({ x, y }: HumanPos) => {
        const length = Math.max(Math.sqrt(Number(x) ** 2 + Number(y) ** 2),0.1);
        const nx = x / length;
        const ny = y / length;
        
        setPos(old => {
            const pos = { ...old }
            pos.x += nx * speed 
            pos.y += ny * speed
            return validatePos({ ...pos, size })
        })
    }
    const onLoadHuman = () => {
        onLoad?.()
    }
    useEffect(onLoadHuman, [])

    const style = useMemo<CSSProperties>(() => {
        return parseStyles({
            width: size,
            height: size,
            top: pos.y,
            left: pos.x,
        })
    }, [pos, size])

    const Human = useMemo(() => {
        return <>
            <div data-id="human" className="human" style={style} >
                <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g data-id="Head" className="human-head">
                        <path data-id="border" d="M15 14H7V13H6V4H7V3H15V4H16V13H15V14Z" fill="black" />
                        <path data-id="hat" d="M15 4H7V5H15V4Z" fill="#464647" />
                        <path data-id="face" d="M15 6H7V12H8V13H14V12H15V6Z" fill="#E5AA7A" />
                        <g data-id="eyes">
                            <path data-id="eyeleft" d="M9 9V8H11V9H9Z" fill="black" />
                            <path data-id="eyeright" d="M15 8H13V9H15V8Z" fill="black" />
                        </g>
                    </g>
                    <g data-id="Body-stop" className="human-body-stop">
                        <path data-id="border_2" d="M10 20H7V13H15V20H12V18H10V20Z" fill="black" />
                        <path data-id="legs" d="M8 19H9V17H13V19H14V16H8V19Z" fill="#9C5B3C" />
                        <path data-id="body2" d="M14 15H8V16H14V15Z" fill="#474747" />
                        <path data-id="body1" d="M14 14H8V15H14V14Z" fill="#B4B4B5" />
                    </g>
                    <g data-id="Body-move" className="human-body-move">
                        <path data-id="border_3" d="M12 18H10H9V19H8V20H6V18H7V13H15V18H16V20H14V19H13V18H12Z" fill="black" />
                        <path data-id="legs_2" d="M7 19V18H8V16H14V18H15V19H14V18H13V17H9V18H8V19H7Z" fill="#9C5B3C" />
                        <path data-id="body2_2" d="M14 15H8V16H14V15Z" fill="#474747" />
                        <path data-id="body1_2" d="M14 14H8V15H14V14Z" fill="#B4B4B5" />
                    </g>
                </svg>
            </div>
        </>
    }, [style])


    return {
        pos,
        style,
        Human,
        onMove
    }
}
