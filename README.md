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
| Backend (API)  | https://favstorefaculdade.onrender.com       |
| Swagger        | https://favstorefaculdade.onrender.com/docs  |

## Tecnologias

- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router, Lucide React
- **Backend:** FastAPI, SQLAlchemy, Pydantic, SQLite, Uvicorn, HTTPX
- **Infra:** Docker, Docker Compose, Nginx
- **Deploy:** Cloudflare Pages (frontend), Render (backend)
- **CI/CD:** GitHub Actions

## Arquitetura

Monorepo com duas aplicações independentes, cada uma com seu próprio `Dockerfile`:

```
/
├── atividadedevops-frontend-main/   # Frontend React + Vite
│   ├── src/                         # Código fonte
│   │   ├── components/              # Componentes reutilizáveis
│   │   ├── context/                 # Contexto global (AppContext)
│   │   ├── pages/                   # Páginas (Shop, Favorites)
│   │   └── services/                # API client (Axios)
│   ├── Dockerfile                   # Multi-stage (Node build → Nginx)
│   └── nginx.conf                   # SPA routing (try_files)
│
├── atividadedevops-backend-main/    # Backend FastAPI
│   ├── app/
│   │   ├── api/v1/                  # Rotas (customers, favorites, products)
│   │   ├── db/                      # Database (SQLAlchemy + SQLite)
│   │   ├── models/                  # Modelos ORM
│   │   └── schemas/                 # Schemas Pydantic
│   ├── Dockerfile                   # Python slim (uvicorn)
│   └── requirements.txt
│
├── docker-compose.yml               # Orquestração dos dois serviços
├── .github/workflows/ci.yml         # Pipeline CI
└── README.md
```

### Estratégia de deploy

- O **frontend** é servido como site estático pelo **Cloudflare Pages**, construído a partir do repositório GitHub.
- O **backend** roda como serviço **Render** (FastAPI + Uvicorn), com banco **SQLite** efêmero.
- As aplicações são desacopladas: o frontend consome a API do backend via HTTPS e o backend faz proxy da **Fake Store API** externa para os produtos.
- Nenhuma credencial ou segredo está exposto no código-fonte — todas as configurações sensíveis são injetadas via variáveis de ambiente.

## Executando localmente com Docker

Pré-requisitos: Docker e Docker Compose instalados.

```bash
# A partir da raiz do projeto
docker compose up --build
```

Este único comando:

1. **Constrói a imagem do backend** — Python 3.12 slim, instala dependências, expõe porta 8000
2. **Constrói a imagem do frontend** — Node 20 compila o Vite, resultado estático servido por Nginx na porta 80
3. **Sobe os dois containers** com um volume nomeado (`favstore-data`) para persistência do SQLite
4. **Frontend** disponível em http://localhost
5. **Backend** disponível em http://localhost:8000
6. **Swagger** disponível em http://localhost:8000/docs

### Parar os containers

```bash
docker compose down
```

Para remover também o volume do banco de dados:

```bash
docker compose down -v
```

## Executando localmente sem Docker

### Backend

```bash
cd atividadedevops-backend-main
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend disponível em http://localhost:8000.

### Frontend

```bash
cd atividadedevops-frontend-main
npm install
npm run dev
```

Frontend disponível em http://localhost:5173.

> O frontend em dev aponta para `http://localhost:8000` por padrão (configurável via `VITE_API_URL`).

## Variáveis de Ambiente

### Backend

| Variável           | Padrão                          | Descrição                                      |
|--------------------|----------------------------------|-------------------------------------------------|
| `DATABASE_URL`     | `sqlite:///app/db/database.db`   | String de conexão do banco de dados            |
| `CORS_ORIGINS`     | `http://localhost:5173`          | Origens permitidas no CORS (separadas por vírgula) |
| `FAKE_STORE_API_URL` | `https://fakestoreapi.com`     | URL base da Fake Store API                     |
| `FAKE_STORE_CATEGORY` | `jewelery`                    | Categoria de produtos buscada                  |

### Frontend

| Variável                    | Padrão                                    | Descrição                                   |
|-----------------------------|-------------------------------------------|---------------------------------------------|
| `VITE_API_URL`              | `https://favstorefaculdade.onrender.com`  | URL base da API backend                     |
| `VITE_FAKE_STORE_API_URL`   | `https://fakestoreapi.com`                | URL base da Fake Store (fallback direto)    |

> Nenhuma credencial, token ou chave de API está hardcoded no código. Não há arquivo `.env` versionado. Em produção, as variáveis são configuradas diretamente no Render (backend) e Cloudflare Pages (frontend).

## API

Todos os endpoints são prefixados com `/api/v1`.

### Customers (usuários)

| Método | Rota                        | Descrição            |
|--------|-----------------------------|----------------------|
| POST   | `/api/v1/customers/`        | Criar conta          |
| POST   | `/api/v1/customers/login`   | Login (email)        |
| GET    | `/api/v1/customers/{id}`    | Obter dados          |
| PUT    | `/api/v1/customers/{id}`    | Atualizar completo   |
| PATCH  | `/api/v1/customers/{id}`    | Atualizar parcial    |
| DELETE | `/api/v1/customers/{id}`    | Remover conta        |

### Favorites (favoritos)

| Método | Rota                                     | Descrição                |
|--------|-------------------------------------------|--------------------------|
| GET    | `/api/v1/customers/{id}/favorites/`       | Listar favoritos         |
| POST   | `/api/v1/customers/{id}/favorites/`       | Adicionar favorito       |
| DELETE | `/api/v1/customers/{id}/favorites/{prod}` | Remover favorito         |

### Products (produtos — proxy para Fake Store API)

| Método | Rota                  | Descrição                                        |
|--------|-----------------------|--------------------------------------------------|
| GET    | `/api/v1/products/`   | Lista produtos (proxy com timeout de 5s)         |

> Este endpoint faz uma chamada para `https://fakestoreapi.com/products/category/jewelery` com timeout de 5 segundos. Se a API externa falhar ou exceder o tempo limite, retorna **HTTP 503** com a mensagem `"Serviço de produtos temporariamente indisponível. Tente novamente em instantes."`.

## CI/CD

### Continuous Integration (GitHub Actions)

Em todo **push** ou **pull request** para a branch `main`, o pipeline executa:

1. **Backend job:**
   - Setup Python 3.12
   - Instala dependências (`pip install`)
   - Sobe o servidor Uvicorn e testa o health endpoint (`GET /`)
2. **Frontend job:**
   - Setup Node 20 com cache de dependências
   - Instala dependências (`npm ci`)
   - Build de produção (`npm run build`)
   - Valida que a pasta `dist/` foi gerada

### Continuous Deployment

- **Frontend:** O Cloudflare Pages detecta automaticamente o push na `main` e faz o deploy em https://favstorefaculdade.pages.dev
- **Backend:** O Render detecta automaticamente o push na `main` e faz o deploy em https://favstorefaculdade.onrender.com
