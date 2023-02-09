import { createAction, props } from '@ngrx/store';
import { Player } from '../models/player.model';
 
export const addPlayer = createAction('[Game Component] Add Player', props<Player>());
export const resetGame = createAction('[Score-Board Component] Reset Game');
