import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { Piece } from 'src/app/models/piece';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent implements OnInit,OnDestroy {

  @ViewChild('puzzleRef',{static:true}) puzzleRef!: ElementRef;
  pieces:Piece[]=[];
  private columns:number = environment.columns;
  private imageSize:number = environment.imageSize
  imagePath:string = environment.imagePath;

  private piecesSubcription$!:Subscription;
  win:boolean = false;

  constructor(private gameService: GameService) { 

  }

  ngOnInit(): void {
    this.puzzleRef.nativeElement.style.gridTemplateColumns = `repeat(${this.columns},1fr)`;
    this.piecesSubcription$ =this.gameService.init(this.columns,this.imageSize).subscribe(
      {
        next: (pieces: Piece[]) => {
          this.pieces =pieces;
        }
      }
      )
      this.gameService.createPieces();
      this.gameService.sortPieces();
  }

  move(event:Piece){
    this.gameService.movePiece(event);
    this.checkWinningCondition();
  }

  checkWinningCondition(){
    this.win = this.gameService.checkWinningCondition();
  }

  ngOnDestroy(){
    this.piecesSubcription$.unsubscribe();
  }

}
