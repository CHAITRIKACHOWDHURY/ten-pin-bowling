import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { GameComponent } from './game/game.component';
import { FormsModule } from '@angular/forms';
import { gameReducer } from './store/game.reducer';
import { StoreModule } from '@ngrx/store';
import { PlayerScoreBoardComponent } from './player-score-board/player-score-board.component';
import { CalculatorService } from './utils/calculator.service';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ScoreBoardComponent,
    PlayerScoreBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    StoreModule.forRoot({ game: gameReducer }),
    NgbModule,
  ],
  providers: [CalculatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
