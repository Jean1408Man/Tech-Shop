import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  deleteProduct,
  getCategories,
  getOffers,
  getProduct,
  getProducts,
} from '../services/catalogService';

const INITIAL_CATALOG_STATE = {
  categories: [],
  products: [],
  offers: [],
  isLoading: true,
  error: '',
};

function getErrorMessage(error) {
  return error?.message || 'No pudimos cargar los datos del catalogo.';
}

export function useCatalog({ includeOffers = false } = {}) {
  const [state, setState] = useState(INITIAL_CATALOG_STATE);

  const loadCatalog = useCallback(async () => {
    setState((current) => ({
      ...current,
      isLoading: true,
      error: '',
    }));

    try {
      const [categories, products, offers] = await Promise.all([
        getCategories(),
        getProducts(),
        includeOffers ? getOffers() : Promise.resolve([]),
      ]);

      setState({
        categories,
        products,
        offers,
        isLoading: false,
        error: '',
      });
    } catch (error) {
      setState((current) => ({
        ...current,
        isLoading: false,
        error: getErrorMessage(error),
      }));
    }
  }, [includeOffers]);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  return {
    ...state,
    reload: loadCatalog,
  };
}

export function useHomeCatalog() {
  const catalog = useCatalog({ includeOffers: true });
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return catalog.products.slice(0, 8);
    }

    return catalog.products.filter((product) => product.category === selectedCategory);
  }, [catalog.products, selectedCategory]);

  return {
    ...catalog,
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
  };
}

export function useNavbarCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;

    getCategories()
      .then((nextCategories) => {
        if (isMounted) {
          setCategories(nextCategories);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCategories([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return categories;
}

export function useCategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const catalog = useCatalog();

  const category = useMemo(
    () => catalog.categories.find((item) => item.slug === String(slug)),
    [catalog.categories, slug]
  );
  const products = useMemo(
    () => catalog.products.filter((product) => product.category === String(slug)),
    [catalog.products, slug]
  );

  return {
    ...catalog,
    category,
    products,
    isReady: router.isReady,
  };
}

export function useProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProduct = useCallback(async () => {
    if (!router.isReady || !id) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      setProduct(await getProduct(id));
    } catch (loadError) {
      setProduct(null);
      setError(getErrorMessage(loadError));
    } finally {
      setIsLoading(false);
    }
  }, [id, router.isReady]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  return {
    product,
    isLoading: !router.isReady || isLoading,
    error,
    reload: loadProduct,
  };
}

export function useDeleteProduct() {
  const [isDeleting, setIsDeleting] = useState(false);

  const removeProduct = useCallback(async (productId) => {
    setIsDeleting(true);

    try {
      return await deleteProduct(productId);
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return {
    isDeleting,
    removeProduct,
  };
}
