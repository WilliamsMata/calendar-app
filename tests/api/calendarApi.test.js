import calendarApi from "../../src/api/calendarApi";

describe("Test in calendarApi", () => {
  test("should have default config", () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test("should have x-token in all request header", async () => {
    const token = "ABC-123-XYZ";

    localStorage.setItem("token", token);
    const res = await calendarApi.get("/auth");

    expect(res.config.headers["x-token"]).toBe(token);
  });
});
