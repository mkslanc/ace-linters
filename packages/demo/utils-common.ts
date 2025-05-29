export function createCloseButton(el: HTMLElement) {
    let closeButton = document.createElement("span");
    closeButton.innerText = "\u00D7";
    closeButton.style.cursor = "pointer";
    el.appendChild(closeButton);
    return closeButton;
}

export function createModeNameText(el: HTMLElement, name: string) {
    let modeName = document.createElement("p");
    modeName.innerText = name;
    modeName.style.margin = "0";
    modeName.style.paddingRight = "10px";
    modeName.style.float = "left";
    modeName.id = "titleId";
    el.appendChild(modeName);
    return modeName;
}