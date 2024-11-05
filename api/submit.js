import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { selections, name } = req.body;
        
        // Prepare data to write
        const data = {
            name,
            selections,
        };

        // Specify the file path to save the data
        const filePath = path.join(process.cwd(), 'data', 'submissions.json');

        // Check if the data directory exists, if not, create it
        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }

        // Append new submission to the file
        fs.readFile(filePath, 'utf8', (err, fileData) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error reading file' });
            }

            const existingData = fileData ? JSON.parse(fileData) : [];
            existingData.push(data);

            fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Error writing file' });
                }

                res.status(200).json({ message: 'Data received' });
            });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
