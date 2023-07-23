// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
// import { Action, select, Store } from '@ngrx/store';
// import { PageInterface, ResponseErrorListItemProps, SiteSettings } from '@lentau/lu/common/core/shared';
// import { catchError, exhaustMap, from, map, mergeMap, Observable, of, switchMap, withLatestFrom } from 'rxjs';
// import { AppWideApiService } from '../api/app-wide.api.service';
// import * as appWideActions from './app-wide.actions';
// import { getPageInfo } from './app-wide.actions';
// import { AppWithAppWideState } from './app-wide.selectors';
// import { AppWithCityState, getCityIdByGeo } from '@lentau/lu/common/city/entities';

// @Injectable()
// export class CubeEffects implements OnInitEffects {
//   getSiteSettings$ = createEffect(
//     (): Observable<Action> =>
//       this.actions$.pipe(
//         ofType(appWideActions.getSettings),
//         mergeMap(() => this.appWideApiService.getSiteSettingsGet()),
//         mergeMap((data: SiteSettings[]) => [appWideActions.getSettingsSuccess({ siteSettings: data })]),
//         catchError(() => [appWideActions.getSettingsFail()])
//       )
//   );

//   requestRouteInfoOnce$ = createEffect(
//     (): Observable<Action> =>
//       this.actions$.pipe(
//         ofType(appWideActions.requestToEventSaveOnce),
//         exhaustMap(() => this.appWideApiService.requestToEventSaveOnce()),
//         map(() => appWideActions.requestToEventSaveOnceSuccess()),
//         catchError(() => of(appWideActions.requestToEventSaveOnceFail()))
//       )
//   );

//   getPageInfo$ = createEffect(
//     (): Observable<Action> =>
//       this.actions$.pipe(
//         ofType(appWideActions.getPageInfo),
//         withLatestFrom(this.store$.pipe(select(getCityIdByGeo))),
//         mergeMap(([info, region]: [{ Url: string }, number]) =>
//           this.appWideApiService.getPageInfo(info.Url, region).pipe(
//             map((data) => appWideActions.getPageInfoSuccess({ data })),
//             catchError((errorList: ResponseErrorListItemProps[]) => of(appWideActions.getPageInfoFail({ errorList })))
//           )
//         )
//       )
//   );

//   getChatBotToken$ = createEffect(
//     (): Observable<Action> =>
//       this.actions$.pipe(
//         ofType(appWideActions.getChatBotToken),
//         exhaustMap(() => this.appWideApiService.getChatBotToken()),
//         map((data) => appWideActions.getChatBotTokenSuccess({ data })),
//         catchError((errorList: ResponseErrorListItemProps[]) => of(appWideActions.getChatBotTokenFail({ errorList })))
//       )
//   );

//   getChatBotSettings$ = createEffect(
//     (): Observable<Action> =>
//       this.actions$.pipe(
//         ofType(appWideActions.getChatBotSettings),
//         exhaustMap(() => this.appWideApiService.getChatBotSettings()),
//         map((data) => appWideActions.getChatBotSettingsSuccess({ data })),
//         catchError((errorList: ResponseErrorListItemProps[]) =>
//           of(appWideActions.getChatBotSettingsFail({ errorList }))
//         )
//       )
//   );

//   appWideEffectsLoad$ = createEffect(
//     (): Observable<Action> =>
//       this.actions$.pipe(
//         ofType(appWideActions.appWideEffectsLoad),
//         mergeMap(() => [appWideActions.getSettings()])
//       )
//   );

//   loadMainPageData$ = createEffect(
//     (): Observable<Action> =>
//       this.actions$.pipe(
//         ofType(appWideActions.getPageData),
//         mergeMap(() =>
//           from(this.appWideApiService.getData()).pipe(
//             switchMap((data: PageInterface) => [
//               appWideActions.getPageSuccess({ data }),
//               getPageInfo({ Url: this.router.url }),
//             ]),
//             catchError(() => of(appWideActions.getPageFail()))
//           )
//         )
//       )
//   );

//   ngrxOnInitEffects() {
//     return appWideActions.appWideEffectsLoad();
//   }

//   constructor(
//     private actions$: Actions,
//     private appWideApiService: AppWideApiService,
//     private store$: Store<AppWithAppWideState & AppWithCityState>,
//     private router: Router
//   ) {}
// }
