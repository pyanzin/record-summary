import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-record-summary',
  templateUrl: './record-summary.component.html',
  styleUrls: ['./record-summary.component.css']
})
export class RecordSummaryComponent {
  @Input() data: number[] = [];

  startTime = "00:00";
  endTime = "23:59";

  startMinute() {
    return this.timeToMinutes(this.startTime);
  }

  endMinute() {
    return this.timeToMinutes(this.endTime);
  }

  timeToMinutes(time: string) {
    var [hours, minutes] = time.split(':');

    return Number(hours) * 60 + Number(minutes);
  }

  getColor(index: number, heartRate: number) {
    if (index >= this.startMinute() && index <= this.endMinute())
      return 'hsl(0 80% '+ (100 - (heartRate / 2)) + '%)';
    return 'hsl(0 0% '+ (100 - (heartRate / 4)) + '%)';
  }

  getAverage() {
    var selectedRange = this.getSelectedRange();
    return Math.floor(selectedRange.reduce((a, s) => s + a, 0) / selectedRange.length);
  }

  getMax() {
    return this.getSelectedRange().reduce((a, s) => a > s ? a : s, 0);
  }

  getMin() {
    return this.getSelectedRange().reduce((a, s) => a < s ? a : s, 1000);
  }

  private getSelectedRange() {
    if (this.startMinute() > this.endMinute())
      return [];
    return this.data.slice(this.startMinute(), this.endMinute());
  }
}
