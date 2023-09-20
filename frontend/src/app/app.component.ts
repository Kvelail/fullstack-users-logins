import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

// animations
import { faderAnimation } from './modules/users/state/animations/route.animation';

// enums
import { ConstantString } from './modules/users/state/enums/constant-string.enum';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [faderAnimation],
})
export class AppComponent {
    constructor(public router: Router) {}

    public prepareRoute(outlet: RouterOutlet) {
        return (
            outlet &&
            outlet.activatedRouteData &&
            outlet.activatedRouteData[ConstantString.ANIMATION]
        );
    }
}
