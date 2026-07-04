import { useEffect, useMemo, useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import {
  ENTITY_CONFIG,
  FORM_FIELDS,
  getInitialFormValues,
  toEntityPayload,
} from './adminConfig';

const INPUT_CLASS =
  'mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500';

function getOptionLabel(source, item) {
  if (source === 'categorias') {
    return item.nombre;
  }

  if (source === 'productos') {
    return `${item.nombre} · $${Number(item.precio_base || 0).toFixed(2)}`;
  }

  return item.nombre || item.email || `#${item.id}`;
}

function flattenCategories(categories = []) {
  const byId = new Map();

  const visit = (category) => {
    if (!category || byId.has(String(category.id))) {
      return;
    }

    byId.set(String(category.id), category);
    (category.subcategorias || []).forEach(visit);
  };

  categories.forEach(visit);
  return Array.from(byId.values());
}

function RelationPicker({ field, options, value, onChange, disabled }) {
  const selectedValues = value || [];

  return (
    <fieldset className="mt-1 max-h-52 overflow-y-auto rounded-md border border-gray-300 bg-white p-2">
      <legend className="sr-only">{field.label}</legend>
      {options.length ? (
        <div className="grid gap-1 sm:grid-cols-2">
          {options.map((option) => {
            const optionValue = String(option.id);
            const isChecked = selectedValues.includes(optionValue);

            return (
              <label
                key={option.id}
                className="flex cursor-pointer items-start gap-2 rounded px-2 py-1.5 text-sm hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={disabled}
                  onChange={() => {
                    onChange(
                      isChecked
                        ? selectedValues.filter((item) => item !== optionValue)
                        : [...selectedValues, optionValue]
                    );
                  }}
                  className="mt-0.5 accent-primary"
                />
                <span className="min-w-0 truncate">{getOptionLabel(field.source, option)}</span>
              </label>
            );
          })}
        </div>
      ) : (
        <p className="px-2 py-3 text-sm text-gray-500">No hay opciones disponibles.</p>
      )}
    </fieldset>
  );
}

function ProductOrderLines({ lines, products, offers, onChange, disabled }) {
  const updateLine = (index, field, value) => {
    onChange(
      lines.map((line, lineIndex) =>
        lineIndex === index ? { ...line, [field]: value } : line
      )
    );
  };

  const removeLine = (index) => {
    onChange(lines.filter((_, lineIndex) => lineIndex !== index));
  };

  return (
    <div className="mt-1 space-y-2">
      {lines.map((line, index) => {
        const availableOffers = offers.filter((offer) =>
          offer.productos?.some(
            (product) => String(product.id) === String(line.producto_id)
          )
        );

        return (
          <div
            key={`product-line-${index}`}
            className="grid gap-2 border-b border-gray-200 pb-3 sm:grid-cols-[minmax(0,2fr)_100px_minmax(0,1.4fr)_40px]"
          >
            <select
              value={line.producto_id}
              onChange={(event) => updateLine(index, 'producto_id', event.target.value)}
              className={INPUT_CLASS}
              disabled={disabled}
              aria-label="Producto"
            >
              <option value="">Seleccionar producto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.nombre}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={line.cantidad}
              onChange={(event) => updateLine(index, 'cantidad', event.target.value)}
              className={INPUT_CLASS}
              disabled={disabled}
              aria-label="Cantidad"
            />
            <select
              value={line.oferta_id}
              onChange={(event) => updateLine(index, 'oferta_id', event.target.value)}
              className={INPUT_CLASS}
              disabled={disabled}
              aria-label="Oferta"
            >
              <option value="">Oferta automática</option>
              {availableOffers.map((offer) => (
                <option key={offer.id} value={offer.id}>
                  {offer.nombre}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => removeLine(index)}
              className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-red-50 hover:text-red-600"
              disabled={disabled}
              aria-label="Eliminar línea de producto"
              title="Eliminar línea"
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() =>
          onChange([...lines, { producto_id: '', cantidad: 1, oferta_id: '' }])
        }
        className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        disabled={disabled}
      >
        <Plus size={16} />
        Añadir producto
      </button>
    </div>
  );
}

function ComboOrderLines({ lines, combos, onChange, disabled }) {
  const updateLine = (index, field, value) => {
    onChange(
      lines.map((line, lineIndex) =>
        lineIndex === index ? { ...line, [field]: value } : line
      )
    );
  };

  return (
    <div className="mt-1 space-y-2">
      {lines.map((line, index) => (
        <div
          key={`combo-line-${index}`}
          className="grid gap-2 border-b border-gray-200 pb-3 sm:grid-cols-[minmax(0,2fr)_100px_40px]"
        >
          <select
            value={line.combo_id}
            onChange={(event) => updateLine(index, 'combo_id', event.target.value)}
            className={INPUT_CLASS}
            disabled={disabled}
            aria-label="Combo"
          >
            <option value="">Seleccionar combo</option>
            {combos.map((combo) => (
              <option key={combo.id} value={combo.id}>
                {combo.nombre}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            value={line.cantidad}
            onChange={(event) => updateLine(index, 'cantidad', event.target.value)}
            className={INPUT_CLASS}
            disabled={disabled}
            aria-label="Cantidad"
          />
          <button
            type="button"
            onClick={() =>
              onChange(lines.filter((_, lineIndex) => lineIndex !== index))
            }
            className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-red-50 hover:text-red-600"
            disabled={disabled}
            aria-label="Eliminar línea de combo"
            title="Eliminar línea"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...lines, { combo_id: '', cantidad: 1 }])}
        className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        disabled={disabled}
      >
        <Plus size={16} />
        Añadir combo
      </button>
    </div>
  );
}

export default function AdminEntityForm({
  entityKey,
  entities,
  error,
  isAdmin,
  isSaving,
  item,
  onClose,
  onSave,
  user,
}) {
  const [values, setValues] = useState(() => getInitialFormValues(entityKey, item));
  const [localError, setLocalError] = useState('');
  const isEditing = Boolean(item);
  const config = ENTITY_CONFIG[entityKey];
  const fields = FORM_FIELDS[entityKey];
  const allCategories = useMemo(
    () => flattenCategories(entities.categorias),
    [entities.categorias]
  );

  useEffect(() => {
    setValues(getInitialFormValues(entityKey, item));
    setLocalError('');
  }, [entityKey, item]);

  const isEditingAnotherUser = useMemo(
    () =>
      entityKey === 'usuarios' &&
      isEditing &&
      Number(item?.id) !== Number(user?.id),
    [entityKey, isEditing, item?.id, user?.id]
  );

  const setFieldValue = (name, value) => {
    setValues((current) => ({
      ...current,
      [name]: value,
      ...(entityKey === 'productos' && name === 'categoria_id'
        ? { subcategoria_id: '' }
        : {}),
    }));
  };

  const getFieldOptions = (field) => {
    const sourceOptions =
      field.source === 'categorias'
        ? allCategories
        : entities[field.source] || [];

    return sourceOptions.filter((option) => {
      if (field.rootCategoriesOnly && option.categoria_padre_id) {
        return false;
      }

      if (field.excludeCurrent && String(option.id) === String(item?.id)) {
        return false;
      }

      if (
        field.childOfField &&
        String(option.categoria_padre_id || '') !==
          String(values[field.childOfField] || '')
      ) {
        return false;
      }

      return true;
    });
  };

  const isFieldDisabled = (field) => {
    if (isSaving) {
      return true;
    }

    if (entityKey !== 'usuarios') {
      if (
        entityKey === 'productos' &&
        field.name === 'subcategoria_id' &&
        !values.categoria_id
      ) {
        return true;
      }

      if (
        entityKey === 'categorias' &&
        field.name === 'categoria_padre_id' &&
        item?.subcategorias?.length
      ) {
        return true;
      }

      return false;
    }

    if (field.name === 'role') {
      return !isAdmin;
    }

    return isEditingAnotherUser && ['email', 'full_name', 'is_active'].includes(field.name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      entityKey === 'pedidos' &&
      !values.productos.some((line) => line.producto_id) &&
      !values.combos.some((line) => line.combo_id)
    ) {
      setLocalError('El pedido debe incluir al menos un producto o un combo.');
      return;
    }

    setLocalError('');
    const didSave = await onSave(
      toEntityPayload(entityKey, values, isEditing),
      item
    );

    if (didSave) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
        aria-label="Cerrar formulario"
      />
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? 'Editar' : 'Crear'} {config.singular.toLowerCase()}
            </h2>
            <p className="mt-1 text-sm text-gray-500">{config.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="grid min-h-0 flex-1 gap-4 overflow-y-auto p-5 sm:grid-cols-2">
            {(localError || error) && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 sm:col-span-2">
                {localError || error}
              </div>
            )}

            {entityKey === 'usuarios' && isEditingAnotherUser && (
              <p className="rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-600 sm:col-span-2">
                La API solo permite modificar datos personales del usuario actual. Para otros usuarios se gestiona el rol.
              </p>
            )}

            {fields.map((field) => {
              if (field.createOnly && isEditing) {
                return null;
              }

              const disabled = isFieldDisabled(field);
              const required = field.required || (!isEditing && field.requiredOnCreate);
              const className = field.fullWidth ? 'sm:col-span-2' : '';

              if (field.type === 'checkbox') {
                return (
                  <label key={field.name} className={`flex items-center gap-3 ${className}`}>
                    <input
                      type="checkbox"
                      checked={Boolean(values[field.name])}
                      onChange={(event) => setFieldValue(field.name, event.target.checked)}
                      disabled={disabled}
                      className="h-4 w-4 accent-primary"
                    />
                    <span className="text-sm font-semibold text-gray-700">{field.label}</span>
                  </label>
                );
              }

              if (field.type === 'multiselect') {
                return (
                  <div key={field.name} className={`block ${className}`}>
                    <span className="text-sm font-semibold text-gray-700">
                      {field.label} ({values[field.name]?.length || 0})
                    </span>
                    <RelationPicker
                      field={field}
                      options={entities[field.source] || []}
                      value={values[field.name]}
                      onChange={(value) => setFieldValue(field.name, value)}
                      disabled={disabled}
                    />
                  </div>
                );
              }

              if (field.type === 'order-products') {
                return (
                  <div key={field.name} className={className}>
                    <p className="text-sm font-semibold text-gray-700">{field.label}</p>
                    <ProductOrderLines
                      lines={values.productos}
                      products={entities.productos}
                      offers={entities.ofertas}
                      onChange={(value) => setFieldValue('productos', value)}
                      disabled={disabled}
                    />
                  </div>
                );
              }

              if (field.type === 'order-combos') {
                return (
                  <div key={field.name} className={className}>
                    <p className="text-sm font-semibold text-gray-700">{field.label}</p>
                    <ComboOrderLines
                      lines={values.combos}
                      combos={entities.combos}
                      onChange={(value) => setFieldValue('combos', value)}
                      disabled={disabled}
                    />
                  </div>
                );
              }

              if (field.type === 'role') {
                return (
                  <label key={field.name} className={`block ${className}`}>
                    <span className="text-sm font-semibold text-gray-700">{field.label}</span>
                    <select
                      value={values[field.name]}
                      onChange={(event) => setFieldValue(field.name, event.target.value)}
                      className={INPUT_CLASS}
                      required={required}
                      disabled={disabled}
                    >
                      <option value="cliente">Cliente</option>
                      <option value="gestor">Gestor</option>
                      <option value="administrador">Administrador</option>
                    </select>
                  </label>
                );
              }

              if (field.type === 'select') {
                const options = getFieldOptions(field);

                return (
                  <label key={field.name} className={`block ${className}`}>
                    <span className="text-sm font-semibold text-gray-700">{field.label}</span>
                    <select
                      value={values[field.name]}
                      onChange={(event) => setFieldValue(field.name, event.target.value)}
                      className={INPUT_CLASS}
                      required={required}
                      disabled={disabled}
                    >
                      <option value="">
                        {field.emptyLabel || 'Seleccionar'}
                      </option>
                      {options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {getOptionLabel(field.source, option)}
                        </option>
                      ))}
                    </select>
                    {field.helpText && (
                      <span className="mt-1 block text-xs text-gray-500">
                        {entityKey === 'categorias' &&
                        field.name === 'categoria_padre_id' &&
                        item?.subcategorias?.length
                          ? 'Esta categoría ya tiene subcategorías y debe permanecer como categoría principal.'
                          : field.helpText}
                      </span>
                    )}
                  </label>
                );
              }

              return (
                <label key={field.name} className={`block ${className}`}>
                  <span className="text-sm font-semibold text-gray-700">{field.label}</span>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={values[field.name]}
                      onChange={(event) => setFieldValue(field.name, event.target.value)}
                      className={INPUT_CLASS}
                      rows="4"
                      required={required}
                      disabled={disabled}
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={values[field.name]}
                      onChange={(event) => setFieldValue(field.name, event.target.value)}
                      className={INPUT_CLASS}
                      min={field.min}
                      step={field.step}
                      required={required}
                      disabled={disabled}
                    />
                  )}
                </label>
              );
            })}
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-gray-200 px-5 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              disabled={isSaving}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaving}
            >
              {isSaving ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
