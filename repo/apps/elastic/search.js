const { Client } = require('@elastic/elasticsearch');
const fs = require('fs');

require('dotenv').config();

const API_KEY = "API_KEY"

class Search {
    constructor() {
        this.client = new Client({
            node: 'http://localhost:9200'
        });
        this.apiKey = API_KEY;
        
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
                            openai_embedding: {
                                type: 'dense_vector',
                                dims: 3072,
                                similarity: 'dot_product'
                            },
                            title: {
                                type: 'text',
                                analyzer: 'spanish'
                            },
                            notes: {
                                type: 'text',
                                analyzer: 'spanish'
                            }
                        }
                    },
                    settings: {
                        index: {
                            default_pipeline: 'openai_embeddings_pipeline'
                        }
                    }
                }
            });
            console.log('Index created successfully with custom mappings and settings.');
        } catch (error) {
            console.error('Error creating index:', error);
        }
    }

    async deployOpenAI() {
        try {
            // Create OpenAI embedding model
            await this.client.inference.put({
                task_type: 'text_embedding',
                inference_id: 'my_openai_embedding_model',
                body: {
                    service: 'openai',
                    service_settings: { api_key: this.apiKey },
                    task_settings: { model: 'text-embedding-3-large' }
                }
            });

            // Create the ingest pipeline
            await this.client.ingest.putPipeline({
                id: 'openai_embeddings_pipeline',
                body: {
                    description: 'Ingest pipeline for OpenAI embeddings.',
                    processors: [
                        {
                            set: {
                                field: 'combined_text',
                                value: `
                                    {{title}} {{author}} año {{year}}
                                    {{city}} {{country}} {{format}} 
                                    {{subject}} {{notes}}
                                `
                            }
                        },
                        {
                            inference: {
                                model_id: 'my_openai_embedding_model',
                                input_output: {
                                    input_field: 'combined_text',
                                    output_field: 'openai_embedding'
                                }
                            }
                        }
                    ]
                }
            });

            console.log('OpenAI embeddings pipeline created successfully.');
        } catch (error) {
            console.error('Error deploying OpenAI embeddings:', error);
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
        const chunkSize = 500;
        for (let i = 0; i < documents.length; i += chunkSize) {
            const chunk = documents.slice(i, i + chunkSize);
            const body = chunk.flatMap(document => [{ index: { _index: 'my_documents' } }, document]);
            try {
                await this.client.bulk({ body });
            } catch (error) {
                console.error('Error inserting documents in batch:', error);
                return null;
            }
        }
        return true;
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

    async search(queryText, from_) {
        try {
            return await this.client.search({
                index: 'my_documents',
                size: 20,
                from: from_,
                knn: {
                    field: 'openai_embedding',
                    query_vector_builder: {
                        text_embedding: {
                            model_id: 'my_openai_embedding_model',
                            model_text: queryText
                        }
                    },
                    k: 30,
                    num_candidates: 3964
                }
            });
        } catch (error) {
            console.error('Error searching:', error);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.client.search({
                index: 'my_documents',
                size: 3964,
                query: {
                    match_all: {}
                }
            });
        } catch (error) {
            console.error('Error searching all documents:', error);
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
            await this.deleteDocument(id);
            await this.insertDocument(document);
        } catch (error) {
            console.error('Error updating document:', error);
            return null;
        }
    }    
}

module.exports = Search;
