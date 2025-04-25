import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateGuildComponent } from './create-guild.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('CreateGuildComponent (TDD)', () => {
  let component: CreateGuildComponent;
  let fixture: ComponentFixture<CreateGuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGuildComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the form invalid when empty (all fields required)', () => {
    // Initially, no values have been set
    expect(component.guildForm.valid).toBeFalse();
  });

  it('should require accept terms to be checked before valid', () => {
    component.guildForm.patchValue({
      id: 2000,
      name:                   'Test TDD',
      type:                   'Competitive',
      description:            'this is a test!',
      notificationPreference: 'Email',
    });
    expect(component.guildForm.valid)
      .withContext('form should be invalid when accept terms is false')
      .toBeFalse();

    // test terms checked
    component.guildForm.patchValue({ terms: true });
    expect(component.guildForm.valid)
      .withContext('form should be valid once terms is true')
      .toBeTrue();
  });

  it('should add a new guild to the list and reset the form on submit', () => {
    const newGuild = {
      id:                     2000,
      name:                   'Test TDD',
      type:                   'Competitive',
      terms:                  true,
      description:            'This is a test!',
      notificationPreference: 'Email',
    };
    component.guildForm.setValue(newGuild as any);

    // Submit the form
    component.onSubmit();
    fixture.detectChanges();

    // Test that it was added
    expect(component.guilds.length).toBe(1);
    expect(component.guilds[0]).toEqual(jasmine.objectContaining({
      name: newGuild.name,
      type: newGuild.type
    }));

    // Test that the form has been reset
    const formValue = component.guildForm.value;
    expect(formValue.name).toBe('');
    expect(formValue.description).toBe('');
    expect(formValue.terms).toBeFalse();
  });
});
