import { Injectable } from '@angular/core';
import { ScoreCard } from '../models/scoreCard.model';
import { Frame } from '../models/frame.model';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  calculateCurrentScore(frames: Array<Frame>): ScoreCard {
    let currentScore: ScoreCard = { score: 0 }; 
    frames.forEach((frame, index) => {
      currentScore.score += this.getCurrentFrameScore(frames, frame, index);
    });
    return currentScore;
  }

  private getCurrentFrameScore(frames: Array<Frame>, frame: Frame, frameIndex: number): number {
    let scoreOfCurrentFrame = 0;
    const nextFrame = frames[frameIndex + 1];
    const nextToNextFrame = frames[frameIndex + 2];
    const len = frames.length;
    if (frameIndex < (len -1)) {
      scoreOfCurrentFrame = this.calculateScoreForNotLastFrame(frame, scoreOfCurrentFrame, nextFrame, nextToNextFrame);
    } else if (frameIndex === (len -1)) {
      scoreOfCurrentFrame =  this.sum(frame.first, frame.second, frame.third);
    }
    return scoreOfCurrentFrame;
  }

  private calculateScoreForNotLastFrame(
    frame: Frame, 
    scoreOfCurrentFrame: number, 
    nextFrame: Frame, 
    nextToNextFrame: Frame) {
    if (this.sum(frame.first, frame.second) < 10) {
      scoreOfCurrentFrame = this.sum(frame.first, frame.second);
    } else if (frame.first === 10 &&
      ((this.isPositiveFiniteNumber(nextFrame.first) && nextFrame.first !== 10) || 
        (nextFrame.first === 10 && this.isPositiveFiniteNumber(nextFrame.second) && nextFrame.second >= 0))) {
      scoreOfCurrentFrame = 10 + this.sum(nextFrame.first, nextFrame.second);
    } else if (frame.first === 10 && nextFrame.first === 10 && nextToNextFrame) {
      scoreOfCurrentFrame = 10 + this.sum(nextFrame.first, nextToNextFrame.first);
    } else if (this.sum(frame.first, frame.second) === 10) {
      scoreOfCurrentFrame = 10 + this.sum(nextFrame.first);
    }
    return scoreOfCurrentFrame;
  }

  sum(a: number, b?: number, c?: number): number {
    let s = 0;
    if (this.isPositiveFiniteNumber(a)) {
      s += a;
    } 
    if (this.isPositiveFiniteNumber(b)) {
      s += b;
    } 
    if (this.isPositiveFiniteNumber(c)) {
      s += c;
    }
    return s;
  }

  isPositiveFiniteNumber(a: number): boolean {
    return Number.isFinite(a) && a >=0;
  }

}
