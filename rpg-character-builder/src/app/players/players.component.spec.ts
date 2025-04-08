import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersComponent } from './players.component';

import { By } from '@angular/platform-browser';

describe('PlayersComponent', () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create the "Players Component".', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly display a list of characters', () => {
    // Check that we have at least 10 character cards rendered
    const cards = fixture.debugElement.queryAll(By.css('.player-card'));
    expect(cards.length).toBeGreaterThanOrEqual(10);
  });
});
