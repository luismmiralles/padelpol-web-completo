import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private divLoadingElement: HTMLElement;
  private styles = [
    'display: none;',
    'z-index: 999999;',
    'position: fixed;',
    'inset: 0px;',
    'background: rgba(0, 0, 0, 0.7) url("assets/images/loading-padelpol.gif") no-repeat center center;',
  ];
  private count = 0;

  constructor() {
    this.divLoadingElement = document.createElement("div");
    this.divLoadingElement.setAttribute("style", this.styles.join(""));
    document.body.appendChild(this.divLoadingElement);
  }

  start() {
    this.count++;
    if (this.count == 1) this.divLoadingElement.style.display = "block";
  }

  stop() {
    this.count--;
    if (this.count == 0) this.divLoadingElement.style.display = "none";
  }

}
