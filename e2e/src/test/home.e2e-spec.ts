import { AppPage } from '../app.po';
//import { HomePage } from '../page/home/home.po';
import { NavbarPage } from '../page/navbar/navbar.po';

describe('Page Home', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    //let home: HomePage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        //home = new HomePage();
    });

    it('Deberia entrar a la opcion de Home y comprobar existencia de titulo', () => {
        page.navigateTo();
        navBar.clickBotonHome();
        
        expect(page.getTextBySelectorComponentAndTag('app-home', 'p')).toEqual('home works!');
    });


});