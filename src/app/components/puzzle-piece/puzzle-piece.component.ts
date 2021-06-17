import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import { Piece } from 'src/app/models/piece';

@Component({
  selector: 'app-puzzle-piece',
  templateUrl: './puzzle-piece.component.html',
  styleUrls: ['./puzzle-piece.component.scss']
})
export class PuzzlePieceComponent implements OnInit{

  @Input() pieceItem!: Piece;
  @Input() imagePath!: string;
  @Output() onPieceClicked: EventEmitter<Piece> = new EventEmitter<Piece>();

  @ViewChild('pieceRef',{static:true}) private pieceRef!: ElementRef;

  constructor() { }


  ngOnInit(): void {
    this.pieceRef.nativeElement.style.gridRow = this.pieceItem.position.row;
    this.pieceRef.nativeElement.style.gridColumn = this.pieceItem.position.column;
    this.pieceRef.nativeElement.style.backgroundPosition = this.pieceItem.backgroundPosition;
    this.pieceRef.nativeElement.style.backgroundImage = `url(${this.imagePath})`;
    this.pieceRef.nativeElement.style.height = this.pieceItem.size;
    this.pieceRef.nativeElement.style.width = this.pieceItem.size;
  }


  onClick(){
    this.onPieceClicked.emit(this.pieceItem);
  }

  
}
