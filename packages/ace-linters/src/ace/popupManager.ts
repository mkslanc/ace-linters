export class PopupManager {
    private popups: Set<any> = new Set();
    private acePopups: Set<any> = new Set();
    private updateScheduled: boolean = false;

    addPopup(popup: any): void {
        if (!popup || typeof popup.getElement !== 'function') {
            console.warn('Invalid popup object provided to addPopup');
            return;
        }

        this.popups.add(popup);
        this.scheduleUpdate();
    }

    addAcePopup(popup: any): void {
        if (!popup) {
            console.warn('Invalid popup object provided to addAcePopup');
            return;
        }

        this.acePopups.add(popup);
        this.scheduleUpdate();
    }

    removePopup(popup: any): void {
        if (this.popups.has(popup)) {
            this.popups.delete(popup);
            this.scheduleUpdate();
        }
    }

    removeAcePopup(popup: any): void {
        if (this.acePopups.has(popup)) {
            this.acePopups.delete(popup);
            this.scheduleUpdate();
        }
    }

    private scheduleUpdate(): void {
        if (this.updateScheduled) return;

        this.updateScheduled = true;
        requestAnimationFrame(() => {
            this.updateScheduled = false;
            this.updatePopups();
        });
    }

    private cleanupStalePopups(): void {
        for (const popup of this.popups) {
            if (!this.isPopupValid(popup)) {
                this.popups.delete(popup);
            }
        }

        for (const popup of this.acePopups) {
            if (!this.isPopupValid(popup)) {
                this.acePopups.delete(popup);
            }
        }
    }

    private isPopupValid(popup: any): boolean {
        try {
            const element = typeof popup.getElement === "function" ? popup.getElement() : popup.container;
            return element && element.isConnected;
        } catch (e) {
            return false;
        }
    }

    updatePopups(): void {
        try {
            this.cleanupStalePopups();

            const pupups = Array.from(this.popups).sort((a, b) => (b.priority || 0) - (a.priority || 0));

            const sortedPopups = [...this.acePopups, ...pupups];
            const visiblePopups: any[] = [];

            for (const popup of sortedPopups) {
                if (!this.shouldDisplayPopup(popup, visiblePopups)) {
                    this.safeHidePopup(popup);
                } else {
                    visiblePopups.push(popup);
                }
            }
        } catch (error) {
            console.error('Error updating popups:', error);
        }
    }

    private shouldDisplayPopup(popup: any, visiblePopups: any[]): boolean {
        try {
            if (!this.isPopupValid(popup)) {
                return false;
            }

            for (const visiblePopup of visiblePopups) {
                if (this.doPopupsOverlap(visiblePopup, popup)) {
                    return false;
                }
            }

            return true;
        } catch (error) {
            console.error('Error checking popup display:', error);
            return false;
        }
    }

    private safeHidePopup(popup: any): void {
        try {
            if (popup && typeof popup.hide === 'function') {
                popup.hide();
            }
        } catch (error) {
            console.error('Error hiding popup:', error);
        }
    }

    doPopupsOverlap(popupA: any, popupB: any): boolean {
        try {
            const elemA = typeof popupA.getElement === "function" ? popupA.getElement() : popupA.container;
            const elemB = typeof popupB.getElement === "function" ? popupB.getElement() : popupB.container;

            if (!elemA || !elemB || !elemA.isConnected || !elemB.isConnected) {
                return false;
            }

            const rectA = elemA.getBoundingClientRect();
            const rectB = elemB.getBoundingClientRect();

            return (rectA.left < rectB.right && rectA.right > rectB.left &&
                rectA.top < rectB.bottom && rectA.bottom > rectB.top);
        } catch (error) {
            console.error('Error checking popup overlap:', error);
            return false;
        }
    }
}

export const popupManager = new PopupManager();