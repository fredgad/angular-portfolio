import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pong-game',
  standalone: true,
  templateUrl: './pong-game.component.html',
  styleUrls: ['./pong-game.component.scss'],
})
export class PongGameComponent {
  @Input() fieldWidth = 0;
  @Input() fieldHeight = 0;
  @Input() ballSize = 0;
  @Input() ballPosX = 0;
  @Input() ballPosY = 0;
  @Input() currentPos = '';
  @Input() wallWidth = 0;
  @Input() wallBotPos = 0;
  @Input() wallTopPos = 0;
}
