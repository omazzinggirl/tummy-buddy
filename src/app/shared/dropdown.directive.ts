import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  isShow = false;

  @Input('appDropdown') dropdownRef!: HTMLElement;

  constructor(private renderer: Renderer2) {}

  @HostListener('click') toggleOpen() {
    this.isShow = !this.isShow;

    if(this.isShow) {
      this.renderer.addClass(this.dropdownRef, 'show');
    }
    else {
      this.renderer.removeClass(this.dropdownRef,'show');
    }
  }

}
