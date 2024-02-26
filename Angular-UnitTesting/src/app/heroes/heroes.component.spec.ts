import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component"
import { Hero } from "../hero";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('Heroes Component', () => {

    let heroesComponent: HeroesComponent;
    let heroService;
    let HEROES: Hero[];

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'Spider Hero', strength: 5 },
            { id: 2, name: 'Web Hero', strength: 5 },
            { id: 3, name: 'Dark Hero', strength: 15 }
        ];

        heroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        heroesComponent = new HeroesComponent(heroService);

    });

    describe('Delete hero', () => {

        it('should remove the indicated hero from the heroes list', () => {
            heroService.deleteHero.and.returnValue(of(true));
            heroesComponent.heroes = HEROES;

            const deletedHero: Hero = HEROES[1];
            heroesComponent.delete(HEROES[1]);

            expect(heroesComponent.heroes.length).toEqual(2);
            expect(heroesComponent.heroes.includes(deletedHero)).toBeFalse();
            expect(heroService.deleteHero).toHaveBeenCalledOnceWith(HEROES[1]);
        })
    })
})

describe('Heroes Component Shallow Tests', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let heroService;
    let HEROES: Hero[];

    @Component({
        selector: "app-hero",
        template: "<div></div>"
    })
    class MockHeroComponent {
        @Input() hero: Hero;
    }

    beforeEach(() => {

        HEROES = [
            { id: 1, name: 'Spider Hero', strength: 5 },
            { id: 2, name: 'Web Hero', strength: 5 },
            { id: 3, name: 'Dark Hero', strength: 15 }
        ];

        heroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, MockHeroComponent],
            // schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: HeroService, useValue: heroService }
            ]
        });
        fixture = TestBed.createComponent(HeroesComponent);
    })

    it('should set heroes correctly', () => {

        heroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes).toEqual(HEROES);
    })

    it('should create one li element for every hero', () => {

        heroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(3);
    })
})