import { Nav } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from "../../store/slices/auth-slice"
import { useEffect, useRef } from 'react';
import { SlLogout } from "react-icons/sl";
import { prettyDialog } from '../../helpers/function/toast-confirm';
import { useToast } from '../../store/providers/toast-provider';
import { resetFavs } from '../../store/slices/fav-slice';
import  ProfileMenus  from '../../helpers/data/profile-menus';
import "./user-Profile.scss"
import { useTranslation } from 'react-i18next';

export const UserProfile = () => {
  const { user } = useSelector(state => state.auth);
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subMenuRef = useRef();
  const role = user.role.toLowerCase();
  const { t } = useTranslation();
  const {admin, manager, customer} = ProfileMenus();
  const toggleMenu = () => {
    // Get the element with the id 'subMenu' from the DOM
    const subMenu = document.getElementById("subMenu");

    // Toggle the 'open-menu' class on the 'subMenu' element
    // If the class is present, remove it; if it's not present, add it
    subMenu.classList.toggle('open-menu');
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    prettyDialog({
      message: t("userProfile.prettyDialogMessage"),
      header: t("userProfile.prettyDialogHeader"),
      handleAccept: () => {
        dispatch(logout());
        dispatch(resetFavs());
        showToast({
          severity: 'success',
          summary: t('userProfile.summarySuccess'),
          detail: t("userProfile.detailSuccess"),
          icon: <SlLogout size={50} />,
          life: 1000,
        });
      },
    });

    toggleMenu(); // Close the dropdown before dispatching the logout action
  };


  // Close the dropdown when a menu item is clicked
  const handleMenuItemClick = () => {
    toggleMenu();
  };

  const handleMenuImageClick = () => {
    toggleMenu();
    navigate("/my-profile", { state: { activePanel: "profile-photo" } }); 
  };


  const handleClickOutside = (event) => {
    // If the dropdown menu exists and the clicked element is not inside the dropdown menu
    if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
      // Remove the 'open-menu' class from the dropdown menu
      document.getElementById('subMenu').classList.remove('open-menu');
    }
  };


  useEffect(() => {
    // handleClickOutside runs when cliked anywhere on the page
    document.body.addEventListener('click', handleClickOutside);

    // clean up the event Listener when the component unmounts
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    }

  }, [])

  return (
    <>
      {
        <div className='hero'>
          <Nav className='user-logo-nav' ref={subMenuRef}>
            {
              user.profilePhoto ?
                <img alt="" className='user-pic' src={`data:${user?.profilePhoto?.type};base64, ${user?.profilePhoto?.data}`} onClick={toggleMenu} />
                :
                <img alt="" className='user-pic' src="/images/profile/user.jpg" onClick={toggleMenu} />
            }
            <div className='sub-menu-wrap' id='subMenu' ref={subMenuRef} >
              <div className="sub-menu">
                <div className="user-Info">
                  {
                    user.profilePhoto ?
                      <img alt="" className='user-pic' src={`data:${user?.profilePhoto?.type};base64, ${user?.profilePhoto?.data}`} onClick={handleMenuImageClick} />
                      :
                      <img alt="" className='user-pic' src="/images/profile/user.jpg" onClick={handleMenuImageClick} />
                  }
                  <h5> {user.firstName + " " + user.lastName}</h5>
                </div>
                <hr />
                {
                  // Kullanıcı rolüne göre ilgili menüyü göster
                  role === "admin" ? admin.map((item) => (
                    <Dropdown.Item as={Link} to={item.link} key={item.title} onClick={handleMenuItemClick}>
                      <span>{item.title}</span> <span className='ok-icon'>{item.icon}</span>
                    </Dropdown.Item>
                  )) :
                  role === "manager" ? manager.map((item) => (
                    <Dropdown.Item as={Link} to={item.link} key={item.title} onClick={handleMenuItemClick}>
                      <span>{item.title}</span> <span className='ok-icon'>{item.icon}</span>
                    </Dropdown.Item>
                  )) :
                  role === "customer" ? customer.map((item) => (
                    <Dropdown.Item as={Link} to={item.link} key={item.title} onClick={handleMenuItemClick}>
                      <span>{item.title}</span> <span className='ok-icon'>{item.icon}</span>
                    </Dropdown.Item>
                  )) : null
                }
                <Dropdown.Item as={Link} onClick={(e) => handleLogout(e)}> {t("userProfile.dropdownItemLogout")}</Dropdown.Item>
              </div>
            </div>

          </Nav>
        </div>
      }
    </>
  );
}

export default UserProfile;



