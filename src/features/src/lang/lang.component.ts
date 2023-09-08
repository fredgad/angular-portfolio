import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangService } from '@services';

@Component({
  selector: 'app-lang',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss'],
})
export class LangComponent {
  private langService: LangService = inject(LangService);

  public isEngLang$i: Signal<boolean> = this.langService.isEngLang$i;

  public changeLang(): void {
    this.langService.changeLang();
  }
}
