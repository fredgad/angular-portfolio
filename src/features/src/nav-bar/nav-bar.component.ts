import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarMenu } from '@constants';
import { BarMenuI } from '@interfaces';
import { timer } from 'rxjs';
import { NavBarAnimation, NavBarAnimationStateEnum } from '@animations';
import { RouterModule } from '@angular/router';
import { LangService } from '@services';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [NavBarAnimation],
})
export class NavBarComponent {
  private langService: LangService = inject(LangService);

  public isEngLang$i: Signal<boolean> = this.langService.isEngLang$i;

  public isOpenNav = false;
  public navEnum: typeof NavBarAnimationStateEnum = NavBarAnimationStateEnum;
  public pause = false;
  public barMenu: BarMenuI[] = BarMenu;

  public toggleNav(): void {
    if (this.pause) return;

    this.pause = true;
    this.isOpenNav = !this.isOpenNav;

    for (let x = 0; x < this.barMenu.length; x++) {
      timer(x * 22).subscribe(() => {
        if (this.isOpenNav) {
          this.barMenu[x].state = !this.barMenu[x].state;
        } else {
          const z = this.barMenu.length - x - 1;
          this.barMenu[z].state = !this.barMenu[z].state;
        }
      });
    }
    timer(200).subscribe(() => {
      this.pause = false;
    });
  }
}
