import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuildListComponent } from './guild-list.component';
import { Guild } from '../create-guild/create.guild.interface';
import { By } from '@angular/platform-browser';

describe('GuildListComponent', () => {
  let
    component: GuildListComponent,
    fixture: ComponentFixture<GuildListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuildListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Guild List Component', () => {
    expect(component).toBeTruthy();
  });

  it('should display guilds when provided', () => {
    const mockGuilds: Guild[] = [{
      id:                     2000,
      name:                   'Test Guild',
      type:                   'Competitive',
      terms:                  true,
      description:            'This is a test!',
      notificationPreference: 'Email'
    }];
    component.guilds = mockGuilds;
    fixture.detectChanges();

    const guildCards = fixture.debugElement.queryAll(By.css('.guild-list > .guild'));
    expect(guildCards.length).toBe(1);
    expect(guildCards[0].nativeElement.textContent).toContain('Test Guild');
  });

  it('should show empty message when no guild provided.', () => {
    component.guilds = [];
    fixture.detectChanges();
    const emptyMsg = fixture.debugElement.query(By.css('.guild-list > .empty'));
    expect(emptyMsg).toBeTruthy();
  });
});
