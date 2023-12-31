import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { persistState } from '@datorama/akita';

// store
const storage = persistState();
const providers = [{ provide: 'persistStorage', useValue: storage }];

platformBrowserDynamic(providers)
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
