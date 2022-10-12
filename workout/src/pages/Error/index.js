
import { Link } from 'react-router-dom'
import './Error.css'

export default function Error(){
  return(
    <div className='erro'>
      <h1>404</h1>
      <h2>Page not found</h2>
      <Link to="/" >Voltar</Link>
    </div>
  )
}