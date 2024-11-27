import {combineEpics, Epic} from 'redux-observable';
import {homeEpic} from '../Screens/ScreenHome/Redux/Epics/HomeEpic';

const epic: Epic[] = [homeEpic] as Epic[];
export const rootEpic = combineEpics(...epic);
