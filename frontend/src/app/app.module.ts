import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// modules
import { UsersModule } from './modules/users/users.module';

// components
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        UsersModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
