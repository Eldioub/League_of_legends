import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Champion } from '../models/champion';

import usersData from 'src/assets/data/user_data.json';  
import { User } from '../models/user';

export class UserData implements InMemoryDbService {

  createDb() {
    const users: User[] = Object.values(usersData.data);
    return { users };
  }

}
