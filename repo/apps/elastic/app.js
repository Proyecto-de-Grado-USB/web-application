const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment-timezone');
const { render } = require('ejs');
const Search = require('./search');

const app = express();
const es = new Search();

app.use(cors({ origin: 'http://localhost:3001' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const allDocuments = await es.getAll();

        res.json({
            documents: allDocuments.hits.hits
        });
    } catch (error) {
        console.error('Error retrieving all documents:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/', async (req, res) => {
    console.log("full-text");
    const start_time = moment().tz('America/La_Paz');
    const query = req.body.query || '';
    const { filters, parsed_query } = extractFilters(query);
    const from_ = parseInt(req.body.from_) || 0;

    try {
        const results = await es.getAll({
            query: {
                bool: {
                    must: {
                        multi_match: {
                            query: parsed_query,
                            fields: ['*'],
                        },
                    },
                    ...filters,
                },
            },
            size: 3964,
            from: from_,
        });

        const end_time = moment().tz('America/La_Paz');
        const response_time = end_time.diff(start_time, 'milliseconds');
        console.log(`Response time: ${response_time} milliseconds`);

        res.json({
            results: results.hits.hits,
            query,
            from: from_,
            total: results.hits.total.value,
        });
    } catch (error) {
        console.error('Error handling search:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/semantic-search', async (req, res) => {
    console.log("semantic");
    const query = req.body.query || '';
    const from_ = parseInt(req.body.from_) || 0;

    try {
        const results = await es.search(query, from_);

        console.log(query);

        results.hits.hits.forEach(result => {
            console.log(`_id: ${result._id}, _score: ${result._score}`);
        });

        res.json({
            results: results.hits.hits,
            query,
            from: from_,
            total: results.hits.total.value
        });
    } catch (error) {
        console.error('Error handling semantic search:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/document', async (req, res) => {
    const document = req.body;
    try {
        const result = await es.insertDocument(document);
        res.json({ message: 'Document inserted successfully', result });
    } catch (error) {
        console.error('Error inserting document:', error);
        res.status(500).send('Error inserting document.');
    }
});

app.get('/document/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const document = await es.retrieveDocument(id);
        const title = document._source.name;
        const paragraphs = document._source.content.split('\n');
        res.json({ title, paragraphs });
    } catch (error) {
        console.error('Error retrieving document:', error);
        res.status(404).send('Document Not Found');
    }
});

app.post('/reindex', async (req, res) => {
    try {
        await es.reindex();
        res.send('Indexing completed successfully.');
    } catch (error) {
        console.error('Error reindexing:', error);
        res.status(500).send('Error reindexing.');
    }
});

app.post('/deploy-openai', async (req, res) => {
    try {
        await es.deployOpenAI();
        res.send('OpenAI model deployed and pipeline created successfully.');
    } catch (error) {
        console.error('Error deploying OpenAI model:', error);
        res.status(500).send('Error deploying OpenAI model.');
    }
});

app.delete('/document/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await es.deleteDocument(id);
        if (result.result === 'deleted') {
            res.json({ message: 'Document deleted successfully' });
        } else {
            res.status(404).send('Document not found');
        }
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).send('Error deleting document');
    }
});

app.put('/document/:id', async (req, res) => {
    const id = req.params.id;
    const document = req.body;
    try {
        const result = await es.updateDocument(id, document);
        res.json({ message: 'Document updated successfully', result });
    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).send('Error updating document');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

function extractFilters(query) {
    const filters = [];

    const filterRegex = /category:([^\s]+)\s*/;
    const m = query.match(filterRegex);
    if (m) {
        filters.push({
            term: {
                'category.keyword': {
                    value: m[1],
                },
            },
        });
        query = query.replace(filterRegex, '').trim();
    }

    return { filters, parsed_query: query };
}
