import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCharacterComponent } from './create-character.component';

describe('CreateCharacterComponent', () => {
  let component: CreateCharacterComponent;
  let fixture: ComponentFixture<CreateCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCharacterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the "Create Character Component".', () => {
    expect(component).toBeTruthy();
  });

  it('should generate a random character ID between 1 and 1000 with no decimal places', () => {
    const id = component.generateRandomId();
    expect(id).toBeGreaterThanOrEqual(1);
    expect(id).toBeLessThanOrEqual(1000);
    expect(id % 1).toBe(0);
  });

  it('should add a character with correct customization', () => {
    component.characterModel = {
      name:             'Test',
      class:            'Rogue',
      gender:           'Other',
      funFact:          'This is a test',
      faction:          'The Arcane Circle',
      startingLocation: 'Wet Lands'
    };
    component.onSubmit();
    expect(component.characters.length).toBe(1);
    expect(component.characters[0].name).toBe('Test');
    expect(component.characters[0].class).toBe('Rogue');
    expect(component.characters[0].gender).toBe('Other');
    expect(component.characters[0].funFact).toBe('This is a test');
    expect(component.characters[0].faction).toBe('The Arcane Circle');
    expect(component.characters[0].startingLocation).toBe('Wet Lands');
  });

  it('should reset all form fields to their default values after resetForm is called', () => {
    component.characterModel = {
      name:             'Reset Test',
      class:            'Rogue',
      gender:           'Female',
      funFact:          'This is a test',
      faction:          'The Arcane Circle',
      startingLocation: 'Wet Lands'
    };
    component.resetForm();
    expect(component.characterModel).toEqual({
      name:             '',
      class:            'Mage',
      gender:           'Male',
      funFact:          '',
      faction:          'The Arcane Circle',
      startingLocation: 'Wet Lands'
    });
  });
});
