import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
    <div class="title">
      <h2 align="center">Gear Head</h2>
    </div>
    
    <body>
    <main class="main">
        <section>
            <div>
                <button class="btn">Home</button>
            </div>
            <div>
                <button class="btn one">Collection</button>
            </div>
            <div>
                <button class="btn two">About</button>
            </div>
            <div>
                <button class="btn three">Contact</button>
            </div>
            {/* <div>
                <button class="btn four">opacity</button>
            </div> */}
        </section>
    </main>
</body>
    </>
  )
}

export default App
