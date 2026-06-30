# Endpoints Para Frontend

Documento practico para integrar el frontend con la API de Orbita Backend.

## Base

- Base local usual: `http://localhost:8000`
- Prefijo principal: `/api/v1`
- OpenAPI JSON: `/api/v1/openapi.json`
- Swagger UI: `/docs`
- CORS: actualmente permite cualquier origen.

Ejemplo:

```ts
const API_BASE_URL = "http://localhost:8000/api/v1";
```

## Convenciones

- Las respuestas usan JSON.
- Los endpoints de login usan `application/x-www-form-urlencoded`, no JSON.
- Los listados aceptan `skip` y `limit`.
- `skip` por defecto: `0`.
- `limit` por defecto: `100`.
- Los `Decimal` llegan normalmente como strings en JSON. En frontend conviene tratarlos como string decimal o convertirlos con cuidado.
- Las fechas son ISO 8601. El backend normaliza fechas con timezone a UTC naive al guardar ofertas.
- Los `PUT` son parciales: puedes enviar solo los campos que cambian.
- En la mayoria de entidades, enviar `null` en campos escalares no borra el valor; normalmente se ignora. Para relaciones como `producto_ids`, `productos` o `combos`, enviar listas vacias reemplaza la coleccion.
- Los `DELETE` devuelven el objeto eliminado.
- Los endpoints de `users` requieren token Bearer. Catalogo, combos, ofertas y pedidos no requieren auth actualmente.

Header para endpoints protegidos:

```http
Authorization: Bearer <access_token>
```

## Resumen Rapido

| Metodo | Ruta | Auth | Uso |
| --- | --- | --- | --- |
| GET | `/` | No | Mensaje raiz de API |
| GET | `/health` | No | Estado de API y DB |
| POST | `/api/v1/auth/register` | No | Registrar usuario |
| POST | `/api/v1/auth/login` | No | Login y token JWT |
| GET | `/api/v1/users/me` | Si | Usuario autenticado |
| PUT | `/api/v1/users/me` | Si | Actualizar usuario autenticado |
| GET | `/api/v1/users/` | Si | Listar usuarios |
| GET | `/api/v1/users/{user_id}` | Si | Obtener usuario |
| DELETE | `/api/v1/users/{user_id}` | Si | Eliminar usuario |
| POST | `/api/v1/categorias/` | No | Crear categoria |
| GET | `/api/v1/categorias/` | No | Listar categorias |
| GET | `/api/v1/categorias/{categoria_id}` | No | Obtener categoria |
| PUT | `/api/v1/categorias/{categoria_id}` | No | Actualizar categoria |
| DELETE | `/api/v1/categorias/{categoria_id}` | No | Eliminar categoria |
| POST | `/api/v1/productos/` | No | Crear producto |
| GET | `/api/v1/productos/` | No | Listar productos |
| GET | `/api/v1/productos/{producto_id}` | No | Obtener producto |
| PUT | `/api/v1/productos/{producto_id}` | No | Actualizar producto |
| DELETE | `/api/v1/productos/{producto_id}` | No | Eliminar producto |
| POST | `/api/v1/ofertas/` | No | Crear oferta |
| GET | `/api/v1/ofertas/` | No | Listar ofertas |
| GET | `/api/v1/ofertas/{oferta_id}` | No | Obtener oferta |
| PUT | `/api/v1/ofertas/{oferta_id}` | No | Actualizar oferta |
| DELETE | `/api/v1/ofertas/{oferta_id}` | No | Eliminar oferta |
| POST | `/api/v1/combos/` | No | Crear combo |
| GET | `/api/v1/combos/` | No | Listar combos |
| GET | `/api/v1/combos/{combo_id}` | No | Obtener combo |
| PUT | `/api/v1/combos/{combo_id}` | No | Actualizar combo |
| DELETE | `/api/v1/combos/{combo_id}` | No | Eliminar combo |
| POST | `/api/v1/pedidos/` | No | Crear pedido |
| GET | `/api/v1/pedidos/` | No | Listar pedidos |
| GET | `/api/v1/pedidos/{pedido_id}` | No | Obtener pedido |
| PUT | `/api/v1/pedidos/{pedido_id}` | No | Actualizar pedido |
| DELETE | `/api/v1/pedidos/{pedido_id}` | No | Eliminar pedido |

## Root Y Health

### GET `/`

Respuesta:

```json
{
  "message": "Welcome to the Orbita Backend API!"
}
```

### GET `/health`

Respuesta:

```json
{
  "status": "healthy",
  "database": "connected",
  "project": "Orbita Backend",
  "version": "1.0.0"
}
```

## Auth

### POST `/api/v1/auth/register`

Registra un usuario.

Body JSON:

```json
{
  "email": "ana@example.com",
  "password": "secret123",
  "full_name": "Ana",
  "is_active": true
}
```

Respuesta `201`:

```json
{
  "id": 1,
  "email": "ana@example.com",
  "full_name": "Ana",
  "is_active": true
}
```

Errores relevantes:

- `400`: email duplicado u otra regla de servicio.
- `422`: validacion Pydantic, por ejemplo email invalido.

### POST `/api/v1/auth/login`

Devuelve un token JWT. Este endpoint recibe form-data estilo OAuth2.

Content-Type:

```http
application/x-www-form-urlencoded
```

Body form:

```txt
username=ana@example.com&password=secret123
```

Respuesta `200`:

```json
{
  "access_token": "jwt...",
  "token_type": "bearer"
}
```

Errores relevantes:

- `400`: credenciales incorrectas.
- `400`: usuario inactivo.

Usuario demo creado por seed:

```txt
email: demo@orbita.local
password: demo123
```

## Users

Todos los endpoints de usuarios requieren:

```http
Authorization: Bearer <access_token>
```

### Modelo `User`

```json
{
  "id": 1,
  "email": "ana@example.com",
  "full_name": "Ana",
  "is_active": true
}
```

### GET `/api/v1/users/me`

Devuelve el usuario autenticado.

Respuesta `200`: `User`.

Errores relevantes:

- `403`: token invalido o ausente.
- `404`: usuario del token no existe.
- `400`: usuario inactivo.

### PUT `/api/v1/users/me`

Actualiza el usuario autenticado.

Body JSON parcial:

```json
{
  "email": "ana.nueva@example.com",
  "password": "new-secret",
  "full_name": "Ana Nueva",
  "is_active": true
}
```

Respuesta `200`: `User`.

### GET `/api/v1/users/`

Query params:

- `skip`: number, default `0`
- `limit`: number, default `100`

Respuesta `200`:

```json
[
  {
    "id": 1,
    "email": "ana@example.com",
    "full_name": "Ana",
    "is_active": true
  }
]
```

### GET `/api/v1/users/{user_id}`

Respuesta `200`: `User`.

Errores relevantes:

- `404`: `User not found.`

### DELETE `/api/v1/users/{user_id}`

Respuesta `200`: `User` eliminado.

Errores relevantes:

- `404`: `User not found.`

## Categorias

### Modelo `Categoria`

```json
{
  "id": 1,
  "nombre": "Smartphones",
  "url_img": "https://images.unsplash.com/...",
  "descripcion": "Telefonos 5G, equipos compactos y modelos premium.",
  "productos": [
    {
      "id": 1,
      "nombre": "Smartphone Nova X1 5G",
      "descripcion": "Pantalla OLED de 6.5 pulgadas, 128 GB y camara nocturna.",
      "precio_base": "699.00",
      "url_img": "https://images.unsplash.com/...",
      "categoria_id": 1
    }
  ]
}
```

### POST `/api/v1/categorias/`

Body JSON:

```json
{
  "nombre": "Smartphones",
  "url_img": "https://images.unsplash.com/...",
  "descripcion": "Telefonos 5G, equipos compactos y modelos premium."
}
```

Respuesta `201`: `Categoria`.

### GET `/api/v1/categorias/`

Query params:

- `skip`: number, default `0`
- `limit`: number, default `100`

Respuesta `200`: `Categoria[]`.

### GET `/api/v1/categorias/{categoria_id}`

Respuesta `200`: `Categoria`.

Errores relevantes:

- `404`: `Categoria no encontrada.`

### PUT `/api/v1/categorias/{categoria_id}`

Body JSON parcial:

```json
{
  "nombre": "Telefonos",
  "url_img": "https://images.unsplash.com/...",
  "descripcion": "Equipos moviles y accesorios principales."
}
```

Respuesta `200`: `Categoria`.

Errores relevantes:

- `404`: `Categoria no encontrada.`

### DELETE `/api/v1/categorias/{categoria_id}`

Respuesta `200`: `Categoria` eliminada.

Errores relevantes:

- `404`: `Categoria no encontrada.`
- `400`: `No se puede eliminar una categoria con productos asociados.`

## Productos

### Modelo `Producto`

```json
{
  "id": 1,
  "nombre": "Smartphone Nova X1 5G",
  "descripcion": "Pantalla OLED de 6.5 pulgadas, 128 GB y camara nocturna.",
  "precio_base": "699.00",
  "url_img": "https://images.unsplash.com/...",
  "categoria_id": 1,
  "categoria": {
    "id": 1,
    "nombre": "Smartphones",
    "url_img": "https://images.unsplash.com/...",
    "descripcion": "Telefonos 5G, equipos compactos y modelos premium."
  },
  "oferta_actual": {
    "id": 1,
    "fecha_creacion": "2026-06-30T02:20:30.123456",
    "fecha_inicio": "2026-06-29T02:20:30",
    "fecha_fin": "2026-07-20T02:20:30",
    "nombre": "Upgrade Smartphone",
    "descripcion": "Descuento directo en smartphones 5G seleccionados.",
    "monto_descuento": "60.00",
    "imagen": "https://images.unsplash.com/..."
  }
}
```

Notas:

- `categoria_id` es obligatorio al crear.
- `oferta_actual` puede ser `null`.
- Si hay varias ofertas activas para un producto, el backend devuelve la activa creada mas recientemente.

### POST `/api/v1/productos/`

Body JSON:

```json
{
  "nombre": "Smartphone Nova X1 5G",
  "descripcion": "Pantalla OLED de 6.5 pulgadas, 128 GB y camara nocturna.",
  "precio_base": "699.00",
  "url_img": "https://images.unsplash.com/...",
  "categoria_id": 1
}
```

Respuesta `201`: `Producto`.

Errores relevantes:

- `400`: `Categoria no encontrada.`
- `422`: `precio_base` menor que `0` o payload invalido.

### GET `/api/v1/productos/`

Query params:

- `skip`: number, default `0`
- `limit`: number, default `100`

Respuesta `200`: `Producto[]`.

### GET `/api/v1/productos/{producto_id}`

Respuesta `200`: `Producto`.

Errores relevantes:

- `404`: `Producto no encontrado.`

### PUT `/api/v1/productos/{producto_id}`

Body JSON parcial:

```json
{
  "nombre": "Smartphone Nova X1 5G 256GB",
  "descripcion": "Version con mas almacenamiento.",
  "precio_base": "749.00",
  "url_img": "https://images.unsplash.com/...",
  "categoria_id": 1
}
```

Respuesta `200`: `Producto`.

Errores relevantes:

- `404`: `Producto no encontrado.`
- `400`: `Categoria no encontrada.`

### DELETE `/api/v1/productos/{producto_id}`

Respuesta `200`: `Producto` eliminado.

Errores relevantes:

- `404`: `Producto no encontrado.`

## Ofertas

### Modelo `Oferta`

```json
{
  "id": 1,
  "fecha_creacion": "2026-06-30T02:20:30.123456",
  "fecha_inicio": "2026-06-29T02:20:30",
  "fecha_fin": "2026-07-20T02:20:30",
  "nombre": "Upgrade Smartphone",
  "descripcion": "Descuento directo en smartphones 5G seleccionados.",
  "monto_descuento": "60.00",
  "imagen": "https://images.unsplash.com/...",
  "productos": [
    {
      "id": 1,
      "nombre": "Smartphone Nova X1 5G",
      "descripcion": "Pantalla OLED de 6.5 pulgadas, 128 GB y camara nocturna.",
      "precio_base": "699.00",
      "url_img": "https://images.unsplash.com/...",
      "categoria_id": 1
    }
  ]
}
```

Notas:

- `fecha_creacion` la genera el backend.
- `producto_ids` controla a que productos aplica la oferta.
- `producto_ids: []` crea o deja una oferta sin productos asociados.
- `monto_descuento` es descuento fijo por unidad, no porcentaje.
- El backend valida `fecha_fin >= fecha_inicio`.

### POST `/api/v1/ofertas/`

Body JSON:

```json
{
  "fecha_inicio": "2026-06-29T00:00:00Z",
  "fecha_fin": "2026-07-20T23:59:59Z",
  "nombre": "Upgrade Smartphone",
  "descripcion": "Descuento directo en smartphones 5G seleccionados.",
  "monto_descuento": "60.00",
  "imagen": "https://images.unsplash.com/...",
  "producto_ids": [1, 2, 3]
}
```

Respuesta `201`: `Oferta`.

Errores relevantes:

- `400`: `La fecha fin debe ser mayor o igual que la fecha inicio.`
- `400`: `Productos no encontrados: [999].`
- `422`: `monto_descuento` menor que `0` o payload invalido.

### GET `/api/v1/ofertas/`

Query params:

- `skip`: number, default `0`
- `limit`: number, default `100`

Respuesta `200`: `Oferta[]`.

### GET `/api/v1/ofertas/{oferta_id}`

Respuesta `200`: `Oferta`.

Errores relevantes:

- `404`: `Oferta no encontrada.`

### PUT `/api/v1/ofertas/{oferta_id}`

Body JSON parcial:

```json
{
  "fecha_inicio": "2026-07-01T00:00:00Z",
  "fecha_fin": "2026-07-31T23:59:59Z",
  "nombre": "Oferta renovada",
  "descripcion": "Nueva descripcion",
  "monto_descuento": "75.00",
  "imagen": "https://images.unsplash.com/...",
  "producto_ids": [1, 4, 8]
}
```

Respuesta `200`: `Oferta`.

Notas:

- Si envias `producto_ids`, reemplaza completamente los productos asociados.
- Para quitar todos los productos de una oferta, envia `"producto_ids": []`.

Errores relevantes:

- `404`: `Oferta no encontrada.`
- `400`: fecha invalida o productos inexistentes.

### DELETE `/api/v1/ofertas/{oferta_id}`

Respuesta `200`: `Oferta` eliminada.

Errores relevantes:

- `404`: `Oferta no encontrada.`

## Combos

### Modelo `Combo`

```json
{
  "id": 1,
  "nombre": "Combo Home Office Pro",
  "descripcion": "Laptop, monitor 4K, webcam, hub USB-C y soporte de aluminio.",
  "precio": "1499.00",
  "imagen": "https://images.unsplash.com/...",
  "productos": [
    {
      "id": 5,
      "nombre": "Laptop Ultrabook Air 14",
      "descripcion": "Portatil delgada con SSD de 512 GB y autonomia para todo el dia.",
      "precio_base": "1099.00",
      "url_img": "https://images.unsplash.com/...",
      "categoria_id": 2
    }
  ]
}
```

Notas:

- `precio` es el precio final del combo, no se calcula desde los productos.
- `producto_ids` controla que productos forman parte del combo.

### POST `/api/v1/combos/`

Body JSON:

```json
{
  "nombre": "Combo Home Office Pro",
  "descripcion": "Laptop, monitor 4K, webcam, hub USB-C y soporte de aluminio.",
  "precio": "1499.00",
  "imagen": "https://images.unsplash.com/...",
  "producto_ids": [5, 33, 25, 24, 26]
}
```

Respuesta `201`: `Combo`.

Errores relevantes:

- `400`: `Productos no encontrados: [999].`
- `422`: `precio` menor que `0` o payload invalido.

### GET `/api/v1/combos/`

Query params:

- `skip`: number, default `0`
- `limit`: number, default `100`

Respuesta `200`: `Combo[]`.

### GET `/api/v1/combos/{combo_id}`

Respuesta `200`: `Combo`.

Errores relevantes:

- `404`: `Combo no encontrado.`

### PUT `/api/v1/combos/{combo_id}`

Body JSON parcial:

```json
{
  "nombre": "Combo Home Office Plus",
  "descripcion": "Setup actualizado de productividad.",
  "precio": "1599.00",
  "imagen": "https://images.unsplash.com/...",
  "producto_ids": [5, 33, 25]
}
```

Respuesta `200`: `Combo`.

Notas:

- Si envias `producto_ids`, reemplaza completamente los productos asociados.
- Para quitar todos los productos del combo, envia `"producto_ids": []`.

Errores relevantes:

- `404`: `Combo no encontrado.`
- `400`: productos inexistentes.

### DELETE `/api/v1/combos/{combo_id}`

Respuesta `200`: `Combo` eliminado.

Errores relevantes:

- `404`: `Combo no encontrado.`

## Pedidos

### Modelo `Pedido`

```json
{
  "id": 1,
  "fecha": "2026-06-30T02:20:30.123456",
  "nombre": "Ana Demo",
  "telefono": "55512345",
  "total": "1578.00",
  "productos": [
    {
      "id": 1,
      "producto_id": 1,
      "oferta_id": 1,
      "cantidad": 1,
      "producto_nombre": "Smartphone Nova X1 5G",
      "precio_unitario": "699.00",
      "oferta_nombre": "Upgrade Smartphone",
      "descuento_unitario": "60.00",
      "subtotal": "639.00"
    }
  ],
  "combos": [
    {
      "id": 1,
      "combo_id": 3,
      "cantidad": 1,
      "combo_nombre": "Combo Creador Movil",
      "precio_unitario": "979.00",
      "subtotal": "979.00"
    }
  ]
}
```

Notas importantes:

- `fecha`, `total`, `subtotal`, `precio_unitario`, nombres y descuentos los calcula o captura el backend.
- No envies `fecha`, `total` ni subtotales en create/update.
- Las lineas de pedido guardan snapshots. Si luego cambia el precio, nombre, combo u oferta, el pedido historico mantiene los valores de cuando se creo.
- `telefono` es string para permitir prefijos, espacios o ceros iniciales.
- El pedido debe tener al menos un producto o un combo.
- `cantidad` debe ser `>= 1`.
- En lineas de producto, `oferta_id` es opcional.
- Si no envias `oferta_id`, el backend aplica automaticamente la oferta activa actual del producto, si existe.
- Si envias `oferta_id`, debe pertenecer al producto y estar activa para la fecha del pedido.
- En `PUT`, si envias `productos` o `combos`, esa coleccion se reemplaza completa.

### POST `/api/v1/pedidos/`

Body JSON:

```json
{
  "nombre": "Ana",
  "telefono": "55512345",
  "productos": [
    {
      "producto_id": 1,
      "cantidad": 2,
      "oferta_id": 3
    }
  ],
  "combos": [
    {
      "combo_id": 1,
      "cantidad": 1
    }
  ]
}
```

Tambien puedes crear un pedido solo con productos:

```json
{
  "nombre": "Ana",
  "telefono": "55512345",
  "productos": [
    {
      "producto_id": 1,
      "cantidad": 1
    }
  ]
}
```

O solo con combos:

```json
{
  "nombre": "Ana",
  "telefono": "55512345",
  "combos": [
    {
      "combo_id": 1,
      "cantidad": 1
    }
  ]
}
```

Respuesta `201`: `Pedido`.

Errores relevantes:

- `400`: `El pedido debe tener al menos un producto o combo.`
- `400`: `Producto no encontrado.`
- `400`: `Combo no encontrado.`
- `400`: `Oferta no encontrada.`
- `400`: `La oferta no pertenece al producto indicado.`
- `400`: `La oferta no esta activa para la fecha del pedido.`
- `422`: `cantidad` menor que `1` o payload invalido.

### GET `/api/v1/pedidos/`

Query params:

- `skip`: number, default `0`
- `limit`: number, default `100`

Respuesta `200`: `Pedido[]`.

### GET `/api/v1/pedidos/{pedido_id}`

Respuesta `200`: `Pedido`.

Errores relevantes:

- `404`: `Pedido no encontrado.`

### PUT `/api/v1/pedidos/{pedido_id}`

Body JSON parcial:

```json
{
  "nombre": "Ana actualizada",
  "telefono": "55500000",
  "productos": [
    {
      "producto_id": 2,
      "cantidad": 1
    }
  ],
  "combos": [
    {
      "combo_id": 3,
      "cantidad": 2
    }
  ]
}
```

Ejemplo para cambiar solo nombre:

```json
{
  "nombre": "Ana actualizada"
}
```

Ejemplo para reemplazar solo combos y dejar productos igual:

```json
{
  "combos": [
    {
      "combo_id": 1,
      "cantidad": 2
    }
  ]
}
```

Respuesta `200`: `Pedido`.

Errores relevantes:

- `404`: `Pedido no encontrado.`
- `400`: mismas validaciones que create.
- `422`: payload invalido.

### DELETE `/api/v1/pedidos/{pedido_id}`

Respuesta `200`: `Pedido` eliminado.

Errores relevantes:

- `404`: `Pedido no encontrado.`

## Tipos Resumidos

### `ProductoResumen`

Usado dentro de categorias, ofertas y combos.

```ts
type ProductoResumen = {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio_base: string;
  url_img: string | null;
  categoria_id: number;
};
```

### `CategoriaResumen`

Usado dentro de producto.

```ts
type CategoriaResumen = {
  id: number;
  nombre: string;
  url_img: string | null;
  descripcion: string | null;
};
```

### `OfertaResumen`

Usado en `producto.oferta_actual`.

```ts
type OfertaResumen = {
  id: number;
  fecha_creacion: string;
  fecha_inicio: string;
  fecha_fin: string;
  nombre: string;
  descripcion: string | null;
  monto_descuento: string;
  imagen: string | null;
};
```

## Flujo Sugerido Para Frontend

### Catalogo publico

1. Cargar categorias: `GET /api/v1/categorias/`.
2. Cargar productos: `GET /api/v1/productos/`.
3. Cargar ofertas: `GET /api/v1/ofertas/`.
4. Cargar combos: `GET /api/v1/combos/`.
5. Mostrar `producto.oferta_actual` para badges o precio promocional.

### Carrito y pedidos

1. El carrito puede tener productos y combos.
2. Para productos, guarda `producto_id`, `cantidad` y opcionalmente `oferta_id`.
3. Para combos, guarda `combo_id` y `cantidad`.
4. Al confirmar, envia `POST /api/v1/pedidos/`.
5. Usa la respuesta del pedido como resumen final, porque el backend recalcula descuentos, subtotales y total.

### Auth basica

1. Registrar: `POST /api/v1/auth/register`.
2. Login: `POST /api/v1/auth/login` con form data.
3. Guardar `access_token`.
4. Para rutas de usuario, enviar `Authorization: Bearer <token>`.

## Scripts Utiles Para Datos Demo

Estos no son endpoints HTTP, pero ayudan para probar frontend:

```bash
docker compose exec web python -m app.cli.seed_sample_data --reset --yes
```

Esto vacia la base y carga datos demo TechShop:

- 8 categorias
- 36 productos
- 6 ofertas
- 6 combos
- 3 pedidos demo
- usuario demo `demo@orbita.local` con password `demo123`

