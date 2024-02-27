import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroService } from "../hero.service";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { Location } from '@angular/common';
import { HeroDetailComponent } from "./hero-detail.component";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe('HeroDetailComponent', () => {

    let  heroService, activatedRoute, location;
    let fixture: ComponentFixture<HeroDetailComponent>;

    beforeEach(() => {
        heroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        location = jasmine.createSpyObj(['back']);
        activatedRoute = {
            snapshot: {
                paramMap: {
                    get: () => { return '3'; }
                }
            }
        };

        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ HeroDetailComponent ],
            providers: [
                {provide: HeroService, useValue: heroService},
                {provide: ActivatedRoute, useValue: activatedRoute},
                {provide: Location, useValue: location}
            ]
        });

        fixture = TestBed.createComponent(HeroDetailComponent);

        heroService.getHero.and.returnValue(of({id: 4, name: 'Super Dude', strength: 34}));
    });

    it('should render hero name in a h2 tag', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPER DUDE');
    })
})