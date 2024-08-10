import {Component, inject} from '@angular/core';
import {SvgIconComponent} from "../svg-icon/svg-icon.component";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {SubscriberCardComponent} from "./subscriber-card/subscriber-card.component";
import {RouterLink} from "@angular/router";
import {ProfileService} from "../../data/services/profile.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [
    SvgIconComponent,
    NgForOf,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    JsonPipe
  ],
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileService = inject(ProfileService)
  subscribers$ = this.profileService.getSubscribesShortList()

  // me = this.profileService.me

  menuItems =  [
    {
      label: 'Моя страница',
      icon: 'home',
      link: ''
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    }
  ]
}
