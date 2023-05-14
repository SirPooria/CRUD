import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordComponent } from './password.component';

import {Component} from '@angular/core';

@Component({
  selector: 'password.component',
  templateUrl:'password.component.html',
  styleUrls: ['password.component.css'],
})
export class Password {
  hide = true;
}