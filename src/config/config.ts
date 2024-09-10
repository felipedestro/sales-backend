import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const { PORT } = { ...process.env } as {
  [key: string]: string;
};
