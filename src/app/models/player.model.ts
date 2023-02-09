import { Frame } from "./frame.model";
import { ScoreCard } from "./scoreCard.model";

export interface Player {
    id?: number;
    name?: string;
    frames?: Array<Frame>;
    scoreCard?: ScoreCard;
}