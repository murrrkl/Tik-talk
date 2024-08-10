import {Component, Input} from '@angular/core';
import {Profile} from "../../../data/intefraces/profile.interface";
import {ImgUrlPipe} from "../../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  templateUrl: './subscriber-card.component.html',
  imports: [
    ImgUrlPipe
  ],
  styleUrl: './subscriber-card.component.scss'
})
export class SubscriberCardComponent {
  @Input() profile! : Profile
}
