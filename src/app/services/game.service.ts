import { Injectable } from '@angular/core';
import { empty, Subject } from 'rxjs';
import { Piece } from '../models/piece';

@Injectable({
  providedIn: 'root'
})
export class GameService{

  private currentPieces: Piece[] = [];
  private initialState: Piece[] = [];
  private piecesSubject$: Subject<Piece[]> = new Subject();
  private sidePieces!:number;
  private emptyPiece!: Piece;
  private imageSize!: number;


  constructor() { 
    
  }

  /**
   * Initializes the game and returns a Subject to listen the values of pieces
   * @param sidePieces quantity of pieces for every side
   * @param imageSize size in pixels of the image
   * @returns subject to listen the state of pieces
   */

  init(sidePieces:number,imageSize: number):Subject<Piece[]>{
    this.sidePieces = sidePieces;
    this.imageSize = imageSize;
    return this.piecesSubject$;
  }

  createPieces(): void{
    this.initState();
    this.addEmptyPiece();
    this.updatePositions();
  }


  
  /**
   * Initializes values used for each piece.
   */
  private initState(){
    for(let columnIndex = 0; columnIndex<this.sidePieces; columnIndex++){
      for (let rowIndex = 0; rowIndex < this.sidePieces; rowIndex++) {
        this.initialState.push({ 
          position:{row: rowIndex, column: columnIndex}, 
          size: `${Math.round(this.imageSize/this.sidePieces)}px`,
          backgroundPosition: `-${this.imageSize*rowIndex/this.sidePieces}px -${columnIndex*this.imageSize/this.sidePieces}px`
        })
      }
    }
  }
  /**
   * Adds empty space to initial and current array. It's used to move other pieces
   */
  private addEmptyPiece(){
    this.initialState.pop();
    this.currentPieces = [...this.initialState];
    this.emptyPiece = {position:{row:this.sidePieces,column:this.sidePieces},backgroundPosition:'0px',size:'0px'};
    this.initialState.push(this.emptyPiece)
    this.currentPieces.push(this.emptyPiece);
  }

  /**
   * Sorts randomly the pieces to play the puzzle.
   */
  sortPieces():void{
    this.currentPieces.sort( (a,b)=> 0.5-Math.random())
    this.updatePositions();
  }

  /**
   * Updates position values of the current pieces state.
   */
  private updatePositions(){
    for (let index = 0; index < this.currentPieces.length; index++) {
      this.currentPieces[index].position = {
        row: Math.ceil((index+1)/this.sidePieces),
        column: index% this.sidePieces +1
      } 
    }
    this.piecesSubject$.next(this.currentPieces);
  }

  /**
   * Moves a piece into the empty space, if it's adjacent to that space.
   * @param piece piece to move
   */
  movePiece(piece:Piece){
    if(this.isAdjacentToEmpty(piece)){
      let piecePosition = this.getArrayPosition(piece);
      this.currentPieces[this.getArrayPosition(this.emptyPiece)] = piece ;
      this.currentPieces[piecePosition] = this.emptyPiece;
      this.updatePositions();
    }
  }

  /**
   * Gets the position of the piece into the currebt pieces array
   * @param piece piece to search
   * @returns @number array position
   */
  private getArrayPosition(piece: Piece){
    return this.currentPieces.findIndex(element=> element === piece)
  }

  /**
   * Checks if a piece it's adjacent to the empty space.
   */
  private isAdjacentToEmpty(piece:Piece):boolean{
    let isVerticalAdjacent: boolean = (piece.position.row === this.emptyPiece.position.row+1 || 
                                        piece.position.row === this.emptyPiece.position.row-1 )&&
                                        piece.position.column === this.emptyPiece.position.column;
    let isHorizontalAdjacent: boolean = (piece.position.column === this.emptyPiece.position.column+1 || 
                                      piece.position.column === this.emptyPiece.position.column-1 )&&
                                      piece.position.row === this.emptyPiece.position.row;
    return isHorizontalAdjacent || isVerticalAdjacent;
  }

  /**
   * Checks if the condition to win it's achieved.
   */
  checkWinningCondition():boolean{
    //in this case, if the initial(ordered) and current array are equals.
    return JSON.stringify(this.initialState)===JSON.stringify(this.currentPieces);
  }



}
