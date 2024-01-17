import './App.scss'

function App() {
  return (
    <div className='container'>
      <div className='containerTitle'>
        <h1>Cake Order Form</h1>
        <p> Order your freshly baked cakes made using only the finest quality natural ingredients.</p>
        <hr />
      </div>
      <div className='containerCakes'>
        <p>Please choose your favorite cake from among the following:<span>*</span></p>
        <div className='cakes'>
          <div>
            <input id='cake1' type='radio' />
            <label for='cake1'>
              <img src='cake1.jpg' />
            </label>
          </div>
          <div>
            <input id='cake2' type='radio' />
            <label for='cake2'>
              <img src='cake2.jpg' />
            </label>
          </div>
          <div>
            <input id='cake3' type='radio' />
            <label for='cake3'>
              <img src='cake3.jpg' />
            </label>
          </div>
          <div>
            <input id='cake4' type='radio' />
            <label for='cake4'>
              <img src='cake4.jpg' />
            </label>
          </div>
        </div>
      </div>
      <div className='containerOrder'>
        <h2>Order Information</h2>
      </div>
    </div>
  )
}

export default App
