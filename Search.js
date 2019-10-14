import '@babel/polyfill'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

function Product({ link, image, name, price }) {
  return (
    <li className="col-3 product">
      <div className='card'>
        <img className="card-img-top" src={image} alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{price}</p>
        </div>
      </div>
    </li>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    setTimeout(async () => {
      const { data: result } = await axios.get(
        'https://api.jsonbin.io/b/5da4a5cc9d04f724cee7e0ca/1'
      )
      setProducts(result)
      setIsLoading(false)
    }, 1000 * 0)
  }, [])



  const renderContent = () => {
    if (isLoading || !products.length) {
      return 'carregando...'
    }

    return products.map(product => (
      <Product {...product} />
    ))
  }

  return (
    <div className="container products">
      <ul className="row list-unstyled">
        {renderContent()}
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
