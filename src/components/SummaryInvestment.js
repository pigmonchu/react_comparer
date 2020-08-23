import React, {useState} from 'react';
import {Selector} from './base/Selector'
import moment from 'moment'

import './SummaryInvestment.scss';

export const SummaryInvestment = ({plan: planSelected, initialInvestment}) => {

    const [selectedMaxBenefit, setSelectedMaxBenefit] = useState()
    const [swCompounding, setSwCompounding] = useState(false)
    moment.locale('es')
    const first_date = moment("25-08-2020", "DD-MM-YYYY");


    const handleSelector = (checked) => {
        setSelectedMaxBenefit(checked)
    }

    const handleCompounding = (checked) => {
        setSwCompounding(checked)
    }
    const renderTable = (resumen) => {
        if (resumen) {
            return (
                <section className="summary-investment">
                    <div className="summary-investment__parameters">
                        <Selector selName="interes"rightLabel={`${(planSelected.max_interest*100).toFixed(2)}%`} leftLabel={`${(planSelected.min_interest*100).toFixed(2)}%`} onSelect={handleSelector}/>
                        <Selector selName="compounding"     rightLabel="Compuesto" leftLabel="Simple" onSelect={handleCompounding}/>
                        <article className="form-control">
                            <label className="summary-investment__parameters--initial-investment-name">Inv. inicial:</label>
                            <label className="summary-investment__parameters--initial-investment-value data">{initialInvestment}</label>
                        </article>
                        <article className={`form-control ${selectedMaxBenefit ? '': 'no-v'}`}>
                            <label className="summary-investment__parameters--final-quantity-max-name">Total Final:</label>
                            <label className="summary-investment__parameters--final-quantity-max-value data">{resumen.totalMax.toFixed(8)}</label>
                        </article>
                        <article className={`form-control ${selectedMaxBenefit ? 'no-v': ''}`}>
                            <label className="summary-investment__parameters--final-quantity-min-name">Total Final:</label>
                            <label className="summary-investment__parameters--final-quantity-min-value data">{resumen.totalMin.toFixed(8)}</label>
                        </article>
                        <article className="form-control">
                            <label className="summary-investment__parameters--final-expenses-name">Licencias:</label>
                            <label className="summary-investment__parameters--final-expenses-value data">{`${resumen.licenses_quantity.toFixed(2)} ${resumen.licenses_currency}`}</label>
                        </article>
                        <article className={`form-control ${selectedMaxBenefit ? 'no-v': ''}`}>
                            <label className="summary-investment__parameters--min-final-net-name">Neto Final:</label>
                            <label className="summary-investment__parameters--min-final-net-value data">{`${resumen.final_net_min.toFixed(8)} (${(resumen.final_net_min - initialInvestment).toFixed(8)})`}</label>
                        </article>
                        <article className={`form-control ${selectedMaxBenefit ? '': 'no-v'}`}>
                            <label className="summary-investment__parameters--max-final-net-name">Neto Final:</label>
                            <label className="summary-investment__parameters--max-final-net-value data">{`${resumen.final_net_max.toFixed(8)} (${(resumen.final_net_max - initialInvestment).toFixed(8)})`}</label>
                        </article>
                    
                    </div>
                    <table className="table-summary">
                        <thead>
                            <tr>
                                <th className="table-summary__month">
                                    Mes
                                </th>
                                <th className={`table-summary__min-invest ${selectedMaxBenefit ? 'no-v': ''}`}>Min inversion</th>
                                <th className={`table-summary__max-invest ${selectedMaxBenefit ? '': 'no-v'}`}>Max inversion</th>
                                <th className={`table-summary__min-benefit ${selectedMaxBenefit ? 'no-v': ''}`}>Beneficio min.</th>
                                <th className={`table-summary__max-benefit ${selectedMaxBenefit ? '': 'no-v'}`}>Beneficio max.</th>
                                <th className={`table-summary__min-acum ${selectedMaxBenefit ? 'no-v': ''}`}>Min Acum</th>
                                <th className={`table-summary__max-acum ${selectedMaxBenefit ? '': 'no-v'}`}>Max Acum</th>
                            </tr>
                        </thead>
                        <tbody>
                        { 
                        resumen.months.map((month, ix) => (
                            <tr key={`fila${ix}`}>
                                <td key={`month${ix}`} className="table-summary__month">{first_date.add(1, 'month').format('MMM-YY')}</td>
                                <td key={`mininvest${ix}`} className={`table-summary__min-invest ${selectedMaxBenefit ? 'no-v': ''}`}>{month.min_month_investment.toFixed(8)}</td>
                                <td key={`maxinvest${ix}`} className={`table-summary__max-invest ${selectedMaxBenefit ? '': 'no-v'}`}>{month.max_month_investment.toFixed(8)}</td>
                                <td key={`minbenefit${ix}`} className={`table-summary__min-benefit ${selectedMaxBenefit ? 'no-v': ''}`}>{month.min_benefit.toFixed(8)}</td>
                                <td key={`maxbenefit${ix}`} className={`table-summary__max-benefit ${selectedMaxBenefit ? '': 'no-v'}`}>{month.max_benefit.toFixed(8)}</td>
                                <td key={`minacum${ix}`} className={`table-summary__min-acum ${selectedMaxBenefit ? 'no-v': ''}`}>{month.min_acum.toFixed(8)}</td>
                                <td key={`maxacum${ix}`} className={`table-summary__max-acum ${selectedMaxBenefit ? '': 'no-v'}`}>{month.max_acum.toFixed(8)}</td>
                            </tr>
                        ))
                        }
                            </tbody>
                    </table>

                </section>
            )
        }
    }
    

    const calculateBenefits = () => {
        if (!initialInvestment)
            return ''
        let benefits = []
        let acumMin = +initialInvestment
        let acumMax = +initialInvestment
        let roiYearMax = []
        let roiYearMin = []
        let i = 0;
        let min_month_investment, max_month_investment

        for (i=0; i<=planSelected.months; i++) {
            if (swCompounding) {
                min_month_investment = acumMin < planSelected.compounding_limit ? acumMin : +planSelected.compounding_limit
                max_month_investment = acumMax < planSelected.compounding_limit ? acumMax : +planSelected.compounding_limit
            } else {
                min_month_investment = initialInvestment < planSelected.compounding_limit ? +initialInvestment : +planSelected.compounding_limit
                max_month_investment = initialInvestment < planSelected.compounding_limit ? +initialInvestment : +planSelected.compounding_limit
            }
            const min_benefit = min_month_investment * planSelected.min_interest
            const max_benefit = max_month_investment * planSelected.max_interest
            acumMin += min_benefit
            acumMax += max_benefit
            if (i%12 === 11) {
                roiYearMax.push(acumMax)
                roiYearMin.push(acumMin)
            }
  
          const o = {
                month: i+1,
                min_month_investment: min_month_investment,
                max_month_investment: max_month_investment,
                min_benefit: min_benefit,
                max_benefit: max_benefit,
                min_acum: acumMin,
                max_acum: acumMax,
          }
          benefits.push(o)
        }
        if (i%12 !== 1) {
          roiYearMax.push(acumMax)
          roiYearMin.push(acumMin)
        }

        const totalMin = roiYearMin.slice(-1)[0]
        const totalMax = roiYearMax.slice(-1)[0]
        const licenses_quantity = planSelected.cost_year_quantity * roiYearMin.length
        const licenses_currency = planSelected.cost_year_currency

        const resumen = {
            roiYearMax: roiYearMax,
            roiYearMin: roiYearMin,
            months: benefits,
            totalMin: totalMin,
            totalMax: totalMax,
            licenses_quantity: licenses_quantity,
            licenses_currency: licenses_currency,
            final_net_min:  licenses_currency === 'BTC' ? totalMin - licenses_quantity : totalMin - licenses_quantity / 10000,
            final_net_max:  licenses_currency === 'BTC' ? totalMax - licenses_quantity : totalMax - licenses_quantity / 10000,
        }
        return resumen
    }

    if (planSelected && initialInvestment) {
        const resumen = calculateBenefits()
        console.log('resumen:', resumen)
        return renderTable(resumen)
    } else {
        return ('No hay que calcular')
    }
    /*
    */
 
}