import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { StoreModule } from '@ngrx/store';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../models/player.model';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        FormsModule,
        NgbModule
      ],
      declarations: [ GameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('invalidformControl', () => {
    it ('should return true if control is invalid and dirty and for is submitted', () => {
      const control = new FormControl(undefined);
      component.form = new NgForm([], []);
      component.form.onSubmit(null);
      control.setErrors({required: true});
      control.markAsDirty();
      expect(component.invalidformControl(control)).toEqual(true);
    });
    it ('should return true if control is invalid and dirty', () => {
      const control = new FormControl(undefined);
      component.form = new NgForm([], []);
      control.setErrors({required: true});
      control.markAsDirty();
      expect(component.invalidformControl(control)).toEqual(true);
    });
    it ('should return true if control is invalid and touched', () => {
      const control = new FormControl(undefined);
      component.form = new NgForm([], []);
      control.setErrors({required: true});
      control.markAsTouched();
      expect(component.invalidformControl(control)).toEqual(true);
    });
    it ('should return false if control is pristine', () => {
      const control = new FormControl(undefined);
      component.form = new NgForm([], []);
      control.markAsPristine();
      expect(component.invalidformControl(control)).toEqual(false);
    });
  });

  describe('addPlayerBtnName', () => {
    it (`should return 'Add Player' if partyList is empty`, () => {
      component.playerList = [];
      expect(component.addPlayerBtnName).toEqual('Add Player');
    });
    it (`should return 'Add Player' if partyList is empty`, () => {
      component.playerList = [{"name":"Player1 ","id":0,"frames":[{},{},{},{},{},{},{},{},{},{}],"scoreCard":{"score":0}}];
      expect(component.addPlayerBtnName).toEqual('Add Another Player');
    });
  });

  describe('addPlayerBtnName', () => {
    it ('should not add player if form is invalid', () => {
      component.form = new NgForm([], []);
      component.form.form.setErrors({required: true});
      const spy = spyOn(component.form, 'resetForm');
      component.addPlayer({} as Player);
      expect(spy).not.toHaveBeenCalled();
    });
    it ('should add player if form is valid', () => {
      component.playerList = [];
      component.form = new NgForm([], []);
      const p = {name: 'Player1'};
      const spy = spyOn(component.form, 'resetForm');
      component.addPlayer(p);
      expect(spy).toHaveBeenCalled();
    });
  });
});
