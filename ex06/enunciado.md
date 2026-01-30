# 🐳 Exercicio 6: Docker LAMP con Xogos de Matriz

## Obxectivo

Crear un ambiente Docker con **LAMP** (Linux, Apache, PHP) para servir os exercicios 2 e 5 dos xogos de matriz mediante un contedor web.

## Descrición

Este exercicio consiste en **executar un servidor web** con Docker que sirva dous xogos:
- **Exercicio 2**: Xogo da matriz configurábel con cronómetro
- **Exercicio 5**: Xogo con estatísticas en sessionStorage

## Estrutura do proxecto

```
ex06/
├── docker-compose.yml
└── www/
    ├── index.html          # Páxina de inicio
    ├── ex02/              # Exercicio 2
    │   ├── index.html
    │   └── app.js
    └── ex05/              # Exercicio 5
        ├── index.html
        └── app.js
```

## Configuración Docker

### docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    image: php:8.2-apache
    container_name: xogo-matriz-web
    ports:
      - "8081:80"
    volumes:
      - ./www:/var/www/html
    environment:
      - APACHE_DOCUMENT_ROOT=/var/www/html
    restart: unless-stopped
    networks:
      - lamp-network

networks:
  lamp-network:
    driver: bridge
```

## Comandos Docker

### Iniciar o contedor

```bash
docker-compose up -d
```

### Detener o contedor

```bash
docker-compose down
```

### Ver logs

```bash
docker-compose logs -f
```

### Reiniciar o contedor

```bash
docker-compose restart
```

## Acceso aos xogos

Unha vez o contedor estea en execución:

- **Páxina principal**: http://localhost:8081
- **Exercicio 2**: http://localhost:8081/ex02/
- **Exercicio 5**: http://localhost:8081/ex05/

## Páxina de inicio (index.html)

A páxina de inicio proporciona:
- Índice visual con cards para cada xogo
- Descrición de características
- Botóns para acceder directamente
- Información sobre Docker

## Requisitos

### Software necesario
- Docker instalado
- Docker Compose instalado

### Verificar instalación

```bash
docker --version
docker-compose --version
```

## Tarefas do alumnado

1. **Copiar os exercicios 2 e 5** ao directorio `www/`
2. **Crear o arquivo docker-compose.yml** coa configuración
3. **Crear a páxina index.html** de inicio
4. **Iniciar o contedor** e verificar que funciona
5. **Acceder** aos xogos desde o navegador

## Verificación

Comprobar que:
- ✅ O contedor arranca correctamente
- ✅ A páxina de inicio carga en http://localhost:8080
- ✅ O exercicio 2 funciona correctamente
- ✅ O exercicio 5 funciona e garda estatísticas
- ✅ Os estilos e scripts cargan correctamente

## Tarefas adicionais (opcional)

### 1. Engadir un .dockerignore

```
.git
.gitignore
*.md
```

### 2. Configurar variables de entorno

Engadir ao `docker-compose.yml`:

```yaml
environment:
  - TZ=Europe/Madrid
```

### 3. Crear un script de inicio

**start.sh**:
```bash
#!/bin/bash
docker-compose up -d
echo "Servidor iniciado en http://localhost:8080"
```

### 4. Personalizar o index.html

- Engadir máis información
- Personalizar os estilos
- Engadir un footer con datos do autor

## Solución de problemas

### O porto 8081 xa está en uso

Cambia o porto no `docker-compose.yml`:
```yaml
ports:
  - "8082:80"  # Usar 8082 en lugar de 8081
```

### Os arquivos non se actualizan

Forza a reconstrución:
```bash
docker-compose down
docker-compose up -d --force-recreate
```

### Erros de permisos

```bash
sudo chown -R $USER:$USER www/
```

## Recursos adicionais

- [Documentación de Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Imaxe PHP con Apache](https://hub.docker.com/_/php)



**Obxectivo final:** ter un servidor web Docker funcionando que sirva os xogos de matriz dos exercicios 2 e 5, accesibles desde http://localhost:8081.
