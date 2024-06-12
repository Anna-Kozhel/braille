import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  private translatedToWord: Subject<string> = new Subject<string>();
  private translatedToBraille:  Subject<number[][]> = new Subject<number[][]>();
  private isLoad: Subject<boolean> = new Subject<boolean>();

  private baseURL: string = "https://backendflask.azurewebsites.net"

  translatedToWord$: Observable<string> = this.translatedToWord.asObservable();
  translatedToBraille$: Observable<number[][]> = this.translatedToBraille.asObservable();
  isLoad$: Observable<boolean> = this.isLoad.asObservable();

  constructor(private http: HttpClient) {
  }


  async uploadImg(formData?: FormData): Promise<void> {
    if (formData !== undefined) {
      console.log({formData})
      // @ts-ignore
      this.http.post(this.baseURL + '/predictText', formData).subscribe((response: IData): void => {
        console.log('Відповідь від сервера:', response);
        this.pushTranslatedToWordToStream(response.data);
      });
    }
  }

  async translateWord(word?: string): Promise<void> {
    if (word !== undefined) {
      // @ts-ignore
      this.http.post(this.baseURL + '/translateText', {data: word}).subscribe((response: IData): void => {
        console.log('Відповідь від сервера:', response);
        const result: number[][] = [];
        const chunkSize: number = 6;
        for (let i: number = 0; i < response.data.length; i += chunkSize) {
          const chunk: string = response.data.slice(i, i + chunkSize);
          const row: number[] = chunk.split('').map(Number);
          result.push(row);
        }
        this.pushTranslatedToBrailleToStream(result);
      });

    }
  }

  async pushTranslatedToWordToStream(word?: string): Promise<void> {
    if (word == undefined)
      this.translatedToWord.next('');
    else
      this.translatedToWord.next(word);
  }

  async pushTranslatedToBrailleToStream(braille?: number[][]): Promise<void> {
    if (braille == undefined)
      this.translatedToBraille.next([]);
    else
      this.translatedToBraille.next(braille);
  }

  async pushIsLoadToStream(state: boolean): Promise<void> {
    this.isLoad.next(state)
  }
}

