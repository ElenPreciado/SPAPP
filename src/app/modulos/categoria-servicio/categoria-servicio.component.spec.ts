import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaServicioComponent } from './categoria-servicio.component';

describe('CategoriaServicioComponent', () => {
  let component: CategoriaServicioComponent;
  let fixture: ComponentFixture<CategoriaServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaServicioComponent]
    });
    fixture = TestBed.createComponent(CategoriaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
