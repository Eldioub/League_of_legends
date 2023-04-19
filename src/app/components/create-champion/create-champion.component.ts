import { Component, OnInit, Inject  } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Champion } from 'src/app/models/champion';
import { ChampionService } from 'src/app/services/champion.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-create-champion',
  templateUrl: './create-champion.component.html',
  styleUrls: ['./create-champion.component.css']
})
export class CreateChampionComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'name', 'key', 'Action'];
  champions: Champion[] = [];
  id:number = -1;
  createChampionform = new FormGroup({
    id: new FormControl(1, Validators.required),
    title: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    key: new FormControl('', Validators.required)
  });

  constructor(private championService: ChampionService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.createChampionform.controls.id.disable();
    this.genId();
  }

  genId() {
    this.championService.generateId().subscribe(n => {
      this.createChampionform.controls.id.setValue(n);
      this.id = n;
    });
  }

  ajouterChampion() {
    let name = this.createChampionform.controls.name.value; name = name ? name : '';
    let key = this.createChampionform.controls.key.value; key = key ? key : '';
    let title = this.createChampionform.controls.title.value; title = title ? title : '';
    if (this.createChampionform.valid) {
      const champion: Champion = { id: this.id, name: name, key: key, title: title };
      if (!this.champions.some(c => c.id === champion.id)){
        this.champions = [...this.champions, champion];
        this.createChampionform.controls.id.setValue(++this.id);
      }
      this.createChampionform.controls.title.setValue('');
      this.createChampionform.controls.key.setValue('');
      this.createChampionform.controls.name.setValue('');
    }
  }

  saveChampions() {
    this.champions.forEach(champion => {
      this.championService.insertChampion(champion).subscribe(_ => {
      }, error => console.log(error));
    });
    this.router.navigateByUrl('');
  }

  deleteChampion(id: number){
    this.champions = this.champions.filter(c => c.id !== id)
    if(id === this.id-1) this.createChampionform.controls.id.setValue(--this.id);
  }

  modifyDialog(enterAnimationDuration: string, exitAnimationDuration: string, champion: Champion): void {
    let champion_copy = {...champion};    
    const dialogRef = this.dialog.open(DialogModifyIChampion, {
      width: '40rem',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { champion_copy: champion_copy  }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'modify') {
        this.champions = this.champions.map(c => c.id === champion_copy.id ? champion_copy : c);
      }
    });
  }
}

export class MyErrorStateMatcher implements MyErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  template: `
    <h1 mat-dialog-title>Modifier le champion</h1>
    <div mat-dialog-content>
      <form style="width: 100%" (change)="changeForm()">
        <mat-form-field style="width: 100%">
          <mat-label>Title</mat-label>
          <input type="text" matInput [formControl]="titleFormControl" [attr.errorStateMatcher]="matcher">
          <mat-error *ngIf="titleFormControl.hasError('required')"> Titre est <strong>obligatoire</strong></mat-error>
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
export class DialogModifyIChampion {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { champion_copy: Champion }, public dialogRef: MatDialogRef<DialogModifyIChampion>) { }
  modify() {
    this.dialogRef.close('modify');
  }
  changeForm(){
    if(this.keyFormControl.value) this.data.champion_copy.key = this.keyFormControl.value;
    if(this.nameFormControl.value) this.data.champion_copy.name = this.nameFormControl.value;
    if(this.titleFormControl.value) this.data.champion_copy.title = this.titleFormControl.value;
  }
  titleFormControl = new FormControl(this.data.champion_copy.title, [Validators.required]);
  nameFormControl = new FormControl(this.data.champion_copy.name, [Validators.required]);
  keyFormControl = new FormControl(this.data.champion_copy.key, [Validators.required]);
  matcher = new MyErrorStateMatcher();
}