const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { render } = require('ejs');
const Search = require('./search');

const app = express();
const es = new Search();

app.use(cors({ origin: 'http://localhost:3001' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const allDocuments = await es.search({
            query: { match_all: {} },
            size: 1000
        });
  
        res.json({
          documents: allDocuments.hits.hits
        });
    } catch (error) {
        console.error('Error retrieving all documents:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/', async (req, res) => {
    const start_time = new Date();
    const query = req.body.query || '';
    const { filters, parsed_query } = extractFilters(query);
    const from_ = parseInt(req.body.from_) || 0;

    try {
        const results = await es.search({
            query: {
                bool: {
                    must: {
                        multi_match: {
                            query: parsed_query,
                            fields: ['name', 'summary', 'content'],
                        },
                    },
                    ...filters,
                },
            },
            size: 10,
            from: from_,
        });

        const end_time = new Date();
        const response_time = end_time - start_time;
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
