import { Component, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GearService, LangService } from '@services';

@Component({
  selector: 'app-first-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './first-screen.component.html',
  styleUrls: ['./first-screen.component.scss'],
})
export class FirstScreenComponent {
  private langService: LangService = inject(LangService);
  private gearService: GearService = inject(GearService);

  public isActiveName$i: Signal<boolean> = computed(
    () => this.gearService.currentScreen$i() !== 1
  );

  public isEngLang$i = this.langService.isEngLang$i;
}
