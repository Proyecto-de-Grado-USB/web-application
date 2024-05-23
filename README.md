# Lauch turbo repo apps
In order to start the the whole project (all the repos in apps folder) simultaneously, follow this steps:

1. Go to repo folder:
```bash
cd repo
```
2. Start the ElasticSearch docker container:
```bash
sudo docker-compose up -d
```

3. Index the config.json data:
```bash
curl --location --request POST 'http://localhost:3000/reindex'
```

4. Install the packages:
```bash
npm install
```

5. Run the turbo repo:
```bash
npm run dev
```

6. Open the web application at:
```bash
http://localhost:3001
```

In case you get any mui-x errors:
```bash
npx next telemetry disable
```