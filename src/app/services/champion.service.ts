import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Champion } from '../models/champion';
import { API } from '../api/API';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChampionService {

  private apiUrlChampion = API.CHAMPIONS;

  constructor(private http: HttpClient) { }

  getChampions(){
    return this.http.get<Champion[]>(this.apiUrlChampion);
  }

  getChampion(id: number){
    return this.http.get<Champion>(`${this.apiUrlChampion}/${id}`);
  }

  generateId(){
    return this.getChampions().pipe(
      map(champions => champions.map(champion => champion.id)),
      map(ids => Math.max(...ids) + 1)
    );
  }

  deleteChampion(id: number){
    return this.http.delete<any>(`${this.apiUrlChampion}/${id}`);
  }

  insertChampion(champion: Champion){
    return this.http.post<Champion>(`${this.apiUrlChampion}`, champion);
  }

  updateChampion(champion: Champion){
    return this.http.put<Champion>(`${this.apiUrlChampion}/${champion.id}`, champion);
  }

}
