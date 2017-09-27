import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const heroes = [
      {id: 1, name: 'Batman'},
      {id: 2, name: 'Superman'},
      {id: 3, name: 'Iron Man'},
      {id: 4, name: 'Kick-ass'},
      {id: 5, name: 'Thor'},
      {id: 7, name: 'Wonder Woman'},
      {id: 8, name: 'Robin'}
    ];
    return {heroes};
  }
}
