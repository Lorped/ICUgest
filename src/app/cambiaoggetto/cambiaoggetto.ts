import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clan, Societa, Dominio, Disciplina, Oggetto, Skill, Subskill, Backend, Otherskill, Unpaired } from '../backend';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ChangeDetectorRef } from '@angular/core';






@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
  ],
  selector: 'app-cambiaoggetto',
  styleUrl: './cambiaoggetto.scss',
  templateUrl: './cambiaoggetto.html',
})
export class Cambiaoggetto {
  readonly IDoggetto = Number(inject(ActivatedRoute).snapshot.paramMap.get('IDoggetto'));

   valcondA = new UntypedFormControl('', [
    Validators.required,
    Validators.max(10),
    Validators.min(1)
  ]);
  valcondS = new UntypedFormControl('', [
    Validators.required,
    Validators.max(10),
    Validators.min(1)
  ]);
  valcondD = new UntypedFormControl('', [
    Validators.required,
    Validators.max(10),
    Validators.min(1)
  ]);
  valcondSS = new UntypedFormControl('', [
    Validators.required,
    Validators.max(10),
    Validators.min(1)
  ]);
  valcondX = new UntypedFormControl('', [
    Validators.required,
    Validators.max(10),
    Validators.min(1)
  ]);

  tabcondA = '';
  tabcondS = '';
  tabcondSS = '';
  tabcondX = '';
  tabcondP = '';
  tabcondD = '';

  descrizioneA = '';      // Attributo vale come skill
  descrizioneS = '';
  descrizioneSS = '';
  descrizioneX  = ''; //altri skill
  descrizioneP = '';
  descrizioneD = '';    // disciplina

  nomeoggettoIniziale = '';
  descrizioneIniziale = '';

  domanda = '';
  rispSi = '';
  rispNo = '';

  quandoA = 'x';
  quandoS = 'x';
  quandoSS = 'x';
  quandoX = 'x';
  quandoD = 'x';
  quandoP = 'x';
  quando: { id: string, nome: string }[] = [
    {id: 'x', nome: 'Sempre'} ,
    {id: 'S', nome: 'Se SI'} ,
    {id: 'N', nome: 'Se NO'}
  ];

  unpaired: Array<Unpaired> = [];
  tabpaired = '';
  descrizionePaired = '';

  subskill: Array<Subskill> = [];



  oggetto = new Oggetto();

  clan: Array<Clan> = [];
  societa: Array<Societa> = [];
  domini: Array<Dominio> = [];
  discipline: Array<Disciplina> = [];
  skill: Array<Skill> = [];
  otherskill: Array<Otherskill> = [];
  attributi: Array<Otherskill> = [];

  private backend = inject(Backend);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.backend.getcondizioni().subscribe((data: any) => {
      this.clan = data.clan;
      this.societa = data.societa;
      this.domini = data.domini;
      this.discipline = data.discipline;
      this.skill = data.skill;
      this.otherskill = data.otherskill;
      this.attributi = data.attributi;
      console.log(data);
      this.cdr.detectChanges();
    });

  }

  ngOnInit() {

    this.backend.getoggetto(this.IDoggetto).subscribe((data: any) => {
      this.oggetto = data.oggetti[0];
      this.nomeoggettoIniziale = this.oggetto.nomeoggetto;
      this.descrizioneIniziale = this.oggetto.descrizione;
      this.cdr.detectChanges();
    });
    this.backend.getunpaired(this.IDoggetto).subscribe(
      (data: any) => {
        this.unpaired = data.unpaired;
        this.cdr.detectChanges();
      }
    );
    
  }


  addcond(tipo: string) {
    console.log(`Adding condition of type ${tipo}`);
  }
  addpaired() {
    console.log(`Adding paired object`);
  }
  adddomanda() {
    console.log(`Adding domanda`);
  }
  aggiornaogg(IDoggetto: number) {
    console.log(`Updating object ${IDoggetto}`);
  }

  oggettoModificato(): boolean {
    return this.oggetto.nomeoggetto !== this.nomeoggettoIniziale
      || this.oggetto.descrizione !== this.descrizioneIniziale;
  }

  cancellacond(idcondizione: number) {
    console.log(`Cancelling condition ${idcondizione}`);
  }
  cancelladomanda() {
    console.log(`Cancelling domanda`);
  }
  cancellapaired() {
    console.log(`Cancelling paired object`);
  }

  aggiornasubskill() {
    console.log("skill", this.skill);
    console.log("tabcondS", this.tabcondS);
    const selectedSkill = this.skill.find(skill => skill.IDskill == Number(this.tabcondS));
    console.log("selectedSkill: ", selectedSkill);
    this.subskill = selectedSkill ? selectedSkill.subskill : [];  
    console.log("subskill: ", this.subskill);
  }
}
