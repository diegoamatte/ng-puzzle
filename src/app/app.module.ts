import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PuzzleComponent } from './components/puzzle/puzzle.component';
import { PuzzlePieceComponent } from './components/puzzle-piece/puzzle-piece.component';

@NgModule({
  declarations: [
    AppComponent,
    PuzzleComponent,
    PuzzlePieceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
