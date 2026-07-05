import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProduct } from "../services/catalogService";

function getErrorMessage(error) {
  return error?.message || "No pudimos cargar el producto.";
}

export function useProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProduct = useCallback(async () => {
    if (!router.isReady || !id) {
      return;
    }

    setIsLoading(true);
    setError("");

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
