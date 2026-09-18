import { Routes } from '@angular/router';

export const routes: Routes = [
    {
		path: 'main',
		loadComponent: () =>
			import('./main/main').then(({ Main }) => Main),
	},
	{
		path: 'oggetti',
		loadComponent: () =>
			import('./oggetti/oggetti').then(({ Oggetti }) => Oggetti),
	},
	{
		path: 'cambiaoggetto/:IDoggetto',
		loadComponent: () =>
			import('./cambiaoggetto/cambiaoggetto').then(({ Cambiaoggetto }) => Cambiaoggetto),
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'main',
	},
];
