const sendSlackNotification = async (message: string, url:string) => {
    const data = { text: message };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log('Message sent to Slack successfully!');
    } catch (error) {
        console.error('Failed to send message to Slack:', error);
    }
}

export { sendSlackNotification };