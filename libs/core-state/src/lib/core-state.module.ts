import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RootStoreConfig, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProjectsEffects } from './projects/projects.effects';
import { ProjectsFacade } from './projects/projects.facade';
import { reducers } from '.';

const STORE_NAME = 'project-store';
const storeConfig: RootStoreConfig<any, any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictActionSerializability: true,
    strictStateImmutability: true,
    strictStateSerializability: true,
  },
};

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([ProjectsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, name: STORE_NAME }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  ],
  providers: [ProjectsFacade],
})
export class CoreStateModule {}
