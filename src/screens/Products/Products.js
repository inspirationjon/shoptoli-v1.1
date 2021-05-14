import { NavLink, Route, Switch } from 'react-router-dom'
import './Products.scss'
function Products() {
    return (
        <section className='products-section'>
            <ul className='products-section__nav'>
                <li className='products-section__nav-item'>
                    <NavLink
                        className='products-section__nav-link'
                        to='/products'
                        exact>
                        Categories
                    </NavLink>
                </li>
                <li className='products-section__nav-item'>
                    <NavLink
                        className='products-section__nav-link'
                        to='/categories'
                        exact>
                        Products
                    </NavLink>
                </li>
            </ul>

            <div className='products-section__content'>
                <Switch>
                    <Route path='/products' />
                </Switch>
            </div>
        </section>
    )
}

export default Products
