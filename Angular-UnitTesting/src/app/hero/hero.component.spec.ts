import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Hero Component', () => {
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);
    })

    it('should render the name of the hero in an anchor tag', () => {
        fixture.componentInstance.hero = { id: 2, name: 'SuperDude', strength: 9};
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
        // expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('SuperDude');
    })
})