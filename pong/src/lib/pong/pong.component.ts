import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PongGameWrapperComponent } from './components';

@Component({
  selector: 'pong-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PongGameWrapperComponent],
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PongComponent {}
