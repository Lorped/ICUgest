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
    public subskill: Subskill[] = [];  //array delle sottocompetenze della skill
}
export class Otherskill {  //classe per le altre skill del personaggio
    public IDskill = 0;
    public nomeskill = '';
    public livello = 0;
}


export class Condizione {
    public IDcondizione = 0;
    public IDoggetto = 0;
    public tipocond = '';   // S skill SS subskill D disciplina X societa Y dominio C clan
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

export class Societa {
    public IDsocieta = 0;
    public nomesocieta = '';
}

export class Clan {
    public IDclan = 0;
    public nomeclan = '';
}

export class Dominio {
    public IDdominio = 0;
    public nomedominio = '';
}

export class Disciplina {
    public IDdisciplina = 0;
    public nomedisciplina = '';
}

export class Unpaired {
  public IDoggetto = 0;
  public nomeoggetto = '';
}




@Service()
export class Backend {
    private http = inject(HttpClient);
  constructor() {}

  listoggetti() {
    return this.http.get<{ oggetti: Oggetto[] }>('https://www.roma-by-night.it/ICU/listoggetti.php' );
  }

  prestampa(righe: { IDoggetto: number; quantita: number }[]) {
    return this.http.post('https://www.roma-by-night.it/ICU/prestampa.php', righe);
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
  getoggetto(IDoggetto: number, cacheBust = false) {
    const refresh = cacheBust ? `&refresh=${Date.now()}` : '';
    return this.http.get(`https://www.roma-by-night.it/ICU/getoggetto.php?IDoggetto=${IDoggetto}${refresh}`);
  }

  getunpaired(IDoggetto: number) {
    return this.http.get(`https://www.roma-by-night.it/ICU/getunpaired.php?IDoggetto=${IDoggetto}`);
  }

  addcondizione(IDoggetto: number, tipocond: string, tabcond: number, valcond: number, descrX: string, risp: string) {
    const condizione = { IDoggetto, tipocond, tabcond, valcond, descrX, risp };   
    return this.http.post('https://www.roma-by-night.it/ICU/addcondizione.php', condizione);
  }

  addDomanda( IDoggetto: number, domanda: string, r1: string, r2: string) {
    return this.http.post(`https://www.roma-by-night.it/ICU/adddomanda.php`, {
      IDoggetto: IDoggetto,
      domanda: domanda,
      r1: r1,
      r2: r2
    });
  }

  addpaired(IDoggetto1: number, IDoggetto2: number, descrizionePaired: string) {
    const paired = { IDoggetto1, IDoggetto2, descrizionePaired };
    return this.http.post('https://www.roma-by-night.it/ICU/addpaired.php', paired);
  }

  addincremento(IDoggetto: number, newincremento: number) {
    const incremento = { IDoggetto, newincremento };
    return this.http.post('https://www.roma-by-night.it/ICU/addincremento.php', incremento);
  }

  cancellacondizione(IDcondizione: number) {
    const condizione = { IDcondizione };
    return this.http.post('https://www.roma-by-night.it/ICU/cancellacondizione.php', condizione);
  }

  cancellapaired(IDoggetto: number) {
    const oggetto = { IDoggetto };
    return this.http.post('https://www.roma-by-night.it/ICU/cancellapaired.php', oggetto);
  }

  cancelladomanda(IDoggetto: number) {
    const oggetto = { IDoggetto };
    return this.http.post('https://www.roma-by-night.it/ICU/cancelladomanda.php', oggetto);
  }

  cancellaeffetto(IDoggetto: number) {
    const oggetto = { IDoggetto };
    return this.http.post('https://www.roma-by-night.it/ICU/cancellaeffetto.php', oggetto);
  }

}
