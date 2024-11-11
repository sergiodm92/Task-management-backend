import app from './app';
import envs from '@config/envs';

const { PORT } = envs;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
