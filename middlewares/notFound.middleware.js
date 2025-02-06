//Handling the NOT_FOUND (404) route.

export default function notFound(req, res) {
  res.status(404).send("<h2>🌵 Oops! Route does not exist! 4️⃣0️⃣4️⃣</h2>");
}
