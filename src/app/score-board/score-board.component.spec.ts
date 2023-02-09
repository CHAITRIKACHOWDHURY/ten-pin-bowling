import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ScoreBoardComponent } from './score-board.component';
import { StoreModule } from '@ngrx/store';

describe('ScoreBoardComponent', () => {
  let component: ScoreBoardComponent;
  let fixture: ComponentFixture<ScoreBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      declarations: [ ScoreBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('resetGame', () => {
    it (`should be call on 'Reset Game' button click`, fakeAsync(() => {
      const spy = spyOn(component, 'resetGame');
      fixture.detectChanges();
      const el = fixture.debugElement;
      el.nativeElement.querySelector('.pull-right').click();
      tick();
      expect(spy).toHaveBeenCalled();
    }));
    it ('should route to home page', () => {
      const routeSpy = spyOn(component.router, 'navigate');
      component.resetGame();
      expect(routeSpy).toHaveBeenCalledWith(['home']);
    });
  });

  describe('ngOnInit', () => {
    it ('should set player list if store has returned player list', () => {
      spyOn(component, 'getListOfPlayer').and.returnValue([{"name":"Player1 ","id":0,"frames":[{},{},{},{},{},{},{},{},{},{}],"scoreCard":{"score":0}}]);
      component.playerList = [];
      component.ngOnInit();
      expect(component.playerList.length).toEqual(1);
    });
    it ('should not set player list if store has returned empty player list', () => {
      spyOn(component, 'getListOfPlayer').and.returnValue([]);
      component.playerList = [];
      component.ngOnInit();
      expect(component.playerList.length).toEqual(0);
    });
  });
});
