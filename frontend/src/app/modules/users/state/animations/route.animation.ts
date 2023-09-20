import {
    trigger,
    transition,
    style,
    query,
    animate,
} from '@angular/animations';

const optional = { optional: true };

export const faderAnimation = trigger('routeAnimations', [
    transition('* <=> *', [
        query(
            ':enter',
            [
                style({
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    opacity: 0,
                    transform: 'scale(0) translateY(100%)',
                }),
            ],
            optional
        ),
        query(
            ':enter',
            [
                animate(
                    '800ms ease',
                    style({ opacity: 1, transform: 'scale(1) translateY(0)' })
                ),
            ],
            optional
        ),
    ]),
]);
