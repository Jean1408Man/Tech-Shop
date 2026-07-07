import { getApiBaseUrl } from '../../../services/apiClient';
import ExcelJS from 'exceljs';

export const config = {
  api: {
    responseLimit: false,
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

async function fetchEntityItems(entityKey, token) {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/${entityKey}/?skip=0&limit=100`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.detail || `No se pudo obtener ${entityKey}.`);
  }

  return response.json();
}

function flattenValue(value) {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.map((item) => flattenValue(item)).join(', ');
    }

    return Object.values(value)
      .map((item) => flattenValue(item))
      .filter(Boolean)
      .join(', ');
  }

  return String(value);
}

function getExportColumns(entityKey) {
  switch (entityKey) {
    case 'categorias':
      return [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 30 },
        { header: 'URL Imagen', key: 'url_img', width: 50 },
        { header: 'Descripción', key: 'descripcion', width: 50 },
        { header: 'Categoría Padre ID', key: 'categoria_padre_id', width: 20 },
      ];
    case 'productos':
      return [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 30 },
        { header: 'Descripción', key: 'descripcion', width: 50 },
        { header: 'Precio Base', key: 'precio_base', width: 15 },
        { header: 'URL Imagen', key: 'url_img', width: 50 },
        { header: 'Categoría ID', key: 'categoria_id', width: 15 },
      ];
    case 'ofertas':
      return [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 30 },
        { header: 'Descripción', key: 'descripcion', width: 50 },
        { header: 'Monto Descuento', key: 'monto_descuento', width: 18 },
        { header: 'Fecha Inicio', key: 'fecha_inicio', width: 20 },
        { header: 'Fecha Fin', key: 'fecha_fin', width: 20 },
        { header: 'Imagen', key: 'imagen', width: 50 },
      ];
    case 'combos':
      return [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 30 },
        { header: 'Descripción', key: 'descripcion', width: 50 },
        { header: 'Precio', key: 'precio', width: 15 },
        { header: 'Imagen', key: 'imagen', width: 50 },
      ];
    case 'pedidos':
      return [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre Cliente', key: 'nombre', width: 30 },
        { header: 'Teléfono', key: 'telefono', width: 20 },
        { header: 'Total', key: 'total', width: 15 },
        { header: 'Fecha', key: 'fecha', width: 20 },
      ];
    case 'usuarios':
      return [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Email', key: 'email', width: 40 },
        { header: 'Nombre Completo', key: 'full_name', width: 30 },
        { header: 'Activo', key: 'is_active', width: 10 },
        { header: 'Rol', key: 'role', width: 15 },
      ];
    default:
      return [];
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ detail: 'Método no permitido.' });
  }

  try {
    const token = getAuthToken(req);

    if (!token) {
      return res.status(401).json({ detail: 'No autorizado.' });
    }

    await verifyAdmin(token);

    const { entity } = req.query;

    if (!entity || typeof entity !== 'string') {
      return res.status(400).json({ detail: 'Se requiere el parámetro entity.' });
    }

    const validEntities = ['productos', 'categorias', 'ofertas', 'combos', 'pedidos', 'usuarios'];

    if (!validEntities.includes(entity)) {
      return res.status(400).json({ detail: 'Entidad no válida.' });
    }

    const items = await fetchEntityItems(entity, token);
    const columns = getExportColumns(entity);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(entity);

    worksheet.columns = columns;

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4472C4' },
    };
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };

    items.forEach((item) => {
      const row = worksheet.addRow({});

      columns.forEach((column) => {
        const value = flattenValue(item[column.key]);
        row.getCell(column.key).value = value;
      });
    });

    worksheet.columns.forEach((column) => {
      column.alignment = { vertical: 'top', wrapText: true };
    });

    const timestamp = new Date().toISOString().slice(0, 10);
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${entity}_${timestamp}.xlsx"`,
    );

    await workbook.xlsx.write(res);
    res.status(200).end();
  } catch (error) {
    console.error('Error exporting XLSX:', error);
    res.status(500).json({ detail: error.message || 'Error al exportar XLSX.' });
  }
}
