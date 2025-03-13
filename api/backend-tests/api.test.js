const request = require("supertest");
const express = require("express");
const app = express();
app.use(express.json());

const MOCK_SELECT_supabase = {
  from: (tableName) => {
    return {
      select: async () => {
        return { data: null, error: null };
      },
    };
  },
};

const MOCK_INSERT_supabase = {
  from: (tableName) => {
    return {
      insert: async () => {
        return { data: null, error: null };
      },
    };
  },
};

app.get("/words", async (req, res) => {
  const { data, error } = await MOCK_SELECT_supabase.from("words").select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get("/categories", async (req, res) => {
  const { data, error } = await MOCK_SELECT_supabase.from(
    "categories"
  ).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post("/categories", async (req, res) => {
  const { data, error } = await MOCK_INSERT_supabase.from("categories").insert({
    name: req.body.name,
  });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Successfully added category", addedCategory: data });
});

describe("GET /words", () => {
  it("Success - 200 status with data", async () => {
    const mockData = [
      {
        id: 1,
        word: "food",
        image: "https://api.arasaac.org/v1/pictograms/4610?download=false",
        category: 1,
        isCategory: true,
        isCategoryId: 1,
      },
      {
        id: 2,
        word: "hungry",
        image: "https://api.arasaac.org/v1/pictograms/35579?download=false",
        category: 1,
        isCategory: false,
        isCategoryId: null,
      },
      {
        id: 3,
        word: "I want",
        image: "https://api.arasaac.org/v1/pictograms/31141?download=false",
        category: 1,
        isCategory: false,
        isCategoryId: null,
      },
    ];
    const mockSelect = jest
      .fn()
      .mockResolvedValue({ data: mockData, error: null });
    MOCK_SELECT_supabase.from = jest
      .fn()
      .mockReturnValue({ select: mockSelect });

    const response = await request(app).get("/words");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  it("Failure - 500 status with an error message", async () => {
    const mockError = new Error("Database error");
    const mockSelect = jest
      .fn()
      .mockResolvedValue({ data: null, error: mockError });
    MOCK_SELECT_supabase.from = jest
      .fn()
      .mockReturnValue({ select: mockSelect });

    const response = await request(app).get("/words");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Database error" });
  });
});

describe("GET /categories", () => {
  it("Success - 200 status with data", async () => {
    const mockData = [
      {
        id: 1,
        name: "food",
      },
      {
        id: 2,
        name: "vegetables",
      },
      {
        id: 3,
        name: "fruit",
      },
    ];
    const mockSelect = jest
      .fn()
      .mockResolvedValue({ data: mockData, error: null });
    MOCK_SELECT_supabase.from = jest
      .fn()
      .mockReturnValue({ select: mockSelect });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  it("Failure - 500 status with an error message", async () => {
    const mockError = new Error("Database error");
    const mockSelect = jest
      .fn()
      .mockResolvedValue({ data: null, error: mockError });
    MOCK_SELECT_supabase.from = jest
      .fn()
      .mockReturnValue({ select: mockSelect });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Database error" });
  });
});

describe("POST /categories", () => {
  it("Success - 200 status with new category returned", async () => {
    const mockData = {
      id: 4,
      name: "drinks",
    };

    const mockInsert = jest
      .fn()
      .mockResolvedValue({ data: mockData, error: null });
    MOCK_INSERT_supabase.from = jest
      .fn()
      .mockReturnValue({ insert: mockInsert });

    const response = await request(app)
      .post("/categories")
      .send({ addedCategory: mockData });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Successfully added category",
      addedCategory: mockData,
    });
  });

  it("Failure - 500 status with an error message", async () => {
    const mockError = new Error("Database error");
    const mockInsert = jest
      .fn()
      .mockResolvedValue({ data: null, error: mockError });

    MOCK_INSERT_supabase.from = jest
      .fn()
      .mockReturnValue({ insert: mockInsert });

    const response = await request(app)
      .post("/categories")
      .send({ name: "drinks" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Database error" });
  });
});
