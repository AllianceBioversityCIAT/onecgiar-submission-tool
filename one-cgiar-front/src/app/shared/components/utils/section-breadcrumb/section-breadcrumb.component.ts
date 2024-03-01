import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router, Event as NavigationEvent, ActivationEnd, ActivatedRoute } from '@angular/router';
import { DataControlService } from '../../../services/data-control.service';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { InitiativesService } from '../../../services/initiatives.service';

interface SectionList {
  routeName: string;
  url: string;
  name: string;
}
@Component({
  selector: 'app-section-breadcrumb',
  templateUrl: './section-breadcrumb.component.html',
  styleUrls: ['./section-breadcrumb.component.scss']
})
export class SectionBreadcrumbComponent implements OnInit {
  sectionsData: sectionData[] = [];
  currentStage = '';
  sectionsArray: any;
  sectionsList: SectionList[];
  routerEvents: Subscription;
  constructor(
    private router: Router,
    private _dataControlService: DataControlService,
    private _initiativesService: InitiativesService // private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mapToSectionData(this.router.routerState.snapshot.url);
    this.getRouteDataSubscription();
  }

  mapToSectionData(url: string) {
    let urlBase = '';
    this.sectionsData = [];

    url.split('/').map((resp, i) => {
      if (i >= 1) {
        urlBase += '/' + resp;
      }
      if (i >= 4) {
        this.sectionsData.push({
          url: urlBase,
          name: this.findTitle(i, resp)
        });
      }
    });
  }

  findTitle(i, name: string) {
    switch (i) {
      case 4:
        if (name === 'full-proposal') return 'Full Proposal';
        if (name === 'pre-concept') return 'Pre Concept';
        return name;
      // case 5:
      //   console.log(first)
      // return this._dataControlService.userMenu.find(item=>item.description == name)
      default:
        let currentNameFinded = '';

        //? impact areas no bd
        if (name === 'impact-area') {
          return 'Impact Area';
        }
        console.log(this._initiativesService.initiative?.type);
        if (name === 'work-packages') {
          return this._initiativesService.initiative?.type != 3 ? 'Work package' : 'functions/modules';
        }
        if (name === 'work-package') {
          return null;
        }
        if (Number(name)) {
          return this._dataControlService.impacAreas?.find(ia => ia.id == name)?.name || name;
        }
        //? find descriptions
        this._dataControlService.userMenu.map(stage => {
          stage.sections.map(section => {
            if (section.description === name) return (currentNameFinded = section.display_name);
            section.subsections.map(subsections => {
              if (subsections.description === name) return (currentNameFinded = subsections.display_name);
            });
          });
        });

        return currentNameFinded || name;
    }
  }

  getRouteDataSubscription() {
    this.routerEvents = this.router.events
      .pipe(
        filter<any>(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot['_routerState']['url'])
      )
      .subscribe(data => {
        this.mapToSectionData(data);
        // this.titulo = titulo;
      });
  }

  ngOnDestroy(): void {
    this.routerEvents.unsubscribe();
  }
}

interface sectionData {
  url: string;
  name: string;
}
