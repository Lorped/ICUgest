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
		path: '',
		pathMatch: 'full',
		redirectTo: 'main',
	},
];
