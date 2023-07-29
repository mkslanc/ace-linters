export declare class PopupManager {
    private popups;
    constructor();
    addPopup(popup: any): void;
    removePopup(popup: any): void;
    updatePopups(): void;
    doPopupsOverlap(popupA: any, popupB: any): boolean;
}
