import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {Subscription} from "rxjs";
import {TranslatorService} from "./services/translator.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title: string = 'client_app';
  subscription: Subscription | undefined = undefined;
  isLoadImage: boolean = false;
  showOutlet: boolean = false;

  constructor(private translatorService: TranslatorService, private spinner: NgxSpinnerService) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.subscription = this.translatorService.isLoad$
      .subscribe((data: boolean): void => {
        this.isLoadImage = data;
        if (this.isLoadImage)
          this.spinner.show();
        else
          this.spinner.hide();
      });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showOutlet = true;
    }, 1000);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }

}
