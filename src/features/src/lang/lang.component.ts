import { Component, inject } from '@angular/core';
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
  private langService = inject(LangService);

  public lang$i = this.langService.lang$i;

  public changeLang(): void {
    this.langService.changeLang();
  }
}
