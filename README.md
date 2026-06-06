# FavStore

Aplicação full-stack com frontend React + Vite e backend FastAPI + SQLite.

## Como rodar com Docker

Pré-requisitos: Docker e Docker Compose instalados.

```bash
# A partir da raiz do projeto
docker compose up --build
```

Acessar:
- Frontend: http://localhost
- Backend (API): http://localhost:8000
- Documentação Swagger: http://localhost:8000/docs

### Parar os containers

```bash
docker compose down
```

Para remover também o volume do banco de dados:

```bash
docker compose down -v
```

## Desenvolvimento local (sem Docker)

### Backend

```bash
cd atividadedevops-backend-main
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd atividadedevops-frontend-main
npm install
npm run dev
```

Frontend disponível em http://localhost:5173.
