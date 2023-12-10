import { Component, OnInit } from '@angular/core';

enum Months {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

enum Dates {
  Saturday,
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday
}

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css',
})
export class CalenderComponent implements OnInit {
  monthIndex: number;
  daylist: number[] = [];
  month: string;
  year: number;
  n: number;

  constructor() {
    this.monthIndex = new Date().getMonth();
    this.month = Months[this.monthIndex];
    this.year = new Date().getFullYear();
    this.n = this.zellersCongruence(1, this.monthIndex + 1, this.year) - 1;
  }

  daysOfMonth: number = 31;
  ngOnInit() {
    if (this.month == Months[1]) this.daysOfMonth = 28;
    for (let i = 1; i <= this.daysOfMonth; i++) {
      this.daylist.push(i);
    }
  }

  nextClicked() {
    if (this.monthIndex == 11) this.year++;
    this.monthIndex = (this.monthIndex + 1) % 12;
    this.month = Months[this.monthIndex];
    this.n = this.zellersCongruence(1, this.monthIndex + 1, this.year) - 1;

    this.getDates();
  }

  prevClicked() {
    if (this.monthIndex == 0) {
      this.year--;
      this.monthIndex = 12;
    }
    this.monthIndex--;

    this.month = Months[this.monthIndex];
    this.n = this.zellersCongruence(1, this.monthIndex + 1, this.year) - 1;

    this.getDates();
  }

  getRange(n: number): number[] {
    return Array.from({ length: n }, (_, index) => index);
  }

  // logic for number of days in a month
  getDates() {
    this.daylist = [];
    this.daysOfMonth = 31;

    if (this.month == Months[1]) this.daysOfMonth = 28;
    else if ([Months[3], Months[5], Months[8], Months[10]].includes(this.month))
      this.daysOfMonth = 30;

    for (let i = 1; i <= this.daysOfMonth; i++) {
      this.daylist.push(i);
    }
  }

  zellersCongruence(day: number, month: number, year: number): number {
    if (month < 3) {
      month += 12;
      year -= 1;
    }
    const K = year % 100;
    const J = Math.floor(year / 100);
    const h =
      (day +
        Math.floor((13 * (month + 1)) / 5) +
        K +
        Math.floor(K / 4) +
        Math.floor(J / 4) -
        2 * J) %
      7;
    return h;
  }
}