import React, { useRef, useState } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { MiniLogo } from '../Lib/Svg';
import ProfileButton from '../ProfileButton/ProfileButton';

function Header() {
	const [data, setData] = useState('');
	const input = useRef();

	function searchUser(evt) {
		if (evt.target.value.length === 0) {
			setData('');
		}

		fetch(
			process.env.REACT_APP_API_URL +
				`/admin/search?q=${evt.target.value}`,
			{
				headers: {
					'Content-Type': 'application/json',
					token: JSON.parse(
						window.localStorage.getItem('__auth_provider_token__'),
					).token,
				},
			},
		)
			.then((res) => res.json())
			.then((res) => setData(res.data));
	}

	return (
		<header className='site-header header'>
			<Link className='mini-logo' to='/'>
				<MiniLogo />
			</Link>
			<form
				className='search-form'
				onSubmit={(evt) => evt.preventDefault()}>
				<input
					ref={input}
					className='search-input'
					placeholder='Mijozni qidiring...'
					onChange={searchUser}
					type='text'
				/>
				<div className='search-result'>
					<ul
						className={`search-result__list ${
							data ? 'result-show' : ''
						}`}>
						{data &&
							data.map((item) => {
								return (
									<li
										className='search-result__item'
										key={item.client_id}>
										<Link
											className='search-result__link'
											to={`/clients/${item.client_id}`}
											onClick={(evt) => {
												input.current.value = '';
												setData('');
											}}>
											<p>
												{item.client_name
													? item.client_name
													: item.tg_first_name}
											</p>
											<span>{item.tg_phone}</span>
										</Link>
									</li>
								);
							})}
					</ul>
				</div>
			</form>
			<div className='header__right'>
				<ProfileButton />
			</div>
		</header>
	);
}

export default Header;
