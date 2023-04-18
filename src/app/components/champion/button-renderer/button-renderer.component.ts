import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <button class="btn btn-danger" (click)="btnClickedHandler()">Supprimer</button>
  `,
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  
  private params: any;
  private id: number = -1;

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }

  agInit(params: any): void {
    this.params = params;
    this.id = params.colDef.cellRendererParams.idGetter(params);
  }

  btnClickedHandler() {
    this.params.clicked(this.id);
  }
}