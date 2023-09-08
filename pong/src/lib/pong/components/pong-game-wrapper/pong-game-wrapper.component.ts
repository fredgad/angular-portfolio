import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import {
  addBallPositions,
  addFieldSizes,
  addGoalBlue,
  addGoalRed,
  addWallBotPos,
  addWallsWidth,
  addWallTopPos,
  offGoalOut,
  pauseOff,
  pauseOn,
  restartGame,
  reverseBallXSpeed,
  reverseBallYSpeed,
} from '../../store/pong.actions';
import { Ball, Field, Game, PongState, Walls } from '../../store/pong.reducer';
import {
  AppWithPongState,
  selectBall,
  selectFieldSizes,
  selectGame,
  selectStore,
  selectWalls,
} from '../../store/pong.selectors';
import { PongGameComponent } from '../pong-game/pong-game.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pong-game-wrapper',
  standalone: true,
  imports: [CommonModule, PongGameComponent],
  templateUrl: './pong-game-wrapper.component.html',
  styleUrls: ['./pong-game-wrapper.component.scss'],
})
export class PongGameWrapperComponent implements OnInit, OnDestroy {
  fieldSizes$: Observable<Field> = this.store$.pipe(select(selectFieldSizes));
  ball$: Observable<Ball> = this.store$.pipe(select(selectBall));
  walls$: Observable<Walls> = this.store$.pipe(select(selectWalls));
  store2$: Observable<PongState> = this.store$.pipe(select(selectStore));
  game$: Observable<Game> = this.store$.pipe(select(selectGame));

  private windowWidth = window.innerWidth;

  public ballSize = 0;
  public ballPosX = 0;
  public ballPosY = 0;
  public ballSpeedX = 0;
  public ballSpeedY = 0;
  public fieldWidth = 0;
  public fieldHeight = 0;
  public wallWidth = 0;
  public wallBotPos = 0;
  public wallTopPos = 0;
  public wallSpeed = 0;
  public blueGoals = 0;
  public redGoals = 0;
  public goalOut = false;

  public sideOfClick: 'left' | 'right' | 'none' = 'none';
  public currentPos = `translate(0px, 0px)`;
  public pause = false;

  static mouseCheck = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private store$: Store<AppWithPongState>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initPongGame();

    this.subscriptions = [
      this.ball$.subscribe((x) => {
        this.ballPosX = x.ballPos_X;
        this.ballPosY = x.ballPos_Y;
        this.ballSpeedX = x.ballSpeed_X;
        this.ballSpeedY = x.ballSpeed_Y;
        this.ballSize = x.ballSize;

        this.currentPos = `translate(${this.ballPosX}px, ${this.ballPosY}px)`;
      }),
      this.fieldSizes$.subscribe((x) => {
        this.fieldWidth = x.width;
        this.fieldHeight = x.height;
      }),
      this.walls$.subscribe((x) => {
        this.wallWidth = x.width;
        this.wallSpeed = x.speed;
        this.wallTopPos = x.wallTopPos;
        this.wallBotPos = x.wallBotPos;
      }),
      this.game$.subscribe((x) => {
        this.pause = x.pause;
        this.blueGoals = x.blueGoals;
        this.redGoals = x.redGoals;
        this.goalOut = x.goalOut;
      }),
    ];
  }

  animation() {
    if (!this.pause) {
      requestAnimationFrame(() => {
        this.changePosition();
        this.animation();
      });
    }
  }

  changePosition(): void {
    this.ballPosX += this.ballSpeedX;
    this.ballPosY += this.ballSpeedY;
    if (!this.goalOut) {
      this.collisionСhecks();
    }

    this.wallsMoovement();

    this.store$.dispatch(
      addBallPositions({ ballPos_X: this.ballPosX, ballPos_Y: this.ballPosY })
    );
    this.cdr.detectChanges();
  }

  wallsMoovement() {
    if (this.sideOfClick === 'none') {
      return;
    } else if (this.sideOfClick === 'left') {
      const move = this.wallTopPos - this.wallSpeed;
      this.wallTopPos = move < 0 ? 0 : move;
    } else if (this.sideOfClick === 'right') {
      const move = this.wallTopPos + this.wallSpeed;
      const maxWallPos = (this.fieldWidth / 3) * 2;
      this.wallTopPos = move > maxWallPos ? maxWallPos : move;
    }
    this.store$.dispatch(addWallTopPos({ wallTopPos: this.wallTopPos }));
  }

  collisionСhecks(): void {
    if (this.ballPosX + this.ballSize > this.fieldWidth) {
      this.store$.dispatch(reverseBallXSpeed());
    }
    if (this.ballPosX < 0) {
      this.store$.dispatch(reverseBallXSpeed());
    }
    if (this.ballPosY + this.ballSize > this.fieldHeight) {
      if (
        this.ballPosX + this.ballSize / 2 < this.wallBotPos + this.wallWidth &&
        this.ballPosX + this.ballSize / 2 > this.wallBotPos
      ) {
        this.store$.dispatch(reverseBallYSpeed());
      } else {
        this.bluegoal();
      }
    }
    if (this.ballPosY < 0) {
      if (
        this.ballPosX + this.ballSize / 2 < this.wallTopPos + this.wallWidth &&
        this.ballPosX + this.ballSize / 2 > this.wallTopPos
      ) {
        this.store$.dispatch(reverseBallYSpeed());
      } else {
        this.redGoal();
      }
    }
  }

  bluegoal() {
    if (!this.goalOut) {
      this.store$.dispatch(addGoalBlue());

      timer(1000).subscribe(() => {
        this.store$.dispatch(
          addBallPositions({
            ballPos_X: this.fieldWidth / 2,
            ballPos_Y: 50,
          })
        );
        this.cdr.detectChanges();
      });
      timer(1200).subscribe(() => {
        this.store$.dispatch(offGoalOut());
        this.cdr.detectChanges();
      });
    }
  }

  redGoal() {
    if (!this.goalOut) {
      this.store$.dispatch(addGoalRed());

      timer(1000).subscribe(() => {
        this.store$.dispatch(
          addBallPositions({
            ballPos_X: this.fieldWidth / 2,
            ballPos_Y: this.fieldHeight - 50 - this.ballSize,
          })
        );
        this.cdr.detectChanges();
      });
      timer(1200).subscribe(() => {
        this.store$.dispatch(offGoalOut());
        this.cdr.detectChanges();
      });
    }
  }

  togglePause() {
    if (this.pause) {
      this.store$.dispatch(pauseOff());
      this.animation();
    } else {
      this.store$.dispatch(pauseOn());
    }
  }

  restart() {
    this.store$.dispatch(restartGame());
  }

  initPongGame(): void {
    const windowHeight = window.innerHeight;
    const fieldWidth = this.windowWidth > 500 ? 500 : this.windowWidth - 10;
    const fieldHeight = windowHeight > 600 ? 600 : windowHeight - 10;
    const wallsWidth = fieldWidth / 3;

    this.store$.dispatch(
      addFieldSizes({ width: fieldWidth, height: fieldHeight })
    );
    this.store$.dispatch(addWallsWidth({ width: wallsWidth }));

    this.animation();
  }

  touchDown(event: any): void {
    this.sideOfClick =
      event.changedTouches[0].clientX < this.windowWidth / 2 ? 'left' : 'right';
    console.log(this.sideOfClick, event, this.fieldWidth / 2, 'touchDown');
  }

  mouseDown(event: any): void {
    this.sideOfClick = event.clientX < this.windowWidth / 2 ? 'left' : 'right';
  }

  mouseUp(): void {
    this.sideOfClick = 'none';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s && s.unsubscribe());
  }
}
