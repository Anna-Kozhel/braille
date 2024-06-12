import {Component, HostListener} from '@angular/core';
import {TranslatorService} from "../../services/translator.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-eng-to-braille',
  templateUrl: './eng-to-braille.component.html',
  styleUrl: './eng-to-braille.component.scss'
})
export class EngToBrailleComponent {
  flag: boolean = false;
  isLoaded: boolean = false;
  inputValue: string = "Write your text here"
  timer: NodeJS.Timeout | undefined = undefined;
  subscription: Subscription | undefined = undefined;
  brailleText: number[][] = [[0]]
  translatedText: string = ''


  constructor(private translatorService: TranslatorService) {
    this.subscription = this.translatorService.translatedToWord$
      .subscribe((data: string) => this.translatedText = data);
    this.subscription = this.translatorService.translatedToBraille$
      .subscribe((data: number[][]) => this.brailleText = data);
    this.translatorService.pushTranslatedToBrailleToStream(this.brailleText).then();
    this.translatorService.pushTranslatedToWordToStream(this.translatedText).then();
  }

  ngOnInit(): void {
    this.translatorService.translateWord("Write your text here...");
    this.isLoaded = false;
    this.getWindowSize()
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

    this.timer = setTimeout(() => {
      this.translatorService.translateWord(this.inputValue);
    }, 3000);
  }
}
