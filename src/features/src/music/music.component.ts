import {
  AfterViewInit,
  Component,
  ElementRef,
  Signal,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GearService } from '@services';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class MusicComponent implements AfterViewInit {
  private audioPlayer!: HTMLAudioElement;

  private currentScreen$i: WritableSignal<number> =
    this.gearService.currentScreen$i;
  public isPlaying$i: WritableSignal<boolean> = signal(false);

  public audioSource = '../../assets/audio/just-relax-11157.mp3';
  public isOpen = false;

  constructor(private el: ElementRef, private gearService: GearService) {
    effect(() => {
      switch (this.currentScreen$i()) {
        case 0:
          this.isOpen = false;
          break;
        case 1:
          this.isOpen = false;
          break;
        case 2:
          this.isOpen = false;
          break;
        case 3:
          this.isOpen = true;
          break;
      }
    });
  }

  public ngAfterViewInit(): void {
    this.audioPlayer = this.el.nativeElement.querySelector('#audioPlayer');
  }

  public togglePlayback(): void {
    if (this.audioPlayer.paused) {
      this.audioPlayer.play();
      this.isPlaying$i.set(true);
    } else {
      this.audioPlayer.pause();
      this.isPlaying$i.set(false);
    }
  }
}
