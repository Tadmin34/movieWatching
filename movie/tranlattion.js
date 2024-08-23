async function translateText(text) {
    try {
        const response = await fetch('https://libretranslate.com/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q: text,
                source: 'en',
                target: 'vi',
                format: 'text'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to translate text');
        }

        const data = await response.json();
        return data.translatedText || text; // Fallback to original text if translation fails
    } catch (error) {
        console.error('Translation error:', error);
        return text; // Fallback to original text in case of an error
    }
}
