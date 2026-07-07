import multer from 'multer';
import parseXlsx from 'excel';
import { getApiBaseUrl } from '../../../services/apiClient';
import fs from 'fs';
import path from 'path';
import os from 'os';

const upload = multer({
  dest: os.tmpdir(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/octet-stream',
    ];
    const allowedExtensions = ['.xlsx'];

    const hasValidExtension = allowedExtensions.some((ext) =>
      file.originalname.toLowerCase().endsWith(ext),
    );

    if (hasValidExtension || allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos XLSX.'));
    }
  },
});

const uploadMiddleware = upload.single('file');

export const config = {
  api: {
    bodyParser: false,
  },
};

function getAuthToken(req) {
  const header = req.headers.authorization || '';
  const match = header.match(/^Bearer\s+(.+)$/i);

  return match ? match[1].trim() : '';
}

async function verifyAdmin(token) {
  const response = await fetch(`${getApiBaseUrl()}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.detail || 'Token inválido o expirado.');
  }

  const user = await response.json();

  if (user.role !== 'administrador') {
    throw new Error('Se requiere rol de administrador.');
  }

  return user;
}

function transformRowToPayload(entity, row) {
  const cleanRow = Object.fromEntries(
    Object.entries(row).map(([key, value]) => [
      key,
      value === null || value === undefined ? '' : value,
    ]),
  );

  switch (entity) {
    case 'categorias':
      return {
        nombre: String(cleanRow.nombre || cleanRow.Nombre || ''),
        url_img: String(cleanRow.url_img || cleanRow['URL Imagen'] || ''),
        descripcion: String(cleanRow.descripcion || cleanRow.Descripción || ''),
        categoria_padre_id: cleanRow['Categoría Padre ID'] || cleanRow.categoria_padre_id
          ? Number(cleanRow['Categoría Padre ID'] || cleanRow.categoria_padre_id)
          : null,
      };
    case 'productos':
      return {
        nombre: String(cleanRow.nombre || cleanRow.Nombre || ''),
        descripcion: String(cleanRow.descripcion || cleanRow.Descripción || ''),
        precio_base: String(cleanRow.precio_base || cleanRow['Precio Base'] || '0'),
        url_img: String(cleanRow.url_img || cleanRow['URL Imagen'] || ''),
        categoria_id: Number(cleanRow.categoria_id || cleanRow['Categoría ID'] || 0),
      };
    case 'ofertas':
      return {
        nombre: String(cleanRow.nombre || cleanRow.Nombre || ''),
        descripcion: String(cleanRow.descripcion || cleanRow.Descripción || ''),
        monto_descuento: String(cleanRow.monto_descuento || cleanRow['Monto Descuento'] || '0'),
        fecha_inicio: String(cleanRow.fecha_inicio || cleanRow['Fecha Inicio'] || new Date().toISOString()),
        fecha_fin: String(cleanRow.fecha_fin || cleanRow['Fecha Fin'] || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()),
        imagen: String(cleanRow.imagen || cleanRow.Imagen || ''),
        producto_ids: cleanRow.producto_ids || cleanRow['Producto IDs']
          ? String(cleanRow.producto_ids || cleanRow['Producto IDs'])
              .split(',')
              .map((id) => Number(id.trim()))
              .filter(Boolean)
          : [],
      };
    case 'combos':
      return {
        nombre: String(cleanRow.nombre || cleanRow.Nombre || ''),
        descripcion: String(cleanRow.descripcion || cleanRow.Descripción || ''),
        precio: String(cleanRow.precio || cleanRow.Precio || '0'),
        imagen: String(cleanRow.imagen || cleanRow.Imagen || ''),
        producto_ids: cleanRow.producto_ids || cleanRow['Producto IDs']
          ? String(cleanRow.producto_ids || cleanRow['Producto IDs'])
              .split(',')
              .map((id) => Number(id.trim()))
              .filter(Boolean)
          : [],
      };
    case 'pedidos':
      return {
        nombre: String(cleanRow.nombre || cleanRow['Nombre Cliente'] || ''),
        telefono: String(cleanRow.telefono || cleanRow.Teléfono || ''),
        productos: cleanRow.productos || cleanRow.Productos
          ? JSON.parse(String(cleanRow.productos || cleanRow.Productos))
          : [],
        combos: cleanRow.combos || cleanRow.Combos
          ? JSON.parse(String(cleanRow.combos || cleanRow.Combos))
          : [],
      };
    case 'usuarios':
      return {
        email: String(cleanRow.email || cleanRow.Email || ''),
        full_name: String(cleanRow.full_name || cleanRow['Nombre Completo'] || ''),
        password: String(cleanRow.password || cleanRow.Contraseña || 'temp123456'),
        is_active:
          cleanRow.is_active === 'true' ||
          cleanRow['Activo'] === 'true' ||
          cleanRow.is_active === true ||
          cleanRow['Activo'] === true,
        role: String(cleanRow.role || cleanRow.Rol || 'cliente'),
      };
    default:
      return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ detail: 'Método no permitido.' });
  }

  return new Promise((resolve, reject) => {
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ detail: err.message || 'Error al procesar el archivo.' });
      }

      try {
        const token = getAuthToken(req);

        if (!token) {
          return res.status(401).json({ detail: 'No autorizado.' });
        }

        await verifyAdmin(token);

        const entity = req.body.entity;

        if (!entity || typeof entity !== 'string') {
          return res.status(400).json({ detail: 'Se requiere el parámetro entity.' });
        }

        const validEntities = ['productos', 'categorias', 'ofertas', 'combos', 'pedidos', 'usuarios'];

        if (!validEntities.includes(entity)) {
          return res.status(400).json({ detail: 'Entidad no válida.' });
        }

        if (!req.file) {
          return res.status(400).json({ detail: 'No se proporcionó archivo.' });
        }

        const data = await parseXlsx(req.file.path);

        if (!data || data.length < 2) {
          fs.unlinkSync(req.file.path);
          return res.status(400).json({ detail: 'El archivo está vacío o no tiene datos.' });
        }

        const headers = data[0];
        const rows = data.slice(1);

        const baseUrl = getApiBaseUrl();
        const results = [];

        for (const row of rows) {
          const rowData = {};
          headers.forEach((header, index) => {
            rowData[header] = row[index];
          });

          const payload = transformRowToPayload(entity, rowData);

          if (!payload) {
            results.push({
              success: false,
              error: 'Datos inválidos o incompletos.',
              data: rowData,
            });
            continue;
          }

          try {
            const createResponse = await fetch(`${baseUrl}/${entity}/`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });

            if (createResponse.ok) {
              const created = await createResponse.json();
              results.push({ success: true, data: created });
            } else {
              const error = await createResponse.json().catch(() => null);
              results.push({
                success: false,
                error: error?.detail || createResponse.statusText,
                data: rowData,
              });
            }
          } catch (createError) {
            results.push({
              success: false,
              error: createError.message,
              data: rowData,
            });
          }
        }

        fs.unlinkSync(req.file.path);

        const successCount = results.filter((r) => r.success).length;
        const failCount = results.filter((r) => !r.success).length;

        res.status(200).json({
          detail: `Importación completada: ${successCount} exitosos, ${failCount} fallidos.`,
          results,
        });
        resolve();
      } catch (error) {
        if (req.file?.path && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }

        console.error('Error importing XLSX:', error);
        res.status(500).json({ detail: error.message || 'Error al importar XLSX.' });
        reject(error);
      }
    });
  });
}
