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
		path: 'prestampa',
		loadComponent: () =>
			import('./prestampa/prestampa').then(({ Prestampa }) => Prestampa),
	},
	{
		path: 'cambiaoggetto/:IDoggetto',
		loadComponent: () =>
			import('./cambiaoggetto/cambiaoggetto').then(({ Cambiaoggetto }) => Cambiaoggetto),
	},
		{
		path: 'messaggi',
		loadComponent: () =>
			import('./messaggi/messaggi').then(({ Messaggi }) => Messaggi),
	},
	{
		path: 'logscan',
		loadComponent: () =>
			import('./logscan/logscan').then(({ Logscan }) => Logscan),
	},
	{
		path: 'messaggifull',
		loadComponent: () =>
			import('./messaggifull/messaggifull').then(({ Messaggifull }) => Messaggifull),
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'main',
	},
];
