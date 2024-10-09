import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoodpediaPage } from './foodpedia.page';

describe('FoodpediaPage', () => {
  let component: FoodpediaPage;
  let fixture: ComponentFixture<FoodpediaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodpediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
