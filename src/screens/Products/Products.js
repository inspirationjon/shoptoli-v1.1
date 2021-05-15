import { NavLink, Switch } from 'react-router-dom'
import ProductsBox from '../../components/ProductsBox/ProductsBox'
import CategoriesBox from '../../components/CategoriesBox/CategoriesBox'
import Private from '../../routes/Private'
import './Products.scss'

function Products() {
    return (
        <div className='products-section'>
            <ul className='products-section__list'>
                <li className='products-section__item'>
                    <NavLink
                        className='products-section__link'
                        activeClassName='products-section__link-active'
                        to='/products'
                        exact>
                        Categories
                    </NavLink>
                </li>
                <li className='products-section__item'>
                    <NavLink
                        className='products-section__link'
                        activeClassName='products-section__link-active'
                        exact
                        to='/products/product'>
                        Products
                    </NavLink>
                </li>
            </ul>
            <div className='products-content'>
                <Switch>
                    <Private path='/products' component={CategoriesBox} exact />
                    <Private
                        path='/products/product'
                        exact
                        component={ProductsBox}
                    />
                </Switch>
            </div>
        </div>
    )
}

export default Products
