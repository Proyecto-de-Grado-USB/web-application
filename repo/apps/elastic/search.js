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
            await this.client.indices.create({
                index: 'my_documents',
                body: {
                    mappings: {
                        properties: {
                            elser_embedding: {
                                type: 'sparse_vector'
                            },
                            title: {
                                type: 'text',
                                analyzer: 'spanish'
                            }
                        }
                    },
                    settings: {
                        index: {
                            default_pipeline: 'elser-ingest-pipeline'
                        }
                    }
                }
            });
            console.log('Index created successfully with custom mappings and settings.');
        } catch (error) {
            console.error('Error creating index:', error);
        }
    }     

    async deployElser() {
        try {
            await this.client.ml.putTrainedModel({
                model_id: '.elser_model_2',
                input: { field_names: ['text_field'] }
            });
    
            while (true) {
                const status = await this.client.ml.getTrainedModels({
                    model_id: '.elser_model_2',
                    include: 'definition_status'
                });
                if (status.trained_model_configs[0].fully_defined) {
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 10000));
            }
    
            await this.client.ml.startTrainedModelDeployment({
                model_id: '.elser_model_2'
            });
    
            await this.client.ingest.putPipeline({
                id: 'elser-ingest-pipeline',
                body: {
                    processors: [
                        {
                            inference: {
                                model_id: '.elser_model_2',
                                input_output: [ 
                                    {
                                      input_field: 'title',
                                      output_field: 'elser_embedding'
                                    }
                                  ]
                            }
                        }
                    ]
                }
            });
    
            console.log('ELSER model deployed and pipeline created successfully.');
        } catch (error) {
            console.error('Error deploying ELSER model:', error);
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

    async updateDocument(id, document) {
        try {
            return await this.client.update({
                index: 'my_documents',
                id: id,
                body: {
                    doc: document
                }
            });
        } catch (error) {
            console.error('Error updating document:', error);
            return null;
        }
    }    
}

module.exports = Search;
