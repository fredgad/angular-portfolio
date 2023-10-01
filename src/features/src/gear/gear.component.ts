import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundImageDirective } from '@directives';
import { TrackByPropertyPipe } from '@pipes';
import { GearImagesI, GearPositionsI } from '@interfaces';
import { GearImages } from '@constants';
import { GearService } from '@services';

@Component({
  selector: 'app-gear',
  standalone: true,
  imports: [CommonModule, BackgroundImageDirective, TrackByPropertyPipe],
  templateUrl: './gear.component.html',
  styleUrls: ['./gear.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GearComponent {
  @Input() public screen = 0;

  private gearService: GearService = inject(GearService);

  public gearPosition$i: Signal<GearPositionsI> =
    this.gearService.gearPosition$i;
  public gearImages: GearImagesI[] = GearImages;
}
