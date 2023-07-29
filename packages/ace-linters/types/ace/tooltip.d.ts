export declare class Tooltip {
    $element: HTMLDivElement | null;
    isOpen: boolean;
    $parentNode: any;
    /**
     * @param {Element} parentNode
     **/
    constructor(parentNode: any);
    $init(): HTMLDivElement;
    /**
     * @returns {HTMLElement}
     **/
    getElement(): HTMLDivElement;
    /**
     * @param {String} text
     **/
    setText(text: any): void;
    /**
     * @param {String} html
     **/
    setHtml(html: any): void;
    /**
     * @param {Number} x
     * @param {Number} y
     **/
    setPosition(x: any, y: any): void;
    /**
     * @param {String} className
     **/
    setClassName(className: any): void;
    setTheme(theme: any): void;
    /**
     * @param {String} text
     * @param {Number} x
     * @param {Number} y
     **/
    show(text: any, x: any, y: any): void;
    hide(): void;
    /**
     * @returns {Number}
     **/
    getHeight(): number;
    /**
     * @returns {Number}
     **/
    getWidth(): number;
    destroy(): void;
}
