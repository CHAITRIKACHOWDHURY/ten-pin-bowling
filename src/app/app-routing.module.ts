import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: 'home', component: GameComponent },
  { path: 'score-board', component: ScoreBoardComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
