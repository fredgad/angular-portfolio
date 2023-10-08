import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { select, Store } from "@ngrx/store";
import { catchError, map, mergeMap, withLatestFrom } from "rxjs/operators";
// import { getData, getDataFail, getDataSuccess } from "./test.actions";
// import { AppWithState, selectStoreRange } from "./test.selectors";


// @Injectable()
// export class TestEffects {
//   constructor(
//     private store$: Store<AppWithState>,
//     private actions$: Actions,
//     private testService: TestService
//   ) {}

//   loadTestData$ = createEffect(() => 
//     this.actions$.pipe(
//       ofType(getData),
//       withLatestFrom(this.store$.pipe(select(selectStoreRange))),
//       mergeMap(([_, range]: [any, any]) => 
//         this.testService.getTestApiData(range).pipe(
//           map((data) => {
//             return getDataSuccess({data: data})
//           }),
//           catchError(() => of(getDataFail()))
//         )
//       )
//     )
//   );
// }
