import {Component, HostListener, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TranslatorService} from "../../services/translator.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  flag: boolean = false;
  isLoaded: boolean = false;
  inputValue: string = "Write your text here"
  timer: NodeJS.Timeout | undefined = undefined;
  subscription: Subscription | undefined = undefined;
  brailleText: number[][] = [[0]]
  translatedText: string = ''


  constructor(private translatorService: TranslatorService) {
    this.getWindowSize()
    this.subscription = this.translatorService.translatedToWord$
      .subscribe((data: string): void => {
        this.translatedText = data;
        this.translatorService.pushIsLoadToStream(false).then()
      });
    this.subscription = this.translatorService.translatedToBraille$
      .subscribe((data: number[][]) => this.brailleText = data);
    this.translatorService.pushTranslatedToBrailleToStream(this.brailleText).then();
    this.translatorService.pushTranslatedToWordToStream(this.translatedText).then();
  }

  ngOnInit(): void {
    // setTimeout( ()=> this.getWindowSize(), 20)
    this.translatorService.translateWord("Write your text here...");
    this.translatorService.pushIsLoadToStream(false).then()
    this.isLoaded = false;
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

  uploadImg(event: any): void{
    console.log("upload")
    this.translatorService.pushIsLoadToStream(true);
    const file = event.target.files[0];
    if (file) {
      this.isLoaded = true;
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      this.translatorService.uploadImg(formData)
    }
  }

  inputText(event: Event): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.inputValue = inputElement.value;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout((): void => {
      this.translatorService.translateWord(this.inputValue);
    }, 1000);

  }

  // isActive(item: boolean){
  //   const element: HTMLElement = this.yourElement.nativeElement;
  //   if (item) { element.classList.add('your-class-name'); }
  //   else { element.classList.add('your-class-name'); }
  // }
}


