import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { TranslateMessages } from '../../../commons/enum/translate-messages.enum';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  @Input() title: string = "";
  @Input() message: string = "";
  @Input() param: string = "";

  confirmResult!: Subject<boolean>;
  messages = TranslateMessages;

   constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.confirmResult = new Subject();
  }

  onConfirm(): void {
    this.confirmAndClose(true);
  }

  onDecline(): void {
    this.confirmAndClose(false);
  }

  private confirmAndClose(res : boolean){
    this.confirmResult.next(res);
    this.bsModalRef.hide();
  }

}
