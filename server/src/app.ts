import express from 'express';
import { authRouter } from './routes/auth.routes';
import { indexRouter } from './routes/index.routes';
import { linksRouter } from './routes/links.routes';
import { errorHandler, errorLogger } from './errors';
import { userRouter } from './routes/user.routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
app.use(cookieParser('shortly is great'))
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,

    }
))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/links', linksRouter);
app.use('/', indexRouter);
app.use(errorLogger);
app.use(errorHandler);
function startServer(PORT = 7071) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
export { startServer }