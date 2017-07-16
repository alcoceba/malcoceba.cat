import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  active: number = 0;
  inactive: number = null;

  items: number = 0;

  initDelay: number = 1000;
  cycleDelay: number = 2750;
  animationDuration: number = 500;

  timer: number = 0;

  constructor() {
  }

  ngOnInit() {

    this.items = $('ul.skills li').length;

    setTimeout(() => {
      this.animate();
    }, this.initDelay);
  }

  animate() {
    this._animateBorder();
    this._animateTitle();
    this._animateSkills();
    this._animateSkillsCycle();
    this._initTimer();
  }

  private _incrementCycle() {
    this.active = (this.active % this.items) + 1;
    this.inactive = this.active == 1 ? this.items : this.active - 1;
  }

  private _animateBorder() {
    $('.border').animate({width: '100%', opacity: 1}, this.animationDuration);
  }

  private _animateTitle() {
    $('.title-wrapper').delay(200).animate({top: 0, opacity: 1}, this.animationDuration);
  }

  private _animateSkills() {
    $('.skills li:first-child').delay(500).animate({top: 0, left: 0, opacity: 1}, this.animationDuration);
    this._incrementCycle();
  }

  private _animateSkillsCycle() {
    setInterval(() => {

      this._incrementCycle();

      $('.skills li:nth-child(' + this.active + ')')
        .removeAttr('style')
        .animate({top: 0, left: 0, opacity: 1}, this.animationDuration);

      $('.skills li:nth-child(' + this.inactive + ')')
        .animate({top: 0, left: '100%', opacity: 0}, this.animationDuration);

    }, this.cycleDelay);
  }

  private _initTimer() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }
}
