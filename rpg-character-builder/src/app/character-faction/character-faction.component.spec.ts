import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterFactionComponent } from './character-faction.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('CharacterFactionComponent (TDD)', () => {
  let
    component: CharacterFactionComponent,
    fixture: ComponentFixture<CharacterFactionComponent>,
    httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterFactionComponent],
      providers: [ provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting() ]
    })
    .compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CharacterFactionComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding requests
  });

  // Test 1: Create component
  it('should create the component', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne(component['apiUrl']);
    req.flush([]); // Mock empty response
    expect(component).toBeTruthy();
  });

  // Test 2: Fetch factions
  it('should correctly fetch a list of character factions', () => {
    const mockFactions = [
      { id: 1, name: 'Iron Brotherhood', description: 'Warriors guild' },
      { id: 2, name: 'Arcane Circle', description: 'Mages guild' }
    ];

    fixture.detectChanges();
    const req = httpMock.expectOne(component['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockFactions);

    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('.data-row'));
    expect(rows.length).toBe(6);
    expect(rows[1].nativeElement.textContent).toContain('Iron Brotherhood')
  });

  // Test 3: Handle errors
  it('should handle errors when faction data is not found', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne(component['apiUrl']);
    req.flush('Not found', { status: 404, statusText: 'Not Found' });

    fixture.detectChanges();
    const errEl = fixture.debugElement.query(By.css('.error'));
    expect(component.error).toBeTrue();
    expect(errEl.nativeElement.textContent).toContain('Error 404');
  });

  // Test 4: Update DOM
  it('should display empty message when no factions', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne(component['apiUrl']);
    req.flush([]);

    fixture.detectChanges();
    const emptyEl = fixture.debugElement.query(By.css('.empty'));
    expect(emptyEl.nativeElement.textContent).toContain('No character factions found.');
  });
});
