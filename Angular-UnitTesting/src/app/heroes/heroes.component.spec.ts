import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component"
import { Hero } from "../hero";

describe('Heroes Component', () => {

    let heroesComponent: HeroesComponent;
    let heroService;
    let HEROES: Hero[];

    beforeEach(() => {
        HEROES = [
            { id:1, name: 'Spider Hero', strength: 5 },
            { id:2, name: 'Web Hero', strength: 5 },
            { id:3, name: 'Dark Hero', strength: 15 }
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