import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Icon, Menu } from 'antd';

import StyledLogo from './StyledLogo';
import logo from '../../assets/iGive2_logo.png';

const Header = () => {
  const handleLogOut = () => {
    localStorage.setItem('token', '');
    window.location.pathname = '/signin';
  };

  const selectedKey = window.location.href
    .replace(window.location.host, '')
    .replace(window.location.protocol, '')
    .replace('//', '');
  return (
    <Layout.Header>
      <Menu
        mode="horizontal"
        theme="dark"
        style={{ lineHeight: '64px' }}
        selectedKeys={[selectedKey]}
      >
        <Link to="/">
          <StyledLogo src={logo} alt="iGive2 logo" />
        </Link>
        <Menu.Item key="/studies">
          <Link to="/studies">Studies</Link>
        </Menu.Item>
        <Menu.SubMenu key="/profile" style={{ float: 'right' }} title={<Icon type="user" />}>
          <Menu.Item key="/profile">
            <Link to="/profile">My Profile</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <a
              href="https://www.universaldoctor.com/igive2-terms-conditions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms and Conditions
            </a>
          </Menu.Item>
          <Menu.Item key="2" onClick={handleLogOut}>
            Log out
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
