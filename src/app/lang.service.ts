import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  constructor() { }

  lang(word:String):String{
    return word;
  }
}
