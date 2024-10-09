import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingscreenPage } from './loadingscreen.page';

describe('LoadingscreenPage', () => {
  let component: LoadingscreenPage;
  let fixture: ComponentFixture<LoadingscreenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
