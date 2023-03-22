import Client from "../../src/core/Client";

test("Create a client", () => {
    const newClient = new Client("abc");
    expect(newClient.id).toBe("abc");
    expect(newClient.hashState).toBe("");
});

test("Create a client and add state to hash", () => {
    const newClient = new Client("abc");
    newClient.addStateIdToHash("123");

    expect(newClient.hashState).toBe("123");

    newClient.addStateIdToHash("456");
    expect(newClient.hashState).toBe("123|456");
});