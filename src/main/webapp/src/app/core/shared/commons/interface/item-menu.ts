export interface IMenuItem {
    _type: string;
    _routerLink: string;
    _translate: string;
    _icon: string;
    _submenu: IMenuItem[]
    _submenuId: string;

}


export class MenuItem implements IMenuItem {
    _type: string = "menu";
    _routerLink!: string;
    _translate!: string;
    _icon!: string;
    _submenu: IMenuItem[]=[];
    _submenuId!: string;

    type(type: string): MenuItem {
        this._type = type;
        return this;
    }

    routerLink(routerLink: string): MenuItem {
        this._routerLink = routerLink;
        return this;
    }

    translate(translate: string): MenuItem {
        this._translate = translate;
        return this;
    }

    icon(icon: string): MenuItem {
        this._icon = icon;
        return this;
    }

    submenu(...menus: IMenuItem[]): MenuItem {
        this._submenu = menus;
        return this;
    }

    submenuId(id: string): MenuItem {
        this._submenuId = id;
        return this;
    }


    isMenu(): boolean {
        return this._type === 'menu';
    }

    isSubMenu(): boolean {
        return this._type === 'submenu';
    }

    isMenuDivider(): boolean {
        return this._type === 'divider';
    }
}