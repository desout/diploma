import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DishesStatisticsComponent} from './dishes-statistics.component';

describe('DishesStatisticsComponent', () => {
  let component: DishesStatisticsComponent;
  let fixture: ComponentFixture<DishesStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DishesStatisticsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
