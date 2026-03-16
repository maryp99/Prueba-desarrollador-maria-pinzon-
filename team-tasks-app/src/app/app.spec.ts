// src/app/app.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Necesario para pruebas de rutas
import { AppComponent } from './app'; // Importa el componente directamente
import { CommonModule } from '@angular/common'; // Si tu componente usa CommonModule
import { RouterOutlet, RouterLink } from '@angular/router'; // Si tu componente usa RouterOutlet/RouterLink

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // Proporciona las funcionalidades de Router para las pruebas
        CommonModule, // Si AppComponent usa directivas comunes como *ngIf, *ngFor
        RouterOutlet, // Si AppComponent usa <router-outlet>
        RouterLink,   // Si AppComponent usa routerLink
        AppComponent  // Importa el componente standalone directamente aquí
      ],
      // declarations: [], // Ya no es necesario para componentes standalone
      // providers: [] // Si tienes algún servicio que necesites mockear
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent); // Usa AppComponent
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the title 'team-tasks-app'`, () => { // Cambiado el texto esperado
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('team-tasks-app'); // Accede a la propiedad title
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Detecta los cambios para renderizar el HTML
    const compiled = fixture.nativeElement as HTMLElement;
    // Ajusta el selector y el texto esperado según tu app.component.html
    // Si tu h1 está dentro del main, podrías necesitar un selector más específico
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, team-tasks-app');
  });
});