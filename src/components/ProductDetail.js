import React, { useState, useEffect } from 'react'

import './ProductDetail.scss'

export const ProductDetail = ({plan: selectedPlan, onInvestmentChange: saveInvestment}) => {
    const [initialInvest, setInitialInvest] = useState(selectedPlan === -1 ? 0 : selectedPlan.min_investment_quantity)

    const handleInvest = (event) => {
        event.preventDefault()
        let initialIn = event.target.value
        setInitialInvest(initialIn)
    }

    const clickCalculate = (event) => {
        if (initialInvest < selectedPlan.min_investment_quantity) {
            alert("Inversion insuficiente")
            return
        }
        saveInvestment(initialInvest)
    }

    return (
        <section className="plan-detail">
            <article className="form-control">
                <label className="plan-detail__duration-name">Duración:</label>
                <label className="plan-detail__duration-value data">{selectedPlan !== -1 ? selectedPlan.months : ''}</label>
            </article>
            <article className="form-control">
                <label className="plan-detail__price-name">Membresía:</label>
                <label className="plan-detail__price-value data">{selectedPlan !== -1 ? `${selectedPlan.cost_year_quantity} ${selectedPlan.cost_year_currency}`: ' '}</label>
            </article>
            <article className="form-control">
                <label className="plan-detail__duration-name">Min %:</label>
                <label className="plan-detail__duration-value data">{selectedPlan !== -1 ? `${(selectedPlan.min_interest*100).toFixed(2)}%` : ''}</label>
            </article>
            <article className="form-control">
                <label className="plan-detail__price-name">Max %:</label>
                <label className="plan-detail__price-value data">{selectedPlan !== -1 ? `${(selectedPlan.max_interest*100).toFixed(2)}%`: ' '}</label>
            </article>
            <article className="form-control">
                <label className="plan-detail__min-investment-name">Min Inversión:</label>
                <label className="plan-detail__min-investment-value data">{selectedPlan !== -1 ? `${selectedPlan.min_investment_quantity} ${selectedPlan.min_investment_currency}`: ' '}</label>
            </article>
            <article className="form-control">
                <label className="plan-detail__compounding-limit-name">Max Compounding:</label>
                <label className="plan-detail__compounding-limit-value data">{selectedPlan !== -1 ? `${selectedPlan.compounding_limit}`: ' '}</label>
            </article>
            <article className="form-control">
                <label className="plan-detail__initial-capital-name">Inversión:</label>
                <input type="number" step="0.00000001" className="plan-detail__initial-capital-value" value={initialInvest} onChange={handleInvest} disabled={selectedPlan === -1}/>
            </article>
            <article className="form-control">
                <button className="plan-detail__calculate-btn" onClick={clickCalculate}>Calcular</button>
            </article>
        </section>
    )

}