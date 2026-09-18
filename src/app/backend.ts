import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class Subskill {
    public IDskill = 0;
    public nomeskill = '';
    public livello = 0;
}
export class Skill {
    public IDskill = 0;
    public nomeskill = '';
    public livello = 0;
    public subskills: Subskill[] = [];  //array delle sottocompetenze della skill
}
export class Otherskill {  //classe per le altre skill del personaggio
    public IDskill = 0;
    public nomeskill = '';
    public livello = 0;
}


export class Condizione {
    public IDcondizione = 0;
    public IDoggetto = 0;
    public tipocond = '';   // S skill SS subskill D disciplina X societa Y dominio
    public tabcond = 0;     // IDxx della condizione
    public valcond = 0;     // livello minimo se applicabile
    public descrX  = '';    // descrizione se condizione applicata
    public risp = '';    // vale solo se anche la risposta è stata data
    public subskill = 0;  // è uno skill secondario e tipocond = SS  ma serve??????
}

export class Paired {
  idpaired = 0;
  nomepaired = '';
  descpaired = '';
}

export class Oggetto {
    public IDoggetto = 0;
    public barcode = '';
    public nomeoggetto = '';
    public descrizione = '';
    public fissomobile = '';
    public ifdomanda = 0;  // ma serve ???
    public domanda = '';
    public r1 = '';
    public r2 = '';
    public adddisciplina = ''; // disciplina incrementata dall'oggetto
    public condizioni: Condizione[] = [];
    public condizioni2: Condizione[] = [];
    public paired = new Paired();
}




@Service()
export class Backend {
    private http = inject(HttpClient);
  constructor() {}

  listoggetti() {
    return this.http.get('https://www.roma-by-night.it/ICU/listoggetti.php' );
  }
  getcondizioni() {
    return this.http.get('https://www.roma-by-night.it/ICU/getcondizioni.php' );
  }

  addoggetto(nomeoggetto: string, descrizione: string, fissomobile: string) {
    const oggetto = { nomeoggetto, descrizione, fissomobile };
    return this.http.post('https://www.roma-by-night.it/ICU/addoggetto.php', oggetto);
  }

  cancellaoggetto(IDoggetto: number) {
    const oggetto = { IDoggetto };
    return this.http.post('https://www.roma-by-night.it/ICU/cancellaoggetto.php', oggetto);
  }


}
