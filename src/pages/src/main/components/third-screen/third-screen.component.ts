import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-third-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './third-screen.component.html',
  styleUrls: ['./third-screen.component.scss'],
})
export class ThirdScreenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
