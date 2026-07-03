import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  deleteProduct,
  getCategories,
  getCombo,
  getCombos,
  getOffers,
  getProduct,
  getProducts,
  searchProducts,
} from '../services/catalogService';

const INITIAL_CATALOG_STATE = {
  categories: [],
  products: [],
  offers: [],
  combos: [],
  isLoading: true,
  error: '',
};

function getErrorMessage(error) {
  return error?.message || 'No pudimos cargar los datos del catalogo.';
}

function getQueryValue(value) {
  if (Array.isArray(value)) {
    return value[0] || '';
  }

  return value || '';
}

export function useCatalog({ includeOffers = false, includeCombos = false } = {}) {
  const [state, setState] = useState(INITIAL_CATALOG_STATE);

  const loadCatalog = useCallback(async () => {
    setState((current) => ({
      ...current,
      isLoading: true,
      error: '',
    }));

    try {
      const [categories, products, offers, combos] = await Promise.all([
        getCategories(),
        getProducts(),
        includeOffers ? getOffers() : Promise.resolve([]),
        includeCombos ? getCombos() : Promise.resolve([]),
      ]);

      setState({
        categories,
        products,
        offers,
        combos,
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
  }, [includeCombos, includeOffers]);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  return {
    ...state,
    reload: loadCatalog,
  };
}

export function useHomeCatalog() {
  const catalog = useCatalog({ includeOffers: true, includeCombos: true });
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

export function useCombosPage() {
  const [combos, setCombos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCombos = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      setCombos(await getCombos());
    } catch (loadError) {
      setCombos([]);
      setError(getErrorMessage(loadError));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCombos();
  }, [loadCombos]);

  return {
    combos,
    isLoading,
    error,
    reload: loadCombos,
  };
}

export function useComboPage() {
  const router = useRouter();
  const { id } = router.query;
  const [combo, setCombo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCombo = useCallback(async () => {
    if (!router.isReady || !id) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      setCombo(await getCombo(id));
    } catch (loadError) {
      setCombo(null);
      setError(getErrorMessage(loadError));
    } finally {
      setIsLoading(false);
    }
  }, [id, router.isReady]);

  useEffect(() => {
    loadCombo();
  }, [loadCombo]);

  return {
    combo,
    isLoading: !router.isReady || isLoading,
    error,
    reload: loadCombo,
  };
}

export function useProductSearch() {
  const router = useRouter();
  const query = getQueryValue(router.query.q).trim();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = useCallback(async () => {
    if (!router.isReady) {
      return;
    }

    if (!query) {
      setProducts([]);
      setIsLoading(false);
      setError('');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      setProducts(await searchProducts(query));
    } catch (searchError) {
      setProducts([]);
      setError(getErrorMessage(searchError));
    } finally {
      setIsLoading(false);
    }
  }, [query, router.isReady]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    query,
    isLoading,
    error,
    reload: loadProducts,
    hasQuery: Boolean(query),
    isReady: router.isReady,
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
