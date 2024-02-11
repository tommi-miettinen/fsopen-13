import { Router } from "express";
import { User } from "../models/index.js";
import jwt from "jsonwebtoken";
import { tokenExtractor } from "../middleware/tokenExtractor.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === "secret";

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  //@ts-ignore
  if (user.disabled) {
    return response.status(401).json({ error: "account disabled, please contact admin" });
  }

  const userForToken = {
    //@ts-ignore
    username: user.username,
    //@ts-ignore
    id: user.id,
  };

  const token = jwt.sign(userForToken, "jwt");

  //@ts-ignore
  response.status(200).send({ token, username: user.username, name: user.name });
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  //@ts-ignore
  if (!user.admin) {
    return res.status(401).json({ error: "operation not allowed" });
  }
  next();
};

router.put("/:username", tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user) {
    //@ts-ignore
    user.disabled = req.body.disabled;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

export { router as userRouter };
