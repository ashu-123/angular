import { ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync } from "@angular/core/testing";
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
    });

    // it('should call the update hero when save is called (async test)', fakeAsync(() => {
    //     heroService.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();

    //     fixture.componentInstance.save();
    //     // tick(260);
    //     flush();
    //     // setTimeout(() => {
    //     //     expect(heroService.updateHero).toHaveBeenCalled();
    //     //     done();
    //     // }, 300)

    //     expect(heroService.updateHero).toHaveBeenCalled();

        
    // }))

    it('should call the update hero when save is called (async test)', waitForAsync(() => {
        heroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        fixture.whenStable().then(() => {
            expect(heroService.updateHero).toHaveBeenCalled();
        });
        
    }))
})