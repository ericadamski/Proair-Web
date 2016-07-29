import { Component } from '@angular/core';
import { AppService } from "./app.service";
import './rxjs-operators';

@Component({
  selector: 'my-app',
  template:
  `
  <div (window:resize)="onResize($event)"> <!-- Navigation Bar -->
    <navbar class=navbar id="navBar">
      <ul>
        <!-- test logo. replace with proair logo -->
        <a href="#Home">
          <img src={{logoSource}} alt="Proair">
        </a>
        <li *ngIf="!isMobileSizedWidth"><a href="#Careers">Careers</a></li>
        <li *ngIf="!isMobileSizedWidth"><a href="#Contact">Contact</a></li>
        <li *ngIf="!isMobileSizedWidth"><a href="#Services">Services</a></li>
        <li *ngIf="!isMobileSizedWidth"><a href="#About">About</a></li>
        <li *ngIf="isMobileSizedWidth"><button (click)="toggleMenu($event)">☰</button></li>
      </ul>
    </navbar>
  </div>
  <div *ngIf="isMenuShown" (window:scroll)="dismissMenu($event)"> <!-- Navigation Menu Dropdown -->
    <navMenu class=navMenu>
      <ul>
        <li><a href="#About">About</a></li>
        <li><a href="#Services">Services</a></li>
        <li><a href="#Contact">Contact</a></li>
        <li><a href="#Careers">Careers</a></li>
      </ul>
    </navMenu>
  </div>
   <!-- Parallax Body -->
  <div style="margin-top:50px;" id="Home">
    <section class="module parallax parallax-1">
      <div class="container">
        <img src={{logoSource}} alt="Proair">
        <!--<h1>Proair</h1>-->
      </div>
    </section>

    <section class="module content">
      <div class="container">
        <h2>{{contentHome?.title}}</h2>
        <p>{{contentHome?.content}}</p>
      </div>
    </section>

    <section class="module parallax parallax-2" id="About">
      <div class="container">
        <h1>About</h1>
      </div>
    </section>

    <section class="module content">
      <div class="container">
        <h2>{{contentAbout?.title}}</h2>
        <p>{{contentAbout?.content}}</p>
      </div>
    </section>

    <section class="module parallax parallax-3" id="Services">
      <div class="container">
        <h1>Services</h1>
      </div>
    </section>

    <section class="module content">
      <div class="container">
        <h2>{{contentServices?.title}}</h2>
        <p>{{contentServices?.content}}</p>
      </div>
    </section>

    <section class="module parallax parallax-3" id="Contact">
      <div class="container">
        <h1>Contact</h1>
      </div>
    </section>

    <section class="module content">
      <div class="container">
        <h2>{{contentContact?.title}}</h2>
        <p>{{contentContact?.content}}</p>
      </div>
    </section>

    <section class="module parallax parallax-3" id="Careers">
      <div class="container">
        <h1>Careers</h1>
      </div>
    </section>

    <section class="module content">
      <div class="container">
        <h2>{{contentCareers?.title}}</h2>
        <p>{{contentCareers?.content}}</p>
      </div>
    </section>
  </div>
  <div>
    <footer class="footer">
      <p>Proair Sdn. Bhd.</p>
    </footer>
  </div>
  `
  ,
  styleUrls: [
        'app/assets/stylesheets/css/navbar.css',
        'app/assets/stylesheets/css/navMenu.css',
        'app/assets/stylesheets/css/parallaxMain.css',
        'app/assets/stylesheets/css/footer.css'
    ]
  ,
  providers: [AppService]
})
export class AppComponent{
  private errorMessage: string;

  private logoSource = "app/assets/images/proairlogo.png";

  private isMobileSizedWidth = true;
  private isMenuShown = false;

  private contentHome:Object;
  private contentAbout:Object;
  private contentServices:Object;
  private contentContact:Object;
  private contentCareers:Object;

  constructor(private appService: AppService) { }

  ngOnInit()
  {
    this.isMobileSizedWidth = this.checkIfMobileSized();
    this.getAllContent();
  }

  onResize()
  {
    this.isMobileSizedWidth = this.checkIfMobileSized();
  }

  checkIfMobileSized()
  {
    if(window.innerWidth <= 680) { return true; }
    else{ return false; }
  }

  toggleMenu()
  {
    this.isMenuShown = !(this.isMenuShown);
  }

  dismissMenu()
  {
    if(this.isMenuShown == true) { this.isMenuShown = false; }
  }

  getAllContent()
  {
    this.getHomeContent();
    this.getAboutContent();
    this.getServicesContent();
    this.getContactContent();
    this.getCareersContent();
  }

  getHomeContent()
  {
    this.appService.getHomeContent()
                     .subscribe(
                       content => this.contentHome = content,
                       error =>  console.log("app.component:getHomeContent() - \n" + <any>error));
  }

  getAboutContent()
  {
    this.appService.getAboutContent()
                     .subscribe(
                       content => this.contentAbout = content,
                       error =>  console.log("app.component:getAboutContent() - \n" + <any>error));
  }

  getServicesContent()
  {
    this.appService.getServicesContent()
                     .subscribe(
                       content => this.contentServices = content,
                       error =>  console.log("app.component:getServicesContent() - \n" + <any>error));
  }

  getContactContent()
  {
    this.appService.getContactContent()
                     .subscribe(
                       content => this.contentContact = content,
                       error =>  console.log("app.component:getContactContent() - \n" + <any>error));
  }

  getCareersContent()
  {
    this.appService.getCareersContent()
                     .subscribe(
                       content => this.contentCareers = content,
                       error =>  console.log("app.component:getCareersContent() - \n" + <any>error));
  }
}
