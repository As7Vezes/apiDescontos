import { App } from "./app";
const PORT = 3000;

new App().server.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
