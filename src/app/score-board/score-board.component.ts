import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { resetGame } from '../store/game.action';
import { Router } from '@angular/router';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.sass']
})
export class ScoreBoardComponent implements OnInit {

  private  playerList$: Observable<Array<Player>>
  public playerList: Array<Player> = [];

  constructor(
    private store: Store<{ game: Array<Player> }>,
    public router: Router
    ) {  
    /** fetchs data from ngrx/store */
    this.playerList$ = store.select('game');
  }

  ngOnInit(): void {
    this.setPartyList();
  }
  
  /** sets mutable player list */
  private setPartyList() {
    const list = this.getListOfPlayer();
    if (list && list.length > 0) {
      this.playerList = JSON.parse(JSON.stringify(list));
    }
  }

  /** subscribes ngrx/store data */
  getListOfPlayer(): Array<Player> {
    let tempList: Array<Player> = [];
    this.playerList$.subscribe((players) => {
      tempList = players;
    });
    return tempList;
  }

  /** resets game and navigates to home */
  resetGame(): void {
    this.store.dispatch(resetGame());
    this.router.navigate(['home']);
  }

}
