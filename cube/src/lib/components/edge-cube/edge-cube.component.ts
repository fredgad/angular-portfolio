import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CubeColorsI, CubePositionI } from '../../entities/cube.interfaces';

import { CubeColors } from '../../entities/cube.constants';

@Component({
  selector: 'cube-edge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edge-cube.component.html',
  styleUrls: ['./edge-cube.component.scss'],
})
export class EdgeCubeComponent implements OnInit {
  @Input() public classInput = '';
  // @Input() public position: CubePositionI = {
  //   botLayer: {
  //     pos_X: 0,
  //     pos_Y: 0,
  //     pos_Z: 0,
  //   },
  //   topLayer: {
  //     posT_X: 0,
  //     posT_Y: 0,
  //     posT_Z: 0,
  //   },
  //   axes: [],
  // };

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
    // console.log(this.cubeColors, this.classInput);
  }

  public trackByFn(_: number, item: { key: string; value: string }): string {
    return item.key;
  }
}
