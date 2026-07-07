import { useCallback, useEffect, useState } from 'react';
import { ENTITY_CONFIG, ENTITY_KEYS } from '../components/admin/adminConfig';
import {
  createAdminEntity,
  deleteAdminEntity,
  downloadOrderPdf,
  getAdminEntity,
  listAdminEntity,
  updateAdminEntity,
} from '../services/adminService';

const EMPTY_ENTITIES = Object.fromEntries(ENTITY_KEYS.map((key) => [key, []]));

function getErrorMessage(error) {
  return error?.message || 'No pudimos completar la operación.';
}

export function useAdminDashboard({ token, user, isAdmin }) {
  const [entities, setEntities] = useState(EMPTY_ENTITIES);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const loadAll = useCallback(async () => {
    if (!token) {
      return;
    }

    setIsLoading(true);
    setError('');

    const results = await Promise.allSettled(
      ENTITY_KEYS.map((entityKey) => listAdminEntity(entityKey, token))
    );
    const nextEntities = { ...EMPTY_ENTITIES };
    const failedEntities = [];

    results.forEach((result, index) => {
      const entityKey = ENTITY_KEYS[index];

      if (result.status === 'fulfilled') {
        nextEntities[entityKey] = Array.isArray(result.value) ? result.value : [];
      } else {
        failedEntities.push(ENTITY_CONFIG[entityKey].label);
      }
    });

    setEntities(nextEntities);

    if (failedEntities.length) {
      setError(`No se pudieron cargar: ${failedEntities.join(', ')}.`);
    }

    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const saveEntity = useCallback(
    async (entityKey, payload, editingItem = null) => {
      setIsSaving(true);
      setError('');
      setNotice('');

      try {
        const context = {
          currentUserId: user?.id,
          isAdmin,
        };

        if (editingItem) {
          await updateAdminEntity(
            entityKey,
            editingItem.id,
            payload,
            token,
            context
          );
        } else {
          await createAdminEntity(entityKey, payload, token, context);
        }

        setNotice(
          `Se ${editingItem ? 'actualizó' : 'creó'} ${ENTITY_CONFIG[
            entityKey
          ].singular.toLowerCase()} correctamente.`
        );
        await loadAll();
        return true;
      } catch (saveError) {
        setError(getErrorMessage(saveError));
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [isAdmin, loadAll, token, user?.id]
  );

  const removeEntity = useCallback(
    async (entityKey, item) => {
      setIsSaving(true);
      setError('');
      setNotice('');

      try {
        await deleteAdminEntity(entityKey, item.id, token);
        setNotice(
          `Se eliminó ${ENTITY_CONFIG[entityKey].singular.toLowerCase()} correctamente.`
        );
        await loadAll();
        return true;
      } catch (deleteError) {
        setError(getErrorMessage(deleteError));
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [loadAll, token]
  );

  const loadEntityDetail = useCallback(
    async (entityKey, entityId) => {
      setIsDetailLoading(true);
      setError('');

      try {
        return await getAdminEntity(entityKey, entityId, token);
      } catch (detailError) {
        setError(getErrorMessage(detailError));
        return null;
      } finally {
        setIsDetailLoading(false);
      }
    },
    [token]
  );

  const exportOrderPdf = useCallback(
    async (orderId) => {
      setIsExporting(true);
      setError('');

      try {
        await downloadOrderPdf(orderId, token);
        setNotice(`Se descargó el PDF del pedido #${orderId}.`);
        return true;
      } catch (exportError) {
        setError(getErrorMessage(exportError));
        return false;
      } finally {
        setIsExporting(false);
      }
    },
    [token]
  );

  const exportToXlsx = useCallback(
    async (entityKey) => {
      setIsExporting(true);
      setError('');
      setNotice('');

      try {
        const response = await fetch(`/api/admin/export-xlsx?entity=${entityKey}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.detail || `Error al exportar ${entityKey}.`);
        }

        const blob = await response.blob();
        const disposition = response.headers.get('Content-Disposition');
        const filename =
          disposition?.match(/filename="?([^";]+)"?/i)?.[1] ||
          `${entityKey}_${new Date().toISOString().slice(0, 10)}.xlsx`;
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = objectUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(objectUrl), 0);

        setNotice(`Se exportó ${ENTITY_CONFIG[entityKey].label} a XLSX correctamente.`);
        return true;
      } catch (exportError) {
        setError(getErrorMessage(exportError));
        return false;
      } finally {
        setIsExporting(false);
      }
    },
    [token]
  );

  const importFromXlsx = useCallback(
    async (entityKey, file) => {
      setIsImporting(true);
      setError('');
      setNotice('');

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('entity', entityKey);

        const response = await fetch('/api/admin/import-xlsx', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.detail || `Error al importar ${entityKey}.`);
        }

        const successCount = result.results?.filter((r) => r.success).length || 0;
        const failCount = result.results?.filter((r) => !r.success).length || 0;

        setNotice(
          `Importación completada: ${successCount} exitosos, ${failCount} fallidos.`
        );

        await loadAll();
        return result;
      } catch (importError) {
        setError(getErrorMessage(importError));
        return null;
      } finally {
        setIsImporting(false);
      }
    },
    [loadAll, token]
  );

  return {
    entities,
    isLoading,
    isSaving,
    isDetailLoading,
    isExporting,
    isImporting,
    error,
    notice,
    reload: loadAll,
    saveEntity,
    removeEntity,
    loadEntityDetail,
    exportOrderPdf,
    exportToXlsx,
    importFromXlsx,
    clearMessages: () => {
      setError('');
      setNotice('');
    },
  };
}
