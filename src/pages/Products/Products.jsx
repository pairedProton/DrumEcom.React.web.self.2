import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { productsData } from '../../constants/productsData';
import { dealData } from '../../constants/dealData';
import { comboData } from '../../constants/comboData';
import { productCategoryData } from '../../constants/productCategoryData';
import ProductCard from '../../components/ui/ProductCard';
import { HiOutlineAdjustmentsHorizontal, HiChevronDown } from 'react-icons/hi2';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  const currentProductsData = useMemo(() => {
    if (location.pathname === '/deal-of-the-day') return dealData;
    if (location.pathname === '/combo-offers') return comboData;
    return productsData;
  }, [location.pathname]);
  
  // States
  const [sortOption, setSortOption] = useState('Featured');
  
  const allCatIds = useMemo(() => productCategoryData.map(c => c.id), []);

  const selectedCategories = useMemo(() => {
    const categoriesFromUrl = searchParams.getAll('category').map(Number);
    // Logically check all categories if URL doesn't specify any filters
    return categoriesFromUrl.length > 0 ? categoriesFromUrl : allCatIds;
  }, [searchParams, allCatIds]);

  const allActiveSubCats = useMemo(() => {
    return productCategoryData
      .filter(cat => selectedCategories.includes(cat.id))
      .flatMap(cat => cat.subcategories.map(sub => sub.id));
  }, [selectedCategories]);

  const selectedSubCategories = useMemo(() => {
    const fromUrl = searchParams.getAll('subcategory').map(Number);
    return fromUrl.length > 0 ? fromUrl : allActiveSubCats;
  }, [searchParams, allActiveSubCats]);

  const toggleCategory = (catId) => {
    let newCategories = [];
    
    // Default E-commerce behavior: Unchecking an 'all' state translates to checking all elements EXCEPT the toggled element
    if (selectedCategories.length === allCatIds.length) {
       newCategories = allCatIds.filter(id => id !== catId);
    } else {
       newCategories = selectedCategories.includes(catId)
        ? selectedCategories.filter(id => id !== catId)
        : [...selectedCategories, catId];
    }
      
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('category');
    newParams.delete('subcategory'); // Reset subcategories when parent filters change
    
    // Clear the URL parameter completely if all categories end up selected again
    if (newCategories.length !== allCatIds.length && newCategories.length > 0) {
      newCategories.forEach(id => newParams.append('category', id));
    }
    
    setSearchParams(newParams);
  };

  const toggleSubCategory = (subId) => {
    let newSubCats = [];
    
    if (selectedSubCategories.length === allActiveSubCats.length) {
       newSubCats = allActiveSubCats.filter(id => id !== subId);
    } else {
       newSubCats = selectedSubCategories.includes(subId)
        ? selectedSubCategories.filter(id => id !== subId)
        : [...selectedSubCategories, subId];
    }
      
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('subcategory');
    
    if (newSubCats.length > 0 && newSubCats.length !== allActiveSubCats.length) {
       newSubCats.forEach(id => newParams.append('subcategory', id));
    }
    
    setSearchParams(newParams);
  };

  // Filter products based on selected categories
  const filteredProducts = useMemo(() => {
    let results = [...currentProductsData];

    // Filter by Category
    if (selectedCategories.length > 0) {
      results = results.filter(product => selectedCategories.includes(product.catId));
    }

    // Filter by SubCategory if specified
    if (selectedSubCategories.length > 0) {
      results = results.filter(product => selectedSubCategories.includes(product.subCatId));
    }
    
    // Sorting
    if (sortOption === 'Price: Low to High') {
      results.sort((a, b) => (a.salePrice || a.sale_price) - (b.salePrice || b.sale_price));
    } else if (sortOption === 'Price: High to Low') {
      results.sort((a, b) => (b.salePrice || b.sale_price) - (a.salePrice || a.sale_price));
    } 
    
    return results;
  }, [selectedCategories, selectedSubCategories, sortOption, currentProductsData]);

  // Count helper
  const getCategoryCount = (catId) => {
    return currentProductsData.filter(p => p.catId === catId).length;
  };

  return (
    <main className="w-full bg-[#fbf9f5] min-h-screen py-8 px-8 flex justify-center">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 flex flex-col gap-6">
          <div className="bg-[#f3ebd8] rounded-xl p-6">
            <h3 className="text-xl font-heading font-bold text-gray-800 mb-6 flex justify-between items-center">
              Category 
              {/* <HiChevronDown /> */}
            </h3>
            <ul className="flex flex-col gap-4">
              {productCategoryData.map(cat => (
                <li key={cat.id} className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id={`cat-${cat.id}`}
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => toggleCategory(cat.id)}
                      className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600 appearance-none checked:bg-emerald-600 checked:border-transparent relative after:content-['✓'] after:absolute after:text-white after:text-sm after:font-bold after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 cursor-pointer"
                    />
                    <label htmlFor={`cat-${cat.id}`} className="text-gray-700 font-medium cursor-pointer flex-1 select-none hover:text-emerald-700 transition-colors">
                      {cat.name} ({getCategoryCount(cat.id)})
                    </label>
                  </div>
                  
                  {/* Nested Subcategories */}
                  {cat.subcategories && cat.subcategories.length > 0 && selectedCategories.includes(cat.id) && (
                    <ul className="flex flex-col gap-3 pl-8 border-l-2 border-emerald-100 ml-2 mt-1 py-1">
                      {cat.subcategories.map(sub => {
                        return (
                        <li key={sub.id} className="flex items-center gap-3">
                           <input 
                            type="checkbox" 
                            id={`subcat-${sub.id}`}
                            checked={selectedSubCategories.includes(sub.id)}
                            onChange={() => toggleSubCategory(sub.id)}
                            className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600 appearance-none checked:bg-emerald-600 checked:border-transparent relative after:content-['✓'] after:absolute after:text-white after:text-[10px] after:font-bold after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 cursor-pointer"
                          />
                          <label htmlFor={`subcat-${sub.id}`} className="text-gray-600 text-[15px] font-medium cursor-pointer flex-1 select-none hover:text-emerald-700 transition-colors">
                            {sub.name}
                          </label>
                        </li>
                      )})}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* <div className="bg-[#f3ebd8] rounded-xl p-6">
            <h3 className="text-xl font-heading font-bold text-gray-800 flex justify-between items-center">
              Health Concern <HiChevronDown />
            </h3>
          </div> */}
        </aside>

        {/* Product Grid Area */}
        <section className="w-full lg:w-3/4 flex flex-col gap-6">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-transparent pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <span className="font-bold flex items-center gap-1 font-heading text-lg"><HiOutlineAdjustmentsHorizontal/> Filter:</span>
              <span className="font-bold font-heading text-lg ml-4">Sort by:</span>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent text-gray-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value="Featured">Featured</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Best Selling">Best Selling</option>
              </select>
            </div>
            <div className="text-gray-600 font-semibold font-heading text-lg">
              Showing 1–{filteredProducts.length} of {currentProductsData.length} products
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                 <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="w-full py-20 flex justify-center items-center flex-col gap-4 text-center">
              <h2 className="text-2xl font-bold text-gray-800">No products found</h2>
              <p className="text-gray-600">Try adjusting your category filters to find what you're looking for.</p>
            </div>
          )}
        </section>

      </div>
    </main>
  )
}

export default Products;