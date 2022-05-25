import { by, element } from 'protractor';

export class NavbarPage {
    
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkPedido = element(by.xpath('/html/body/app-root/app-navbar/nav/a[2]'));

    async clickBotonHome() {
        await this.linkHome.click();
    }

    async clickBotonPedido() {
        await this.linkPedido.click();
    }
}
