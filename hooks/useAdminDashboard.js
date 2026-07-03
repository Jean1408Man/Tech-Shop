import { useCallback, useEffect, useState } from 'react';
import { ENTITY_CONFIG, ENTITY_KEYS } from '../components/admin/adminConfig';
import {
  createAdminEntity,
  deleteAdminEntity,
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

  return {
    entities,
    isLoading,
    isSaving,
    error,
    notice,
    reload: loadAll,
    saveEntity,
    removeEntity,
    clearMessages: () => {
      setError('');
      setNotice('');
    },
  };
}
