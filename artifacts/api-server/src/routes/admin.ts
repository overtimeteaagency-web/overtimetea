import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { db } from "@workspace/db";
import { siteContentTable, siteImagesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

/* ── Upload config ──────────────────────────────────────── */

const uploadsDir = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

/* ── Content ────────────────────────────────────────────── */

router.get("/content", async (req: Request, res: Response) => {
  const rows = await db.select().from(siteContentTable).limit(1);
  if (rows.length === 0) {
    res.json({ data: null });
    return;
  }
  res.json({ data: rows[0].data });
});

router.put("/content", async (req: Request, res: Response) => {
  const { data } = req.body as { data: unknown };
  if (!data) {
    res.status(400).json({ error: "data is required" });
    return;
  }

  const rows = await db.select().from(siteContentTable).limit(1);
  if (rows.length === 0) {
    await db.insert(siteContentTable).values({ data });
  } else {
    await db
      .update(siteContentTable)
      .set({ data, updatedAt: new Date() })
      .where(eq(siteContentTable.id, rows[0].id));
  }
  res.json({ ok: true });
});

/* ── Images ─────────────────────────────────────────────── */

router.get("/images", async (_req: Request, res: Response) => {
  const images = await db
    .select()
    .from(siteImagesTable)
    .orderBy(siteImagesTable.createdAt);
  res.json({ images });
});

router.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const label = (req.body as { label?: string }).label ?? "general";
    const basePath = process.env["BASE_PATH"] ?? "";
    const url = `${basePath}/api/uploads/${req.file.filename}`;

    const [row] = await db
      .insert(siteImagesTable)
      .values({
        filename: req.file.filename,
        originalName: req.file.originalname,
        url,
        label,
      })
      .returning();

    res.json({ image: row });
  },
);

router.delete("/images/:id", async (req: Request, res: Response) => {
  const id = Number(req.params["id"]);
  const rows = await db
    .select()
    .from(siteImagesTable)
    .where(eq(siteImagesTable.id, id));
  if (rows.length === 0) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  const filePath = path.join(uploadsDir, rows[0].filename);
  try {
    fs.unlinkSync(filePath);
  } catch {}

  await db.delete(siteImagesTable).where(eq(siteImagesTable.id, id));
  res.json({ ok: true });
});

export default router;
