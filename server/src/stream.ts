import express from "express";
import fs from "fs";
import mime from "mime-types";

import { trackById } from "./database";

const router = express.Router();

router.get("/:trackId", async function (req, res) {
  const { trackId } = req.params;
  const { range } = req.headers;

  const trackData = await trackById(parseInt(trackId));
  const stat = fs.statSync(trackData.path);
  const mimeType = mime.lookup(trackData.path);

  let readStream;

  if (range !== undefined) {
    const parts = range.replace(/bytes=/, "").split("-");
    const partial_start = parts[0];
    const partial_end = parts[1];

    if (
      (isNaN(partial_start as any) && partial_start.length > 1) ||
      (isNaN(partial_end as any) && partial_end.length > 1)
    ) {
      return res.sendStatus(500); //ERR_INCOMPLETE_CHUNKED_ENCODING
    }

    const start = parseInt(partial_start, 10);
    const end = partial_end ? parseInt(partial_end, 10) : stat.size - 1;
    const content_length = end - start + 1;

    res.status(206).header({
      "Content-Type": mimeType,
      "Content-Length": content_length,
      "Content-Range": "bytes " + start + "-" + end + "/" + stat.size,
    });

    readStream = fs.createReadStream(trackData.path, {
      start: start,
      end: end,
    });
  } else {
    res.header({
      "Content-Type": mimeType,
      "Content-Length": stat.size,
    });
    readStream = fs.createReadStream(trackData.path);
  }

  readStream.pipe(res);
});

export default router;
