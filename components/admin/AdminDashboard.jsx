import { useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Menu,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAdminDashboard } from '../../hooks/useAdminDashboard';
import AdminEntityForm from './AdminEntityForm';
import AdminEntityDetail from './AdminEntityDetail';
import AdminEntityTable from './AdminEntityTable';
import AdminSidebar from './AdminSidebar';
import {
  ENTITY_CONFIG,
  ENTITY_KEYS,
  matchesEntitySearch,
} from './adminConfig';

function DeleteConfirmation({ entityKey, isSaving, item, onCancel, onConfirm }) {
  const label = item?.nombre || item?.email || `#${item?.id}`;

  return (
    <div className="fixed inset-0 z-[1250] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/45"
        onClick={onCancel}
        aria-label="Cancelar eliminación"
      />
      <div className="relative w-full max-w-md rounded-lg bg-white p-5 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
            <Trash2 size={19} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Eliminar {ENTITY_CONFIG[entityKey].singular.toLowerCase()}</h2>
            <p className="mt-1 text-sm text-gray-600">
              Se eliminará <span className="font-semibold">{label}</span>. Esta acción no se puede deshacer.
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            disabled={isSaving}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            disabled={isSaving}
          >
            {isSaving ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { token, user, isAdmin, role } = useAuth();
  const {
    entities,
    isLoading,
    isSaving,
    isDetailLoading,
    isExporting,
    error,
    notice,
    reload,
    saveEntity,
    removeEntity,
    loadEntityDetail,
    exportOrderPdf,
    clearMessages,
  } = useAdminDashboard({ token, user, isAdmin });
  const [activeEntity, setActiveEntity] = useState('productos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const config = ENTITY_CONFIG[activeEntity];
  const activeItems = entities[activeEntity] || [];
  const filteredItems = useMemo(
    () => activeItems.filter((item) => matchesEntitySearch(item, searchQuery)),
    [activeItems, searchQuery]
  );
  const counts = useMemo(
    () =>
      Object.fromEntries(
        ENTITY_KEYS.map((entityKey) => [entityKey, entities[entityKey]?.length || 0])
      ),
    [entities]
  );

  const selectEntity = (entityKey) => {
    setActiveEntity(entityKey);
    setSearchQuery('');
    setEditingItem(null);
    setIsFormOpen(false);
    setDetailItem(null);
    setIsDetailOpen(false);
    clearMessages();
  };

  const openCreateForm = () => {
    setEditingItem(null);
    setIsFormOpen(true);
    clearMessages();
  };

  const openEditForm = (item) => {
    setEditingItem(item);
    setIsFormOpen(true);
    clearMessages();
  };

  const openDetail = async (item) => {
    setDetailItem(item);
    setIsDetailOpen(true);
    clearMessages();

    const detailedItem = await loadEntityDetail(activeEntity, item.id);

    if (detailedItem) {
      setDetailItem(detailedItem);
    }
  };

  const editFromDetail = (item) => {
    setIsDetailOpen(false);
    setDetailItem(null);
    openEditForm(item);
  };

  const handleSave = (payload, item) => saveEntity(activeEntity, payload, item);

  const confirmDelete = async () => {
    const didDelete = await removeEntity(activeEntity, deletingItem);

    if (didDelete) {
      setDeletingItem(null);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-6rem)] bg-gray-100">
      <AdminSidebar
        activeEntity={activeEntity}
        counts={counts}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelect={selectEntity}
        role={role}
      />

      <main className="min-w-0 flex-1">
        <header className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 lg:hidden"
                aria-label="Abrir menú"
              >
                <Menu size={20} />
              </button>
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-gray-900">{config.label}</h1>
                <p className="mt-1 text-sm text-gray-500">{config.description}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={reload}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-gray-300 px-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                title="Actualizar datos"
              >
                <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                Actualizar
              </button>
              <button
                type="button"
                onClick={openCreateForm}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-dark"
              >
                <Plus size={17} />
                Nuevo {config.singular.toLowerCase()}
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          {error && !isFormOpen && (
            <div className="mb-4 flex items-start gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {notice && (
            <div className="mb-4 flex items-start gap-3 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              <span>{notice}</span>
            </div>
          )}

          <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-md">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={`Buscar en ${config.label.toLowerCase()}`}
                  className="h-10 w-full rounded-md border border-gray-300 pl-10 pr-3 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <p className="text-sm text-gray-500">
                {filteredItems.length} de {activeItems.length} registros
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center gap-2 border-t border-gray-200 px-6 py-16 text-sm text-gray-500">
                <RefreshCw size={18} className="animate-spin" />
                Cargando datos...
              </div>
            ) : (
              <AdminEntityTable
                entityKey={activeEntity}
                items={filteredItems}
                onDelete={setDeletingItem}
                onEdit={openEditForm}
                onView={openDetail}
              />
            )}
          </section>
        </div>
      </main>

      {isFormOpen && (
        <AdminEntityForm
          entityKey={activeEntity}
          entities={entities}
          error={error}
          isAdmin={isAdmin}
          isSaving={isSaving}
          item={editingItem}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
          user={user}
        />
      )}

      {isDetailOpen && (
        <AdminEntityDetail
          entityKey={activeEntity}
          error={error}
          isExporting={isExporting}
          isLoading={isDetailLoading}
          item={detailItem}
          onClose={() => {
            setIsDetailOpen(false);
            setDetailItem(null);
          }}
          onEdit={editFromDetail}
          onExportPdf={exportOrderPdf}
        />
      )}

      {deletingItem && (
        <DeleteConfirmation
          entityKey={activeEntity}
          isSaving={isSaving}
          item={deletingItem}
          onCancel={() => setDeletingItem(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
