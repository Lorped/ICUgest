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
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule,
  ],
  selector: 'app-cambiaoggetto',
  styleUrl: './cambiaoggetto.scss',
  templateUrl: './cambiaoggetto.html',
})
export class Cambiaoggetto {
  readonly IDoggetto = Number(inject(ActivatedRoute).snapshot.paramMap.get('IDoggetto'));


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
  valcondO = new UntypedFormControl('', [
    Validators.required,
    Validators.max(10),
    Validators.min(1)
  ]);

  tabcondA = '';   // Attributo
  tabcondS = '';
  tabcondSS = '';
  tabcondO = '';  // Otherskill
  tabcondD = '';  // Disciplina
  tabcondY = '';  // Dominio
  tabcondX = '';  // societa
  tabcondC = '';  // Clan
  tabcondP = '';
  

  descrizioneA = '';      // Attributo vale come skill
  descrizioneS = '';
  descrizioneSS = '';
  descrizioneO = '';  // Otherskill
  descrizioneD = '';    // disciplina
  descrizioneY  = '';   // dominio
  descrizioneX  = '';  // societa
  descrizioneC  = '';  // Clan
  descrizioneP = '';
  

  quandoA = 'x';
  quandoS = 'x';
  quandoSS = 'x';
  quandoO = 'x';
  quandoD = 'x';
  quandoY = 'x';
  quandoX = 'x';
  quandoC = 'x';
  quandoP = 'x';



  nomeoggettoIniziale = '';
  descrizioneIniziale = '';

  domanda = '';
  rispSi = '';
  rispNo = '';

  newincremento = '';

  
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
  private oggettoRequest = 0;

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
    

    this.caricaOggetto();
    this.backend.getunpaired(this.IDoggetto).subscribe(
      (data: any) => {
        this.unpaired = data.unpaired;
        this.cdr.detectChanges();
      }
    );
    
  }

  private caricaOggetto(cacheBust = false) {
this.tabcondA = '';   // Attributo
    this.tabcondS = '';
    this.tabcondSS = '';
    this.tabcondO = '';  // Otherskill
    this.tabcondD = '';  // Disciplina
    this.tabcondY = '';  // Dominio
    this.tabcondX = '';  // societa
    this.tabcondC = '';  // Clan


    this.descrizioneA = '';      // Attributo vale come skill
    this.descrizioneS = '';
    this.descrizioneSS = '';
    this.descrizioneO = '';  // Otherskill
    this.descrizioneD = '';    // disciplina
    this.descrizioneY  = '';   // dominio
    this.descrizioneX  = '';  // societa
    this.descrizioneC  = '';  // Clan

    

    this.quandoA = 'x';
    this.quandoS = 'x';
    this.quandoSS = 'x';
    this.quandoO = 'x';
    this.quandoD = 'x';
    this.quandoY = 'x';
    this.quandoX = 'x';
    this.quandoC = 'x';



    this.valcondD.setValue('');
    this.valcondS.setValue('');
    this.valcondSS.setValue('');
    this.valcondO.setValue('');



    const request = ++this.oggettoRequest;

    this.backend.getoggetto(this.IDoggetto, cacheBust).subscribe((data: any) => {
      if (request !== this.oggettoRequest || !data.oggetti?.length) {
        return;
      }

      this.oggetto = data.oggetti[0];
      this.nomeoggettoIniziale = this.oggetto.nomeoggetto;
      this.descrizioneIniziale = this.oggetto.descrizione;
      this.cdr.detectChanges();
    });
  }


  addcond(tipo: string) {
    console.log(`Adding condition of type ${tipo}`);
    let valcond = '';
    let tabcond = '';
    let descrizione = '';
    let quando = '';

    switch(tipo) {
      case 'A':
        // Handle Attributo condition
        valcond = ''; // non applicabile per Attributo
        tabcond = this.tabcondA;
        descrizione = this.descrizioneA;
        quando = this.quandoA;      
        break;
      case 'S':
        // Handle Skill condition
        valcond = this.valcondS.value;
        tabcond = this.tabcondS;
        descrizione = this.descrizioneS;
        quando = this.quandoS;   
        break;
      case 'SS':
        // Handle Subskill condition
        valcond = this.valcondSS.value;
        tabcond = this.tabcondSS;
        descrizione = this.descrizioneSS;
        quando = this.quandoSS;   
        break;
      case 'O':
        // Handle Otherskill condition
        valcond = this.valcondO.value;
        tabcond = this.tabcondO;
        descrizione = this.descrizioneO;
        quando = this.quandoO;   
        break;
      case 'D':
        // Handle Disciplina condition
        valcond = this.valcondD.value;
        tabcond = this.tabcondD;
        descrizione = this.descrizioneD;
        quando = this.quandoD;   
        break;
      case 'Y':
        // Handle Dominio condition
        valcond = ''; //non applicabile per Dominio
        tabcond = this.tabcondY;
        descrizione = this.descrizioneY;
        quando = this.quandoY;   
        break;
      case 'X':
        // Handle Societa condition
        valcond = ''; //non applicabile per Societa
        tabcond = this.tabcondX;
        descrizione = this.descrizioneX;
        quando = this.quandoX;   
        break;
      case 'C':
        // Handle Clan condition
        valcond = '';  //non applicabile per Clan
        tabcond = this.tabcondC;
        descrizione = this.descrizioneC;
        quando = this.quandoC;   
        break;
    }
    this.backend.addcondizione(this.oggetto.IDoggetto, tipo, Number(tabcond), Number(valcond), descrizione, quando).subscribe(
      response => {
        console.log(`Condition added successfully: `, response);
        this.caricaOggetto(true);
      },
      error => {
        console.error(`Error adding condition: `, error);
      }
    );

  }
  addpaired() {
    this.backend.addpaired(this.oggetto.IDoggetto, Number(this.tabpaired), this.descrizionePaired).subscribe(
      response => {
        console.log(`Paired object added successfully: `, response);
        this.caricaOggetto(true);
      },
      error => {
        console.error(`Error adding paired object: `, error);
      }
    );
  }
  adddomanda() {
    this.backend.addDomanda(this.oggetto.IDoggetto, this.domanda, this.rispSi, this.rispNo).subscribe(
      response => {
        console.log(`Domanda added successfully: `, response);
        this.caricaOggetto(true);
      },
      error => {
        console.error(`Error adding domanda: `, error);
      }
    );
  }
  aggiornaogg(IDoggetto: number) {
    console.log(`Updating object ${IDoggetto}`);
  }

  oggettoModificato(): boolean {
    return this.oggetto.nomeoggetto !== this.nomeoggettoIniziale
      || this.oggetto.descrizione !== this.descrizioneIniziale;
  }

  cancellacond(idcondizione: number) {
    this.backend.cancellacondizione(idcondizione).subscribe(
      response => {
        console.log(`Condition cancelled successfully: `, response);
        this.caricaOggetto(true);
      },
      error => {
        console.error(`Error cancelling condition: `, error);
      }
    );
  }

  cancelladomanda() {
    this.backend.cancelladomanda(this.oggetto.IDoggetto).subscribe(
      response => {
        console.log(`Domanda cancelled successfully: `, response);
        this.caricaOggetto(true);
      },
      error => {
        console.error(`Error cancelling domanda: `, error);
      }
    );
  }

  cancellapaired() {
    this.backend.cancellapaired(this.oggetto.IDoggetto).subscribe(
      response => {
        console.log(`Paired object cancelled successfully: `, response);
        this.caricaOggetto(true);
      },
      error => {
        console.error(`Error cancelling paired object: `, error);
      }
    );
  }

  cancellaeffetto() {
    this.backend.cancellaeffetto(this.oggetto.IDoggetto).subscribe(
      response => {
        console.log(`Effetto cancelled successfully: `, response);
        this.caricaOggetto(true);
      },
      error => {
        console.error(`Error cancelling effetto: `, error);
      }
    );
  }

  aggiornasubskill() {
    //console.log("skill", this.skill);
    //console.log("tabcondS", this.tabcondS);
    const selectedSkill = this.skill.find(skill => skill.IDskill == Number(this.tabcondS));
    //console.log("selectedSkill: ", selectedSkill);
    this.subskill = selectedSkill ? selectedSkill.subskill : [];  
    //console.log("subskill: ", this.subskill);
  }
  
  addincremento() {
    this.backend.addincremento(this.oggetto.IDoggetto, Number(this.newincremento)).subscribe(
      response => {
        console.log(`Incremento added successfully: `, response);
        this.caricaOggetto(true);
      },
      error => {
        console.error(`Error adding incremento: `, error);
      }
    );
  }
}
