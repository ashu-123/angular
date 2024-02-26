import { StrengthPipe } from "./strength.pipe"

describe('Strength Pipe', () => {

    it('should display weak if strength is 5', () => {
        let strengthPipe = new StrengthPipe();

        expect(strengthPipe.transform(5)).toEqual('5 (weak)');
    })

    it('should display strong if strength is 10', () => {
        let strengthPipe = new StrengthPipe();

        expect(strengthPipe.transform(10)).toEqual('10 (strong)');
    })

    it('should display unbelievable if strength is 30', () => {
        let strengthPipe = new StrengthPipe();

        expect(strengthPipe.transform(30)).toEqual('30 (unbelievable)');
    })
})