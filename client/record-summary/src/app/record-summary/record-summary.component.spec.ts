import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSummaryComponent } from './record-summary.component';

describe('RecordSummaryComponent', () => {
  let component: RecordSummaryComponent;
  let fixture: ComponentFixture<RecordSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordSummaryComponent]
    });
    fixture = TestBed.createComponent(RecordSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
