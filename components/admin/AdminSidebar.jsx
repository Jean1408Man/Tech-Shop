import {
  BadgePercent,
  Boxes,
  Package,
  ReceiptText,
  Tags,
  Users,
  X,
} from 'lucide-react';
import { ENTITY_CONFIG, ENTITY_KEYS } from './adminConfig';

const ENTITY_ICONS = {
  productos: Package,
  categorias: Tags,
  ofertas: BadgePercent,
  combos: Boxes,
  pedidos: ReceiptText,
  usuarios: Users,
};

function SidebarContent({ activeEntity, counts, onClose, onSelect, role }) {
  return (
    <>
      <div className="flex h-14 sm:h-16 items-center justify-between border-b border-gray-200 px-3 sm:px-4">
        <div>
          <p className="text-sm font-bold text-gray-900">Administración</p>
          <p className="text-xs text-gray-500">Gestión operativa</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
          aria-label="Cerrar menú"
        >
          <X size={18} sm:size={19} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-2 sm:p-3" aria-label="Entidades administrativas">
        {ENTITY_KEYS.map((entityKey) => {
          const Icon = ENTITY_ICONS[entityKey];
          const isActive = activeEntity === entityKey;

          return (
            <button
              key={entityKey}
              type="button"
              onClick={() => {
                onSelect(entityKey);
                onClose();
              }}
              className={`flex w-full items-center gap-2 sm:gap-3 rounded-md px-2.5 sm:px-3 py-2 text-left text-xs sm:text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={16} sm:size={18} />
              <span className="flex-1">{ENTITY_CONFIG[entityKey].label}</span>
              <span
                className={`min-w-6 sm:min-w-7 rounded px-1 sm:px-1.5 py-0.5 text-center text-xs ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {counts[entityKey] || 0}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-3 sm:p-4">
        <p className="text-xs text-gray-500">Sesión con permisos</p>
        <p className="mt-1 text-xs sm:text-sm font-semibold capitalize text-gray-800">{role}</p>
      </div>
    </>
  );
}

export default function AdminSidebar(props) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white lg:flex lg:flex-col">
        <SidebarContent {...props} />
      </aside>

      {props.isOpen && (
        <div className="fixed inset-0 z-[1100] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={props.onClose}
            aria-label="Cerrar menú"
          />
          <aside className="relative flex h-full w-72 flex-col bg-white shadow-xl">
            <SidebarContent {...props} />
          </aside>
        </div>
      )}
    </>
  );
}
