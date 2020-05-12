import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { GlobalErrorHandler } from './utils/globalErrorHandler';

import { BlogService } from './blogs/blog.service';
import { UserService } from './users/user.service';

// define constant of API service;
export const API_SERVICES = [UserService];

// define constant of utils providers;
export const PROVIDERS = [
  { provide: ErrorHandler, useClass: GlobalErrorHandler },
];

@NgModule({
  providers: [...API_SERVICES],
  imports: [HttpClientModule, BrowserModule, BrowserAnimationsModule],
  exports: [],
})
export class CoreModule {}
