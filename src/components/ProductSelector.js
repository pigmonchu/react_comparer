import React, { useState } from 'react'

import './ProductSelector.scss'

export const ProductSelector = (props) => {
    const {products} = props
    const [productSelected, setProductSelected] = useState('');
    const [planSelected, setPlanSelected] = useState('')

    const handleChangeProduct = event => {
        const {onSelect} = props
        event.preventDefault()
        const idProductSelected = event.target.value;
        let productSelected = products.filter(product => product.id === idProductSelected)
        setProductSelected(productSelected ? productSelected[0] : '');
        onSelect('')
    }

    const handleChangePlan = event => {
        event.preventDefault()
        const {onSelect} = props
        const idPlanSelected = event.target.value
        let newPlan = productSelected.plans.filter(plan => plan.id === idPlanSelected)
        newPlan = newPlan ? newPlan[0] : -1
        console.log("puto plan selected", newPlan)
        setPlanSelected(newPlan)
        onSelect(newPlan)
    }

    return (
    
    <section className="product-selector">
        <article className="form-control">
            <label className="product-selector__name-label">Producto: </label>
            <select className="product-selector__name-values" value={ productSelected ? productSelected.id : ''} onChange={ handleChangeProduct }>
                <option value='-1'>Seleccione un producto</option>
                {
                    products.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                    ))
                }
            </select>
        </article>
        <article className="form-control">
            <label className="product-selector__plan-label">Plan: </label>
            <select className="product-selector__plan-values" value={planSelected ? planSelected.id : ''} onChange={handleChangePlan}>
            <option value='-1'>Seleccione un plan</option>
                { productSelected ?
                    productSelected.plans.map(plan => (
                        <option key={plan.id} value={plan.id}>{plan.name}</option>
                    ))
                :
                    ''
                }
            </select>
        </article>
    </section>
)}
