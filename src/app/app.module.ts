import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PdfViewerComponent } from './pdf-viewer.component';

@NgModule({
  declarations: [
    PdfViewerComponent, AppComponent
  ],
  imports: [
    BrowserModule, MatTabsModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
