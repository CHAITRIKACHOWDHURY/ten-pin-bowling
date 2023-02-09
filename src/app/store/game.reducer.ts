import { createReducer, on } from '@ngrx/store';
import { addPlayer, resetGame } from './game.action';
import { Player } from '../models/player.model';

export const initialState: Array<Player> = [];

export const gameReducer = createReducer(
  initialState,
  on(addPlayer, (state, player) => 
    (state.concat(player))
  ),
  on(resetGame, () => (
    []  as Array<Player>)
  )
);  