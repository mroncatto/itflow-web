import { TranslateMessages } from "../commons/enum/translate-messages.enum";
import { AbstractComponent } from "./abstract-component"

export abstract class AbstractDevice extends AbstractComponent {

    messages = TranslateMessages;
}