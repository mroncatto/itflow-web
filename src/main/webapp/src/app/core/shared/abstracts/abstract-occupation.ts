import { TranslateMessages } from "../commons/enum/translate-messages.enum";
import { AbstractComponent } from "./abstract-component";

export abstract class AbstractOccupation extends AbstractComponent {
    messages = TranslateMessages;
}