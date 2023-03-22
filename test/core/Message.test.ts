import Message from "../../src/core/Message";

test("Create a message", () => {
    const newMessage = new Message("1234", "Olá");
    expect(newMessage.id).toBe("1234");
    expect(newMessage.text).toBe("Olá");
});