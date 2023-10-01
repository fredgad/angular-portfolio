import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CubeColorsI } from '../../entities/cube.interfaces';

import { CubeColors } from '../../entities/cube.constants';

@Component({
  selector: 'cube-edge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edge-cube.component.html',
  styleUrls: ['./edge-cube.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EdgeCubeComponent implements OnInit {
  @Input() public classInput = '';

  public cubeColors: CubeColorsI = {
    top: '',
    front: '',
    right: '',
    bot: '',
    back: '',
    left: '',
  };

  public ngOnInit(): void {
    this.cubeColors = CubeColors[this.classInput];
  }

  public trackByFn(_: number, item: { key: string; value: string }): string {
    return item.key;
  }
}
