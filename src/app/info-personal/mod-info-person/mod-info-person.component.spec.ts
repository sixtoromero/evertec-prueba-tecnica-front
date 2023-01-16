import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModInfoPersonComponent } from './mod-info-person.component';

describe('ModInfoPersonComponent', () => {
  let component: ModInfoPersonComponent;
  let fixture: ComponentFixture<ModInfoPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModInfoPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModInfoPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
