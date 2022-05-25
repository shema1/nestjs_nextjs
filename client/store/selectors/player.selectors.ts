import { RootState } from "../reducers"
import _ from "lodash"
import { PlayerState } from "../../types/player";

const NAME = 'player';

export const getPlayerState = (state: RootState): PlayerState => state[NAME];
