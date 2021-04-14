import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PoliticadeprivacidadePage } from './politicadeprivacidade.page';

describe('PoliticadeprivacidadePage', () => {
  let component: PoliticadeprivacidadePage;
  let fixture: ComponentFixture<PoliticadeprivacidadePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticadeprivacidadePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PoliticadeprivacidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
