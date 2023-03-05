import { TopbarSubMenu } from "./topbar-submenu";

export interface ITopbarMenu {
    name: string;
    menuId: string;
    submenu: TopbarSubMenu[];
}


export class TopbarMenu implements ITopbarMenu {
    name!: string;
    menuId!: string;
    submenu: TopbarSubMenu[]=[];


    setName(name: string): TopbarMenu {
        this.name = name;
        return this;
    }

    setMenuId(id: string): TopbarMenu {
        this.menuId = id;
        return this;
    }

    setSubmenu(...submenu: TopbarSubMenu[]): TopbarMenu {
        this.submenu = submenu;
        return this;
    }

    isEmpty(): boolean {
        return this.submenu.length === 0;
    }
}