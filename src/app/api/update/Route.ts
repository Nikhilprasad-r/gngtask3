import fs from 'fs';
import path from 'path';
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const filePath = path.join(process.cwd(), '../../../../public/data.json');
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
            res.status(200).json({ message: 'Data updated successfully' });
        } catch (error) {
            console.error('Error writing file:', error);
            res.status(500).json({ message: 'Failed to update data' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
