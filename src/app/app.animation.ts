import { trigger, transition, query, style, group, animate } from '@angular/animations';

export const slideInAnimation = trigger('slideInAnimation', [
  // transition between two states
  transition('* <=> *', [
    query(
      // events to apply
      ':enter,:leave',
      // Define style and function to apply
      style({position: 'fixed', width: '100%'}),
      // configure object with optional set to true to handle element, not yet added to DOM
      {optional: true},
      ),
    // group block executes in pararell
    group([
      query(':enter', [
        style({transform: 'X(100%)'}),
        animate('0.5s ease-out', style({transform: 'X(0%)'}))
      ], {optional: true}),
      query(':leave', [
        style({transform: 'X(0%)'}),
        animate('0.5s ease-out', style({transform: 'X(-100%)'}))
      ], { optional: true})
    ])
  ])
]);
