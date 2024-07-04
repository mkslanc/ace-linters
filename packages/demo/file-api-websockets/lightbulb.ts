export 
class LightbulbMenu {
    private codeActions: any[];
    private menu: HTMLElement;
    private menuItems: HTMLElement;
    constructor() {
        this.codeActions = [];
        this.menu = document.createElement("div");
        this.menu.id = "menu";
        document.body.appendChild(this.menu);
        this.menuItems = document.createElement("ul");
        this.menuItems.id = "menu-items";
        this.menu.appendChild(this.menuItems);
    }

    async showMenu(actions, x, y) {
        this.codeActions = actions;
        this.menuItems.innerHTML = ''; // Clear previous items
        this.createMenuItems();
        this.positionMenu(x, y);
        this.menu.style.display = 'block';
        //this.handleOutsideClick();
    }

    createMenuItems() {
        this.codeActions.forEach(action => {
            const li = document.createElement('li');
            li.textContent = action.title;
            li.addEventListener('click', () => {
                this.menu.style.display = 'none';
                this.executeAction(action);
            });
            li.addEventListener('mouseover', () => {
                li.textContent = JSON.stringify(action);
            });
            this.menuItems.appendChild(li);
        });
    }

    positionMenu(x, y) {
        this.menu.style.left = `${x}px`;
        this.menu.style.top = `${y}px`;
    }

    handleOutsideClick() {
        const handleClick = (event) => {
            if (!this.menu.contains(event.target)) {
                this.menu.style.display = 'none';
                document.removeEventListener('click', handleClick);
            }
        };
        document.addEventListener('click', handleClick);
    }

    executeAction(action) {
        console.log(`Executing action: ${action.title}`);
        // Replace this with the actual logic to execute the command
    }
}

let codeActionMenu = new LightbulbMenu();

languageProvider.setCodeActionCallback((el: (CodeAction | Command)[] | null) => {
    codeActionMenu.showMenu(el, 0, 0);
});
