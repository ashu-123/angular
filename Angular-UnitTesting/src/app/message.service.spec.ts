import { MessageService } from "./message.service"

describe('Message Service', () => {

    let messageService: MessageService;

    beforeEach(() => {
        messageService = new MessageService();
    });

    it('should have no messages to start', () => {
        expect(messageService.messages.length).toEqual(0);
    });

    it('should have 1 messages when add is called', () => {
        messageService.add("Message 1");
        expect(messageService.messages.length).toEqual(1);
    });

    it('should remove all messages when clear is called', () => {
        messageService.add("Message 2");

        messageService.clear();

        expect(messageService.messages.length).toEqual(0);
    });

})