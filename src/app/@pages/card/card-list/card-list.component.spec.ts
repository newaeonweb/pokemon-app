/* tslint:disable:no-unused-variable */
import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardListComponent } from './card-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Angulartics2Module } from 'angulartics2';
import { SharedModule } from '@app/@shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        RouterTestingModule,
        Angulartics2Module.forRoot(),
        CoreModule,
        SharedModule,
        HttpClientTestingModule,
      ],
      declarations: [CardListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
