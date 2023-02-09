import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Player } from '../models/player.model';
import { CalculatorService } from '../utils/calculator.service';
import { AbstractControl, NgForm } from '@angular/forms';
import { Frame } from '../models/frame.model';

@Component({
  selector: 'app-player-score-board',
  templateUrl: './player-score-board.component.html',
  styleUrls: ['./player-score-board.component.sass']
})
export class PlayerScoreBoardComponent implements OnInit {

  @ViewChild('gameForm') form: NgForm;
  @Input() player = {} as Player;

  constructor(
    public scoreCalculator: CalculatorService
  ) { }

  ngOnInit(): void {
  }

  isFirstRollOpen(i: number): boolean {
    const prevFrame = this.player.frames[i - 1];
    return (i === 0) ||
      (prevFrame && (prevFrame.first === 10)) ||
      (prevFrame && this.scoreCalculator.isPositiveFiniteNumber(prevFrame.first) && this.scoreCalculator.isPositiveFiniteNumber(prevFrame.second) && 
        ((prevFrame.first + prevFrame.second) <= 10));
  }

  isSeconRollOpen(i: number): boolean {
    const currentFrame = this.player.frames[i];
    return (i < 9 && this.scoreCalculator.isPositiveFiniteNumber(currentFrame.first) && currentFrame.first < 10) ||
      (i === 9 && this.scoreCalculator.isPositiveFiniteNumber(currentFrame.first) && currentFrame.first <= 10);
  }

  isThirdRollOpen(i: number): boolean {
    const currentFrame = this.player.frames[i];
    return (this.scoreCalculator.isPositiveFiniteNumber(currentFrame.first) && 
            this.scoreCalculator.isPositiveFiniteNumber(currentFrame.second) && 
      ((currentFrame.first + currentFrame.second) >= 10) &&
      ((currentFrame.first + currentFrame.second) <= 20)); 
  }

  resetNextRolls(frame: Frame): void {
    if (frame.first === 10) {
      frame.second = undefined;
      frame.third = undefined;
    }
  }

  calculate(validInput: boolean) {
    console.log(JSON.stringify(this.player.frames));
    if (validInput) {
      this.player.scoreCard = this.scoreCalculator.calculateCurrentScore(this.player.frames);
    }
  }

  invalidformControl(control: AbstractControl): boolean {
    return (control && control.invalid && (control.dirty || control.touched));
  }

}
