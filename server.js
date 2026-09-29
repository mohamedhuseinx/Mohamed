const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_DIR = path.resolve(__dirname);
const SUBMISSIONS_FILE = path.join(BASE_DIR, 'contact-submissions.json');

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.jfif': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = decodeURIComponent(parsedUrl.pathname);

    // Handle Contact API endpoint
    if (req.method === 'POST' && pathname === '/api/contact') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const data = JSON.parse(body || '{}');
                const { name, email, subject, message } = data;

                if (!name || !email || !message) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: 'Name, email, and message are required.' }));
                    return;
                }

                const submission = {
                    id: Date.now(),
                    timestamp: new Date().toISOString(),
                    name: String(name).trim(),
                    email: String(email).trim(),
                    subject: String(subject || 'General Inquiry').trim(),
                    message: String(message).trim()
                };

                let submissions = [];
                if (fs.existsSync(SUBMISSIONS_FILE)) {
                    try {
                        submissions = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf8'));
                    } catch (e) {
                        submissions = [];
                    }
                }
                submissions.push(submission);
                fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf8');

                console.log(`[Contact Form] New submission from ${submission.name} (${submission.email}) at ${submission.timestamp}`);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    message: `Thank you ${submission.name}! Your message has been received. Mohamed will reach out to you shortly.`,
                    submissionId: submission.id
                }));
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload.' }));
            }
        });
        return;
    }

    // Serve static files
    let filePath = path.join(BASE_DIR, pathname === '/' ? 'index.html' : pathname);

    // Security check: ensure path is within BASE_DIR
    if (!filePath.startsWith(BASE_DIR)) {
        res.writeHead(403);
        res.end('Access denied');
        return;
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(BASE_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    });

    fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
    console.log(`Portfolio server running with Contact API at http://localhost:${PORT}`);
});
