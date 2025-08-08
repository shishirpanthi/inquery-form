import { useState } from 'react'
import Inquery from './components/inqueryform/Inquery'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Inquery />
    </>
  )
}

export default App
