import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { reducerPong } from '@app/pong';
import { reducerCube } from '@app/cube';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),

    importProvidersFrom(
      StoreModule.forRoot({ Cube: reducerCube, Pong: reducerPong }),
      StoreDevtoolsModule.instrument(),
      [BrowserModule, BrowserAnimationsModule]
    ),
  ],
};
