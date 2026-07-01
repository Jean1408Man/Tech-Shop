import { useCallback, useEffect, useState } from 'react';
import {
  createProduct,
  deleteProduct,
  getCategories,
  getProducts,
  updateProduct,
} from '../services/catalogService';

const EMPTY_FORM = {
  name: '',
  price: '',
  categoryId: '',
  image: '',
  description: '',
};

function toFormData(product) {
  return {
    name: product.name || '',
    price: product.basePrice?.toString() || product.price?.toString() || '',
    categoryId: product.categoryId?.toString() || product.category || '',
    image: product.image || '',
    description: product.description || '',
  };
}

function getErrorMessage(error) {
  return error?.message || 'No pudimos completar la operacion.';
}

export function useProductAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const [nextCategories, nextProducts] = await Promise.all([
        getCategories(),
        getProducts(),
      ]);

      setCategories(nextCategories);
      setProducts(nextProducts);
    } catch (loadError) {
      setError(getErrorMessage(loadError));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const openCreateModal = useCallback(() => {
    setEditingProduct(null);
    setFormData(EMPTY_FORM);
    setError('');
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((product) => {
    setEditingProduct(product);
    setFormData(toFormData(product));
    setError('');
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData(EMPTY_FORM);
  }, []);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (editingProduct) {
        const updatedProduct = await updateProduct(editingProduct.id, formData);

        setProducts((current) =>
          current.map((product) =>
            product.id === editingProduct.id ? updatedProduct : product
          )
        );
      } else {
        const createdProduct = await createProduct(formData);

        setProducts((current) => [createdProduct, ...current]);
      }

      closeModal();
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  }, [closeModal, editingProduct, formData]);

  const handleDelete = useCallback(async (productId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    setError('');

    try {
      await deleteProduct(productId);
      setProducts((current) => current.filter((product) => product.id !== productId));
    } catch (deleteError) {
      setError(getErrorMessage(deleteError));
    }
  }, []);

  return {
    products,
    categories,
    formData,
    editingProduct,
    isModalOpen,
    isLoading,
    isSubmitting,
    error,
    reload: loadData,
    openCreateModal,
    openEditModal,
    closeModal,
    handleChange,
    handleSubmit,
    handleDelete,
  };
}
