import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerScoreBoardComponent } from './player-score-board.component';
import { FormControl, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('PlayerScoreBoardComponent', () => {
  let component: PlayerScoreBoardComponent;
  let fixture: ComponentFixture<PlayerScoreBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerScoreBoardComponent ],
      imports: [
        FormsModule,
        NgbModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerScoreBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('calculate', () => {
    it ('should return correct score for open frame after valid input', () => {
      component.player.frames = [{"first":3,"second":4},{"first":4,"second":5},{},{},{},{},{},{},{},{}];
      component.calculate(true);
      expect(component.player.scoreCard).toEqual({ score: 16});
    });
    it ('should return correct score for all strike scenario', () => {
      component.player.frames = [{"first":10},{"first":10},{"first":10},{"first":10},{"first":10},{"first":10},{"first":10},{"first":10},{"first":10},{"first":10,"second":10,"third":10}];
      component.calculate(true);
      expect(component.player.scoreCard).toEqual({ score: 300});
    });
    it ('should return correct score for all spare scenario', () => {
      component.player.frames = [{"first":5,"second":5},{"first":5,"second":5},{"first":5,"second":5},{"first":5,"second":5},{"first":5,"second":5},{"first":5,"second":5},{"first":5,"second":5},{"first":5,"second":5},{"first":5,"second":5},{"first":5,"second":5,"third":5}];
      component.calculate(true);
      expect(component.player.scoreCard).toEqual({ score: 150});
    });
    it ('should return correct score for spare scenario', () => {
      component.player.frames =[{"first":3,"second":4},{"first":10},{"first":1,"second":9},{"first":10},{"first":8,"second":1},{"first":1,"second":4},{"first":1,"second":2},{"first":3,"second":4},{"first":3,"second":5},{"first":1,"second":2}];
      component.calculate(true);
      expect(component.player.scoreCard).toEqual({ score: 101});
    });
    it ('should not calculate score for if invalid input', () => {
      const spy = spyOn(component.scoreCalculator, 'calculateCurrentScore');
      component.calculate(false);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('resetNextRolls', () => {
    it ('should reset next rolls if first roll value is updated to 10', () => {
      const frame = {"first":10,"second":4};
      component.resetNextRolls(frame);
      expect(frame.second).toBeUndefined();
    });
    it ('should not reset next rolls if first roll value is updated to less than 10', () => {
      const frame = {"first":3,"second":4};
      component.resetNextRolls(frame);
      expect(frame.second).toEqual(4);
    });
  });

  describe('isFirstRollOpen', () => {
    it ('should return true for first roll', () => {
      component.player.frames = [{},{},{},{},{},{},{},{},{},{}];
      expect(component.isFirstRollOpen(0)).toEqual(true);
    });
    it ('should return true for if previous frame is completed', () => {
      component.player.frames = [{"first":10},{"first":10},{"first":1,"second":9},{},{},{},{},{},{},{}];
      expect(component.isFirstRollOpen(3)).toEqual(true);
    });
    it ('should return true for if previous frame is strike', () => {
      component.player.frames = [{"first":10},{"first":10},{},{},{},{},{},{},{},{}];
      expect(component.isFirstRollOpen(2)).toEqual(true);
    });
    it ('should return false for if previous frame score is invalid', () => {
      component.player.frames = [{"first":10},{"first":10},{"first":1,"second":11},{},{},{},{},{},{},{}];
      expect(component.isFirstRollOpen(3)).toEqual(false);
    });
  });

  describe('isSeconRollOpen', () => {
    it ('should return false if first roll is not complete', () => {
      component.player.frames = [{},{},{},{},{},{},{},{},{},{}];
      expect(component.isSeconRollOpen(0)).toEqual(false);
    });
    it ('sshould return false if frame is strike', () => {
      component.player.frames = [{"first":10},{"first":10},{"first":1,"second":9},{},{},{},{},{},{},{}];
      expect(component.isSeconRollOpen(1)).toEqual(false);
    });
    it ('should return true for if first roll score is less than 10', () => {
      component.player.frames = [{"first":10},{"first":10},{"first":1},{},{},{},{},{},{},{}];
      expect(component.isSeconRollOpen(2)).toEqual(true);
    });
    it ('should return true for if first roll score of last frame is less than 10 or equals to 10', () => {
      component.player.frames = [{"first":10},{"first":10},{"first":1,"second":9},{"first":1,"second":1},{"first":1,"second":1},{"first":1,"second":1},{"first":1,"second":1},{"first":1,"second":1},{"first":1,"second":1},{"first":10}];
      expect(component.isSeconRollOpen(9)).toEqual(true);
    });
  });

  describe('isThirdRollOpen', () => {
    it ('should return false if first roll and second role is not complete in last frame', () => {
      component.player.frames = [{},{},{},{},{},{},{},{},{},{}];
      expect(component.isThirdRollOpen(9)).toEqual(false);
    });
    it ('should return false if first roll and second role is not complete in last frame', () => {
      component.player.frames = [{"first":10},{"first":10},{"first":1,"second":9},{"first":1,"second":1},{"first":1,"second":1},{"first":1,"second":1},{"first":1,"second":1},{"first":1,"second":1},{"first":1,"second":1},{"first":10}];
      expect(component.isThirdRollOpen(9)).toEqual(false);
    });
    it ('should return true if first roll and second role is strike in last frame', () => {
      component.player.frames = [{"first":10},{"first":10},{"first":1,"second":9},{"first":1,"second":1},{"first":1,"second":1},{"first":1,"second":1},{"first":1,"second":1},{"first":1,"second":1},{"first":1,"second":1},{"first":10,"second":10}];;
      expect(component.isThirdRollOpen(9)).toEqual(true);
    });
    it ('should return false for if first roll/ second role score is invalid in last frame', () => {
      component.player.frames = [{"first":10},{"first":10},{"first":1,"second":9},{"first":1,"second":1},{"first":1,"second":1},{"first":1,"second":1},{"first":1,"second":1},{"first":1,"second":1},{"first":1,"second":1},{"first":10,"second":11}];
      expect(component.isThirdRollOpen(9)).toEqual(false);
    });
  });

  describe('invalidformControl', () => {
    it ('should return true if control is invalid and dirty', () => {
      const control = new FormControl(11);
      control.setErrors({max: {max: 10, actual: 11}});
      control.markAsDirty();
      expect(component.invalidformControl(control)).toEqual(true);
    });
    it ('should return true if control is invalid and touched', () => {
      const control = new FormControl(undefined);
      control.setErrors({required: true});
      control.markAsTouched();
      expect(component.invalidformControl(control)).toEqual(true);
    });
    it ('should return false if control is pristine', () => {
      const control = new FormControl(undefined);
      control.markAsPristine();
      expect(component.invalidformControl(control)).toEqual(false);
    });
  });
  
});
