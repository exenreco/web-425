import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterListComponent } from './character-list.component';
import { Character } from '../players/players.interface';
import { By } from '@angular/platform-browser';

describe('CharacterListComponent', () => {
  let
    component: CharacterListComponent,
    fixture: ComponentFixture<CharacterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Character List Component', () => {
    expect(component).toBeTruthy();
  });

  it('should display characters when provided', () => {
    const mockCharacters: Character[] = [{
      id: 200,
      name: 'Test Character',
      gender: 'Male',
      class: 'Warrior',
      faction: 'The Arcane Circle',
      startingLocation: 'Eldoria Spire',
      funFact: 'Hello World, This is a test!'
    }];
    component.characters = mockCharacters;
    fixture.detectChanges();

    const characterCards = fixture.debugElement.queryAll(By.css('.character-list > .character'));
    expect(characterCards.length).toBe(1);
    expect(characterCards[0].nativeElement.textContent).toContain('Test Character');
  });

  it('should show empty message when no character provided.', () => {
    component.characters = [];
    fixture.detectChanges();
    const emptyMsg = fixture.debugElement.query(By.css('.character-list > .empty'));
    expect(emptyMsg).toBeTruthy();
  });
});
