import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(routes),
        provideLocationMocks()
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'RPG Character Builder' title`, () => { // Updated title
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('RPG Character Builder'); // Matches actual value
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // Updated to match actual rendered content
    expect(compiled.querySelector('h1')?.textContent).toContain('RPG Character Builder');
  });
});

describe('AppComponent Navigation using RouterTestingHarness', () => {
  it('Should have correct route for PlayersComponent (Player’s link leads to the PlayersComponent)', async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(routes),
        provideLocationMocks()
      ]
    }).compileComponents();

    const harness = await TestBed.runInInjectionContext(async () => {
      return await RouterTestingHarness.create('/players');
    });

    const renderedContent = harness.fixture.nativeElement.textContent;
    expect(renderedContent).toContain('Players');
  });
});
