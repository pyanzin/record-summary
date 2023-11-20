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
    let [hours, minutes] = time.split(':');

    return Number(hours) * 60 + Number(minutes);
  }

  getColor(index: number, heartRate: number) {
    if (index >= this.startMinute() && index <= this.endMinute())
      return 'hsl(0 80% '+ (100 - (heartRate / 2)) + '%)';
    return 'hsl(0 0% '+ (100 - (heartRate / 4)) + '%)';
  }

  getAverage() {
    let selectedRange = this.getSelectedRange();
    return Math.floor(selectedRange.reduce((a, s) => s + a, 0) / selectedRange.length);
  }

  getMax() {
    return this.getSelectedRange().reduce((a, s) => a > s ? a : s, 0);
  }

  getMaxTime() {
    let maxValue = this.getMax();
    let index = this.getSelectedRange().indexOf(maxValue);
    return this.minutesToTime(this.startMinute() + index);
  }

  getMin() {
    return this.getSelectedRange().reduce((a, s) => a < s ? a : s, 1000);
  }

  getMinTime() {
    let minValue = this.getMin();
    let index = this.getSelectedRange().indexOf(minValue);
    return this.minutesToTime(this.startMinute() + index);
  }

  private getSelectedRange() {
    if (this.startMinute() > this.endMinute())
      return [];
    return this.data.slice(this.startMinute(), this.endMinute());
  }

  private minutesToTime(totalMinutes: number) {
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    let formattedHours = String(hours).padStart(2, '0');
    let formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  }
}
