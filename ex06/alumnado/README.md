# Instrucións para o alumnado - Exercicio 6

## O que tes que facer

1. **Crear a estrutura de directorios**:
   ```
   ex06/
   ├── docker-compose.yml
   └── www/
       ├── index.html
       ├── ex02/
       └── ex05/
   ```

2. **Copiar os exercicios**:
   - Copia o contido de `ex02/solucion/` a `ex06/www/ex02/`
   - Copia o contido de `ex05/solucion/` a `ex06/www/ex05/`

3. **Crear o docker-compose.yml** seguindo o exemplo do enunciado

4. **Crear o index.html** na raíz de `www/` con ligazóns aos dous xogos

5. **Iniciar o contedor**:
   ```bash
   cd ex06
   docker-compose up -d
   ```

6. **Verificar** en http://localhost:8081

## Comprobar que todo funciona

- [ ] O contedor arranca sen erros
- [ ] Podes acceder a http://localhost:8081
- [ ] O exercicio 2 funciona correctamente
- [ ] O exercicio 5 funciona e garda estatísticas
- [ ] Os estilos cargan ben

## Entrega

Entregar a carpeta `ex06/` completa co contedor funcionando.
