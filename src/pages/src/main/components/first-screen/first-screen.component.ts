import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-first-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './first-screen.component.html',
  styleUrls: ['./first-screen.component.scss'],
  // providers: [EventsService],
})
export class FirstScreenComponent {}
