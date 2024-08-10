import {Component, Input} from '@angular/core';

@Component({
  selector: 'svg[icon]', // Все svg, у которых будет указываться аттрибут icon
  // станут этим компонентом
  standalone: true,
  imports: [],
  template: '<svg:use [attr.href] = "href"></svg:use>',
  styles: ['']
})
export class SvgIconComponent {
  @Input() icon = ''

  get href() {
    return `/assets/svg/${this.icon}.svg#${this.icon}`
  }
}
