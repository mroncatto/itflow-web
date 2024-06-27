import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateMessages } from '../../../commons/enum/translate-messages.enum';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  messages = TranslateMessages;
  data: string="";
  @Output() onEnter: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  setData(e: KeyboardEvent): void {
    if(e?.key === 'Enter') {
      this.onEnter.emit(this.data);
    }    
  }

  clearFilter(): void {
    this.data = "";
  }

}
