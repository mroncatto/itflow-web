import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loadind-widget',
  templateUrl: './loadind-widget.component.html',
  styleUrls: ['./loadind-widget.component.css']
})
export class LoadindWidgetComponent {

  @Input() show: boolean = false;
  @Input() type: string = "border";
  @Input() color: string = "primary";

}
