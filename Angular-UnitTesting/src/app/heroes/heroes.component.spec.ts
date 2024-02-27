import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component"
import { Hero } from "../hero";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

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
});

describe('Heroes Component Shallow Integration Tests', () => {
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
});

@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()' }
})
class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

describe('Heroes Component Deep Integration Tests', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let heroService;
    let HEROES: Hero[];

    beforeEach(() => {

        HEROES = [
            { id: 1, name: 'Spider Hero', strength: 5 },
            { id: 2, name: 'Web Hero', strength: 5 },
            { id: 3, name: 'Dark Hero', strength: 15 }
        ];

        

        heroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
            providers: [
                { provide: HeroService, useValue: heroService }
            ]
        });
        fixture = TestBed.createComponent(HeroesComponent);
    })

    it('should render hero components correctly', () => {

        heroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const heroComponentsRendered = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentsRendered.length).toEqual(3);
        for (let i = 0; i < HEROES.length; i++) {
            expect(heroComponentsRendered[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    })

    it(`should call the Heroes.delete() method when the delete button of Hero component is clicked`, () => {

        spyOn(fixture.componentInstance, 'delete');
        heroService.getHeroes.and.returnValue(of(HEROES));
        // heroService.deleteHero.and.returnValue(of(HEROES[0]));
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponents[0].query(By.css('button'))
            .triggerEventHandler('click', { stopPropagation: () => { } });

        // (heroComponents[0].componentInstance as HeroComponent).delete.emit(undefined);
        // heroComponents[0].triggerEventHandler('delete', null);

        fixture.detectChanges();

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
        // expect(fixture.componentInstance.heroes.length).toEqual(2);
    })

    it('should add a new hero to the heroes list when the add button is clicked', () => {
        heroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const name = "Mr. Ice";
        heroService.addHero.and.returnValue(of({ id: 5, name: name, strength: 30 }));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value = name;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

        expect(heroText).toContain(name);
    });

    it('should have the correct route for the first hero', () => {
        heroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        let routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);

        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

        expect(routerLink.navigatedTo).toEqual('/detail/1');
    })

});