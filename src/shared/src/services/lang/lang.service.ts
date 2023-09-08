import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { LangEnum } from '../../interfaces/lang.interfaces';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  public lang$i: WritableSignal<LangEnum> = signal(LangEnum.ENG);
  public isEngLang$i: Signal<boolean> = computed(() => {
    return this.lang$i() === LangEnum.ENG;
  });

  public changeLang(lang?: LangEnum): void {
    if (lang) {
      window.localStorage.setItem('lang', lang);
      this.lang$i.set(lang);
    } else {
      this.lang$i.update((value) => {
        const nextLang = value === LangEnum.ENG ? LangEnum.RUS : LangEnum.ENG;
        window.localStorage.setItem('lang', nextLang);
        return nextLang;
      });
    }
  }
}
