const { Client } = require('@elastic/elasticsearch');
const fs = require('fs');

require('dotenv').config();

class Search {
    constructor() {
        this.client = new Client({
            node: 'http://localhost:9200'
          });
        this.client.info()
            .then(response => {
                console.log('Connected to Elasticsearch!');
                console.log(response);
            })
            .catch(error => console.error('Error connecting to Elasticsearch:', error));
    }

    async createIndex() {
        try {
            await this.client.indices.delete({ index: 'my_documents', ignore_unavailable: true });
            await this.client.indices.create({ index: 'my_documents' });
        } catch (error) {
            console.error('Error creating index:', error);
        }
    }

    async insertDocument(document) {
        try {
            return await this.client.index({ index: 'my_documents', body: document });
        } catch (error) {
            console.error('Error inserting document:', error);
            return null;
        }
    }

    async insertDocuments(documents) {
        const body = documents.flatMap(document => [{ index: { _index: 'my_documents' } }, document]);
        try {
            return await this.client.bulk({ body });
        } catch (error) {
            console.error('Error inserting documents:', error);
            return null;
        }
    }

    async reindex() {
        try {
            await this.createIndex();
            const documents = JSON.parse(fs.readFileSync('data.json', 'utf8'));
            return await this.insertDocuments(documents);
        } catch (error) {
            console.error('Error reindexing:', error);
            return null;
        }
    }

    async search(queryArgs) {
        try {
            return await this.client.search({ index: 'my_documents', ...queryArgs });
        } catch (error) {
            console.error('Error searching:', error);
            return null;
        }
    }

    async retrieveDocument(id) {
        try {
            return await this.client.get({ index: 'my_documents', id });
        } catch (error) {
            console.error('Error retrieving document:', error);
            return null;
        }
    }

    async deleteDocument(id) {
        try {
            return await this.client.delete({
                index: 'my_documents',
                id: id
            });
        } catch (error) {
            console.error('Error deleting document:', error);
            return null;
        }
    }    
}

module.exports = Search;
