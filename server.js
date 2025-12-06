const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ debug: false });

const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});