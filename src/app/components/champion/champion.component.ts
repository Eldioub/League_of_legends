import { Component, OnInit } from '@angular/core';
import { ChampionService } from 'src/app/services/champion.service';

@Component({
  selector: 'app-ag-grid-table',
  templateUrl: 'champion.component.html',
  styleUrls: ['champion.component.css']
})
export class ChampionComponent implements OnInit{
    champions: any[] = [];
    columnDefs: any[] = [
      {field: 'id', sortable:true},
      {field: 'title', sortable: true, filter: true}, 
      {field:  'name', sortable: true, filter: true}, 
      {field: 'key', sortable: true, filter: true}
    ];

    constructor(private championService: ChampionService) { }
  
    ngOnInit() {
      this.championsResult();
    }
  
    championsResult(): void {
      this.championService.getChampions().subscribe(champions => this.champions = champions );
    }

    championResult(id: number){
      this.championService.getChampion(id).subscribe(c => console.log(c));
    }

    removeChampion(id: number){
      this.championService.deleteChampion(id).subscribe(_ => {
        this.championsResult();
      }, error => alert(error));
    }

    onRowClicked($event : any){
      console.log($event);
    }
}