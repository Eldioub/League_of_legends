import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Champion } from '../models/champion';
import usersData from 'src/assets/data/user_data.json';  
import champion_info from 'src/assets/data/champion_info.json';  
import { User } from '../models/user';

export class Data implements InMemoryDbService {

  createDb() {
    const champions: Champion[] = Object.values(champion_info.data);
    const users: User[] = Object.values(usersData.data);
    return { champions, users };
  }
  
}
