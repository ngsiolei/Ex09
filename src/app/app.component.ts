import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService, PeriodicElement } from "./data.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { interval } from "rxjs";

const ITEMS_PER_PAGE = 9;
const SECONDS_PER_PAGE = 5;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ex09";
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  page = 1;
  secondsLeft = SECONDS_PER_PAGE;
  timer = interval(1000);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getData(true);
    this.startTimer();
  }

  private getData(firstTime: boolean = false) {
    if (!firstTime && 0 !== this.secondsLeft) {
      return;
    }
    this.dataService
      .get(this.page, ITEMS_PER_PAGE)
      .subscribe((data: PeriodicElement[]) => {
        this.dataSource.data = data;
        const hasNextPage = data && data[data.length - 1];
        if (hasNextPage) {
          this.page++;
        } else {
          this.page = 1;
        }
      });
  }

  private startTimer() {
    this.timer.subscribe(n => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
      } else {
        this.secondsLeft = SECONDS_PER_PAGE;
      }
      this.getData();
    });
  }
}
