# FavStore

Plataforma de favoritos de joias — full-stack com **React + Vite** (frontend) e **FastAPI + SQLite** (backend).

## Equipe

- Thauany Honorato
- Guilherme Pinheiro
- Antônio Frota

## Links

| O quê          | URL                                          |
|----------------|----------------------------------------------|
| Aplicação      | https://favstorefaculdade.pages.dev          |
| Repositório    | https://github.com/anton12o/FavstoreFaculdade |

## Tecnologias

- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router
- **Backend:** FastAPI, SQLAlchemy, Pydantic, SQLite, Uvicorn
- **Infra:** Docker, Docker Compose, Nginx
- **Deploy:** Cloudflare Pages (frontend), Render (backend)
- **CI/CD:** GitHub Actions

## Arquitetura

Monorepo com duas pastas independentes:

```
/
├── atividadedevops-frontend-main/   # Frontend React + Vite
│   ├── src/                         # Código fonte
│   ├── Dockerfile                   # Multi-stage (Node → Nginx)
│   └── nginx.conf                   # SPA routing
│
├── atividadedevops-backend-main/    # Backend FastAPI
│   ├── app/
│   │   ├── api/v1/                  # Rotas (customers, favorites)
│   │   ├── db/                      # Database (SQLite)
│   │   ├── models/                  # SQLAlchemy models
│   │   └── schemas/                 # Pydantic schemas
│   ├── Dockerfile                   # Python slim
│   └── requirements.txt
│
├── docker-compose.yml               # Orquestração dos serviços
├── .github/workflows/ci.yml         # Pipeline CI
└── README.md
```

## Como rodar com Docker

Pré-requisitos: Docker e Docker Compose instalados.

```bash
docker compose up --build
```

| Serviço  | URL                          |
|----------|------------------------------|
| Frontend | http://localhost             |
| Backend  | http://localhost:8000        |
| Swagger  | http://localhost:8000/docs   |

### Parar os containers

```bash
docker compose down
```

Para remover também o volume do banco de dados:

```bash
docker compose down -v
```

## Como rodar sem Docker

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

## API

Todos os endpoints são prefixados com `/api/v1`.

### Customers (usuários)

| Método | Rota                          | Descrição              |
|--------|-------------------------------|------------------------|
| POST   | `/api/v1/customers/`          | Criar conta            |
| POST   | `/api/v1/customers/login`     | Login (email)          |
| GET    | `/api/v1/customers/{id}`      | Obter dados            |
| PUT    | `/api/v1/customers/{id}`      | Atualizar completo     |
| PATCH  | `/api/v1/customers/{id}`      | Atualizar parcial      |
| DELETE | `/api/v1/customers/{id}`      | Remover conta          |

### Favorites (favoritos)

| Método | Rota                                       | Descrição                  |
|--------|---------------------------------------------|----------------------------|
| GET    | `/api/v1/customers/{id}/favorites/`         | Listar favoritos           |
| POST   | `/api/v1/customers/{id}/favorites/`         | Adicionar favorito         |
| DELETE | `/api/v1/customers/{id}/favorites/{prod}`   | Remover favorito           |

## CI/CD

- **CI:** GitHub Actions executa validação automática em todo push ou PR para `main`:
  - **Backend:** instala dependências, sobe o servidor e testa o health endpoint
  - **Frontend:** instala dependências, faz o build e valida a pasta `dist/`
- **CD:** deploys automáticos:
  - **Frontend:** Cloudflare Pages — publicado em https://favstorefaculdade.pages.dev
  - **Backend:** Render — publicado em https://favstorefaculdade.onrender.com
