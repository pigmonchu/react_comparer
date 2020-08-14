import React, { useState, useEffect } from 'react'

import './ProductSelector.scss'

export const ProductSelector = (props) => {
    const {products} = props
    const [productSelected, setProductSelected] = useState('');

    const handleChangeProduct = event => {
        const idProductSelected = event.target.value;
        let productSelected = products.filter(product => product.id === idProductSelected)
        setProductSelected(productSelected ? productSelected[0] : '');
    };

    return (
    
    <section className="product-selector">
        <article className="form-control">
            <label className="product-selector__name-label">Producto: </label>
            <select className="product-selector__name-values" value={ productSelected ? productSelected.id : ''} onChange={ handleChangeProduct }>
                <option value=''>Seleccione un producto</option>
                {
                    products.map(product => (
                        <option value={product.id}>{product.name}</option>
                    ))
                }
            </select>
        </article>
        <article className="form-control">
            <label className="product-selector__plan-label">Plan: </label>
            <select className="product-selector__plan-values">
                { productSelected ?
                    productSelected.plans.map(plan => (
                        <option value={plan.id}>{plan.name}</option>
                    ))
                :
                    ''
                }
            </select>
        </article>
    </section>
)}
