import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlterarDadosPessoaisPage } from './alterar-dados-pessoais.page';

describe('AlterarDadosPessoaisPage', () => {
  let component: AlterarDadosPessoaisPage;
  let fixture: ComponentFixture<AlterarDadosPessoaisPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarDadosPessoaisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlterarDadosPessoaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
