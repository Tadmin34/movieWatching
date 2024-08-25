const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/translate', async (req, res) => {
    try {
        const response = await axios.post('https://libretranslate.com/languages', req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Lỗi dịch thuật:', error);
        res.status(500).json({ error: 'Có lỗi xảy ra khi dịch.' });
    }
});

app.listen(3000, () => {
    console.log('Proxy server đang chạy trên cổng 3000');
});
