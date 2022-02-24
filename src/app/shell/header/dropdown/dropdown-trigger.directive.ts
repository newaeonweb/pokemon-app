import { Directive, ElementRef, HostListener, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { merge, Observable, Subscription } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';
import { DropdownPanel } from './dropdown-panel';

@Directive({
  selector: '[appDropdownTrigger]',
})
export class DropdownTriggerDirective implements OnDestroy {
  @HostListener('click', ['$event.target']) toggleDropdown(): void {
    this.isDropdownOpen ? this.destroyDropdown() : this.openDropdown();
  }
  private isDropdownOpen = false;
  private overlayRef: OverlayRef;
  private dropdownClosingActionsSub = Subscription.EMPTY;

  @Input('appDropdownTrigger') public dropdownPanel: DropdownPanel;

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef<HTMLElement>,
    private viewContainerRef: ViewContainerRef
  ) {}

  openDropdown(): void {
    this.isDropdownOpen = true;
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.close(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
            offsetY: 8,
          },
        ]),
    });

    const templatePortal = new TemplatePortal(this.dropdownPanel.templateRef, this.viewContainerRef);
    this.overlayRef.attach(templatePortal);

    this.dropdownClosingActionsSub = this.dropdownClosingActions().subscribe(() => this.destroyDropdown());
  }

  private dropdownClosingActions(): Observable<MouseEvent | void> {
    const backdropClick$ = this.overlayRef.backdropClick();
    const detachment$ = this.overlayRef.detachments();
    const dropdownClosed = this.dropdownPanel.closed;

    return merge(backdropClick$, detachment$, dropdownClosed);
  }

  private destroyDropdown(): void {
    if (!this.overlayRef || !this.isDropdownOpen) {
      return;
    }

    this.dropdownClosingActionsSub.unsubscribe();
    this.isDropdownOpen = false;
    this.overlayRef.detach();
  }

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
