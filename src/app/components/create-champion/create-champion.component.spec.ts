import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChampionComponent } from './create-champion.component';

describe('CreateChampionComponent', () => {
  let component: CreateChampionComponent;
  let fixture: ComponentFixture<CreateChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateChampionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
