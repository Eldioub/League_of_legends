import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Champion } from '../models/champion';

import champion_info from 'src/assets/data/champion_info.json';  

export class ChampionData implements InMemoryDbService {

  createDb() {
    const champions: Champion[] = Object.values(champion_info.data);
    return { champions };
  }

}
