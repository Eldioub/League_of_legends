import { Component, OnInit } from '@angular/core';
import { ChampionService } from 'src/app/services/champion.service';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';

@Component({
  selector: 'app-ag-grid-table',
  templateUrl: 'champion.component.html',
  styleUrls: ['champion.component.css']
})
export class ChampionComponent implements OnInit {
  champions: any[] = [];
  columnDefs: any[] = [];

  constructor(private championService: ChampionService) { }

  ngOnInit() {
    this.championsResult();
    this.columnDefs = [
      { field: 'id', sortable: true },
      { field: 'title', sortable: true, filter: true },
      { field: 'name', sortable: true, filter: true },
      { field: 'key', sortable: true, filter: true },
      {
        field: 'Action',
        cellRenderer: ButtonRendererComponent,
        cellRendererParams: {
          clicked: (id: number) => {
            this.removeChampion(id);
          },
          idGetter: (params: any) => params.data.id,
        },
      }
    ];
  }

  championsResult(): void {
    this.championService.getChampions().subscribe(champions => this.champions = champions);
  }

  championResult(id: number) {
    this.championService.getChampion(id).subscribe(c => console.log(c));
  }

  removeChampion(id: number) {
    this.championService.deleteChampion(id).subscribe(_ => {
      this.championsResult();
      alert('Champion removed successfully');
    }, error => alert(error));
  }

  onRowClicked($event: any) {
    console.log($event);
  }
}