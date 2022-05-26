import { AppPage } from '../app.po';
import { NavbarPage } from '../page/navbar/navbar.po';

describe('Page Home', () => {
    let page: AppPage;
    let navBar: NavbarPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
    });

    it('Deberia entrar a la opcion de Home y comprobar existencia de informacion', () => {
        page.navigateTo();
        navBar.clickBotonHome();
        
        expect(page.getTextBySelectorComponentAndTag('app-home', 'h1')).toEqual('TRM Dollar');
        expect(page.getTextBySelectorComponentAndTag('app-home', '#legend-informacion-trm')).toEqual('Información TRM');
        expect(page.getTextBySelectorComponentAndTag('app-home', '#parrago-informacion')).toContain('$');
    });
});