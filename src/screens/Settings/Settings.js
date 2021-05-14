import './Settings.scss'
import { NavLink, Switch } from 'react-router-dom'
import Private from '../../routes/Private'
import CreateUser from '../../components/CreateUser/CreateUser'
import ChangeInfo from '../../components/ChangeInfo/ChangeInfo'

function Settings () {
   return (
      <div className="settings">
         <ul className="settings__list">
            <li className="settings__item">
               <NavLink className="settings__link" activeClassName="settings__link-active" exact to="/settings">Create User</NavLink>
            </li>
            <li className="settings__item">
               <NavLink className="settings__link" activeClassName="settings__link-active" exact to="/settings/change-info">Create User</NavLink>
            </li>
         </ul>
         <div className="setings__content">
            <Switch>
               <Private path="/settings" exact component={CreateUser} />
               <Private path="/settings/change-info" exact component={ChangeInfo} />
            </Switch>
         </div>
      </div>
   )   
}

export default Settings
