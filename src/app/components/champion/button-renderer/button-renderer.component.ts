import { Component, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Champion } from 'src/app/models/champion';

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <button class="btn btn-danger" 
    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem; border-radius:12px"
    (click)="deleteClickedHandler()">Supprimer</button>
    <button class="btn btn-warning mx-1" 
    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem; border-radius:12px"
    (click)="modifyClickedHandler()">Modifier</button>
  `,
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  
  private params: any;
  private champion: Champion = {
    title: '',
    id: 0,
    key: '',
    name: ''
  };

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }

  agInit(params: any): void {
    this.params = params;
    this.champion = params.colDef.cellRendererParams.championGetter(params);
  }

  deleteClickedHandler() {
    this.params.deleteClicked(this.champion.id, this.champion.title);
  }

  modifyClickedHandler() {
    this.params.modifyClicked(this.champion);
  }
}