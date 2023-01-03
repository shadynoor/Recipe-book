import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

  // @HostBinding("classList.add('show')") isOpen = false
  isOpen = false


  constructor(private el:ElementRef , private renderer:Renderer2) { }

  @HostListener("click") openDrop(eventData:Event){
    if (!this.isOpen) {
      this.renderer.addClass(this.el.nativeElement,"show")
      this.renderer.addClass(this.el.nativeElement.nextSibling,"show")
      this.isOpen = !this.isOpen
    }else{
      this.renderer.removeClass(this.el.nativeElement,"show")
      this.renderer.removeClass(this.el.nativeElement.nextSibling,"show")
      this.isOpen = !this.isOpen
    }


  }



  ngOnInit(): void {
  }
}
