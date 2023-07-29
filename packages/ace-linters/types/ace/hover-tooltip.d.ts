import { Tooltip } from "./tooltip";
export declare class HoverTooltip extends Tooltip {
    private $gatherData;
    private timeout;
    private idleTime;
    private lastT;
    private lastEvent;
    private range;
    row: any;
    private marker;
    private $markerSession;
    constructor(parentNode?: HTMLElement);
    addToEditor(editor: any): void;
    removeFromEditor(editor: any): void;
    onMouseMove(e: MouseEvent, editor: any): void;
    waitForHover(): void;
    isOutsideOfText(e: any): boolean;
    setDataProvider(value: any): void;
    showForRange(editor: any, range: any, domNode: any, startingEvent: any): void;
    addMarker(range: any, session?: any): void;
    hide(e?: any): void;
    $registerCloseEvents(): void;
    $removeCloseEvents(): void;
    onMouseOut(e: any): void;
}
