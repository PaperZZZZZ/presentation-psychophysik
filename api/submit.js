// api/submit.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Get the data from the request body
        const { selections, name } = req.body;

        // Here you can save the data to a database, send it to your email, etc.
        // For demonstration, let's log it to the console (or implement your storage logic)

        console.log('Received data:', { selections, name });

        // Respond with success
        res.status(200).json({ message: 'Data received successfully' });
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
