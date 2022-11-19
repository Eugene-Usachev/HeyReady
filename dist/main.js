"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cors = require("cors");
const cookieParser = require("cookie-parser");
async function start() {
    const PORT = process.env.PORT || 1600, app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
    await app.listen(PORT, () => {
        console.log(`Server opened on ${PORT} port!`);
    });
}
start();
//# sourceMappingURL=main.js.map