import {Component, HostListener, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TranslatorService} from "../../services/translator.service";

@Component({
  selector: 'app-braille-to-eng',
  templateUrl: './braille-to-eng.component.html',
  styleUrl: './braille-to-eng.component.scss'
})
export class BrailleToEngComponent implements OnInit {
  isLoaded: boolean = false;
  flag: boolean = false;
  subscription: Subscription | undefined = undefined;
  brailleText: number[][] = [[0]]
  translatedText: string = ''

  constructor(private translatorService: TranslatorService) {
    this.subscription = this.translatorService.translatedToWord$
      .subscribe((data: string): void => {
        this.translatedText = data;
        this.translatorService.pushIsLoadToStream(false).then()
      });
    this.subscription = this.translatorService.translatedToBraille$
      .subscribe((data: number[][]) => this.brailleText = data);
    console.log("braiile component")
    this.translatorService.pushTranslatedToBrailleToStream(this.brailleText).then();
    this.translatorService.pushTranslatedToWordToStream(this.translatedText).then();
    this.translatorService.pushIsLoadToStream(false).then()
  }

  ngOnInit(): void {
    this.isLoaded = false;
  }

  uploadImg(event: any): void {
    console.log("upload")
    this.translatorService.pushIsLoadToStream(true).then();
    const file = event.target.files[0];
    if (file) {
      this.isLoaded = true;
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      this.translatorService.uploadImg(formData)
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.getWindowSize();
  }

  getWindowSize(): void {
    if (window.innerWidth <= window.innerHeight) {
      this.flag = true
    } else {
      this.flag = false
    }
    console.log(window.innerWidth, window.innerHeight, this.flag)
  }

}
