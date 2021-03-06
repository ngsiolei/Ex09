import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NoopAnimationsModule, MatTableModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
