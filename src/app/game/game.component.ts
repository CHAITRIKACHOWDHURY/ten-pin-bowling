import { Component, OnInit, ViewChild } from '@angular/core';
import { Player } from '../models/player.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addPlayer } from '../store/game.action';
import { AbstractControl, NgForm } from '@angular/forms';
import { Frame } from '../models/frame.model';
import { ScoreCard } from '../models/scoreCard.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {

  @ViewChild('playerForm') form: NgForm;

  public newPlayer = {} as Player;
  private playerList$: Observable<Array<Player>>
  public playerList: Array<Player> = [];

  constructor(private store: Store<{ game: Array<Player> }>) {  
    /** fetchs data from ngrx/store */
    this.playerList$ = store.select('game');
  }

  ngOnInit(): void {
    this.getListOfPlayer();
  }

  /** subscribes ngrx/store data */
  private getListOfPlayer(): void {
    this.playerList$.subscribe((players) => {
      this.playerList = players;
    });
  }

  /** determines the add player button name*/
  get addPlayerBtnName(): string {
    return (this.playerList && this.playerList.length > 0) ? 'Add Another Player' : 'Add Player';
  }

  /** initializes new player*/
  private initializePlayer(p: Player): void {
    p.id = this.playerList.length;
    const initialFrame: Frame = {} as Frame;
    p.frames = Array<Frame>(10).fill(initialFrame);
    p.scoreCard = { score: 0 } as ScoreCard;
  }

  /** checks if form control is invalid*/
  invalidformControl(control: AbstractControl): boolean {
    return (this.form && control && control.invalid && (this.form.submitted || control.dirty || control.touched));
  }

  /** adds player in ngrx-store*/
  addPlayer(p: Player): void {
    if (this.form.valid) {
      this.initializePlayer(p);
      this.store.dispatch(addPlayer(p));
      this.newPlayer = {} as Player;
      this.form.resetForm();
    }
  }
}
