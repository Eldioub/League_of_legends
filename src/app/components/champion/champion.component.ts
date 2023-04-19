import { Component, Inject, OnInit } from '@angular/core';
import { ChampionService } from 'src/app/services/champion.service';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Champion } from 'src/app/models/champion';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';



@Component({
  selector: 'app-ag-grid-table',
  templateUrl: 'champion.component.html',
  styleUrls: ['champion.component.css']
})
export class ChampionComponent implements OnInit {
  private gridApi!: GridApi;
  champions: any[] = [];
  columnDefs: any[] = [];
  textSearch = '';
  public localeText = {
    // for filter panel
    page: 'Page',
    to: 'à',
    of: 'de',
    noRowsToShow: 'Aucune ligne à afficher',
    filterOoo: 'Filtrer...',
    applyFilter: 'Appliquer le filtre',

    // for number filter
    equals: 'Egal',
    notEqual: 'Pas égal',
    lessThan: 'Moins que',
    greaterThan: 'Plus grand que',
    blank: 'Vide' ,
    notBlank: 'Non vide' ,
    // for text filter
    contains: 'Contient',
    notContains: 'Ne contient pas',
    startsWith: 'Commence par',
    endsWith: 'Finit par',
  }
  constructor(private championService: ChampionService, private dialog: MatDialog) { }

  ngOnInit() {
    this.championsResult();
    //localStorage.setItem('genId', this.champions[this.champions.length-1].id + 1);
    //const championsFromLocalStrorage = localStorage.getItem('champions');
    // if(!championsFromLocalStrorage){
    //   this.championsResult();
    // } else {
    //   this.champions = JSON.parse(championsFromLocalStrorage);
    //   localStorage.setItem('genId', this.champions[this.champions.length-1].id + 1);
    // }
    this.columnDefs = [
      { field: 'id', headerName: '#', sortable: true},
      { field: 'title', headerName: 'Titre', sortable: true, filter: true},
      { field: 'name', headerName: 'Nom', sortable: true, filter: true},
      { field: 'key', headerName: 'Clé', sortable: true, filter: true},
      {
        headerName: 'Actions',
        cellRenderer: ButtonRendererComponent,
        cellRendererParams: {
          deleteClicked: (id: number, title: string) => {
            this.removeDialog('0ms', '0ms', id, title);
          },
          modifyClicked: (champion: Champion) => {
            this.modifyDialog('0ms', '0ms', champion);
          },
          championGetter: (params: any) => params.data
        },
        headerClass: 'text-center'
      }
    ];
  }

  championsResult() {
    this.championService.getChampions().subscribe(champions => {
      this.champions = champions;
      // localStorage.setItem('champions', JSON.stringify(this.champions));      
    });
  }

  championResult(id: number) {
    this.championService.getChampion(id).subscribe(c => console.log(c));
  }

  removeChampion(id: number) {
    this.championService.deleteChampion(id).subscribe(_ => {
      // this.champions = this.champions.filter(c => c.id !== id);
      // localStorage.setItem('champions', JSON.stringify(this.champions));
      this.championsResult();
    }, error => console.log(error));
  }

  updateChampion(champion: Champion) {
    this.championService.updateChampion(champion).subscribe(_ => {
      this.championsResult();
      // this.champions = this.champions.map(c => c.id === champion.id ? champion : c);
      // localStorage.setItem('champions', JSON.stringify(this.champions));
    }, error => console.log(error));
  }

  exportAsCsv() {
    this.gridApi.exportDataAsCsv();
  }

  exportAsExcel() {
    this.gridApi.exportDataAsExcel();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  onSearch() {
    if (this.textSearch == '') this.championsResult();
    const query: string = this.textSearch;
    const filteredData = this.champions.filter((champion) => {
      return Object.values({ title: champion.title, key: champion.key, name: champion.name })
        .some(value => value.toString()
          .toLowerCase()
          .includes(query.toLowerCase()
          )
        );
    });
    this.champions = filteredData;
  }

  removeDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number, title: string): void {
    const dialogRef = this.dialog.open(DialogRemoveChampion, {
      width: '20rem',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { title: title }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.removeChampion(id);
      }
    });
  }

  modifyDialog(enterAnimationDuration: string, exitAnimationDuration: string, champion: Champion): void {
    const dialogRef = this.dialog.open(DialogModifyChampion, {
      width: '40rem',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { champion: champion }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'modify') {
        this.updateChampion(champion);
      }
    });
  }


}

@Component({
  selector: 'dialog-animations-example-dialog',
  template: `
    <h1 mat-dialog-title>Confirmer la suppresion</h1>
    <div mat-dialog-content>
      Veuillez supprimer le champion <span style="text-decoration: underline;">{{ data.title }}</span> ?
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Annuler</button>
      <button mat-button mat-dialog-close cdkFocusInitial (click)="delete()">Supprimer</button>
    </div>
`,
})
export class DialogRemoveChampion {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string }, public dialogRef: MatDialogRef<DialogRemoveChampion>) { }
  delete() {
    this.dialogRef.close('delete');
  }
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  template: `
    <h1 mat-dialog-title>Modifier le champion</h1>
    <div mat-dialog-content>
      <form style="width: 100%" (change)="changeForm()">
        <mat-form-field style="width: 100%">
          <mat-label>Title</mat-label>
          <input type="text" matInput [formControl]="titleFormControl" [attr.errorStateMatcher]="matcher">
          <mat-error *ngIf="titleFormControl.hasError('required')">Titre est <strong>obligatoire</strong></mat-error>
        </mat-form-field>
        <mat-form-field style="width: 100%">
          <mat-label>Name</mat-label>
          <input type="text" matInput [formControl]="nameFormControl" [attr.errorStateMatcher]="matcher">
          <mat-error *ngIf="nameFormControl.hasError('required')">Nom est <strong>obligatoire</strong></mat-error>
        </mat-form-field>
        <mat-form-field style="width: 100%">
          <mat-label>Key</mat-label>
          <input type="text" matInput [formControl]="keyFormControl" [attr.errorStateMatcher]="matcher">
          <mat-error *ngIf="keyFormControl.hasError('required')">Clé est <strong>obligatoire</strong></mat-error>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Annuler</button>
      <button mat-button mat-dialog-close cdkFocusInitial (click)="modify()" [disabled]="titleFormControl.hasError('required') || keyFormControl.hasError('required') || nameFormControl.hasError('required')">Confirmer</button>
    </div>
`,
})
export class DialogModifyChampion {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { champion: Champion }, public dialogRef: MatDialogRef<DialogModifyChampion>) { }
  modify() {
    this.dialogRef.close('modify');
  }
  changeForm(){
    if(this.keyFormControl.value) this.data.champion.key = this.keyFormControl.value;
    if(this.nameFormControl.value) this.data.champion.name = this.nameFormControl.value;
    if(this.titleFormControl.value) this.data.champion.title = this.titleFormControl.value;
  }
  titleFormControl = new FormControl(this.data.champion.title, [Validators.required]);
  nameFormControl = new FormControl(this.data.champion.name, [Validators.required]);
  keyFormControl = new FormControl(this.data.champion.key, [Validators.required]);
  matcher = new MyErrorStateMatcher();
}