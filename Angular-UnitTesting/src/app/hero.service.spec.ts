import { TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service"
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('Hero Service', ()=> {
    let messageService;
    let httpTestingController: HttpTestingController;
    let heroService: HeroService;

    beforeEach(() => {
        messageService = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                { provide: MessageService, useValue: messageService}
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        heroService = TestBed.inject(HeroService);
    });

    describe('getHero', () => {

        it('should call the correct get url', () => {
            
            heroService.getHero(4).subscribe(hero => {
                expect(hero.name).toEqual('Super Dude');
            });

            const req = httpTestingController.expectOne('api/heroes/4');

            req.flush( { id: 4, name: 'Super Dude', strength: 45});

            expect(req.request.method).toEqual('GET');

            httpTestingController.verify()

        });
        
    })
});