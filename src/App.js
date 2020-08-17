import React, { useState } from 'react';
import './App.scss';

import { Layout } from './components/base/Layout'
import { ProductSelector } from './components/ProductSelector';
import { ProductDetail } from './components/ProductDetail';
import { SummaryInvestment} from './components/SummaryInvestment'

const products = [
  {
      id: "arbistar",
      name: "Club Arbistar",
      plans: [
          {
              id: "basic",
              name: "BASIC",
              months: 12,
              min_investment_quantity: 0.1,
              min_investment_currency: 'BTC',
              compounding_limit: 1,
              min_interest: 0.053,
              max_interest: 0.06,
              cost_year_quantity: 0.02,
              cost_year_currency: 'BTC'
          },
          {
              id: "partner",
              name: "PARTNER",
              months: 24,
              min_investment_quantity: 0.2,
              min_investment_currency: 'BTC',
              compounding_limit: 3,
              min_interest: 0.0655,
              max_interest: 0.0725,
              cost_year_quantity: 0.05,
              cost_year_currency: 'BTC'
          },
          {
              id: "executive",
              name: "EXECUTIVE",
              months: 36,
              min_investment_quantity: 0.5,
              min_investment_currency: 'BTC',
              compounding_limit: 10,
              min_interest: 0.077,
              max_interest: 0.085,
              cost_year_quantity: 0.1,
              cost_year_currency: 'BTC'
          },
          {
              id: "privilege",
              name: "PRIVILEGE",
              months: 48,
              min_investment_quantity: 1,
              min_investment_currency: 'BTC',
              compounding_limit: 30,
              min_interest: 0.088,
              max_interest: 0.095,
              cost_year_quantity: 0.25,
              cost_year_currency: 'BTC'
          },
          {
              id: "elite",
              name: "ELITE",
              months: 60,
              min_investment_quantity: 5,
              min_investment_currency: 'BTC',
              compounding_limit: 50,
              min_interest: 0.1,
              max_interest: 0.11,
              cost_year_quantity: 0.4,
              cost_year_currency: 'BTC'
          }
      ]
  },
  {
      id: "bitwabi",
      name: "Bitwabi",
      plans: [
          {
              id: "pplus",
              name: "Premium plus",
              months: 12,
              min_investment_quantity: 0,
              min_investment_currency: 'BTC',
              compounding_limit: 2.036,
              min_interest: 0.2,
              max_interest: 0.4,
              cost_year_quantity: 12000,
              cost_year_currency: 'EUR'
          },
          {
              id: "premium",
              name: "Premium",
              months: 12,
              min_investment_quantity: 0,
              min_investment_currency: 'BTC',
              compounding_limit: 1.018,
              min_interest: 0.2,
              max_interest: 0.25,
              cost_year_quantity: 6000,
              cost_year_currency: 'EUR'
          },
          {
              id: "diamond",
              name: "Diamante",
              months: 12,
              min_investment_quantity: 0,
              min_investment_currency: 'BTC',
              compounding_limit: 0.509,
              min_interest: 0.2,
              max_interest: 0.25,
              cost_year_quantity: 3000,
              cost_year_currency: 'EUR'
          },
          {
              id: "oro",
              name: "Oro",
              months: 12,
              min_investment_quantity: 0,
              min_investment_currency: 'BTC',
              compounding_limit: 0.212,
              min_interest: 0.2,
              max_interest: 0.25,
              cost_year_quantity: 1250,
              cost_year_currency: 'EUR'
          },
          {
              id: "plata",
              name: "Plata",
              months: 12,
              min_investment_quantity: 0,
              min_investment_currency: 'BTC',
              compounding_limit: 0.084,
              min_interest: 0.2,
              max_interest: 0.25,
              cost_year_quantity: 500,
              cost_year_currency: 'EUR'
          },
          {
              id: "bronce",
              name: "Bronce",
              months: 12,
              min_investment_quantity: 0,
              min_investment_currency: 'BTC',
              compounding_limit: 0.042,
              min_interest: 0.2,
              max_interest: 0.25,
              cost_year_quantity: 250,
              cost_year_currency: 'EUR'
          }
      ]
  }
]

function App() {
  const [planSelected, setPlanSelected] = useState('')
  const [initialInvestment, setInitialInvestment] = useState(0)

  const selectPlan = plan => {
    setPlanSelected(plan || -1)
    setInitialInvestment(0)
    console.log('Elegido', plan)
  }

  const saveInvestmen = initialInvestment => {
    setInitialInvestment(initialInvestment)
  }

  return (
    <div className="App">
        <Layout>
          <ProductSelector products={products} onSelect={selectPlan}/>
          { planSelected ? 
          <div>
            <ProductDetail plan={planSelected} onInvestmentChange={saveInvestmen}/>
            <SummaryInvestment plan={planSelected} initialInvestment={initialInvestment}/>
            </div>
          : ''}
        </Layout>
    </div>
  );
}

export default App;
