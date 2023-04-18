import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Champion } from '../models/champion';

@Injectable({
  providedIn: 'root'
})
export class ChampionService {

  private apiUrl = '/api/champions';

  constructor(private http: HttpClient) { }

  getChampions(){
    return this.http.get<Champion[]>(this.apiUrl);
  }

  getChampion(id: number){
    return this.http.get<Champion>(`${this.apiUrl}/${id}`);
  }

  deleteChampion(id: number){
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  insertChampion(champion: Champion){
    return this.http.post<Champion>(`${this.apiUrl}`, champion);
  }

  updateChampion(champion: Champion){
    return this.http.put<Champion>(`${this.apiUrl}/${champion.id}`, champion);
  }

}
