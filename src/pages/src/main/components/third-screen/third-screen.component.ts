import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GearService } from '@services';
import { NgOptimizedImage } from '@angular/common';
import { BarMenu } from '@constants';
import { BarMenuI } from '@interfaces';

@Component({
  selector: 'app-third-screen',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './third-screen.component.html',
  styleUrls: ['./third-screen.component.scss'],
})
export class ThirdScreenComponent {
  public currentScreen$i = this.gearService.currentScreen$i;
  public barMenu: BarMenuI[] = BarMenu;

  public imagesPaths = 'assets/images/main/';
  public isTopClass = true;
  public isRightClass = false;

  constructor(private gearService: GearService) {
    effect(() => {
      switch (this.currentScreen$i()) {
        case 1:
          this.isTopClass = true;
          break;
        case 2:
          this.isTopClass = false;
          this.isRightClass = false;
          break;
        case 3:
          this.isRightClass = true;
          break;
      }
    });
  }

  public onClick(num: number): void {
    console.log(num);
  }

  ngOnInit(): void {
    console.log(this.currentScreen$i());
  }
}
