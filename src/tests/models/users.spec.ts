import db from "../../config/db";
import Users, { User } from "../../models/users";

describe("test users model", () => {
  it("create a new user", async () => {
    const user = await Users.create({
      first_name: "mohamed",
      last_name: "mostafa",
      username: "mosalah",
      password: "password",
    });
    expect(user).toEqual({
      id: 1,
      username: "mosalah",
      first_name: "mohamed",
      last_name: "mostafa",
      password: "password",
    });
  });

  it("get all users", async () => {
    const users = await Users.index();
    expect(users.length).toBe(1);
  });

  it("get a single user by id=1", async () => {
    const user = await Users.show(1);
    expect(user).toEqual(
      jasmine.objectContaining({ id: 1, username: "mosalah" })
    );
  });

  it("get a single user by username=mosalah", async () => {
    const user = await Users.show_username("mosalah");
    expect(user as User).toEqual(
      jasmine.objectContaining({ id: 1, username: "mosalah" })
    );
  });

  afterAll(async () => {
    const conn = await db.connect();
    const sql =
      "DELETE FROM order_product; ALTER SEQUENCE order_product_id_seq RESTART WITH 1;" +
      "DELETE FROM products; ALTER SEQUENCE products_id_seq RESTART WITH 1;" +
      "DELETE FROM orders; ALTER SEQUENCE orders_id_seq RESTART WITH 1;" +
      "DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1;";
    await conn.query(sql);
    conn.release();
  });
});
